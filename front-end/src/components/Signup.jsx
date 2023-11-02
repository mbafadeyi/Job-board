import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { API } from "../api";

export function Signup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(values, { resetForm }) {
    setLoading(true);
    axios
      .post(API.auth.signup, values)
      .then((res) => {
        resetForm();
        setSuccess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {success && "You will receive a verification email now."}
      {loading && "Loading..."}
      <Formik
        initialValues={{
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Email</span>
                  <input
                    {...field}
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Email"
                    style={
                      form.touched.email && form.errors.email
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="password1">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Password</span>
                  <input
                    {...field}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Password"
                    style={
                      form.touched.password1 && form.errors.password1
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="password2">
              {({ field, form }) => (
                <label className="mt-3 block">
                  <span className="text-gray-700">Confirm Password</span>
                  <input
                    {...field}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Confirm Password"
                    style={
                      form.touched.password2 && form.errors.password2
                        ? { border: "2px solid var(--primary-red" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <button
              className="mt-3 bg-blue-300 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-500"
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
