"use client"

import { ChevronRight, Columns2Icon, Monitor, Moon, Sun, ThermometerSunIcon } from "lucide-react"

import { Button } from "../../../atoms/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown"

export function Theme({theme,setTheme}:any) {


  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 w-full">
            <Columns2Icon/>
            Theme
          </div>
          <ChevronRight size={20}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[9999999] ">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("light")}>
          <Sun size={20}/>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
          <Moon size={20}/>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("system")}>
          <Monitor size={20}/>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
