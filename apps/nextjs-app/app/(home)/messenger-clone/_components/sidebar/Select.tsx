"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/dropdown';
import React from 'react'

interface SelectProps {
    placeholder: string;
    value: any[];
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select = ({placeholder,value,onChange,options}:SelectProps) => {
    
  return (
    <div className='z-[50]'>
        <div className='mt-2'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='w-full border-border border-2 rounded-lg p-2 
                    text-description text-md bg-sidebar focus:border-primary'
                    tabIndex={0}>
                        {value.length === 0 ? (
                        placeholder
                        ) : (
                        <div className='flex flex-wrap gap-1 focus:border-primary '
                        tabIndex={0}>
                            {value.map((item) => (
                            <span key={item.value} 
                            className='border-2 border-border p-1 text-xs'>
                                {item.label}
                            </span>
                            ))}
                        </div>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-[var(--radix-popper-anchor-width)] w-auto'>
                    {options?.map((option) => (
                        <DropdownMenuItem key={option.value} 
                        className='cursor-pointer text-sm'
                        onClick={() => {
                            const exists = value.some((item) => item.value === option.value);
                            if (exists) {
                                // remove
                                const newValue = value.filter((item) => item.value !== option.value);
                                onChange(newValue);
                            } else {
                                // add
                                onChange([...value, option]);
                            }
                        }}>
                            <div className='flex items-center gap-x-2'>
                                <input type="checkbox" checked={value.some((item) => item.value === option.value)} />
                                {option.label}
                            </div>
                        </DropdownMenuItem>
                    ))}
                            
                </DropdownMenuContent>
                    
            </DropdownMenu>
        </div>
    </div>
  )
}

export default Select