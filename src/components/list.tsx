import { cn } from "@/lib/utils";

interface ListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T, index: number }) => React.ReactNode;
  className?: string;
}

export const List = <T,>({ data, renderItem, className }: ListProps<T>) => {
  return (
    <ul className={cn("w-full flex flex-col gap-6 overflow-auto", className)}>
      {data.map((item, index) => (
        renderItem({ item, index })
      ))}
    </ul>
  );
};