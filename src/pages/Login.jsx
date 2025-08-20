import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMes, setErrorMes] = useState({});
  const [showPass, setShowPass] = useState(false);

  const { loginUser, logInWithGoogle, logOutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMes({}); // Clear previous error

    const email = e.target.email.value;
    const password = e.target.pass.value;

    try {
      const credential = await loginUser(email, password);
      const user = credential.user;

      console.log("Firebase user:", user);

      if (!user.emailVerified) {
        await Swal.fire({
          title: "Email not verified!",
          text: "Please check your email inbox to verify your account.",
          icon: "warning",
        });
        await logOutUser();
        return;
      }

      // Prepare user info to save
      const logInInfo = {
        email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstSignedUp: user.metadata.createdAt,
        lastLoggedIn: user.metadata.lastLoginAt,
      };

      const res = await fetch(`https://brand-boostie-server.vercel.app/users/${email}`);
      let method = "POST";
      if (res.status !== 404) {
        const data = await res.json();
        if (data) method = "PATCH";
      }

      const saveRes = await fetch("https://brand-boostie-server.vercel.app/users", {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(logInInfo),
      });

      const saveData = await saveRes.json();
      console.log("User saved/updated:", saveData);

      await Swal.fire({
        title: "You've successfully logged in!",
        icon: "success",
      });

      navigate(location?.state || "/");
    } catch (error) {
      const errorCode = error.code || error.message || "Unknown error";
      setErrorMes((prev) => ({ ...prev, login: errorCode }));
      console.error("Login error:", errorCode);
    }
  };

  const handleGoogleLogIn = async () => {
    setErrorMes({}); // Clear previous error

    try {
      const credential = await logInWithGoogle();
      const user = credential.user;

      console.log("Google user:", user);

      const logInInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstSignedUp: user.metadata.createdAt,
        lastLoggedIn: user.metadata.lastLoginAt,
      };

      const res = await fetch(`https://brand-boostie-server.vercel.app/users/${user.email}`);
      let method = "POST";
      if (res.status !== 404) {
        const data = await res.json();
        if (data) method = "PATCH";
      }

      await fetch("https://brand-boostie-server.vercel.app/users", {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(logInInfo),
      });

      await Swal.fire({
        title: "You've successfully logged in with Google!",
        icon: "success",
      });

      navigate(location?.state || "/");
    } catch (error) {
      const errorCode = error.code || error.message || "Unknown error";
      setErrorMes((prev) => ({ ...prev, login: errorCode }));
      console.error(" Google Login error:", errorCode);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Link to={"/"}>
        <h2 className="pl-30 pt-10 text-xl font-bold self-start text-base-content">
          &#10095; Home
        </h2>
      </Link>

      <div className="flex flex-1 flex-col gap-2 md:gap-4 items-center justify-center">
        <h2 className="text-2xl font-semibold">Log in</h2>

        <div className="card bg-primary w-[19rem] md:w-full max-w-sm shrink-0 rounded shadow-2xl shadow-primary text-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset gap-0.5 md:gap-1.5">
              <label className="text-sm">Email</label>
              <input
                type="email"
                required
                name="email"
                className="input rounded text-base-content w-full"
                placeholder="Email"
              />

              <label className="text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="pass"
                  required
                  className="input rounded text-base-content w-full"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-base-content text-lg z-20"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />
}
                </button>
              </div>

              <Link to={'/auth/resetPassword'}>
                <button 
                type="button"
                className="link link-hover">Forgot password?</button>
              </Link>

              {errorMes.login && (
                <p className="font-semibold text-white">
                  <span className="text-base-content">&#10095;&#10095;</span>{" "}
                  Error: {errorMes.login || "Unknown error"}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary text-white border-base-100 rounded mt-2"
              >
                Log in
              </button>
            </fieldset>

            <div className="divider -my-1 md:my-0 text-xs md:text-sm">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogIn}
              className="btn bg-white rounded text-black border-0"
            >
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg> Login with Google
            </button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to={"/auth/signup"} className="underline font-semibold">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;