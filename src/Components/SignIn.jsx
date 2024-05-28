import { toHaveErrorMessage } from "@testing-library/jest-dom/matchers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../store/auth";


const SignIn = ()=>{
    const [signEmail,setSignEmail] = useState("");
    const [signPass,setSignPass] = useState("");
    const dispatch = useDispatch();

    const signEmailCHangeHandler =(e)=>{
        setSignEmail(e.target.value);
    }

    const signPassChangeHandler =(e)=>{
        setSignPass(e.target.value)
    }

    const signInFormHandler =(e)=>{
        e.preventDefault();
        const signInData = {
            signEmail,
            signPass,
        }
        console.log(signInData);
        const fetchSignIn = async()=>{
           try {
             const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDom-AD29xxpyqaNnRKSxQIGCpvLH82lQM",{
                method:"POST",
                body:JSON.stringify({
                    email : signEmail,
                    password:signPass,
                    returnSecureToken : true,
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(!response.ok){
                const errr = await response.json();
                throw new Error("signIN NHI HUA",errr)
            }
            const data = await response.json();
            console.log(data.idToken);
            dispatch(authActions.logIn())
           } catch (error) {
            alert(error)
           }
              
        }
        fetchSignIn();
        setSignEmail("");
        setSignPass("");
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="bg-slate-200 p-10 text-black text-center mb-6 rounded-2xl w-96">
            <h1 className="font-bold">Sign In Here</h1>
            <form onSubmit={signInFormHandler} className="w-full mt-8">
              <div className="text-start ">
                {/* <label htmlFor="email">Email</label> */}
                <input
                  id="email1"
                  type="emai"
                  value={signEmail}
                  onChange={signEmailCHangeHandler}
                  required
                  className="w-full p-1 rounded-xl"
                  placeholder="Email@Email.com"
                />
              </div>
              <div className="text-start mt-4">
                {/* <label htmlFor="pass">Password</label> */}
                <input
                  id="pass1"
                  type="password"
                  value={signPass}
                  onChange={signPassChangeHandler}
                  required
                  className="w-full p-1 rounded-xl"
                  placeholder="Password"
                />
              </div>
              <div className="text-center rounded-3xl bg-sky-300 hover:bg-sky-700 mt-6 p-4">
                <button>Sign In</button>
              </div>
            </form>
          </div>
          <div className="mt-8 rounded-2xl bg-rose-200 hover:bg-rose-600 border-blue-800 p-4 text-center">
            <button><NavLink to="/signup">Do not Have Account ? Sign Up</NavLink></button>
          </div>
        </div>
      </div>
    );
};
export default SignIn;