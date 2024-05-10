import { cn } from "@/src/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface EnvironmentInfoProps extends ComponentPropsWithoutRef<"div"> {
  version: string;
}

export const EnvironmentInfo: FC<EnvironmentInfoProps> = (props) => {
  const { version, className, ...rest } = props;

  return (
    <div {...rest} className={cn("", className)}>
      <p className="text-xs">v{version}</p>
    </div>
  );
};
