import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  className?: string
}

export const StatsCard = ({ title, value, className }: StatsCardProps) => {
  return (
    <div
      className={cn("flex flex-col items-center rounded-xl font-semibold text-center", className)}
    >
      <span className="w-full p-1 text-white bg-sky-800 rounded-t-xl">
        {title}
      </span>
      <span className="w-full p-1 text-sky-950 border-2 border-sky-800 rounded-b-xl">
        {value}
      </span>
    </div>
  )
}