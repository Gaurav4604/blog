import {
  useTransition,
  animated,
  config,
  SpringValue,
} from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import Dismissible from "./Dismissible";

const ListDropDown = () => {
  const [list, setList] = useState(["hi", "data", "bye"]);

  const [transitions, api] = useTransition(
    list,
    () => ({
      from: { height: 0 },
      enter: { height: 80 },
      leave: { height: 0 },
      trail: 200 / list.length,
      config: config.wobbly,
    }),
    [list.length]
  );

  useEffect(() => {
    api.start();
  }, [list.length]);

  return transitions((styles, item, _, index) => (
    <animated.div
      style={{
        ...styles,
        marginBottom: styles.height.to({
          map: Math.abs,
          range: [0, 80],
          output: [0, 10],
          extrapolate: "clamp",
        }),
      }}
    >
      <Dismissible
        onDismiss={() => {
          setList((list) => list.filter((itm) => itm !== item));
        }}
        onChange={(res) => {
          api.start((i) => {
            if (i === index) {
              return {
                height: new SpringValue(res.value.height).to({
                  map: Math.abs,
                  range: [160, 280],
                  output: [80, 0],
                  extrapolate: "clamp",
                }),
                immediate: true,
              };
            }
          });
        }}
      >
        {item}
      </Dismissible>
    </animated.div>
  ));
};

export default ListDropDown;
// https://www.react-spring.dev/docs/advanced/spring-ref#function-call
