import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input'; 
import { Link } from 'react-router-dom';
import { validateEmail } from '../../Utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // handle sign up form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "" ;

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a Valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the Password");
      return;
    }

    setError("");

    // Sign Up API call

  }

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image= {profilePic} setImage={setProfilePic} />

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            
            <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder="your@email.com"
              type="email"
            />
           <div className="col-span-2">
            <Input
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="Password"
              placeholder="Create a password"
              type="password"
            />
            </div>
            
          
          </div>

          { error && <p className="text-red-500 text-xs p.b-2.5"> {error}</p>}
          <button type="submit" className="w-full text-small font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3" >
            Already have an Account {""}
            <Link className="font-medium text-primary underline"  to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;