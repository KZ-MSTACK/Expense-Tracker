import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input'; 
import { Link } from 'react-router-dom';
import { validateEmail } from '../../Utils/helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail (email)) {
      setError ("Please Enter a Valid Email Address");
      return;
    }

    if (password) {
      setError ("Please Enter a Password");
      return;
    }
     setError ("");

    // Login API Call
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="email@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          { error && <p className="text-red-500 text-xs p.b-2.5"> {error}</p>}
          <button type="submit" className="w-full text-small font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3" >
            Dont have an Account? {""}
            <Link className="font-medium text-primary underline"  to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;