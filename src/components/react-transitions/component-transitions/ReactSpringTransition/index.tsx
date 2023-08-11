import React, { useEffect, useState } from "react";
import {
  useSpring,
  animated,
  useSpringRef,
  useTransition,
  useChain,
  config,
} from "@react-spring/web";
import ShrinkGrow from "./ShrinkGrow";
import SlideAround from "./SlideAround";

const ReactSpringTransition = () => {
  const translationSpringRef = useSpringRef();
  const scaleSpringRef = useSpringRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(!animate);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [animate]);

  useChain(
    animate
      ? [scaleSpringRef, translationSpringRef]
      : [translationSpringRef, scaleSpringRef],
    animate ? [0.4, 0] : [0, 0.4],
    1000
  );

  return (
    <>
      <SlideAround move={animate} ref={translationSpringRef} />
      <ShrinkGrow expand={animate} ref={scaleSpringRef} />
    </>
  );
};

export default ReactSpringTransition;
