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
        <DrawerContent className='p-4'>
            <DrawerHeader>
                <DrawerTitle >
                    {title}
                </DrawerTitle>
                <DrawerDescription >
                    {description}
                </DrawerDescription>
            </DrawerHeader>
            {children}
        </DrawerContent>
      </Drawer>
    )
}
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='p-4'>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
     </Dialog>
  )
}

export default ResponsiveDialog