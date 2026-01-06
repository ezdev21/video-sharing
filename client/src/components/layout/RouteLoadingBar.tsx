import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function RouteLoadingBar() {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();

    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 300);

    return () => {
      clearTimeout(timer);
      ref.current?.complete();
    };
  }, [location]);

  return (
    <LoadingBar
      color="'#1e9ff0"
      height={2}
      ref={ref}
      shadow={false}
    />
  );
}
