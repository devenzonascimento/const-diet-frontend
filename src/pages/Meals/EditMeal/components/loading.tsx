import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export const Loading = () => {
  return (
    <div className="h-screen bg-slate-100 px-4 ">
      <Header />
      <EditBox />
    </div>
  )
}

const Header = () => {
  return (
    <header className="relative flex justify-center items-center py-4">
      <ArrowLeft size={32} className="absolute top-4 left-0" />
      <h1 className="text-xl font-semibold">Editar refeição</h1>
    </header>
  )
}

const EditBox = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-8 pb-6">
      <div
        className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md"
      >
        <InputField />
        <List />
      </div>
    </main>
  )
}

const InputField = () => {
  return <div className="w-full h-10 border-b-4 rounded-none border-sky-700" />
}

const List = () => {

  const arr = [0, 1, 2]

  return (
    <ul className="w-full h-full overflow-auto flex flex-col gap-2 p-2">
      {arr.map((key) => (
        <ListItem key={key} />
      ))
      }
      <Skeleton
        className="w-full h-10 mt-4 bg-slate-50 border-4 border-sky-700"
      />
    </ul>
  )
}


const ListItem = () => {
  return (
    <Skeleton className="w-full flex justify-between items-center pb-2 border-b border-gray-300">

      <Skeleton className="w-64 h-4 rounded-none bg-sky-700" />

      <Skeleton className=" w-10 h-10 bg-red-600" />

    </Skeleton>
  )
}