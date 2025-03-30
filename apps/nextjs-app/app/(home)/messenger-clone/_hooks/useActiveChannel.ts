import useActiveList from "./useActiveList";
import { useEffect, useState } from "react";
import { Channel,Members } from "pusher-js"
import { pusherClient } from "../../../../lib/helper/pusher";

const useActiveChannel = () => {
    const {set, add, remove} = useActiveList();
    const [activeChannel, setActiveChannel] = useState<Channel| null>(null);

    useEffect(() => {
        console.log("useActiveChannel");
        let channel = activeChannel

        if (!channel) {
            channel = pusherClient.subscribe("presence-messenger");
            setActiveChannel(channel);
        }
        channel.bind("pusher:subscription_succeeded", (members:Members) => {
            const initialMembers: string[] = [];
            members.each((member: Record<string, any>) => {
                initialMembers.push(member.id);
            });
            console.log("Initial members: ", initialMembers);
            set(initialMembers);
        });
        
        channel.bind("pusher:member_added", (member: Record<string, any>) => {
            add(member.id);
        });
        channel.bind("pusher:member_removed", (member: Record<string, any>) => {
            remove(member.id);
        });
        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe("presence-messenger");
                setActiveChannel(null);
            }
        }
    }, [activeChannel, add, remove, set]);


}

export default useActiveChannel;