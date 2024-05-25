import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface InputSearchProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch = ({ inputValue, setInputValue }: InputSearchProps) => {
  return (
    <fieldset className="relative w-full shadow-lg bg-transparent rounded-3xl">
      <Input
        type="text"
        placeholder="Buscar alimento"
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        className="w-full py-1 px-3 pr-12 text-md bg-white rounded-3xl border-2 border-sky-700"
      />
      <Button className=" absolute top-0 right-0 bg-sky-700 p-2 rounded-full hover:bg-sky-500">
        <Search className="text-white" size={24} />
      </Button>
    </fieldset>
  );
};

export default InputSearch;
