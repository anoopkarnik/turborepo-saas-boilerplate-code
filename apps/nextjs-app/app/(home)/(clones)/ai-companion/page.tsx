"use client"
import React, { useEffect } from 'react'
import SearchInput from './_components/SearchInput'
import { Categories } from './_components/Categories'
import { getCategories, getCompanions } from './_actions/prisma'
import { useSearchParams } from 'next/navigation'
import Companions from './_components/Companions'
import { ClipLoader } from 'react-spinners'


const AICompanion = () => {

  const [categories, setCategories] = React.useState<any>([])
  const [companions, setCompanions] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const searchParams = useSearchParams();


  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCompanions = async () => {
      setIsLoading(true)
      const name = searchParams.get("name");
      const categoryId = searchParams.get("categoryId");
  
      const companions= await getCompanions(name, categoryId)
      setCompanions(companions)
      setIsLoading(false)
    }
    fetchCompanions()
  }, [searchParams])


  if(isLoading){
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightgreen" size={80} />
      </div>
    )
  }
  
  return (
    <div className='h-full p-4 space-y-2'>
        <SearchInput />
        <Categories data={categories} />
        <Companions data={companions} />
    </div>
  )
}

export default AICompanion