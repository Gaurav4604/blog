import {
  Lookup,
  SpringRef,
  animated,
  useSpring,
  useSpringRef,
} from "@react-spring/web";
import React, { forwardRef } from "react";

type Props = {
  expand: boolean;
};

const ShrinkExpand = forwardRef(
  (props: Props, scaleSpringRef: SpringRef<Lookup<any>>) => {
    const { scale } = useSpring({
      ref: scaleSpringRef,
      from: {
        scale: props.expand ? 0 : 1,
      },
      to: {
        scale: props.expand ? 1 : 0,
      },
    });
    return (
      <animated.div
        style={{
          width: 80,
          background: "#ff6",
          height: 80,
          borderRadius: 8,
          position: "absolute",
          scale,
        }}
      />
    );
  }
);
export default ShrinkExpand;
