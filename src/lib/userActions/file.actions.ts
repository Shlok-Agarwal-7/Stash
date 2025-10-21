"use server";

import { createAdminClient, createSessionClient } from "@/appwrite";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

const handleError = (error: unknown, message: string) => {
  // console.log(error, message);
  throw error;
};

export const UploadFile = async ({
  file,
  ownerID,
  accountID,
  path,
}: UploadFileProps) => {
  const { storage, database } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile({
      bucketId: appwriteConfig.bucketId,
      fileId: ID.unique(),
      file: inputFile,
    });

    const FileRow = {
      type: getFileType(file.name).type,
      extension: getFileType(file.name).extension,
      name: bucketFile.name,
      size: bucketFile.sizeOriginal,
      url: constructFileUrl(bucketFile.$id),
      bucketFileID: bucketFile.$id,
      owner: ownerID,
      accountID: accountID,
      users: [],
    };

    const fileMetaData = await database
      .createRow(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        FileRow
      )
      .catch(async (error) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create metadata Row");
      });

    revalidatePath(path);
    return parseStringify({ fileMetaData });
  } catch (error) {
    handleError(error, "Failed to upload the File");
  }
};

const getQueries = (
  currentUser: any,
  types: string[],
  searchQuery: string,
  sort: string
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types) queries.push(Query.equal("type", types));
  if (searchQuery) queries.push(Query.contains("name", [searchQuery]));
  if (sort) {
    const [sortBy, OrderBy] = sort.split("-");
    queries.push(
      OrderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    );
  }
  // if (limit !== 0) {
  //   queries.push(Query.limit(limit));
  // }

  return queries;
};

export const fetchFiles = async ({
  types,
  searchQuery,
  sort = "$createdAt-desc",
}: {
  types: string[];
  searchQuery: string;
  sort: string;
}) => {
  const { database } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = getQueries(currentUser, types, searchQuery, sort);

    const files = await database.listRows(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    return parseStringify(files);
  } catch (error) {
    handleError(error, "Unable to fetch files at this moment");
  }
};

export const deleteFile = async ({
  fileID,
  fileBucketFileID,
  path,
}: {
  fileID: any;
  fileBucketFileID: any;
  path: any;
}) => {
  const { database, storage } = await createAdminClient();

  try {
    const res = await database.deleteRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileID
    );

    if (res)
      await storage.deleteFile(appwriteConfig.bucketId, fileBucketFileID);

    revalidatePath(path);

    return parseStringify({ res });
  } catch (e) {
    handleError(e, "Delete operation failed");
  }
};

export const renameFile = async ({
  fileID,
  newName,
  path,
}: {
  fileID: any;
  newName: string;
  path: string;
}) => {
  const { database } = await createAdminClient();

  try {
    const res = await database.updateRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileID,
      { name: newName }
    );

    revalidatePath(path);

    return parseStringify({ res });
  } catch (e) {
    handleError(e, "Failed to Rename the file");
  }
};

export const shareFileToUser = async ({
  fileID,
  emails,
  path,
}: {
  fileID: any;
  emails: string[];
  path: string;
}) => {
  const { database } = await createAdminClient();

  try {
    const updatedFile = await database.updateRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileID,
      {
        users: emails,
      }
    );

    revalidatePath(path);

    return parseStringify(updatedFile);
  } catch (e) {
    handleError(e, "Couldn't share the file to user");
  }
};

export async function getTotalSpaceUsed() {
  try {
    const client = await createSessionClient();
    if (!client) throw new Error("Failed to create session client");
    const { database } = client;
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User is not authenticated.");

    const files = await database.listRows(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", [currentUser.$id])]
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };

    files.rows.forEach((file: any) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
    handleError(error, "Error calculating total space used:, ");
  }
}
