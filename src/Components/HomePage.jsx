import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import {
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Inbox from "./Inbox";
import Sent from "./Sent";
import ComposeMail from "./ComposeMail";
import Readmsg from "./Readmsg";
import ReadSent from "./ReadSent";
const HomePage = () => {
  const dispatch = useDispatch();
  const unread = useSelector((state) => state.mails.unreadInbox);

  const userEmail = JSON.parse(localStorage.getItem("cleanEmail"));
  const logOutHandler = () => {
    dispatch(authActions.logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("cleanEmail");
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 bg-rose-100 shadow-lg border-b-8 border-blue-400 p-4 z-50">
        <div className="flex justify-between items-center h-20">
          <header className="font-bold text-purple-950 text-3xl uppercase">
            Welcome to MailBOX - {userEmail}
          </header>
          <button
            className="bg-cyan-300 hover:bg-cyan-600 rounded-3xl p-4 font-semibold shadow-lg"
            onClick={logOutHandler}
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="flex flex-1 pt-28">
        <div className="fixed top-28 left-0 overflow-auto float-left bg-slate-300 p-4 w-1/6 h-screen">
          <ul className="space-y-4">
            <li className="font-semibold  hover:border-b-2">
              <NavLink to="/Home/compose" >
                Compose
              </NavLink>
            </li>
            <li className="font-semibold hover:border-b-2 space-x-2">
              <NavLink to="/Home/inbox">
                Inbox <span> unread {unread.length}</span>
              </NavLink>
            </li>
            <li className="font-semibold hover:border-b-2">
              <NavLink to="/Home/sent">SentBox</NavLink>
            </li>
          </ul>
        </div>
        <div className=" p-6 float-right flex-1 pt-4 h-screen w-5/6 bg-stone-400">
          <Switch>
            <Route path="/Home/inbox" exact>
              <Inbox />
            </Route>
            <Route path="/Home/sent" exact>
              <Sent />
            </Route>
            <Route path="/Home/compose">
              <ComposeMail />
            </Route>
            <Route path="/Home/Inbox/:emailId">
              <Readmsg />
            </Route>
            <Route path ="/Home/sent/:emailId">
              <ReadSent/>
            </Route>
            <Route path="/*" exact>
              <Redirect to="/Home/inbox"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
