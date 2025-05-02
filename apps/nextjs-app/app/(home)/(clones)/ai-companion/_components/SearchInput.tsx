"use client"
import { Input } from '@repo/ui/atoms/shadcn/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useDebounce } from '../../../../../hooks/useDebounce'
import qs from 'query-string'

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')

  const [value, setValue] = useState(name || '')

  const debouncedValue = useDebounce<string>(value, 500)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const query = {
      categoryId: categoryId,
      name: debouncedValue
    }
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    },{skipEmptyString: true, skipNull: true})

    router.push(url)
  }, [debouncedValue, router, categoryId])


  return (
    <div className='relative'>
        <SearchIcon className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
        <Input placeholder='Search...' className='pl-10 bg-sidebar' 
        onChange={onChange} value={value}/>
    </div>
  )
}

export default SearchInput