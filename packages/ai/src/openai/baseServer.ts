"use server"

import db from "@repo/prisma-db/client";
import { symmetricDecrypt } from "../utils/encryption";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers"

export async function getApiKeyFromType(connectionType: string="OpenAI") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const connection = await db.connection.findFirst({
    where: {
      connection: connectionType,
      userId: session.user.id
    },
  });
    if (!connection) {
        throw new Error("Connection not found");
    }
  const details = JSON.parse(connection?.details); 
    if (!details.apiKey) {
        throw new Error("API Key not found in connection");
    }

    const plainConnectionAPIKey = symmetricDecrypt(details.apiKey);

  return plainConnectionAPIKey;
}