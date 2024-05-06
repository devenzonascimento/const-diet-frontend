interface MacronutrientsBadgeProps {
  nutrients: {
    carbo: number;
    protein: number;
    fat: number;
  };
}

const MacronutrientsBadge = ({ nutrients }: MacronutrientsBadgeProps) => {
  const { carbo, protein, fat } = nutrients;

  return (
    <div className="w-fit flex justify-center gap-3">
      <p
        className={`px-1 block font-medium text-blue-700 bg-blue-200 rounded-lg`}
      >
        {`C: ${carbo}g`}
      </p>
      <p
        className={`px-1 block font-medium text-cyan-700 bg-cyan-200 rounded-lg`}
      >
        {`P: ${protein}g`}
      </p>
      <p
        className={`px-1 block font-medium text-sky-700 bg-sky-200 rounded-lg`}
      >
        {`G: ${fat}g`}
      </p>
    </div>
  );
};

export default MacronutrientsBadge;
