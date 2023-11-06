import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API } from "../api";

function JobListItem({ job }) {
  return (
    <div className="mt-2 border border-gray-200 px-3 py-3 shadow-sm rounded-lg">
      <div className="flex items-center justify-between">
        <NavLink to={`/jobs/${job.id}`}>
          <h3 className="text-2xl text-gray-800 font-semibold">
            {job.title}
            {job.sponsored && (
              <span className="bg-green-100 ml-2 text-sm text-green-600 px-2 py-2 rounded-md">
                Sponsored
              </span>
            )}
          </h3>
        </NavLink>
        <div className="text-gray-800">
          Added on {""}
          {new Date(job.date_created).toDateString()}
        </div>
      </div>
      <p className="mt-2 text-lg text-gray-600 ">${job.salary}</p>
      <p className="mt-1 italic text-sm text-gray-500">
        {job.company_name}
        <a
          className="ml-3 text-blue-500 hover:text-blue-600 text-sm"
          href={job.company_website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website
        </a>
      </p>
      {job.remote && <p className="text-gray-500">Remote &#x1F310; </p>}
      {job.location && <p className="text-gray-500">{job.location}</p>}
      <p>{job.description}</p>
    </div>
  );
}

export function JobList() {
  const [jobs, setJobs] = useState(null);
  const [sponsoredJobs, setSponsoredJobs] = useState(null);

  useEffect(() => {
    function fetchJobs() {
      axios.get(API.jobs.list).then((res) => {
        const sponsoredJobs = res.data.filter((job) => job.sponsored);
        const restOfJobs = res.data.filter((job) => !job.sponsored);

        setJobs(restOfJobs);
        setSponsoredJobs(sponsoredJobs);
      });
    }
    fetchJobs();
    return () => null;
  }, []);

  return (
    <div>
      {!jobs && "Loading..."}
      {sponsoredJobs &&
        sponsoredJobs.map((job) => {
          return <JobListItem key={job.id} job={job} />;
        })}
      {jobs &&
        jobs.map((job) => {
          return <JobListItem key={job.id} job={job} />;
        })}
    </div>
  );
}
