import { Header } from "@/components/header"
import { List } from "@/components/list"

export const DailyRoutinePage = () => {
  return (
    <>
      <Header
        title="Plano de hoje"
        leftButtonNavigateTo="/"        
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <List
          data={[]}
          renderItem={({ item }) => <p key={item}>{item}</p>}
        />
      </main>
    </>
  )
}