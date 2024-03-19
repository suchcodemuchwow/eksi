import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const authors = [
  {
    name: "Aleksey",
    href: "https://www.linkedin.com",
  },
  {
    name: "Batu",
    href: "https://www.linkedin.com/in/cavit-b-g/",
  },
];

const AuthorLink = ({ href, name }: { href: string; name: string }) => (
  <Button asChild variant={"link"} className={"px-1 font-bold text-slate-950"}>
    <Link href={href}>{name}</Link>
  </Button>
);

export const LandingFooter = () => {
  return (
    <footer className={"flex w-full items-end justify-center px-2.5 pb-2 pt-12 text-slate-800 lg:px-20"}>
      <p className={"text-center"}>
        Built with<span className={"mx-1"}>❤️</span> by <AuthorLink href={authors[0].href} name={authors[0].name} />
        {" and "}
        <AuthorLink href={authors[1].href} name={authors[1].name} />
      </p>
    </footer>
  );
};
