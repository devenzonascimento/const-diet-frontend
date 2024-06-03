import { Skeleton } from "@/components/ui/skeleton"

export const MealsListLoading = () => {

  const loadingElemntsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <ul className="w-full flex flex-col gap-6">
      {loadingElemntsArray?.map((data) => (
        <Skeleton key={data} className="w-full h-16 flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"></Skeleton>
      ))}
    </ul>
  )
}