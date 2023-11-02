import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";

export function JobDelete() {
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

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(API.jobs.delete(id), {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        navigate(`/`);
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
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
