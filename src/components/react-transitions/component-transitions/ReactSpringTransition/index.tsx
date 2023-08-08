import React, { useEffect, useState } from "react";
import {
  useSpring,
  animated,
  useSpringRef,
  useTransition,
  useChain,
  config,
} from "@react-spring/web";
import ShrinkExpand from "./ShrinkExpand";
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

  useChain([scaleSpringRef, translationSpringRef], [0, 0], 1000);

  return (
    <>
      <SlideAround move={animate} ref={translationSpringRef} />
      <ShrinkExpand expand={animate} ref={scaleSpringRef} />
    </>
  );
};

export default ReactSpringTransition;
