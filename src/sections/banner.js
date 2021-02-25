import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Styles from "../app-style.js";
import { Typography } from "@material-ui/core";
import { retrievePathMobile, docHt } from "../services";
import Signupform from "../signupform";
import PreloadImage from "../helpers/preloadimg";
import Arrow from "./downarrow";
class Banner extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid
          item
          container
          style={{
            ...Styles.banner,
            ...Styles.padding5,
            ...Styles.translucentContainer,
          }}
          alignItems="center"
          justify="center"
          direction="column"
          className="fixed"
        >
          <PreloadImage
            src={`${retrievePathMobile()}banner.jpg`}
            style={Styles.bgImg}
          />
          <Grid item container alignItems="center" justify="center">
            <Typography variant="h1" style={{ ...Styles.colorWhite }}>
              We’re India’s #1 Doctor-Approved Fitness Coaches
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ ...Styles.colorWhite, ...Styles.marginTop }}
            >
              Our fitness experts understand your health like no one else. Sign
              up with us to manage your diabetes better & take a step towards a
              better life.
            </Typography>
          </Grid>
          <Arrow />
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          className="top"
          style={{
            ...Styles.padding10,
            ...Styles.highZ,
            ...Styles.greyBG,
            ...Styles.fullHt,
            ...Styles.relative,
          }}
        >
          <Grid
            item
            container
            style={{ ...Styles.blackBG, ...Styles.padding5 }}
          >
            <Grid item>
              <Typography style={{ ...Styles.colorWhite }} variant="subtitle1">
                Sign up with us to manage your diabetes better & take a step
                towards a better life for{" "}
                <span style={{ fontWeight: "bold" }}>free</span>
              </Typography>
              <hr />
            </Grid>
            <Grid
              item
              container
              style={{ minHeight: `${docHt() / 2.5}px` }}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Signupform />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Banner;
