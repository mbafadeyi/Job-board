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
    setLoadingJob(true);
    function fetchJob() {
      axios
        .get(API.jobs.retrieve(id))
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
  }, [id]);

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
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Software Developer" />
              {touched.title && errors.title && <div>{errors.title}</div>}

              <label htmlFor="companyName">Company Name</label>
              <Field
                id="companyName"
                name="company_name"
                placeholder="Google"
              />
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
      )}
    </div>
  );
}
