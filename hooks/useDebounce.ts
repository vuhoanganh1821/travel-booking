import { useState, useEffect } from "react";

interface IUseDebounce {
  value: string;
  delay: number;
}

export default function useDebounce({ value, delay }: IUseDebounce) {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
}
