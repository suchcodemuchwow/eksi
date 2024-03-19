"use client";

import Fuse, { IFuseOptions } from "fuse.js";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { fetchSkills } from "@/lib/database/skill";
import { Tables } from "@/types/supabase";

export type SkillDbSchemaWithOptionals = Omit<Tables<"skill">, "userId" | "createdAt" | "updatedAt" | "skill_search">;

type SkillFormProps = {
  skills: SkillDbSchemaWithOptionals[];
  onSave: (options: { added: string[]; removed: string[] }) => void;
};

export const skillToOption = (skill: SkillDbSchemaWithOptionals): Option => ({
  label: skill.label,
  value: skill.name,
  group: skill.category,
  id: skill.id,
});

export const optionsToSkills = (options: Option[]): SkillDbSchemaWithOptionals[] =>
  options.map((option) => ({
    label: option.label,
    name: option.value,
    category: option.group as string,
    id: option.id as string,
  }));

const fuzzyOptions: IFuseOptions<SkillDbSchemaWithOptionals> = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "label", weight: 0.5 },
    { name: "category", weight: 0.2 },
  ],
  isCaseSensitive: false,
  includeScore: true,
  threshold: 0.3,
};

export function SkillForm(props: SkillFormProps) {
  const [fuse, setFuse] = useState<Fuse<SkillDbSchemaWithOptionals> | null>(null);
  const [selectedSkills, setSelectedSkills] = useState(props.skills.map(skillToOption));

  useEffect(() => {
    fetchSkills().then((skills) => {
      if (!skills) return;
      setFuse(new Fuse(skills, fuzzyOptions));
    });
    return () => setFuse(null);
  }, [fuzzyOptions]);

  const onSearch = async (inputValue: string) => {
    const response = fuse
      ?.search(inputValue)
      .map((c) => ({ ...c.item }))
      .map(skillToOption);
    return response || [];
  };

  const onSave = () => {
    props.onSave({
      added: selectedSkills
        .filter((selected) => !props.skills.find((skill) => skill.id === selected.id))
        .map((option) => option.id) as string[],
      removed: props.skills.filter((skill) => !selectedSkills.find((selected) => selected.id === skill.id)).map((skill) => skill.id),
    });
  };

  return (
    <>
      <Card className={"border-0 shadow-none"}>
        <CardContent className={"space-y-4 px-0"}>
          <MultipleSelector
            delay={500}
            onSearch={onSearch}
            onChange={(allOptions) => setSelectedSkills(allOptions)}
            value={selectedSkills}
            groupBy={"group"}
            placeholder={"Start typing to search for skills"}
            emptyIndicator={<p>no result found.</p>}
          />
        </CardContent>
        <CardFooter className={"flex justify-end px-0"}>
          <Button onClick={onSave}>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
