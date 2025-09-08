"use client"
import React from 'react'
import ResponsiveDialog from '../ResponsiveDialog';
import MeetingForm from './MeetingForm';
import { useRouter } from 'next/navigation';


interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
        title="New Meeting"
        description='Create a new meeting'
        open={open}
        onOpenChange={onOpenChange}
    >
      <MeetingForm onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meet-ai/meetings/${id}`);
      }}
      onCancel={() => onOpenChange(false)} />
    </ResponsiveDialog>
  )
}

export default NewMeetingDialog