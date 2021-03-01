import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Styles from "../app-style.js";
import { Typography } from "@material-ui/core";
import customTxt from "./customTxt.json";
class Yoga extends Component {
  render() {
    return (
      <Grid
        container
        item
        style={{
          ...Styles.fullHt,
          ...Styles.highZ,
          ...Styles.greyBG,
          ...Styles.padding5,
        }}
        direction="column"
        alignItems="center"
        justify="space-evenly"
        className="top"
      >
        <Grid
          item
          container
          style={{
            ...Styles.blackBG,
            ...Styles.padding10,
            ...Styles.blackBG,
            ...Styles.feildRadius,
          }}
          alignItems="flex-start"
          justify="center"
          direction="column"
        >
          <Typography
            variant="h3"
            style={{ ...Styles.colorWhite, marginBottom: Styles.spacing(3) }}
          >
            {customTxt.yogaPageTxt.mainHeading[0]}
            <span style={Styles.colorPrimary}>
              {customTxt.yogaPageTxt.mainHeading[1]}{" "}
            </span>
            {customTxt.yogaPageTxt.mainHeading[2]}
          </Typography>
          <Typography
            variant="h5"
            style={{ ...Styles.colorGrey, ...Styles.italicTxt }}
          >
            <ul>
              {customTxt.yogaPageTxt.contentList.map((val) => {
                return (
                  <>
                    <li>{val}</li>
                  </>
                );
              })}
            </ul>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Yoga;
