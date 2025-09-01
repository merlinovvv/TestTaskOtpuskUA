import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
} from "react";
import { ChevronDown, ChevronUp, LoaderCircle, X } from "lucide-react";

type DropdownProps<T> = InputHTMLAttributes<HTMLInputElement> & {
  options: T[];
  optionTemplate: (item: T) => ReactNode;
  onSelect: (item: T | null) => void;
  onOpen: () => void;
  onClose: () => void;
  placeholder?: string;
  onSearch?: (v: string | number) => void;
  loading?: boolean;
};

export default function Dropdown<T>({
  options,
  optionTemplate,
  onSelect,
  onOpen,
  onClose,
  placeholder = "Выберите...",
  loading = false,
  ...props
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: T) => {
    setSelected(item);
    onSelect(item);
    setIsOpen(false); // закрываем список
  };

  const handleClear = () => {
    setSelected(null);
    onSelect(null);
    setIsOpen(true); // оставляем список открытым для нового выбора
  };

  useEffect(() => (isOpen ? onOpen() : onClose()), [isOpen, onClose, onOpen]);

  return (
    <div className="flex flex-col gap-1.5 relative w-full">
      <div className="relative">
        <input
          {...props}
          onClick={toggleOpen}
          value={selected ? "" : props.value}
          placeholder={selected ? "" : placeholder}
          className="border border-gray-500 rounded-md py-1 pl-3 pr-8 bg-white w-full cursor-pointer"
          readOnly={!!selected} // если выбрана опция — запрещаем ввод
        />
        {selected ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-800 truncate w-[80%]">
            <div className="flex items-center gap-2 p-1 w-full rounded-sm">
              {optionTemplate(selected)}
            </div>
          </div>
        ) : null}

        {loading ? (
          <LoaderCircle
            size={16}
            className="absolute animate-spin -translate-y-1/2 top-1/2 right-2"
          />
        ) : selected ? (
          <X
            size={16}
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-red-500"
          />
        ) : isOpen ? (
          <ChevronUp
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          />
        ) : (
          <ChevronDown
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          />
        )}
      </div>

      {isOpen && options.length > 0 && (
        <div className="top-full mt-1 border border-gray-500 rounded-md bg-white w-full flex-col flex gap-1 p-2 max-h-[166px] overflow-y-auto z-10">
          {options.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-2 p-1 w-full hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              {optionTemplate(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
