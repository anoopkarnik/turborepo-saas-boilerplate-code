"use server"

import { getNotifications } from "@repo/prisma-db/repo/notification";

export const getNotificationsAction = async (userId: string) => {
    try {
        const notifications = await getNotifications(userId);
        return notifications;
    }
    catch  {
        return null;
    }
}
