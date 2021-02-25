import React from "react";
import { Button } from "@material-ui/core";
import Styles from "../app-style";
import { colors } from "../services";
export default function () {
  return (
    <React.Fragment>
      <div
        style={{
          ...Styles.highZ,
          ...{ position: "absolute", bottom: "110px" },
        }}
      >
        <Button onClick={Styles.handleScroll} style={{ ...Styles.colorWhite }}>
          Scroll Down
        </Button>
      </div>
      <div
        style={{
          ...Styles.highZ,
          ...{ position: "absolute", bottom: "85px" },
        }}
      >
        <Button onClick={Styles.handleScroll} style={{ ...Styles.colorWhite }}>
          <span
            className="material-icons"
            style={{ fontSize: "4rem", color: colors.secondary, lineHeight: 0 }}
          >
            keyboard_arrow_down
          </span>
        </Button>
      </div>
    </React.Fragment>
  );
}
