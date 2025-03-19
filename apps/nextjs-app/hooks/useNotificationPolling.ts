"use client"
// useNotificationPolling.ts
import { useEffect, useState } from "react";
import { useRecoilState} from 'recoil';
import { NotificationProps } from "@repo/ts-types/home/v1";
import { notificationsState } from "@repo/state-management/recoil/notification";
import { getNotificationsAction } from "../actions/notifications";

// The main hook
export function useNotificationPolling(userId: string, interval: number = 30000) {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useRecoilState<NotificationProps[]>(notificationsState);

    useEffect(() => {
        let pollingInterval: NodeJS.Timeout | null = null;

        async function pollNotifications() {
            if (!userId) return;

            setIsLoading(true);
            try {
                const data:any = await getNotificationsAction(userId);
                setNotifications(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        }

        const startPolling = () => {
            // Initial fetch
            pollNotifications();
            
            // Set up polling interval
            pollingInterval = setInterval(pollNotifications, interval);
        };

        if (userId) {
            startPolling();
        }

        // Cleanup function
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [userId, interval, setNotifications]);

    return {
        notifications,
        isLoading,
        error,
        // Utility function to force a refresh
        refresh: () => setNotifications([])
    };
}

