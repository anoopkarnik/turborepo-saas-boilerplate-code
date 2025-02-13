
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import {NotificationProps } from "@repo/ts-types/home/v1";

export const notificationsState = atom<NotificationProps[]>({
    key: "notificationsState", // Unique key for this atom
    default: [], // Initial empty array of notifications
});

// Optional: Selector hook for components that only need to read notifications
export function useNotifications() {
    const [notifications] = useRecoilState(notificationsState);
    return notifications;
}

// Optional: Selector hook for components that only need to modify notifications
export function useSetNotifications() {
    const setNotifications = useSetRecoilState(notificationsState);
    return setNotifications;
}