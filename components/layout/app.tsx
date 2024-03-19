"use client";
import React, { useState } from "react";

import { Logo } from "@/components/logo";
import { Nav } from "@/components/nav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { practiceNavLinks, preparationNavLinks, yourBackgroundNavLinks } from "../../app/data";

interface AppLayoutProps {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

// Constants for cookie keys
const LAYOUT_COOKIE_KEY = "react-resizable-panels:layout";
const COLLAPSED_COOKIE_KEY = "react-resizable-panels:collapsed";

// Minimum and maximum sizes for resizable panels
const MIN_PANEL_SIZE = 15;
const MAX_PANEL_SIZE = 24;

// Animation duration for panel collapse
const COLLAPSE_ANIMATION_DURATION = 300;

const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
};

export const AppLayout: React.FC<AppLayoutProps> = (props: AppLayoutProps) => {
  const { defaultLayout = [265, 440, 655], defaultCollapsed = false, navCollapsedSize } = props;
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Handler for layout change
  const handleLayoutChange = (sizes: number[]) => {
    setCookie(LAYOUT_COOKIE_KEY, JSON.stringify(sizes));
  };

  // Handler for panel resizing
  const handleResize = (size: number) => {
    setIsCollapsed(size < MIN_PANEL_SIZE);
    setCookie(COLLAPSED_COOKIE_KEY, JSON.stringify(size < MIN_PANEL_SIZE));
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction={"horizontal"}
        onLayout={handleLayoutChange}
        className={"h-full max-h-screen items-stretch overflow-x-hidden"}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={MIN_PANEL_SIZE}
          maxSize={MAX_PANEL_SIZE}
          onResize={handleResize}
          className={cn(
            "hidden md:block",
            isCollapsed && `min-w-[${MIN_PANEL_SIZE}px] transition-all duration-${COLLAPSE_ANIMATION_DURATION} ease-in-out`,
          )}
        >
          <div className={cn("flex h-[56px] items-center", isCollapsed ? "h-[56px] justify-center" : "px-5")}>
            <Logo isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={yourBackgroundNavLinks} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={preparationNavLinks} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={practiceNavLinks} />
        </ResizablePanel>
        <div className={"hidden md:block"}>
          <ResizableHandle withHandle />
        </div>
        <ResizablePanel defaultSize={defaultLayout[1]} style={{ overflow: "scroll" }} className={"p-4 pt-2"}>
          {props.children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
