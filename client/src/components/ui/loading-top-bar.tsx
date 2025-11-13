import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

const LoadingTopBar = () => {
  const ref = useRef<LoadingBarRef>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();
    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 0);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return <LoadingBar color="#33d146" height={3} ref={ref} />;
};

export default LoadingTopBar;
