"use client"
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '../../shadcn/breadcrumb'
import { Button } from '../../../atoms/shadcn/button'

export const BreadcrumbsHeader = () => {
    const pathname = usePathname()
    const paths = pathname === "/" ? [""]: pathname?.split("/")
    const router = useRouter()
    const getFullPath = (index: number) => {
        return paths.slice(0, index + 1).join("/");
      };
    return (
        <div className="flex items-center flex-start ">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Button variant={'blank'} size={'xs'} 
                        className='capitalize cursor-pointer  mx-0 px-0' 
                        onClick={() => router.push("/")}>
                            Home
                        </Button>
                    </BreadcrumbItem>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <Button variant={'blank'} size={'xs'} 
                                className='capitalize cursor-pointer  mx-0 px-0'
                                 onClick={() => router.push(getFullPath(index))}>
                                    {path}
                                </Button>
                            </BreadcrumbItem>
                            {index < paths.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
