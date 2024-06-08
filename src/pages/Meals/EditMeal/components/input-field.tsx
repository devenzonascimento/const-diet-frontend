import { useMealContext } from "@/context/meal-context"

export const InputField = () => {

  const { mealName, handleInputMealName } = useMealContext()

  return (
    <fieldset className="w-full p-1 border-b-4 border-sky-700">
      <input
        type="text"
        placeholder="Nome da refeição"
        value={mealName}
        maxLength={30}
        onChange={({ target }) => handleInputMealName(target.value)}
        className=" w-full text-lg font-semibold text-sky-900 text-center bg-transparent"
      />
    </fieldset>
  )
}