import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(null); // Clear any previous errors
    setSuccessMessage(null);

    try {
      const data = {
        name: values.name,
        mail: values.email,
        pass: values.password,
      };

      const response = await registerUser(data);
      setSuccessMessage(response.message);
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful registration
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4 border p-4 p-md-5">
              <div className="mb-4">
                <h2 className="display-6 fw-bold text-center">Sign up</h2>
                <p className="text-center m-0">
                  Already have an account?{" "}
                  <a href="/login" className="link-primary text-decoration-none">
                    Login
                  </a>
                </p>
                {error && (
                      <div className="alert alert-danger">{error}</div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success">
                        {successMessage} 
                      </div>
                    )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={values.name}
                        required
                        onChange={handleInput}
                      />
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control border-0 border-bottom rounded-0"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        value={values.email}
                        required
                        onChange={handleInput}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control border-0 border-bottom rounded-0"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        required
                        onChange={handleInput}
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                    </div>
                  </div>


                  <div className="col-12 mt-5">
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-dark rounded-0 fs-6"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
