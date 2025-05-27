"use client"

import { Category } from "@prisma/client";
import { Button } from "@repo/ui/atoms/shadcn/button";
import { cn } from "@repo/ui/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('categoryId')
    const onClick = (id: string | undefined) => {
        const query = {
            categoryId: id,
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        },{skipEmptyString: true, skipNull: true})
        router.push(url)
    }

  return (
    <div className="max-w-[90%] overflow-x-auto whitespace-nowrap space-x-2 flex p-1 scrollbar 
    scrollbar-track-secondary scrollbar-thumb-sidebar">
        <Button variant="secondary" onClick={()=>onClick(undefined) } 
            className={cn(!categoryId? 'bg-sidebar-accent' : 'bg-sidebar/50')}>
            Newest
        </Button>
        {data.map((category) => (
            <Button key={category.id} variant="secondary"  onClick={()=>onClick(category.id) }
            className={cn(category.id === categoryId ? 'bg-sidebar-accent' : 'bg-sidebar/50')}>
            {category.name}
            </Button>
        ))}
    </div>
  );
};

