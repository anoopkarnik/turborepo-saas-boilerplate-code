
import React from 'react'
import {Workflow} from '@prisma/prisma/client'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '../../_context/FlowValidationContext'
import { WorkflowStatus } from '@repo/ts-types/scrape-flow/workflow'

const Editor = ({workflow}: {workflow: Workflow}) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
          <div className='flex flex-col h-full w-full '>
              <Topbar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id} isPublished={workflow.status=== WorkflowStatus.PUBLISHED}/>
              <section className='flex h-full overflow-auto'>
                  <TaskMenu/>
                  <FlowEditor workflow={workflow}/>
              </section>
          </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}

export default Editor