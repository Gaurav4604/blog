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

const ReactSpringTransition = () => {
  const translationSpringRef = useSpringRef();
  const scaleSpringRef = useSpringRef();
  const [inDefault, setInDefault] = useState(false);

  const { translation } = useSpring({
    ref: translationSpringRef,
    from: { translation: inDefault ? 0 : 100 },
    to: { translation: inDefault ? 100 : 0 },
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
        x: translation,
        position: "relative",
      }}
    >
      <ShrinkExpand expand={inDefault} ref={scaleSpringRef} />
    </animated.div>
  );
};

export default ReactSpringTransition;
