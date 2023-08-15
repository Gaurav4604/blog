import React, { useEffect, useState } from "react";
import { useSpring, animated, config, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const Draggable = () => {
  const [springs, api] = useSprings(2, () => ({
    x: 0,
    height: 80,
    scale: 0,
    config: config.stiff,
  }));

  const [flung] = useState(() => new Set<number>());

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx],
      direction: [xDir],
      velocity: [xVel],
    }) => {
      const velocity = xVel;
      if (!down && velocity > 1 && xDir === 1) flung.add(index);
      api.start((i) => {
        if (flung.has(i)) {
          return {
            x: 400,
            height: 400,
            scale: 400,
          };
        }
        if (!flung.has(i) && i === index) {
          if (xDir === 1) {
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
        }
      });
      if (flung.size === 2 && !down) {
        setTimeout(() => {
          api.start((i) => ({
            height: 80,
            x: 0,
            scale: 0,
            delay: i === 1 ? 500 : 0,
          }));
          flung.clear();
        }, 600);
      }
    }
  );

  // Bind it to a component
  return (
    <>
      {springs.map((props, index) => {
        return (
          <animated.div
            key={index}
            {...bind(index)}
            style={{
              x: props.x,
              height: props.height.to({
                map: Math.abs,
                range: [160, 300],
                output: [80, 0],
                extrapolate: "clamp",
              }),
              width: 160,
              backgroundColor: index ? "#ff6" : "#ff6d6d",
              position: "relative",
              borderRadius: 10,
              touchAction: "none",
              marginBottom: 10,
            }}
          >
            <animated.div
              style={{
                height: props.height.to({
                  map: Math.abs,
                  range: [160, 300],
                  output: [80, 0],
                  extrapolate: "clamp",
                }),
                width: 80,
                scale: props.scale.to({
                  map: Math.abs,
                  range: [0, 300],
                  output: [0, 1],
                  extrapolate: "clamp",
                }),
                backgroundColor: index ? "#ff6d6d" : "#ff6",
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: 10,
                touchAction: "none",
                marginBottom: 10,
              }}
            />
          </animated.div>
        );
      })}
    </>
  );
};
export default Draggable;

// https://codesandbox.io/s/3filx?file=/src/App.tsx
// https://codesandbox.io/s/to6uf
// https://codesandbox.io/s/github/pmndrs/use-gesture/tree/main/demo/src/sandboxes/draggable-list
// https://use-gesture.netlify.app/docs/
