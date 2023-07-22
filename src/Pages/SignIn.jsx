import React, { useContext } from 'react';
import { UserContext } from '../App';
import request from "../Utils/request"
export const SignIn = () => {
  let {setAdmin} = useContext(UserContext);

  let email = ''
  let password = ''

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform sign-in logic here, e.g., send form data to the server
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    request.post('v1/Admin/Login', {email, password})
    .then(response =>
      {
        localStorage.setItem('token', response.data.jwt)
        setAdmin(response.data.userId)
      } )
      
    .catch(error => console.log(error))

  };

  return (
      <div className="Auth-form-container bg-gradient-to-r from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center ">Sign In</h1>
            <form class="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label class="label">
                        <span class="text-base label-text">Email</span>
                    </label>
                    <input type="text" 
                    placeholder="Email Address" 
                    onChange={event => email = event.target.value}
                    class="w-full input input-bordered input-accent bg-transparent" />
                </div>
                <div>
                    <label class="label">
                        <span class="text-base label-text">Password</span>
                    </label>
                    <input type="password" 
                    placeholder="Enter Password"
                    onChange={event => password = event.target.value}
                        class="w-full input input-bordered input-accent bg-transparent" />
                </div>
                <div>
                    <button class="btn btn-accent w-full" type="submit">Login</button>
                </div>
            </form>
        </div>
      </div>
  );
};

export default SignIn;