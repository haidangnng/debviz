import { cn } from "@/lib/utils";

export default function PageTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-fit text-nowrap animate-in fade-in slide-in-from-top-16 duration-700 mr-4",
        className,
      )}
    >
      <h1 className={"text-bold text-5xl"}>{title}</h1>
    </div>
  );
}
