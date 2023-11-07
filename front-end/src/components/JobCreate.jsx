import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";

function ImagePreview({ file }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  });

  return (
    <div>
      {!imageSrc && "Loading..."}
      {imageSrc && (
        <img src={imageSrc} alt={file.name} className="h-20 w-20 p-3" />
      )}
    </div>
  );
}

export function JobCreate() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {
    user: { token },
  } = useContext(AuthContext);

  function handleSubmit(values) {
    setLoading(true);
    const data = new FormData();
    data.append("company_logo", file);
    data.append("title", values.title);
    data.append("company_name", values.company_name);
    data.append("company_website", values.company_website);
    data.append("location", values.location);
    data.append("salary", values.salary);
    axios
      .post(API.jobs.create, data, {
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
          company_logo: "",
          company_website: "",
          location: "",
          salary: "",
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

            <div className="flex items-center">
              <label className="mt-3 block">
                <span className="text-gray-700">Company Logo</span>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              {file && <ImagePreview file={file} />}
            </div>

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
