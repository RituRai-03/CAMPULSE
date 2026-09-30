import { useState } from "react";

function Login() {
  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Check selected role
      if (data.user.role !== role) {
        throw new Error(
          `This account is registered as ${data.user.role}.`
        );
      }

      // Save logged-in user
      localStorage.setItem(
        "campulseUser",
        JSON.stringify(data.user)
      );

      // Redirect based on role
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

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
            CAMPULSE
          </p>

          <h1>
            Your campus,
            <br />
            in motion.
          </h1>

          <p>
            Discover events, join experiences and stay
            connected with what is happening on campus.
          </p>

        </div>

        <div className="login-box">

          <p className="section-label">
            ENTER CAMPULSE
          </p>

          <h2>
            Welcome back.
          </h2>

          {/* ROLE SELECTOR */}

          <div className="role-selector">

            <button
              type="button"
              className={
                role === "student"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() => {
                setRole("student");
                setError("");
              }}
            >
              Student
            </button>

            <button
              type="button"
              className={
                role === "admin"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() => {
                setRole("admin");
                setError("");
              }}
            >
              Admin
            </button>

          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <label>
              Email

              <input
                type="email"
                placeholder={
                  role === "admin"
                    ? "admin@campulse.com"
                    : "student@campus.com"
                }
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </label>

            <label>
              Password

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </label>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-btn login-btn"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Continue →"}
            </button>

          </form>

          <p className="login-note">
            Demo access is provided for the recruitment
            prototype.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;