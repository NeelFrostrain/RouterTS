import { useEffect, useRef } from "react";

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
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={routerContainerRef}
      ></div>
    </div>
  );
};

export default App;
