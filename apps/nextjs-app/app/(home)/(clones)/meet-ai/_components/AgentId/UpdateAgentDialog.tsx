import React from 'react'
import ResponsiveDialog from '../ResponsiveDialog';
import AgentForm from '../Agents/AgentForm';
import { AgentsGetOne } from '../../_utils/types';


interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentsGetOne;
}

const UpdateAgentDialog = ({ open, onOpenChange,initialValues }: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog 
        title="Edit Agent"
        description='Edit the agent details'
        open={open}
        onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)} 
        onCancel={()=> onOpenChange(false)}
        initialValues={initialValues}
        />
    </ResponsiveDialog>
  )
}

export default UpdateAgentDialog