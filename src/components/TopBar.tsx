// import BrowserControllerBar from "./BrowserControllerBar";
import Titlebar from "./Titlebar";

const TopBar = () => {
  return (
    <div className="w-full bg-[#1b1b1b] h-fit flex justify-between items-center flex-col">
      <Titlebar />
      {/* <BrowserControllerBar /> */}
    </div>
  );
};

export default TopBar;
