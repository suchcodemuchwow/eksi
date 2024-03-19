import { PencilIcon, XIcon } from "lucide-react";
import React from "react";

import { EducationDbSchemaWithOptionals } from "@/components/forms/education-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EducationCardProps = {
  education: EducationDbSchemaWithOptionals;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

export function EducationCard(props: EducationCardProps) {
  const { education, onEdit, onRemove } = props;
  const { id, institution, degree, field, startDate, endDate, notes } = education;

  return (
    <Card className={"group"}>
      <CardHeader className={"flex flex-row justify-between"}>
        <div className={"space-y-2"}>
          <CardTitle className={"flex flex-col text-lg"}>
            <div className={"font-semibold"}>{institution}</div>
            <div className={"flex flex-row gap-x-2 text-sm font-normal"}>
              <div>{field},</div>
              <div>{degree}</div>
            </div>
          </CardTitle>
          <CardDescription>
            {startDate ? new Date(startDate).toLocaleDateString("en-CA") : ""} -{" "}
            {endDate ? new Date(endDate).toLocaleDateString("en-CA") : ""}
          </CardDescription>
        </div>
        <div className={"flex space-x-2"}>
          <Button type={"button"} variant={"icon"} size={"icon"} className={"hidden group-hover:flex"} onClick={() => onEdit(id)}>
            <PencilIcon size={20} />
          </Button>
          <Button type={"button"} variant={"icon"} size={"icon"} className={"hidden group-hover:flex"} onClick={() => onRemove(id)}>
            <XIcon size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"px-8"}>
        <ul className={"list-disc space-y-2"}>{notes?.map((note) => <li key={note}>{note}</li>)}</ul>
      </CardContent>
    </Card>
  );
}
