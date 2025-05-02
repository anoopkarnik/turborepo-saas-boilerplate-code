import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FooterProps, FooterSectionProps } from "@repo/ts-types/landing-page/footer";
import { NavbarSectionProps } from "@repo/ts-types/landing-page/navbar";

const Footer = ({footerSection}:{footerSection:FooterSectionProps}) => {
    const [footerTypes, setFooterTypes] = useState<any>([]);
    const {theme} = useTheme();

    useEffect(()=>{
        const types = footerSection.footerList?.map(footer=>footer.type);
        setFooterTypes(new Set(types));
    },[theme,footerSection.footerList])

    
  return (
    <div id="footer" className="w-full container  ">
        <hr className="w-full mx-auto" />
        <div className="w-full flex flex-wrap items-start justify-around gap-4 my-10 ">
            <section className="hidden lg:flex w-1/2 font-cyberdyne">
                <a
                    rel="noreferrer noopener"
                    href="/"
                    className="ml-2 flex items-center gap-2"
                >
                    {theme === "dark" ?
                    <Image src={footerSection.darkLogo} alt={footerSection.title} width={40} height={40} /> : 
                    <Image src={footerSection.logo} alt={footerSection.title} width={40} height={40} />}
                    <div className="hidden lg:flex flex-col items-start text-md leading-none bg-gradient-to-r from-white to-white bg-clip-text text-transparent ">
                        <div>{footerSection?.title?.split(' ').slice(0, Math.ceil(footerSection?.title?.split(' ').length / 2)).join(" ")}</div>
                        <div>{footerSection?.title?.split(' ').slice(Math.ceil(footerSection?.title?.split(' ').length / 2)).join(" ")}</div>
                    </div>
                </a>
            </section>
            {[...footerTypes]?.map((type:string)=>(
                <div key={type} className="flex flex-col gap-2">
                    <h3 className="text-paragraph">{type}</h3>
                    {footerSection.footerList?.filter(footer => footer.type===type)?.map((item)=>(
                        <div key={item.label}>
                            <a
                                rel="noreferrer noopener"
                                href={item.href}
                                className="opacity-60 hover:opacity-100 text-description"
                            >
                            {item.label}
                            </a>
                        </div>
                    ))}
                </div>
            ))}
        </div>


        <section className="container pb-14 text-center text-paragraph">
            <h3>
            &copy; 2024 Made by {" "}
            <a
                rel="noreferrer noopener"
                target="_blank"
                href={footerSection.creatorLink}
                className="text-primary transition-all border-primary hover:border-b-2"
            >
                {footerSection.creator}
            </a>
            </h3>
        </section>
    </div>
  );
};

export default Footer;