import Image from "next/image";
import React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const data = [
  {
    videoSrc: "https://www.youtube.com/embed/-yIsQPp31L0?si=un4O3w9pX4Mp4Tnk",
    title: "🐢 Turn this...",
    description:
      "Online courses are inefficient because you have to watch the whole course even if you are only missing specific skills. And it's almost impossible to find which one covers which topics.",
  },
  {
    videoSrc:
      "https://www.youtube.com/embed/-yIsQPp31L0?si=2YV0oEFu8TH_eq84&amp;clip=Ugkx6y0807DwkeBF8Zi8-vS4bPtIvTDukJBu&amp;clipt=EKngjQEYo6ORAQ",
    title: "🏎️ into this !!!",
    description:
      "We will bring all the content from courses that's relevant to you and create a custom curriculum for you to learn only what you need and generate practice materials on topics you are missing.",
  },
];

type YouTubeEmbedProps = {
  videoSrc: string;
  title: string;
  description: string;
};

function YouTubeEmbed(props: YouTubeEmbedProps) {
  const { videoSrc, title, description } = props;
  return (
    <div className={"col-span-12 px-2 py-12 sm:px-12 lg:px-36 xl:col-span-5 xl:px-4 2xl:py-24"}>
      <div className={"flex flex-col items-center justify-center "}>
        <div className={"mb-4 w-full"}>
          <h1 className={"font-display text-5xl font-extrabold tracking-tight"}>{title}</h1>
        </div>
        <iframe
          className={"mt-5 h-64 w-full rounded-lg shadow-md sm:h-80 md:h-[480px] lg:h-[520px] xl:h-[320px] 2xl:h-[360px]"}
          src={videoSrc}
          title={title}
          allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}
        ></iframe>
        <div className={"px-2"}>
          <p className={"mt-5 text-justify text-lg font-medium text-slate-700"}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export function LandingYoutube() {
  return (
    <div className={"mx-auto grid grid-cols-12 py-32 md:mt-0 2xl:p-12"}>
      <YouTubeEmbed {...data[0]} />
      <div className={"col-span-12 px-32 py-12 sm:px-64 lg:px-96 xl:col-span-2 xl:px-12 2xl:p-12"}>
        <AspectRatio ratio={1}>
          <Image fill src={"/wand.gif"} alt={"Picture of the author"} className={"w-full rounded-md object-contain"} />
        </AspectRatio>
      </div>
      <YouTubeEmbed {...data[1]} />
    </div>
  );
}
