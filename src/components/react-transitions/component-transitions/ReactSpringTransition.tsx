import React, { useEffect, useState } from "react";
import {
  useSpring,
  animated,
  useSpringRef,
  useTransition,
  useChain,
  config,
} from "@react-spring/web";

const ReactSpringTransition = () => {
  const translationSpringRef = useSpringRef();
  const scaleSpringRef = useSpringRef();
  const [inDefault, setInDefault] = useState(false);

  const { translation, ...restForTransition } = useSpring({
    ref: translationSpringRef,
    from: { translation: inDefault ? 0 : 100 },
    to: { translation: inDefault ? 100 : 0 },
  });

  const { scale, ...restForScale } = useSpring({
    ref: scaleSpringRef,
    from: {
      scale: inDefault ? 0 : 1,
    },
    to: {
      scale: inDefault ? 1 : 0,
    },
  });

  const handleClick = () => setInDefault(!inDefault);

  useChain([scaleSpringRef, translationSpringRef], [0, 0], 1000);

  return (
    <animated.div
      ref={translationSpringRef}
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...restForTransition,
        x: translation,
        position: "relative",
      }}
    >
      <animated.div
        ref={scaleSpringRef}
        style={{
          ...restForScale,
          width: 80,
          background: "#ff6",
          height: 80,
          borderRadius: 8,
          position: "absolute",
          scale,
        }}
      />
    </animated.div>
  );
};

export default ReactSpringTransition;
