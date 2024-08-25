import { useState, useCallback } from "react";

const useRefresh = () => {
  const [, setTick] = useState(0);
  const refresh = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return refresh;
};

export default useRefresh;
