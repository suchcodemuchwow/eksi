"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const LandingNavbar = () => {
  return (
    <div className={"sticky inset-x-0 top-0 z-30 w-full transition-all"}>
      <div className={"w-full bg-gradient-to-b from-gray-200 to-transparent px-2.5 lg:px-20"}>
        <div className={"grid h-14 grid-cols-9 items-center justify-between"}>
          <div className={"col-span-2 flex justify-start"}>
            <Logo />
          </div>
          <div className={"col-span-5 flex justify-center"}>
            Free yearly subscription <strong className={"ml-2"}>12 spots left</strong>
          </div>
          <div className={"col-span-2 flex justify-end"}>
            <Link href={"/auth/signin"}>
              <Button size={"sm"}>Join</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
