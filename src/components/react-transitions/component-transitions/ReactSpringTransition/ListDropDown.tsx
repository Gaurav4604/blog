import {
  useTransition,
  animated,
  config,
  SpringValue,
} from "@react-spring/web";
import React, { useEffect, useState } from "react";
import Dismissible from "./Dismissible";

type Props = {
  initialList: string[];
};
const ListDropDown = (props: Props) => {
  const [list, setList] = useState<string[]>([]);

  const [transitions, api] = useTransition(
    list,
    () => ({
      from: { maxHeight: 0 },
      enter: { maxHeight: 80 },
      leave: { maxHeight: 0 },
      trail: 200 / list.length,
      config: config.stiff,
    }),
    [list.length]
  );

  useEffect(() => {
    api.start();
  }, [list.length]);

  useEffect(() => {
    setList([]);
    setTimeout(() => {
      setList(props.initialList);
    });
  }, [props.initialList]);

  return transitions((styles, item, _, index) => (
    <animated.div
      style={{
        ...styles,
        marginBottom: styles.maxHeight.to({
          map: Math.abs,
          range: [0, 80],
          output: [0, 10],
          extrapolate: "clamp",
        }),
      }}
      key={item}
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
// https://www.react-spring.dev/docs/advanced/spring-ref#function-call
