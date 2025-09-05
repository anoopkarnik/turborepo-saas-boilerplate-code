import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@repo/ui/molecules/shadcn/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@repo/ui/molecules/shadcn/drawer';
import React from 'react'

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ResponsiveDialog= ({ title, description, children, open, onOpenChange }:Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerHeader>
            <DrawerTitle >
                {title}
            </DrawerTitle>
            <DrawerDescription >
                {description}
            </DrawerDescription>
        </DrawerHeader>
        <DrawerContent className='p-4'>
            {children}
        </DrawerContent>
      </Drawer>
    )
}
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogHeader>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
        </DialogHeader>
        <DialogContent className='p-4'>
            {children}
        </DialogContent>
     </Dialog>
  )
}

export default ResponsiveDialog