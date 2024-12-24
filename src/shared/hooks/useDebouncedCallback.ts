import { useRef, useEffect, useMemo } from 'react';

export interface CallOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface Options extends CallOptions {
  maxWait?: number;
  debounceOnServer?: boolean;
}

export interface ControlFunctions<ReturnT> {
  cancel: () => void;
  flush: () => ReturnT | undefined;
  isPending: () => boolean;
}

export interface DebouncedState<T extends (...args: any) => ReturnType<T>>
  extends ControlFunctions<ReturnType<T>> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
}

export const useDebouncedCallback = function <
  T extends (...args: any) => ReturnType<T>,
>(func: T, wait: number, options?: Options): DebouncedState<T> {
  const lastCallTime = useRef<number | null>(null);
  const lastInvokeTime = useRef<number>(0);
  const timerId = useRef<number | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);
  const lastThis = useRef<ThisParameterType<T> | null>(null);
  const result = useRef<ReturnType<T>>();
  const funcRef = useRef(func);
  const mounted = useRef(true);
  funcRef.current = func;

  const isClientSide = typeof window !== 'undefined';
  const useRAF = !wait && wait !== 0 && isClientSide;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait || 0;
  options = options || {};

  const leading = !!options.leading;
  const trailing = 'trailing' in options ? !!options.trailing : true; // `true` by default
  const maxing = 'maxWait' in options;
  const debounceOnServer =
    'debounceOnServer' in options ? !!options.debounceOnServer : false; // `false` by default
  const maxWait: number | null = maxing
    ? Math.max(+options.maxWait! || 0, wait)
    : null;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const debounced = useMemo(() => {
    const invokeFunc = (time: number) => {
      const args = lastArgs.current;
      const thisArg = lastThis.current;

      lastArgs.current = lastThis.current = null;
      lastInvokeTime.current = time;
      return (result.current = funcRef.current.apply(thisArg, args!));
    };

    const startTimer = (pendingFunc: () => void, wait: number) => {
      if (useRAF && timerId.current !== null)
        cancelAnimationFrame(timerId.current);
      timerId.current = useRAF
        ? (requestAnimationFrame(pendingFunc) as unknown as number)
        : (setTimeout(pendingFunc, wait) as unknown as number);
    };

    const shouldInvoke = (time: number) => {
      if (!mounted.current) return false;

      const timeSinceLastCall = time - (lastCallTime.current || 0);
      const timeSinceLastInvoke = time - lastInvokeTime.current;

      return (
        lastCallTime.current === null ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= (maxWait || 0))
      );
    };

    const trailingEdge = (time: number) => {
      timerId.current = null;

      if (trailing && lastArgs.current) {
        return invokeFunc(time);
      }
      lastArgs.current = lastThis.current = null;
      return result.current;
    };

    const timerExpired = () => {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      if (!mounted.current) {
        return;
      }
      const timeSinceLastCall = time - (lastCallTime.current || 0);
      const timeSinceLastInvoke = time - lastInvokeTime.current;
      const timeWaiting = wait! - timeSinceLastCall;
      const remainingWait = maxing
        ? Math.min(timeWaiting, (maxWait || 0) - timeSinceLastInvoke)
        : timeWaiting;

      startTimer(timerExpired, remainingWait);
    };

    const func: DebouncedState<T> = ((...args: Parameters<T>) => {
      if (!isClientSide && !debounceOnServer) return;

      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs.current = args;
      // @ts-ignore
      lastThis.current = this;
      lastCallTime.current = time;

      if (isInvoking) {
        if (!timerId.current && mounted.current) {
          lastInvokeTime.current = lastCallTime.current!;
          startTimer(timerExpired, wait!);
          return leading ? invokeFunc(lastCallTime.current!) : result.current;
        }
        if (maxing) {
          startTimer(timerExpired, wait!);
          return invokeFunc(lastCallTime.current!);
        }
      }
      if (!timerId.current) {
        startTimer(timerExpired, wait!);
      }
      return result.current;
    }) as DebouncedState<T>;

    func.cancel = () => {
      if (timerId.current) {
        useRAF
          ? cancelAnimationFrame(timerId.current)
          : clearTimeout(timerId.current);
      }
      lastInvokeTime.current = 0;
      lastArgs.current =
        lastCallTime.current =
        lastThis.current =
        timerId.current =
          null;
    };

    func.isPending = () => {
      return !!timerId.current;
    };

    func.flush = () => {
      return timerId.current === null
        ? result.current
        : trailingEdge(Date.now());
    };

    return func;
  }, [
    leading,
    maxing,
    wait,
    maxWait,
    trailing,
    useRAF,
    isClientSide,
    debounceOnServer,
  ]);

  return debounced;
};
