"use client"
import { docCategoryProps, docProps } from '@repo/ts-types/landing-page/doc';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../../shadcn/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../../../../../lib/utils';
import { NavbarSectionProps } from '@repo/ts-types/landing-page/navbar';
import Image from 'next/image';
import { Separator } from '../../../../atoms/shadcn/separator';
import { useTheme} from "../../../../../providers/theme-provider";

const DocSidebar = ({ docs, docCategories, navbarSection }: {
     docs: docProps[], docCategories: docCategoryProps[], navbarSection: NavbarSectionProps}) => {
    const router = useRouter()
    const pathname = usePathname();
    const {theme} = useTheme();

    return (
    <Sidebar>
        <SidebarHeader className='p-6'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <a
                    rel="noreferrer noopener"
                    href="/"
                    className="flex items-center gap-2 font-cyberdyne"
                    >
                        {theme === "dark" ?
                        <Image src={navbarSection?.darkLogo} alt={navbarSection?.title} width={30} height={30} /> : 
                        <Image src={navbarSection?.logo} alt={navbarSection?.title} width={30} height={30} />}
                        <div className="hidden lg:flex flex-col items-start text-md leading-none bg-gradient-to-r from-white to-white bg-clip-text text-transparent ">
                            <div>{navbarSection?.title?.split(' ').slice(0, Math.ceil(navbarSection?.title?.split(' ').length / 2)).join(" ")}</div>
                            <div>{navbarSection?.title?.split(' ').slice(Math.ceil(navbarSection?.title?.split(' ').length / 2)).join(" ")}</div>
                            </div>
                    </a>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <Separator/>
        <SidebarContent className='px-6 scrollbar scrollbar-track-secondary scrollbar-thumb-sidebar'>
            {docCategories
            .map((category) => {
                // Filter docs belonging to this category
                const categoryDocs = docs.filter(doc => doc.category.title === category.title);
                return categoryDocs.length > 0 ? (
                <SidebarGroup key={category.title}>
                    <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        
                    {categoryDocs.map((doc) => (
                        <SidebarMenuButton asChild tooltip={doc.title} 
                        className={cn("cursor-pointer",pathname===doc.slug && "bg-sidebar-accent")}
                        onClick={() => router.push("/landing/doc/" + doc.slug as string)}>

                                <span>{doc.title}</span>

                        </SidebarMenuButton>
                    ))}
                    </SidebarMenu>
                </SidebarGroup>
                ) : null; // Don't render category if it has no docs
            })
            }
        </SidebarContent>
    </Sidebar>
  );
};

export default DocSidebar;
