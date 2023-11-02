import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JobCreate } from "./components/JobCreate";
import { JobDetail } from "./components/JobDetail";
import { JobList } from "./components/JobList";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <Navbar />

          {/* A <Routes> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/create-job" element={<JobCreate />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/" element={<JobList />} exact />
          </Routes>
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
