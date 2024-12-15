import { useCallback, useRef, useState } from 'react';
import {
  DebouncedState,
  useDebouncedCallback,
} from './useDebouncedCallback.ts';

function valueEquality<T>(left: T, right: T): boolean {
  return left === right;
}

export const useDebounce = <T extends any>(
  value: T,
  delay: number,
  options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
    equalityFn?: (left: T, right: T) => boolean;
  }
): [T, DebouncedState<(value: T) => void>] => {
  const eq = (options && options.equalityFn) || valueEquality;

  const activeValue = useRef(value);
  const [, forceUpdate] = useState({});
  const debounced = useDebouncedCallback(
    useCallback(
      (value: T) => {
        activeValue.current = value;
        forceUpdate({});
      },
      [forceUpdate]
    ),
    delay,
    options
  );
  const previousValue = useRef(value);

  if (!eq(previousValue.current, value)) {
    debounced(value);
    previousValue.current = value;
  }

  return [activeValue.current as T, debounced];
};
