import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JobCreate } from "./components/JobCreate";
import { JobDelete } from "./components/JobDelete";
import { JobDetail } from "./components/JobDetail";
import { JobList } from "./components/JobList";
import { JobUpdate } from "./components/JobUpdate";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <Navbar />

          {/* A <Routes> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <div className="max-w-4xl mx-auto py-5 px-4">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
              <Route path="/jobs/:id" element={<JobDetail />} exact />
              <Route path="/jobs/:id/update" element={<JobUpdate />} exact />
              <Route path="/jobs/:id/delete" element={<JobDelete />} exact />
              <Route path="/create-job" element={<JobCreate />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/" element={<JobList />} exact />
            </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
