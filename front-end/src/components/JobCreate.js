import { useState, useEffect, useContext } from "react";
import { API } from "../api";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { AuthContext } from "../contexts/AuthContext";

export function JobCreate() {
  const [loading, setLoading] = useState(false);
  const {
    user: { token },
  } = useContext(AuthContext);

  function handleSubmit(values) {
    console.log(values);
    setLoading(true);
    axios
      .post(API.jobs.create, values, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {loading && "Loading..."}
      <Formik
        initialValues={{
          title: "Software Developer",
          company_name: "Facebook",
          company_website: "https://facebook.com",
          location: "Bedford",
          salary: "150000",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Software Developer" />
            {touched.title && errors.title && <div>{errors.title}</div>}

            <label htmlFor="companyName">Company Name</label>
            <Field id="companyName" name="company_name" placeholder="Google" />
            {touched.company_name && errors.company_name && (
              <div>{errors.company_name}</div>
            )}

            <label htmlFor="companyWebsite">Company Website URL</label>
            <Field
              id="companyWebsite"
              name="company_website"
              placeholder="https://www..."
            />
            {touched.company_website && errors.company_website && (
              <div>{errors.company_website}</div>
            )}

            <label htmlFor="location">Location</label>
            <Field id="location" name="location" placeholder="Lagos" />
            {touched.location && errors.location && (
              <div>{errors.location}</div>
            )}

            <label htmlFor="salary">Salary</label>
            <Field type="number" id="salary" name="salary" />
            {touched.salary && errors.salary && <div>{errors.salary}</div>}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
