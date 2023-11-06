import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";

export function JobCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    user: { token },
  } = useContext(AuthContext);

  function handleSubmit(values) {
    setLoading(true);
    axios
      .post(API.jobs.create, values, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        navigate("/");
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
          title: "",
          company_name: "",
          company_website: "",
          location: "",
          salary: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Software Developer" /> */}
            <Field name="title">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Title</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Software Developer"
                    style={
                      form.touched.title && form.errors.title
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>
            {/* {touched.title && errors.title && <div>{errors.title}</div>} */}

            <Field name="company_name">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Company Name</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Company Name"
                    style={
                      form.touched.company_name && form.errors.company_name
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>
            {/* {touched.company_name && errors.company_name && (
              <div>{errors.company_name}</div>
            )} */}

            <Field name="company_website">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Company Website URL</span>
                  <input
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="https://company_website.com"
                    style={
                      form.touched.company_website &&
                      form.errors.company_website
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>
            {/* {touched.company_website && errors.company_website && (
              <div>{errors.company_website}</div>
            )} */}

            <Field name="location">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Location</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Location"
                    style={
                      form.touched.location && form.errors.location
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>
            {/* {touched.location && errors.location && (
              <div>{errors.location}</div>
            )} */}

            <Field name="salary">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Salary</span>
                  <input
                    {...field}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    style={
                      form.touched.salary && form.errors.salary
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>
            {/* {touched.salary && errors.salary && <div>{errors.salary}</div>} */}

            <button
              className="text-lg px-5 py-3 shadow-sm bg-blue-400 rounded-md hover:bg-blue-500 mt-3"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
