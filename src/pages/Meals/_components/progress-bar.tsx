import { Progress } from "@/components/ui/progress";

export const ProgressBar = () => {
  return (
    <div className=" h-20 w-full flex flex-col justify-center items-center gap-1 px-6 bg-white border-4 border-sky-700 rounded-xl">
      <p className="font-semibold text-xl text-sky-600">Refeições concluídas</p>
      <div className="w-full flex justify-between items-center gap-4">
        <p className="font-semibold text-lg text-sky-600">2</p>
        <Progress value={40} className="bg-gray-300" />
        <p className="font-semibold text-lg text-sky-600">5</p>
      </div>
    </div>
  );
};