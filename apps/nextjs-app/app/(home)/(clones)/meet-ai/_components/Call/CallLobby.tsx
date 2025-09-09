import { LogInIcon } from "lucide-react";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton,
    ToggleVideoPreviewButton, useCallStateHooks, VideoPreview
 } from "@stream-io/video-react-sdk";
 import Link from "next/link";
import { authClient } from "@repo/auth/better-auth/auth-client";
import { Button } from "@repo/ui/atoms/shadcn/button";
import { generateAvatarUri } from "../../_utils/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css"

interface Props {
    onJoin: () => void;
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();
    return (
        <DefaultVideoPlaceholder
            participant={{
                name: data?.user.name || 'No Name',
                image: data?.user.image || generateAvatarUri({seed: data?.user.name, variant: "initials"})
            } as StreamVideoParticipant
        }
        />
    )
}

const AllowBrowserPermissions = () => {
    return (
        <p className="text-sm">
            Please grant your browser a permission to access your camera and microphone.
        </p>
    )
}

const CallLobby = ({onJoin}:Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasMicPermission} = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission} = useCameraState();

    const hasBrowserMediaPermission = hasMicPermission && hasCameraPermission;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-tl from-sidebar-accent to-sidebar">
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">Ready to join?</h6>
                    <p className="text-sm">Set up your call before joining</p>
                </div>
                <VideoPreview 
                   DisabledVideoPreview={
                       hasBrowserMediaPermission? DisabledVideoPreview : AllowBrowserPermissions
                   }/>
                <div className="flex gap-x-2">
                    <ToggleAudioPreviewButton />
                    <ToggleVideoPreviewButton />
                </div>
                <div className="flex gap-x-2 justify-between w-full">
                    <Button asChild variant={"ghost"}>
                        <Link href="/meet-ai/meetings" >
                            Cancel
                        </Link>
                    </Button>
                    <Button disabled={!hasBrowserMediaPermission} onClick={onJoin}>
                        <LogInIcon className="size-4 mr-2" />
                        Join Call
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CallLobby