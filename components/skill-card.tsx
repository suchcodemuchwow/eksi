import React from "react";

import { SkillDbSchemaWithOptionals } from "@/components/forms/skill-form";
import { Card, CardHeader } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils";

type SkillCardProps = {
  skills: SkillDbSchemaWithOptionals[];
};

export function SkillCard(props: SkillCardProps) {
  const categorizedSkills = Object.groupBy(props.skills, ({ category }) => category);

  return (
    <Card className={"group"}>
      <CardHeader>
        {Object.keys(categorizedSkills).map((category) => {
          return (
            <div key={category} className={"flex w-full"}>
              <span className={"mr-2 font-semibold"}>{capitalizeWords(category)}: </span>
              {categorizedSkills[category]?.map((skill, i) => {
                const isLast = i === categorizedSkills[category]!.length - 1;
                return <p key={skill.id} className={!isLast ? "mr-1" : ""}>{`${skill.label}${isLast ? "" : ","}`}</p>;
              })}
            </div>
          );
        })}
      </CardHeader>
    </Card>
  );
}
