"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";

interface NavProps {
  isCollapsed?: boolean;
  links: NavItem[];
  activeLink?: string;
}

const activeStyle = "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white";

function SmallNavLink(props: { link: NavItem; isActive: boolean }) {
  const { link, isActive } = props;

  return (
    <Link href={link.href} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9", isActive && activeStyle)}>
      <link.icon className={"h-4 w-4"} />
      <span className={"sr-only"}>{link.title}</span>
    </Link>
  );
}

function BigNavLink(props: { link: NavItem; isActive: boolean }) {
  const { link, isActive } = props;

  return (
    <Link
      href={link.href}
      className={cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), isActive && activeStyle, "justify-start")}
    >
      <div className={"flex"}>
        <link.icon className={"mr-2 h-4 w-4"} />
        {link.title}
      </div>
      {link.label && <span className={cn("ml-auto", isActive && "text-background dark:text-white")}>{link.label}</span>}
    </Link>
  );
}

export function Nav({ links, isCollapsed = false }: NavProps) {
  const pathname = usePathname();
  return (
    <div data-collapsed={isCollapsed} className={"group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"}>
      <nav className={"grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"}>
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <SmallNavLink link={link} isActive={pathname === link.href} />
              </TooltipTrigger>
              <TooltipContent side={"right"} className={"flex items-center gap-4"}>
                {link.title}
                {link.label && <span className={"ml-auto text-muted-foreground"}>{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <BigNavLink key={link.href} link={link} isActive={pathname === link.href} />
          ),
        )}
      </nav>
    </div>
  );
}
