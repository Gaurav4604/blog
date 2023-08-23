import {
  config,
  useSpring,
  animated,
  Lookup,
  AnimationResult,
  SpringValue,
  Controller,
} from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { PropsWithChildren } from "react";

type Props = {
  onDismiss: () => void;
  onChange: (
    result: AnimationResult<SpringValue<Lookup<any>>>,
    ctrl: Controller<Lookup<any>>,
    item: undefined
  ) => void;
  // onResolve: (
  //   result: AnimationResult<SpringValue<Lookup<any>>>,
  //   ctrl: Controller<Lookup<any>>,
  //   item: undefined
  // ) => void;
} & PropsWithChildren;

const Dismissible = (props: Props) => {
  const [spring, api] = useSpring(() => ({
    from: {
      x: 0,
      height: 80,
      scale: 0,
    },
    onChange: props.onChange,
    config: config.stiff,
  }));

  const bind = useDrag(
    ({ down, movement: [mx], velocity: [velocity], direction: [x] }) => {
      let flingIt = false;
      if (!down && velocity > 0.5 && x === 1) {
        flingIt = true;
      }

      api.start(() => {
        if (flingIt) {
          // props.onDismiss
          return {
            x: 400,
            height: 300,
            scale: 300,
            onResolve: props.onDismiss,
          };
        } else if (spring.x.get() >= 0) {
          return {
            x: down ? mx : 0,
            height: down ? mx : 80,
            scale: down ? mx : 0,
            immediate: down,
          };
        } else if (!down) {
          return {
            x: 0,
            height: 80,
            scale: 0,
          };
        }
      });
    }
  );

  const height = spring.height.to({
    map: Math.abs,
    range: [160, 280],
    output: [80, 0],
    extrapolate: "clamp",
  });

  const scale = spring.scale.to({
    map: Math.abs,
    range: [0, 280],
    output: [0, 1],
    extrapolate: "clamp",
  });

  const commonProps = {
    borderRadius: 10,
    touchAction: "none",
  };

  return (
    <animated.div
      {...bind()}
      style={{
        x: spring.x,
        height,
        width: 160,
        backgroundColor: "#ff6d6d",
        position: "relative",
        ...commonProps,
        marginBottom: "1rem",
      }}
    >
      <animated.div
        style={{
          height,
          width: 80,
          scale,
          backgroundColor: "#ff6",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          ...commonProps,
        }}
      >
        <animated.div
          style={{
            scale,
            fontSize: "2rem",
            color: "black",
          }}
        >
          {props.children}
        </animated.div>
      </animated.div>
    </animated.div>
  );
};
export default Dismissible;
