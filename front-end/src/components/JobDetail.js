import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API } from "../api";

export function JobDetail() {
  const [job, setJob] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    function fetchJob() {
      axios.get(API.jobs.retrieve(id)).then((res) => {
        console.log(res.data);
        setJob(res.data);
      });
    }
    fetchJob();
  }, [id]);

  return (
    <div>
      {!job && "Loading..."}{" "}
      {job && (
        <div>
          <h1>{job.title}</h1>
          <h3>{job.salary}</h3>
          <NavLink to={`/jobs/${id}/update`}>Update</NavLink>
        </div>
      )}
    </div>
  );
}
