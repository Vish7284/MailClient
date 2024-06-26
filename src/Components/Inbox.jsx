import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mail";
import MessageRead from "./MessageRead";
import useFetch from "../CustomHooks/useFetch";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Inbox = () => {
  const smails = useSelector((state) => state.mails.mails);
  const cleanEmail = localStorage.getItem("cleanEmail");
  // const [loading, setIsLoading] = useState(false);
  // const [selectedEmail, setSelectedEmail] = useState(null);
  const dispatch = useDispatch();
const { data, loading, error } = useFetch(
  `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/Inbox.json`,{},5000);
  
  useEffect(() => {
    if (data) {
      dispatch(mailActions.setMails(data));
    }
    console.log("effect");
  }, [ data,dispatch]);

//    

  const markAsReadHandler = async (email) => {
    try {
      await fetch(
        `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/Inbox/${email.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ read: true }),
        }
      );
      dispatch(mailActions.markAsRead(email.id));
      
    } catch (error) {
      console.error("Error updating email status:", error);
    }
  };

  const deleteEmailHandler = async (emailId) => {
    try {
      await fetch(
        `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/Inbox/${emailId}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch(mailActions.setDelete(emailId));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  // const closeModalHandler = () => {
  //   setSelectedEmail(null); // Close the modal
  // };

  return (
    <div className="bg-sky-100 flex justify-center items-center">
      <div className="m-4">
        <h2 className="text-center font-bold">Inbox</h2>
        {loading ? (
          <p>Loading...</p>
        ) : smails.length === 0 ? (
          <p>No inbox emails found.</p>
        ) : (
          <ul className="m-4">
            {smails.map((email) => (
              <li
                key={email.id}
                className="flex justify-between bg-cyan-300 rounded-lg mb-4 hover:shadow-2xl p-4 space-x-4"
              >
                <NavLink to={`/Home/Inbox/${email.id}`}>
                  <div
                    className="flex space-x-4"
                    onClick={() => markAsReadHandler(email)}
                  >
                    {!email.read && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full m-2"></span>
                    )}
                    <div>
                      <p>From: {email.senderEmail}</p>
                      <h3>Subject: {email.subject}</h3>
                      <p>Message: {email.value}</p>
                    </div>
                  </div>
                </NavLink>
                <button
                  className="bg-red-500 p-2 rounded-2xl text-white"
                  onClick={() => deleteEmailHandler(email.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* {selectedEmail && (
          <MessageRead email={selectedEmail} onClose={closeModalHandler} />
        )} */}
      </div>
    </div>
  );
};

export default Inbox;
