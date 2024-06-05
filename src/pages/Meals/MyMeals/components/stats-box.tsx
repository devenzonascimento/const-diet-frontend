interface StatsBoxProps {
  title: string
  value: number
}

export const StatsBox = ({ title, value }: StatsBoxProps) => {
  return (
    <div className="flex flex-col items-center rounded-t-lg border-4 border-sky-700" >
      <span className=" w-full text-center border-b-4 border-sky-700">{title}</span>
      <span className="p-1">{value.toFixed(2)}</span>
    </div>
  )
}