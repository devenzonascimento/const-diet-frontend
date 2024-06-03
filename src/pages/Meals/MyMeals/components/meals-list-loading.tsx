import { Skeleton } from "@/components/ui/skeleton"

export const MealsListLoading = () => {

  const loadingElemntsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <ul className="w-full flex flex-col gap-6">
      {loadingElemntsArray.map((data) => (
        <MealItemLoading key={data} />
      ))}
    </ul>
  )
}

const MealItemLoading = () => {
  return (
    <Skeleton
      className="w-full h-16 flex items-center gap-2 p-1 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <Skeleton className="w-6 h-6 bg-sky-700"/>
      <Skeleton className="w-56 h-4 bg-sky-700"/>
      <Skeleton className="w-14 h-6 ml-auto bg-sky-700"/>
    </Skeleton>
  )
}