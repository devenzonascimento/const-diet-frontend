import { Progress } from "./ui/progress";

interface ProgressBarProps {
  length: number;
  completed: number;
}

export const ProgressBar = ({ length, completed }: ProgressBarProps) => {

  const value = completed / length * 100

  return (
    <div className="w-full py-1 flex flex-col justify-center items-center gap-1 bg-white border-2 border-sky-800 rounded-xl">
      <h2 className="font-semibold text-xl text-sky-900">Refeições concluídas</h2>
      <div className="w-full flex justify-between items-center gap-4 px-3 font-semibold text-lg text-sky-950">
        <p>{completed}</p>
        <Progress value={value} className="bg-gray-200" />
        <p>{length}</p>
      </div>
    </div>
  );
};
