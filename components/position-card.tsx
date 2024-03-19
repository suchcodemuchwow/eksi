import { PencilIcon, XIcon } from "lucide-react";
import React from "react";

import { EmploymentDbSchemaWithOptionals } from "@/components/forms/employment-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PositionCardProps = {
  position: EmploymentDbSchemaWithOptionals;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

export function PositionCard(props: PositionCardProps) {
  return (
    <Card className={"group"}>
      <CardHeader className={"flex flex-row justify-between"}>
        <div className={"space-y-2"}>
          <CardTitle className={"flex items-center text-lg"}>
            <div className={"font-semibold"}>{props.position.company},</div>
            <div className={"ml-2 font-normal"}>{props.position.title}</div>
          </CardTitle>
          <CardDescription>
            {props.position.startDate?.toLocaleUpperCase("en-CA")} - {props.position.endDate?.toLocaleUpperCase("en-CA")}
          </CardDescription>
        </div>
        <div className={"flex space-x-2"}>
          <Button
            type={"button"}
            variant={"icon"}
            size={"icon"}
            className={"hidden group-hover:flex"}
            onClick={() => props.onEdit(props.position.id)}
          >
            <PencilIcon size={20} />
          </Button>
          <Button
            type={"button"}
            variant={"icon"}
            size={"icon"}
            className={"hidden group-hover:flex"}
            onClick={() => props.onRemove(props.position.id)}
          >
            <XIcon size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"px-8"}>
        <ul className={"list-disc space-y-2"}>{props.position.notes?.map((note) => <li key={note}>{note}</li>)}</ul>
      </CardContent>
    </Card>
  );
}
