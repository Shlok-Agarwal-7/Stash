"use server";

import { createAdminClient, createSessionClient } from "@/appwrite";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const sendEmailOTP = async ({ email }: { email: string }) => {
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

  if (existingUser)
    return parseStringify({
      accountID: null,
      error: "User Already Exists,Please Sign-In",
    });

  const accountID = await sendEmailOTP({ email });

  if (!accountID) throw new Error("Failed to send OTP");

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

  return parseStringify({ accountID });
};

export const verifyOTP = async ({
  accountID,
  password,
}: {
  accountID: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountID, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionID: session.$id });
  } catch (error: any) {
    if (error?.code === 401) {
      throw new Error("Invalid OTP provided");
    }
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  const client = await createSessionClient();
  if (!client) {
    return null;
  }

  const { account, database } = client;

  const result = await account.get();

  const user = await database.listRows(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountID", [result.$id])]
  );

  if (user.total <= 0) return null;

  console.log(user.rows[0]);

  return parseStringify(user.rows[0]);
};

export const signOutUser = async () => {
  const client = await createSessionClient();
  if (!client) {
    return null;
  }

  const { account } = client;

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "There was a error logging out");
  } finally {
    redirect("/");
  }
};

export const signInUser = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    await sendEmailOTP({ email });
    return parseStringify({ accountID: existingUser.accountID });
  }

  return parseStringify({
    accountID: null,
    error: "User Not Found,Please Sign-Up",
  });
};
