import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage, Select } from "formik";
import { TextField, Button, Checkbox } from "@material-ui/core";
import * as Yup from "yup";
import MenuItem from "@material-ui/core/MenuItem";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  surName: Yup.string()
    .min(2, "Too short")
    .max(30, "Too long")
    .required("Required")
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export const FormikForm = ({ handleSubmit }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        firstName: "",
        surName: "",
        docType: "",
        prio: ""
      }}
      onSubmit={(data, { setSubmitting }) => {
        handleSubmit(data);
      }}
      validationSchema={SignupSchema}
    >
      {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
        <Form>
          <div>
            <Field
              error={errors.firstName}
              name="firstName"
              type="input"
              placeholder="FIRST NAME"
              as={TextField}
              helperText={errors.firstName}
            />

            <Field
              error={errors.surName}
              name="surName"
              type="input"
              placeholder="SECOND NAME"
              as={TextField}
              helperText={errors.surname}
            />
          </div>

          {/* <Select
            value={values.prio}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}

          <Field name="prio" as="select" placeholder="PRIO" value={values.prio}>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </Field>
          <Field name="docType" as="select" value={values.docType}>
            <option value="Vacation report">Залишки відпусток</option>
            <option value="Certificate">Довідка</option>
            <option value="Other">Інше</option>
          </Field>

          <div>
            <Button type="submit">Submit</Button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
