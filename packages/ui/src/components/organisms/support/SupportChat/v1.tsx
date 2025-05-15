import React, { useEffect, useState } from 'react';
import { Button } from '../../../atoms/shadcn/button';
import { Textarea } from '../../../atoms/shadcn/textarea';
import { chatWithAssistant} from "../../../../../../ai/src/openai/assistant";
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useSession } from '@repo/auth/better-auth/auth-client';
import { Skeleton } from '../../../molecules/shadcn/skeleton';


export const SupportChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [waitingForReply, setWaitingForReply] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true);

  const sendMessage = async () => {
    setWaitingForReply(true);
    setUserInput('');
    setMessages((prevMessages) => [...prevMessages, { role: 'user', value: userInput }]);
    const reply = await chatWithAssistant(userInput);
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', value: reply }]);
    setWaitingForReply(false);
  };

  const formatMessage = (message: string): string => {
    return message
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Bold text
      .replace(/_(.+?)_/g, "<i>$1</i>") // Italics
      .replace(/`(.+?)`/g, "<code>$1</code>") // Inline code
      .replace(/\n/g, "<br>"); // Line breaks
  };

  const {data:session} = useSession()

  const handleChatOpening = async () => {
    if(firstMessage){
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant',
         value: "Hello! How can I assist you today?" }]);
      setFirstMessage(false);
    }
  }

  useEffect(() => {
    handleChatOpening();
  }, []);


  return (
    <div className='flex flex-col'>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Support Chat</h3>
      </div>
      <div className=" text-foreground h-[500px]   overflow-y-auto p-4 flex flex-col gap-2 text-paragraph scrollbar scrollbar-track-secondary scrollbar-thumb-sidebar">
        {messages.slice(1).map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] flex items-start gap-2 ${
              message.role === "user"
                ? "bg-sidebar-accent text-foreground self-start"
                : "bg-primary text-background self-end"
            }`}
          >
            {message.role == "user" && <Image src={session?.user?.image as string} alt='U' width={30} height={30} className='rounded-full' />}
            {message.role == "assistant" && <Image src='/connections/openai-black.png' alt='U' width={30} height={30} className='rounded-full' />}
            <div dangerouslySetInnerHTML={{
              __html: message.role === "assistant" ? formatMessage(message.value) : message.value,}} 
              className="py-1 pr-2 rounded-lg max-w-full"></div>
          </div>
        ))}
        <div className='text-description self-end'>
          {waitingForReply && 
          <div className='flex items-center gap-4'>
            <span>Assistant is typing</span>
            <Skeleton className='w-[180px] h-[30px] rounded-lg bg-primary text-primary'/>
          </div>
          }
        </div>
      </div>
      <div role="button" tabIndex={0} className='flex items-center ' onKeyPress={(e) => e.key === 'Enter' && sendMessage()}>
        <Textarea
          className='flex-1 bg-background border-none rounded-none rounded-bl-lg min-h-[60px] max-h-[60px] focus-visible:ring-offset-0 focus-visible:ring-0 '
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
        />
        <Button onClick={sendMessage} 
        className='m-0 p-6 rounded-none rounded-br-lg border-0 min-h-[60px] max-h-[60px]'>
          Send
        </Button>
      </div>
    </div>

  );
};
