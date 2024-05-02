import { Search } from "lucide-react";

const InputSearch = () => {
  return (
    <fieldset className="w-full flex justify-between items-center gap-2 bg-white rounded-3xl overflow-hidden">
      <input className="w-full py-1 pl-3 bg-transparent" type="text" placeholder="Buscar alimento" />
      <button className="flex justify-center items-center bg-sky-700 p-2 rounded-full">
        <Search className="text-white" size={24}/>
      </button>
    </fieldset>
  );
};

export default InputSearch;
