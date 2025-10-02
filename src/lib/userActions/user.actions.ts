"use server";

import { createAdminClient } from "@/appwrite";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const getUserByEmail = async (email: string) => {
  const { database } = await createAdminClient();

  const result = await database.listRows(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.rows[0] : null;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send the OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountID = await sendEmailOTP({ email });

  if (!accountID) throw new Error("Failed to send OTP");

  if (!existingUser) {
    const { database } = await createAdminClient();

    await database.createRow(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        accountID,
      }
    );
  }

  return parseStringify({ accountID });
};
