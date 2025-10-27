import { Minus, Square, X } from "lucide-react";
import React from "react";

interface ITitlebarBTN {
  children?: React.ReactNode;
  disabled?: boolean;
  isCloseBTN?: boolean;
  onClick?: () => void;
}
const TitlebarBTN: React.FC<ITitlebarBTN> = ({
  children,
  disabled,
  isCloseBTN = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition-all duration-100 ease-in-out ${
        isCloseBTN ? "hover:bg-red-600/70" : ""
      } hover:opacity-50 opacity-100 size-6 flex justify-center items-center rounded`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Titlebar = () => {
  const onMinimizeClick = () => window.electron?.windowMinimize();
  const onMaximizeClick = () => window.electron?.windowMaximize();
  const onCloseClick = () => window.electron?.windowClose();

  return (
    <div className="w-full h-9 drag flex justify-between items-center px-2.5">
      <div className="flex justify-start items-center gap-2">
        <img src="./icon.png" className="size-4" />
        <p className="text-xs opacity-60">Router TS</p>
      </div>
      <div className="no-drag flex justify-end items-center gap-3.5">
        <TitlebarBTN onClick={onMinimizeClick}>
          <Minus size={15} strokeWidth={1} />
        </TitlebarBTN>
        <TitlebarBTN onClick={onMaximizeClick}>
          <Square size={15} strokeWidth={1} />
        </TitlebarBTN>
        <TitlebarBTN isCloseBTN onClick={onCloseClick}>
          <X size={16} strokeWidth={1.5} />
        </TitlebarBTN>
      </div>
    </div>
  );
};

export default Titlebar;
