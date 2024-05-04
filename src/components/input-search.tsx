import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputSearch = () => {
  return (
    <fieldset className="w-full flex justify-between items-center gap-2 bg-white rounded-3xl shadow-lg overflow-hidden">
      <Input className="w-full py-1 pl-3 text-md text-body bg-transparent" type="text" placeholder="Buscar alimento"/>
      <Button className="flex justify-center items-center bg-sky-700 p-2 rounded-full hover:bg-sky-500">
        <Search className="text-white" size={24}/>
      </Button>
    </fieldset>
  );
};

export default InputSearch;
