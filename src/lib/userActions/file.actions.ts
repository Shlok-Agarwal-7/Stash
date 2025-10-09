"use server";

import { createAdminClient, createSessionClient } from "@/appwrite";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
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

const getQueries = (currentUser: any, type: string) => {
  const queries = [
    // Query.equal("type", [type]),
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  return queries;
};

export const fetchFiles = async ({ type }: { type: string }) => {
  const { database } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = getQueries(currentUser, type);

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

export const deleteFile = async ({ file }: { file: any }) => {
  const { database, storage } = await createAdminClient();

  try {
    await storage.deleteFile(appwriteConfig.bucketId, file.bucketFileID);
    const res = await database.deleteRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      file.$id
    );

    return parseStringify({ res });
  } catch (e) {
    handleError(e, "Delete operation failed");
  }
};

export const rename = async ({
  file,
  newName,
}: {
  file: any;
  newName: string;
}) => {
  const { database } = await createAdminClient();

  try {
    const res = await database.updateRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      file.$id,
      { name: newName }
    );

    return parseStringify({ res });
  } catch (e) {
    handleError(e, "Failed to Rename the file");
  }
};

export const addUser = async ({
  file,
  newUserEmail,
}: {
  file: any;
  newUserEmail: string;
}) => {
  const { database } = await createAdminClient();

  try {
    if (file.users && file.users.includes(newUserEmail)) {
      throw new Error("User already has access to this file");
    }

    const updatedUsers = [...(file.users || []), newUserEmail];

    const updatedFile = await database.updateRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      file.$id,
      {
        users: updatedUsers,
      }
    );
    return parseStringify(updatedFile);
  } catch (e) {
    handleError(e, "Couldn't share the file to user");
  }

};