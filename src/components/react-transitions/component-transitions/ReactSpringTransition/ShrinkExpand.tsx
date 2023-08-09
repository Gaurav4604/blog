import {
  Lookup,
  SpringRef,
  animated,
  useSpring,
  useSpringRef,
} from "@react-spring/web";
import React, { forwardRef, useEffect, useState } from "react";

type Props = {
  expand?: boolean;
  preview?: boolean;
};

const ShrinkExpand = forwardRef(
  (props: Props, scaleSpringRef: SpringRef<Lookup<any>>) => {
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
      setAnimate(props.expand);
    }, [props.expand]);

    const { scale } = useSpring({
      ref: scaleSpringRef,
      from: {
        scale: animate ? 0 : 1,
      },
      to: {
        scale: animate ? 1 : 0,
      },
    });
    return (
      <animated.div
        style={{
          width: 80,
          background: "#ff6",
          height: 80,
          borderRadius: 8,
          scale,
        }}
      />
    );
  }
);
export default ShrinkExpand;
