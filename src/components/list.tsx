interface ListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactNode;
}

export const List = <T,>({ data, renderItem }: ListProps<T>) => {
  return (
    <ul className="w-full flex flex-col gap-6 overflow-auto">
      {data.map((item) => (
        renderItem({ item })
      ))}
    </ul>
  );
};