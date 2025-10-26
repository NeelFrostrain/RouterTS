import { useEffect, useRef } from "react";
import TopBar from "./components/TopBar";

const App = () => {
  const routerContainerRef = useRef<HTMLDivElement | null>(null);

  const sendResize = () => {
    if (routerContainerRef.current) {
      const rect = routerContainerRef.current.getBoundingClientRect();
      window.electron?.sendResize("send-resize", {
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
        x: Math.floor(rect.x),
        y: Math.floor(rect.y),
      });
    }
  };

  useEffect(() => {
    if (!routerContainerRef.current) return;
    sendResize();

    const routerObserver = new ResizeObserver(() => {
      sendResize();
    });

    routerObserver.observe(routerContainerRef.current);
    window.addEventListener("resize", sendResize);

    return () => {
      window.removeEventListener("resize", sendResize);
      routerObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-screen flex flex-col h-screen text-white">
      <TopBar />
      <div className="flex-1 w-full h-full py-10">
        <div className="w-full h-full" ref={routerContainerRef} />
      </div>
    </div>
  );
};

export default App;
