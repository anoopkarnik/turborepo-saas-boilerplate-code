"use client"

import { Button } from '@repo/ui/atoms/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { CommandInput, CommandList, CommandEmpty, CommandItem, CommandResponsiveDialog } from '@repo/ui/molecules/shadcn/command';
import { ChevronsUpDownIcon } from 'lucide-react';
import React, { ReactNode, useState } from 'react'

interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode
    }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

const CommandSelect = ({options, onSelect, onSearch, value, placeholder="Select an option", isSearchable, className}: Props) => {
   const [open, setOpen] = useState(false);
   const selectedOption = options.find(opt => opt.value === value);

   const handleOpenChange = (value: boolean) => {
       onSearch?.('');
         setOpen(value);
   }
return (
    <>
       <Button type='button' variant='outline' 
            className={cn('h-9 justify-between font-normal px-2 w-full',
                !selectedOption && 'text-muted-foreground',
                className)} 
            onClick={() => setOpen(true)}>
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon/>
       </Button>
       <CommandResponsiveDialog
            shouldFilter={!isSearchable}
           open={open}
           onOpenChange={handleOpenChange}
           >
              <CommandInput placeholder={placeholder} onValueChange={onSearch}/>
              <CommandList>
                <CommandEmpty>
                    <span className='text-muted-foreground text-sm'>No options found.</span>
                </CommandEmpty>
                {options.map((option) => (
                    <CommandItem key={option.id}
                    onSelect={()=>{
                        onSelect(option.value);
                        setOpen(false);
                    }}>
                        {option.children}
                    </CommandItem>
                ))} 
              </CommandList>
        </CommandResponsiveDialog>
        
    </>
  )
}

export default CommandSelect