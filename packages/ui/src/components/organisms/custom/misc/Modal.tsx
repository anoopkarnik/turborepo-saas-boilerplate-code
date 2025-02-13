"use client"
import { useCallback } from "react";
import { Button } from "../../../atoms/shadcn/button";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
}

const Modal = ({isOpen,onClose,onSubmit,title,body,footer,actionLabel,disabled}:ModalProps) =>{

    const handleClose = useCallback(() =>{
        if(disabled) return;
        onClose();

    },[disabled,onClose]);

    const handleSubmit = useCallback(()=>{
        if(disabled) return;
        onSubmit();
    },[disabled,onSubmit]);

    if(!isOpen) return null;
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 
            outline-none focus:outline-none backdrop-blur-sm">
                <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
                    <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full
                     bg-sidebar outline-none focus:outline-none">
                        <div className="flex items-center justify-between p-10 rounded-t">
                            <h3 className="text-3xl font-semibold text-foreground">{title}</h3>
                            <Button onClick={handleClose} variant={'ghost'} size={'xsicon'} >
                                <AiOutlineClose size={20}/>
                            </Button>
                        </div>
                        <div className="relative p-10 flex-auto">
                            {body}
                        </div>
                        <div className="flex flex-col gap-2 p-10">
                            <Button onClick={handleSubmit} variant={'default'} disabled={disabled} >
                                {actionLabel}
                            </Button>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;