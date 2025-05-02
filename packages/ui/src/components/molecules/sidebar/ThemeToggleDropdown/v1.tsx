import { Button } from "../../../atoms/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
  }, [theme]);

  return (
    <DropdownMenu>  <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ghost">
          {theme === "dark" ? (
            <Moon className="h-[1.1rem] w-[1.2rem] transition-all" />
          ) : (
            <Sun className="h-[1.1rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}