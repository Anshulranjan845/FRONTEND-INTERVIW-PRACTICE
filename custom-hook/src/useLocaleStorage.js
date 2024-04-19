import { useState } from "react";

const useLocaleStorage = (key, defaultvalue) => {
  const [storage, setStorage] = useState(() => {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultvalue));
        return defaultvalue;
      }
    } catch {
      localStorage.setItem(key, JSON.stringify(defaultvalue));
      return defaultvalue;
    }
  });
  const getLocaleStorage = (valOrFun) => {
    let newVal
    if (valOrFun === "Function") {
      newVal = valOrFun(val);
    } else {
      newVal = valOrFun;
    }
    localStorage.setItem(key, JSON.stringify(newVal));
    setStorage(newVal);
  };
  return [storage, getLocaleStorage];
};

export default useLocaleStorage;