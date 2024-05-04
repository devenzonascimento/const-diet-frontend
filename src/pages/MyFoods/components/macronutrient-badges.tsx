interface MacronutrientsBadgeProps {
  nutrients: {
    carbo: object
    protein: object
    fat: object
  }
}



const MacronutrientsBadge = ({nutrients}: MacronutrientsBadgeProps) => {

const {carbo, protein, fat} = nutrients

  return (
    <>
    <p className={`px-1 block font-medium text-blue-600 bg-blue-100 rounded-lg`}>
      {`C: ${carbo}g`}
    </p>
    <p className={`px-1 block font-medium text-red-600 bg-red-100 rounded-lg`}>
      {`P: ${protein}g`}
    </p>
    <p className={`px-1 block font-medium text-orange-600 bg-orange-100 rounded-lg`}>
      {`G: ${fat}g`}
    </p>
    </>
  );
};

export default MacronutrientsBadge;
