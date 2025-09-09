import {useState } from 'react'
import { StreamTheme, useCall } from '@stream-io/video-react-sdk';
import CallLobby from './CallLobby';
import CallOnging from './CallOnging';
import CallEnded from './CallEnded';

interface Props {
    meetingName: string;
}



const CallUI = ({ meetingName }: Props) => {
    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () =>{
        if(!call) return;
        await call.join();
        setShow("call");
    }

    const handleLeave = () =>{
        if(!call) return;
        call.endCall();
        setShow("ended");
    }

  return (
    <StreamTheme className='h-full'>
        {show === "lobby" && <CallLobby onJoin={handleJoin} />}
        {show === "call" && <CallOnging onLeave={handleLeave} meetingName={meetingName} />}
        {show === "ended" && <CallEnded />}
    </StreamTheme>
  )
}

export default CallUI