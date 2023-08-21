import { useTransition, animated, config } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import Dismissible from "./Dismissible";

type Props = {};

const ListDropDown = (props: Props) => {
  const [list, setList] = useState([1, 2, 3]);

  const [transitions, api] = useTransition(
    list,
    () => ({
      from: { height: 0 },
      enter: { height: 80 },
      leave: { height: 0 },
      trail: 400 / list.length,
      config: {
        duration: 100,
        tension: 500,
      },
      exitBeforeEnter: true,
    }),
    [list.length]
  );

  useEffect(() => {
    api.start();
  }, [list.length]);

  return transitions((styles, item) => (
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
      >
        {item}
      </Dismissible>
    </animated.div>
  ));
};

export default ListDropDown;
