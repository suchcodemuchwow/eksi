import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo(props: { isCollapsed?: boolean }) {
  return (
    <Link href={"/"}>
      <div className={"flex h-[56px] items-center justify-center"}>
        <h1 className={"font-bold"}>
          <span className={cn("text-xl", !props.isCollapsed && "mr-1")}>🧠</span>
          {`${!props.isCollapsed ? "Genius" : ""}`}
        </h1>
      </div>
    </Link>
  );
}
