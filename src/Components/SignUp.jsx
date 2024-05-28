import { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [passMatch, setPassMatch] = useState(false);

  const emailChangeHnadler = (e) => {
    setEmail(e.target.value);
  };
  const passChangeHandler = (e) => {
    setPass(e.target.value);
  };
  const conPassChangeHandler = (e) => {
    setConPass(e.target.value);
    if (e.target.value === pass) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const signUpFormSubmitHandler = (e) => {
    e.preventDefault();
    const sginUpData = {
      email,
      pass,
      conPass,
    };
    const signUpfunc = async() => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDom-AD29xxpyqaNnRKSxQIGCpvLH82lQM",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: pass,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "applications/json",
            },
          }
        );
        if(!response.ok){
            const err = await response.json();
            throw new Error ("failed in the signup" ,err)
        }
        const data = await response.json();
        console.log(data.idToken);
        console.log("User SignUP Successfully");
      } catch (error) {
        console.log(error);
      }
    };
    signUpfunc()
    console.log(sginUpData);
    setEmail("");
    setPass("");
    setConPass("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="bg-slate-200 p-10 text-black text-center mb-6 rounded-2xl w-96">
          <h1 className="font-bold">Sign Up Here</h1>
          <form onSubmit={signUpFormSubmitHandler} className="w-full mt-8">
            <div className="text-start ">
              {/* <label htmlFor="email">Email</label> */}
              <input
                id="email"
                type="email"
                value={email}
                onChange={emailChangeHnadler}
                required
                className="w-full p-1 rounded-xl"
                placeholder="Email@Email.com"
              />
            </div>
            <div className="text-start mt-4">
              {/* <label htmlFor="pass">Password</label> */}
              <input
                id="pass"
                type="password"
                value={pass}
                onChange={passChangeHandler}
                required
                className="w-full p-1 rounded-xl"
                placeholder="Password"
              />
            </div>
            <div className="text-start mt-4">
              {/*<label htmlFor="compass">Confirm Password</label> */}
              <input
                id="compass"
                type="password"
                value={conPass}
                onChange={conPassChangeHandler}
                required
                className="w-full p-1 rounded-xl"
                placeholder="re-enter Password"
              />
            </div>
            {passMatch && <p>Password Matched</p>}
            {!passMatch && conPass.length > 0 && <p>Password Not Matched</p>}
            <div className="text-center rounded-3xl bg-sky-300 hover:bg-sky-700 mt-6 p-4">
              <button>SignUp</button>
            </div>
          </form>
        </div>
        <div className="mt-8 rounded-2xl bg-rose-200 hover:bg-rose-600 border-blue-800 p-4 text-center">
          <button>
            <NavLink to="/">Already Have Account! SignIn</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
