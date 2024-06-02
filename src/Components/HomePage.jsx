import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const HomePage =() =>{

    const dispatch = useDispatch();
    const userEmail = JSON.parse(localStorage.getItem("cleanEmail"))
    const logOutHandler =()=>{
        dispatch(authActions.logOut());
        localStorage.removeItem("token")
        localStorage.removeItem("cleanEmail");
        localStorage.removeItem("receiver")
    }
    return (
      <div>
        <div>
          <div className="flex justify-between items-center bg-rose-100 h-28 shadow-lg border-b-8 border-blue-400">
            <div>
              <header className="font-bold text-purple-950 text-3xl shadow-2xl">
                Welcome to MailBOX - {userEmail}
              </header>
            </div>
            <button
              className="bg-cyan-300 hover:bg-cyan-600 rounded-3xl p-4 font-semibold shadow-lg"
              onClick={logOutHandler}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    );
}
export default HomePage;