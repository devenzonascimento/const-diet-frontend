import { Skeleton } from "@/components/ui/skeleton"

export const RoutinesItemsLoading = () => {
  return (
    <ul className="w-full flex flex-col gap-6 overflow-auto">
      {Array.from({ length: 3 }).map((_, index) =>
        <li
          key={index}
          className="min-h-42 w-full flex border-4 border-sky-800 rounded-xl shadow-xl"
        >
          <div className="w-full flex-1 flex flex-col gap-2 p-2">
            <header className="flex items-center py-1 gap-1">
              <Skeleton className="w-56 p-2 bg-sky-700 rounded-sm" />
            </header>
            <main className="flex flex-col gap-4">
              <section className="flex justify-between gap-4">
                <Skeleton className="flex-1 h-16 p-2 bg-sky-700 rounded-xl" />
                <Skeleton className="flex-1 h-16 p-2 bg-sky-700 rounded-xl" />
              </section>
              <ul className="flex items-center justify-around gap-1 ">
                <Skeleton className="min-w-12 h-6 p-2 bg-sky-700 rounded-lg" />
                <Skeleton className="min-w-12 h-6 p-2 bg-sky-700 rounded-lg" />
                <Skeleton className="min-w-12 h-6 p-2 bg-sky-700 rounded-lg" />
                <Skeleton className="min-w-12 h-6 p-2 bg-sky-700 rounded-lg" />
                <Skeleton className="min-w-12 h-6 p-2 bg-sky-700 rounded-lg" />
              </ul>
            </main>
          </div>
        </li>
      )}
    </ul>
  )
}
