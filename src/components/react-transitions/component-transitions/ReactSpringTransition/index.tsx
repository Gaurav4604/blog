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

type Props = {
  preview?: boolean;
};

const ReactSpringTransition = (props: Props) => {
  const translationSpringRef = useSpringRef();
  const scaleSpringRef = useSpringRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (props.preview) {
      const timeout = setTimeout(() => {
        setAnimate(!animate);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [animate, props.preview]);

  useChain([scaleSpringRef, translationSpringRef], [0.4, 0], 1000);

  return (
    <>
      <SlideAround move={animate} ref={translationSpringRef} />
      <ShrinkGrow expand={animate} ref={scaleSpringRef} />
    </>
  );
};

export default ReactSpringTransition;
