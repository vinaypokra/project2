import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Styles from "../app-style.js";
import { Typography } from "@material-ui/core";

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
          style={{ ...Styles.blackBG, ...Styles.padding10, ...Styles.blackBG }}
          alignItems="flex-start"
          justify="center"
          direction="column"
        >
          <Typography variant="h3" style={Styles.colorWhite}>
            Why our <span style={Styles.colorPrimary}>Healthcare Plans </span>
            are effective?
          </Typography>
          <Typography variant="h5" style={Styles.colorGrey}>
            <ul>
              <li>
                A 1-to-1 coach who will completely understand your lifestyle and
                health concerns.
              </li>
              <li>
                Easy-to-follow nutrition and workout plan, that is in-sync with
                your treatment.
              </li>
              <li>Frequent tweaking of diet plan till you see results.</li>
              <li>Regular sharing of progress update with your doctor.</li>
              <li>Unlimited coach support via WhatsApp & Call.</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Yoga;
