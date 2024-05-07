import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputSearch = () => {
  return (
    <fieldset className="relative w-full shadow-lg">
      <Input className="w-full py-1 px-3 pr-12 text-md bg-white rounded-3xl border-2 border-sky-700" type="text" placeholder="Buscar alimento"/>
      <Button className=" absolute top-0 right-0 bg-sky-700 p-2 rounded-full hover:bg-sky-500">
        <Search className="text-white" size={24}/>
      </Button>
    </fieldset>
  );
};

export default InputSearch;
