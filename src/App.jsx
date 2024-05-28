import { useSelector } from "react-redux";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import "./index.css";
import HomePage from "./Components/HomePage";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
  console.log(isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/Home");
    }
  }, [isLoggedIn, history]);

  return (
    <Switch>
      {!isLoggedIn ? (
        <>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </>
      ) : (
        <>
          <Route path="/home">
            <HomePage />
          </Route>
        </>
      )}
    </Switch>
  );
}

export default App;
