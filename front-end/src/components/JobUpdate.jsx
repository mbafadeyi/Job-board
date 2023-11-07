import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";

export function JobUpdate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingJob, setLoadingJob] = useState(false);
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (job && !job.is_owner) {
      navigate("/");
    }
    return () => null;
  });

  useEffect(() => {
    setLoadingJob(true);
    function fetchJob() {
      axios
        .get(API.jobs.retrieve(id), {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setJob(res.data);
        })
        .finally(() => {
          setLoadingJob(false);
        });
    }
    fetchJob();
    return () => null;
  }, [id, token]);

  console.log(job);

  function handleSubmit(values) {
    setLoading(true);
    axios
      .put(API.jobs.update(id), values, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/jobs/${id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {loading && "Submitting..."}
      {loadingJob && "Fetching Job Details..."}
      {job && (
        <Formik
          initialValues={{
            title: job.title,
            company_name: job.company_name,
            company_website: job.company_website,
            location: job.location,
            salary: job.salary,
            available: true,
            remote: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
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

              <Field name="available">
                {({ field, form }) => (
                  <div className="block">
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          {...field}
                          type="checkbox"
                          className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-blue-200 text-blue-700 focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                          style={
                            form.touched.available && form.errors.available
                              ? { border: "2px solid var(--primary-red" }
                              : null
                          }
                        />

                        <span className="ml-2">Available</span>
                      </label>
                    </div>
                  </div>
                )}
              </Field>

              <Field name="remote">
                {({ field, form }) => (
                  <div className="block">
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          {...field}
                          type="checkbox"
                          className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-blue-200 text-blue-700 focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                          style={
                            form.touched.remote && form.errors.remote
                              ? { border: "2px solid var(--primary-red" }
                              : null
                          }
                        />

                        <span className="ml-2">Remote</span>
                      </label>
                    </div>
                  </div>
                )}
              </Field>

              <button
                className="text-lg px-5 py-3 shadow-sm bg-blue-400 rounded-md hover:bg-blue-500 mt-3"
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
