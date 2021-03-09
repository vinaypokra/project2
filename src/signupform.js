import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import Button from "@material-ui/core/Button";
import { Typography, Grid } from "@material-ui/core";
import Styles from "./app-style";
import { callAPI, getURL, get, set } from "./services";
import emailTemplates from "./emailTemplate.json";
import { useHistory } from "react-router-dom";

const errMsgs = {
  requried: "Uh oh! It's a required field",
  name: "Wait, that doesn't sound like a valid name",
  email: "Please enter a valid email id",
  mobile: "That is certainly not a valid number. ",
  country: "Did you miss the country code?",
  age: "Please enter a valid age.",
};
const validate = function (value, regex, type) {
  let error;
  if (!value) {
    error = !(type === "country") ? errMsgs.requried : errMsgs.country;
  } else if (!regex.test(value)) {
    error = errMsgs[type];
  } else {
    error = null;
  }
  return error;
};
function validateMobile(value) {
  return validate(
    value,
    /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/g,
    "mobile"
  );
}
function validateName(value) {
  return validate(
    value,
    /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
    "name"
  );
}
function validateEmail(value) {
  return validate(value, /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "email");
}
function validateCountry(value) {
  return validate(value, /^[0-9][A-Za-z0-9 -]*$/, "country");
}
function validateAge(value) {
  return validate(value, /^(1[89]|[2-9]\d)$/, "age");
}

export default (props) => {
  let history = useHistory();
  let [err, updateErr] = useState(false);
  let [formSubmitting, updateFormSubmitting] = useState(false);
  let [sendingEmail, updatesendingEmail] = useState(false);
  let [submitButtonEnable, setSubmitButtonEnable] = useState(false);

  function moveNxt() {
    history.replace("packages");
  }
  let formError = (err) => {
    updateErr(true);
  };
  let formSubmitted = (data) => {
    updateFormSubmitting(false);
    updatesendingEmail(true);
    let { email, name, mobile } = JSON.parse(get("userDetails"));
    let { city } = JSON.parse(get("loc"));
    let emailBody = emailTemplates.registration
      .replace(/#fname/g, name.split(" ")[0])
      .replace(/#full_name/g, name)
      .replace(/#city/, city)
      .replace(/#email/g, email)
      .replace(/#mob/g, mobile);
    callAPI(getURL("sendEmail"), "post", moveNxt, moveNxt, {
      to: email,
      cc: "info@getsetgo.fitness",
      subject: "GetSetGo Fitness: Your fitness journey starts here",
      message: emailBody,
    });
    moveNxt();
  };
  let submitForm = (values) => {
    setSubmitButtonEnable(true);
    set("userDetails", values);
    updateFormSubmitting(true);
    const campaign_id = get("campaign_id");
    const affiliate_id = get("affiliate_id");
    let loc = get("loc");
    loc = JSON.parse(loc);
    loc.region = loc.region || null;
    loc.ip = loc.ip || null;
    loc.city = loc.city || null;
    loc.region = loc.country || null;
    loc.state = loc.region || null;
    let postArray = [
      {
        name: values.name,
        email: values.email,
        mobile: `${values.country}${values.mobile}`,
        city: loc.city,
        ip: loc.ip,
        mailStatus: null,
      },
    ];
    //callAPI(getURL('insert_leads'), 'post', formSubmitted, formError, {
    //    customer_name:values.name,customer_email:values.email,customer_phone:`${values.country}${values.mobile}`,Region:loc.country, ip: loc.ip, state: loc.state, city: loc.city});
    callAPI(getURL("add_referrals"), "post", formSubmitted, formError, {
      //customer_name:values.name,
      //customer_email:values.email,
      //customer_phone:`${values.country}${values.mobile}`,
      //customer_age:values.age,
      affiliate_id: affiliate_id,
      campaign_id: campaign_id,
      referrals: [...postArray],
      //REGION INFO
      //Region:loc.country,
      //ip: loc.ip,
      //state: loc.state,
      //city: loc.city,
    }); //ANV
    formSubmitted();
  };
  if (err) {
    return (
      <Grid item style={{ padding: "20px 0" }}>
        <Typography
          variant="subtitle2"
          style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
        >
          Uh oh! We ran into an unexpected error. Please reload and try again.
        </Typography>
      </Grid>
    );
  }
  if (!err && formSubmitting && !sendingEmail)
    return (
      <Grid item style={{ padding: "20px 0" }}>
        <Typography
          variant="subtitle2"
          style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
        >
          Submitting the form ...
        </Typography>
      </Grid>
    );
  if (!err && !formSubmitting && sendingEmail)
    return (
      <Grid item style={{ padding: "20px 0" }}>
        <Typography
          variant="subtitle2"
          style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
        >
          Dropping an email confirmation ...
        </Typography>
      </Grid>
    );
  if (!(err || formSubmitting || sendingEmail)) {
    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          country: 91,
          mobile: "",
          age: "",
        }}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <Grid item style={Styles.formFieldContainer}>
              <label htmlFor="email">
                <Typography style={Styles.whiteColor}>Full Name</Typography>
              </label>
              <Field
                name="name"
                type="text"
                validate={validateName}
                style={{ ...Styles.feildRadius }}
              />
              {touched.name && errors.name && (
                <Grid item style={Styles.err}>
                  {errors.name}
                </Grid>
              )}
            </Grid>
            <Grid item style={Styles.formFieldContainer}>
              <label htmlFor="email">
                <Typography style={Styles.whiteColor}>Email</Typography>
              </label>
              <Field
                name="email"
                type="text"
                validate={validateEmail}
                style={{ ...Styles.feildRadius }}
              />
              {touched.email && errors.email && (
                <Typography style={Styles.err} variant="body2">
                  {errors.email}
                </Typography>
              )}
            </Grid>
            <Grid item container style={Styles.formFieldContainer}>
              <label htmlFor="mobile">
                <Typography style={Styles.whiteColor}>Mobile</Typography>
              </label>
              <Grid item container>
                <Grid item style={Styles.special}>
                  <Typography variant="body2" style={Styles.whiteColor}>
                    +
                  </Typography>
                </Grid>
                <Grid item style={Styles.countryContainer}>
                  <Field
                    name="country"
                    type="number"
                    validate={validateCountry}
                    style={{ ...Styles.feildRadius }}
                  />
                </Grid>
                <Grid item style={Styles.special}>
                  <Typography variant="body2" style={Styles.whiteColor}>
                    -
                  </Typography>
                </Grid>
                <Grid item style={Styles.mobileContainer}>
                  <Field
                    name="mobile"
                    type="number"
                    validate={validateMobile}
                    style={{ ...Styles.feildRadius }}
                  />
                </Grid>
              </Grid>
              {((touched.mobile && errors.mobile) ||
                (touched.country && errors.country)) && (
                <Grid item style={Styles.err} variant="body2">
                  {errors.mobile} {errors.country}
                </Grid>
              )}
            </Grid>
            <Grid item style={Styles.formFieldContainer}>
              <label htmlFor="age">
                <Typography style={Styles.whiteColor}>Age</Typography>
              </label>
              <Field
                name="age"
                type="number"
                validate={validateAge}
                style={{ ...Styles.feildRadius }}
              />
              {touched.age && errors.age && (
                <Typography style={Styles.err} variant="body2">
                  {errors.age}
                </Typography>
              )}
            </Grid>
            <Styles.ColorButton
              style={Styles.deafultButton}
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitButtonEnable}
            >
              <Typography variant="subtitle2">Proceed to join</Typography>
            </Styles.ColorButton>
          </Form>
        )}
      </Formik>
    );
  }
};
