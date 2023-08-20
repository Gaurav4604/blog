import { useTransition, animated } from "@react-spring/web";
import React, { useEffect } from "react";
import Dismissible from "./Dismissible";

type Props = {};

const ListDropDown = (props: Props) => {
  const [transitions, api] = useTransition([1, 2, 3], () => ({
    from: { scale: 0 },
    // to: { scale: 50 },
    enter: { scale: 1 },
  }));

  useEffect(() => {
    api.start();
  }, []);

  return transitions((styles, item) => (
    <animated.div
      style={{
        ...styles,
        marginBottom: "1rem",
      }}
    >
      <Dismissible>{item}</Dismissible>
    </animated.div>
  ));
};

export default ListDropDown;
