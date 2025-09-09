import React from 'react'
import ResponsiveDialog from '../ResponsiveDialog';
import { MeetingsGetOne } from '../../_utils/types';
import MeetingForm from '../Meetings/MeetingForm';


interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}

const UpdateMeetingDialog = ({ open, onOpenChange,initialValues }: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog 
        title="Edit Meeting"
        description='Edit the meeting details'
        open={open}
        onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)} 
        onCancel={()=> onOpenChange(false)}
        initialValues={initialValues}
        />
    </ResponsiveDialog>
  )
}

export default UpdateMeetingDialog