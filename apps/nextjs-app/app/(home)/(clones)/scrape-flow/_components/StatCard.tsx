import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card';

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
}

const StatCard = (props: StatCardProps) => {
  return (
    <Card className='bg-sidebar relative overflow-hidden'>
        <CardHeader className='flex pb-2'>
            <CardTitle>{props.title}</CardTitle>
            <props.icon size={120} className='text-muted-foreground absolute -bottom-4 
            -right-8 stroke-primary opacity-10' />
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold text-primary'>
                {props.value} 
            </div>
        </CardContent>
    </Card>
  )
}

export default StatCard