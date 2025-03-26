"use client"

import React, { useEffect, useState } from 'react'
import { getCategories, getCompanion } from '../../_actions/prisma'
import CompanionForm from '../../_components/CompanionForm'
import { ClipLoader } from 'react-spinners'

interface CompanionIdProps {
    params: {
        companionId: string
    }
}


const CompanionId =  ({params}: CompanionIdProps) => {


    const [companion, setCompanion] = useState<any>(null)
    const [categories, setCategories] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchCompanion =  async () => {
        setIsLoading(true)
        if (!params.companionId) {
          setIsLoading(false)
          return
        }
        const companion = await getCompanion(params.companionId?.[0] as string)
        setCompanion(companion)
        setIsLoading(false)
      }
      fetchCompanion()
    }, [params])

      useEffect(() => {
        const fetchCategories = async () => {
          const categories = await getCategories()
          setCategories(categories)
        }
        fetchCategories()
      }, [])
    
    if(isLoading){
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightgreen" size={80} />
        </div>
      )
    }
    

  return (
    <CompanionForm initialData={companion} categories={categories} />
  )
}

export default CompanionId