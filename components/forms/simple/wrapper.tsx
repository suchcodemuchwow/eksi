import React from "react";
import { UseFieldArrayRemove } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WrapperCard(props: {
  remove: UseFieldArrayRemove;
  index: number;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const { index, remove, className } = props;

  return (
    <Card className={cn(`group relative pt-4`, className)}>
      <CardContent className={cn(`"grid gap-4" grid-cols-2`, props.innerClassName)}>{props.children}</CardContent>
      <Button className={`absolute right-2 top-2 hidden h-6 w-6 p-0 group-hover:flex`} onClick={() => remove(index)}>
        X
      </Button>
    </Card>
  );
}
