import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            collegeYear
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      <section className="login-container">

        <div className="login-intro">

          <p className="eyebrow">
            JOIN CAMPULSE
          </p>

          <h1>
            Make your
            <br />
            campus count.
          </h1>

          <p>
            Create your student account to discover
            events, register for experiences and keep
            track of everything you've joined.
          </p>

        </div>


        <div className="login-box">

          <p className="section-label">
            STUDENT ACCOUNT
          </p>

          <h2>
            Create account.
          </h2>


          <form
            className="login-form"
            onSubmit={handleRegister}
          >

            <label>
              Full Name

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </label>


            <label>
              Email

              <input
                type="email"
                placeholder="student@campus.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </label>


            <label>
              College / Year

              <input
                type="text"
                placeholder="e.g. B.Tech 2nd Year"
                value={collegeYear}
                onChange={(e) =>
                  setCollegeYear(e.target.value)
                }
                required
              />

            </label>


            <label>
              Password

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                minLength="6"
                required
              />

            </label>


            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {success && (
              <p className="register-success">
                {success}
              </p>
            )}


            <button
              type="submit"
              className="primary-btn login-btn"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Account →"}
            </button>

          </form>


          <p className="login-note">
            Already have an account?{" "}

            <button
              type="button"
              className="login-link"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign in
            </button>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;