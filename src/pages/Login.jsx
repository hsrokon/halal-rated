import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const Login = () => {
    const [ errorMes, setErrorMes ] = useState({});
    const { loginUser, setUser, logInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.pass.value;
        loginUser(email, password)
        .then(credential =>{
            const user = credential.user;
            setUser(user)
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => {
            const errorCode = error.code;
            setErrorMes({...errorMes, login: errorCode})//adding a login property
            console.log(errorCode);
        })
    }

    //google login
    const handleGoogleLogIn = () => {
        logInWithGoogle()
        .then(credential =>{
            const user = credential.user;
            setUser(user)
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => {
            const errorCode = error.code;
            setErrorMes({...errorMes, login: errorCode})//adding a login property
            console.log(errorCode);
        })
    }

    const [ showPass, setShowPass ] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">

            <Link to={'/'}><h2 className="pl-30 pt-10 text-xl font-bold self-start text-base-content">&#10095; Home</h2></Link>

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
                        placeholder="Email" />

                        <label className="text-sm">Password</label>
                        <div className="relative">
                            <input 
                            type={`${showPass ? 'text' : 'password'}`} 
                            name="pass"
                            required
                            className="input rounded text-base-content w-full" 
                            placeholder="Password" />
                            <button 
                            type="button"
                            onClick={()=> setShowPass(!showPass)}
                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-base-content text-lg z-20">
                                {
                                    showPass ? <FaEyeSlash /> : <FaEye/>
                                }</button>
                        </div>
                        
                        <div><a className="link link-hover">Forgot password?</a></div>
                        {
                            errorMes.login && <p className="font-semibold text-white">
                                <span className="text-base-content">&#10095;&#10095;</span> Error: {errorMes.login}</p>
                        }
                        <button type="submit" className="btn btn-primary text-white border-base-100 rounded mt-2">Log in</button>
                        </fieldset>

                        <div className="divider -my-1 md:my-0 text-xs md:text-sm">OR</div>

                        <button 
                        onClick={handleGoogleLogIn}
                        className="btn bg-white rounded text-black border-0">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className="text-center text-sm">Don't have an account? 
                            <Link to={'/auth/signup'} className="underline font-semibold">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;