import { PencilIcon } from "lucide-react";
import React from "react";

import { ProfileDbSchemaWithOptionals } from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BasicInfoCardProps = {
  profile: ProfileDbSchemaWithOptionals;
  onEdit: () => void;
};

export function ProfileCard(props: BasicInfoCardProps) {
  const { profile, onEdit } = props;

  return (
    <Card className={"group"}>
      <CardHeader className={"flex flex-row justify-between"}>
        <div className={"space-y-2"}>
          <CardTitle className={"flex items-center text-lg"}>
            <div className={"font-semibold"}>
              {profile.firstname} {profile.lastname}
            </div>
            <div className={"ml-2 font-normal"}>{profile.phone}</div>
          </CardTitle>
          <CardDescription>
            {/*            {basicInfo.startDate?.toLocaleUpperCase("en-CA")} -{" "}
            {basicInfo.endDate?.toLocaleUpperCase("en-CA")}*/}
          </CardDescription>
        </div>
        <div className={"flex space-x-2"}>
          <Button type={"button"} variant={"icon"} size={"icon"} className={"hidden group-hover:flex"} onClick={onEdit}>
            <PencilIcon size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"px-8"}>
        <ul className={"list-disc space-y-2"}>{profile.links?.map((link) => <li key={link}>{link}</li>)}</ul>
      </CardContent>
    </Card>
  );
}
