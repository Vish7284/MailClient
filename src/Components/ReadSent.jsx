

import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ReadSent = () => {
    // const dispatch = useDispatch()
  const { emailId } = useParams();
  const email = useSelector((state) =>
    state.mails.sent.find((mail) => mail.id === emailId)
  );
//   const cleanEmail = JSON.parse(localStorage.getItem("cleanEmail"));
//    const deleteEmailHandler = async (emailId) => {
//      try {
//        await fetch(
//          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox/${emailId}.json`,
//          {
//            method: "DELETE",
//          }
//        );
//        dispatch(mailActions.setSentDelete(emailId));
//      } catch (error) {
//        console.error("Error deleting email:", error);
//      }
//    };

  return (
    <div>
      <div className="flex justify-center h-96 bg-sky-100">
        {email ? (
          <div className=" bg-emerald-200 shadow-lg rounded-lg p-6 m-4 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">To: {email.sentEmail}</h1>
            <h2 className="text-xl font-semibold mb-2">
              Subject: {email.subject}
            </h2>
            <h3 className="text-gray-700 mb-4">Message:</h3>
            <p className="bg-gray-200 p-4 rounded-lg h-auto">{email.value}</p>
          </div>
        ) : (
          <p className="text-red-500 font-semibold">Email not found.</p>
        )}
      </div>
      <div className="flex justify-center items-end">
        <button className="bg-red-400 rounded-2xl p-3 hover:bg-red-600 text-white">
          <NavLink to="/Home/sent">Close</NavLink>
        </button>
        {/* <button
          className="bg-red-400 rounded-2xl p-3 hover:bg-red-600 text-white ml-4"
          onClick={() => deleteEmailHandler(emailId)}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default ReadSent;
