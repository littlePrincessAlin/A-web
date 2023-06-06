/**
 * @title: 自定义hook--useUpdateEffect
 * @description: useEffect通常首次会执行，在这里我们自定义一个首次不执行的hook
 */
import { useEffect, useRef } from "react";

export const useUpdateEffect = (fn: Function, inputs: any[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};
