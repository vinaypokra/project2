import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Styles from "../app-style.js";
import { Typography } from "@material-ui/core";
import { colors } from "../services";
import customTxt from "./customTxt.json";
class Feelgood extends Component {
  render() {
    return (
      <Grid
        item
        container
        style={{
          ...Styles.section01,
          ...Styles.highZ,
          ...Styles.greyBG,
          ...Styles.padding5,
          ...Styles.fullHt,
        }}
        className="top"
      >
        <Grid
          item
          container
          style={{
            ...Styles.blackBG,
            ...Styles.padding5,
            ...Styles.feildRadius,
          }}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <Typography
              variant="h3"
              style={{ ...Styles.leftTxt, marginBottom: Styles.spacing(3) }}
            >
              {customTxt.feelgoodPageTxt.mainHeading[0]}
              <span style={Styles.colorPrimary}>
                {customTxt.feelgoodPageTxt.mainHeading[1]}
              </span>
              {customTxt.feelgoodPageTxt.mainHeading[2]}
              <span style={Styles.colorPrimary}>
                {customTxt.feelgoodPageTxt.mainHeading[3]}{" "}
              </span>
              {customTxt.feelgoodPageTxt.mainHeading[4]}
            </Typography>
          </Grid>
          <Grid item container direction="column">
            <Typography
              variant="h4"
              style={{ ...Styles.colorGrey, ...Styles.leftTxt }}
            >
              <br></br>
              <span style={{ ...Styles.colorGrey, ...Styles.italicTxt }}>
                {customTxt.feelgoodPageTxt.subHeading}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Feelgood;
