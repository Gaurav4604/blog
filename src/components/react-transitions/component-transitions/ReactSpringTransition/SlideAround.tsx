import {
  Lookup,
  SpringRef,
  animated,
  useSpring,
  useSpringRef,
} from "@react-spring/web";
import React, { forwardRef, useEffect, useState } from "react";

type Props = {
  move?: boolean;
  preview?: boolean;
};

const SlideAround = forwardRef(
  (props: Props, slideAroundSpringRef: SpringRef<Lookup<any>>) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (props.preview) {
        timeout = setTimeout(() => {
          setAnimate(!animate);
        }, 1000);
      }
      return () => {
        if (props.preview) clearTimeout(timeout);
      };
    }, [animate, props.preview]);

    useEffect(() => {
      setAnimate(Boolean(props.move));
    }, [props.move]);

    const { translation } = useSpring({
      ref: slideAroundSpringRef,
      from: { translation: animate ? 0 : 100 },
      to: { translation: animate ? 100 : 0 },
    });
    return (
      <animated.div
        style={{
          width: 80,
          background: "#ff6d6d",
          height: 80,
          borderRadius: 8,
          x: translation,
        }}
      />
    );
  }
);
export default SlideAround;
