import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className={"flex h-screen flex-col items-center justify-center"}>
      <div className={"flex h-80 w-80"}>Something went wrong. {label}</div>
      <p className={"text-center text-base text-muted-foreground"}>{label}</p>
    </div>
  );
};
