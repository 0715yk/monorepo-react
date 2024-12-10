import { useEffect, useRef } from "react";

export const useSkipFirstRender = (callback: () => void, deps: any[]) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    callback();
  }, deps);
};
