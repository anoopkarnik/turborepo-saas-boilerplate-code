"use client"
import React, { useEffect } from 'react'
import ProjectsTab from '../_components/ProjectsTab'
import useProject from '../_hooks/useProject'
import { getQuestions } from '../_actions/project'
import AskQuestionCard from '../_components/AskQuestionCard'
import QuestionCard from '../_components/QuestionCard'

const QAPage = () => {
  const [questions, setQuestions] = React.useState<any[]>([])
  const {projectId} = useProject()

  useEffect(()=>{
    const fetchQuestions = async () => {
      const data = await getQuestions(projectId)
      console.log(data)
      setQuestions(data)
    }
    fetchQuestions()
  }, [projectId])
  return (
    <div>        
        <ProjectsTab />
        <AskQuestionCard />
       
          <h1 className='text-xl font-semibold my-4 mx-8'>
            Saved Questions
          </h1>
          <div className='flex flex-col gap-2'>
              {questions?.map((question) => (
                  <QuestionCard key={question.id} 
                  question={question}
                  />
              ))}
      
          </div>

    </div>
  )
}

export default QAPage