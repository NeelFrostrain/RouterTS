import { ArrowLeft, ArrowRight, LogOut, RefreshCw } from "lucide-react";

interface IBCBTN {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
const BCBTN: React.FC<IBCBTN> = ({
  children,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition-all duration-100 ease-in-out hover:opacity-50 opacity-100 size-6 flex justify-center items-center rounded ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const BrowserControllerBar = () => {
  const onGoBackClick = () => window.electron?.bcGoBackward?.();
  const onGoForwardClick = () => window.electron?.bcGoForward?.();
  const onGoReloadClick = () => window.electron?.bcGoReload?.();
  return (
    <div className="w-full px-2 flex justify-between items-center py-1.5 pb-2.5">
      <div className="flex justify-start items-center gap-3.5">
        <BCBTN onClick={onGoBackClick}>
          <ArrowLeft size={16} strokeWidth={2} />
        </BCBTN>
        <BCBTN onClick={onGoForwardClick}>
          <ArrowRight size={16} strokeWidth={2} />
        </BCBTN>
        <BCBTN className="mx-1 mr-2" onClick={onGoReloadClick}>
          <RefreshCw size={15} strokeWidth={2} />
        </BCBTN>
      </div>
      <div className="flex-1 h-[30px] mx-3">
        <input
          type="text"
          className="w-full h-full bg-black/25 rounded-md border border-white/35 outline-none px-2 text-sm text-white/80 transition-all ease-in-out duration-150"
        />
      </div>
      <div>
        <BCBTN className="ml-1">
          <LogOut size={15} strokeWidth={2} />
        </BCBTN>
      </div>
    </div>
  );
};

export default BrowserControllerBar;
