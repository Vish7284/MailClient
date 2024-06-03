import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mail";
import MessageRead from "./MessageRead";

const Inbox = () => {
  const smails = useSelector((state) => state.mails.mails);
  const unread = useSelector((state) => state.mails.unread);
  const cleanEmail = localStorage.getItem("cleanEmail");
  const [loading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInboxEmails = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/Inbox.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch inbox emails.");
        }
        const data = await response.json();
        console.log(data);
        const loadedEmails = [];
        for (const key in data) {
          loadedEmails.push({
            id: key,
            ...data[key],
          });
        }

        console.log(loadedEmails);
        dispatch(mailActions.setMails(loadedEmails));
      } catch (error) {
        console.error("Error fetching inbox emails:", error);
      }
      setIsLoading(false); // End loading
    };

    fetchInboxEmails();
  }, [cleanEmail, dispatch]);

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
       setSelectedEmail(email); 
     } catch (error) {
       console.error("Error updating email status:", error);
     }
   };
  const closeModalHandler = () => {
    setSelectedEmail(null); 
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center">
      <div className="m-4">
        <h2 className="text-center">Inbox</h2>
        {loading ? (
          <p>Loading...</p>
        ) : smails.length === 0 ? (
          <p>No inbox emails found.</p>
        ) : (
          <ul className="m-4">
            {smails.map((email) => (
              <li
                key={email.id}
                className="flex justify-start bg-cyan-300 rounded-lg mb-4 hover:shadow-2xl p-4 space-x-4"
                onClick={() => markAsReadHandler(email)}
              >
                {unread.includes(email.id) && (
                  <span className="h-2 w-2 bg-blue-500 rounded-full m-2"></span>
                )}
                <p>From: {email.sentEmail}</p>
                <h3>Subject: {email.subject}</h3>
                <p>Text: {email.value}</p>
              </li>
            ))}
          </ul>
        )}
        {selectedEmail && (
          <MessageRead email={selectedEmail} onClose={closeModalHandler} />
        )}
      </div>
    </div>
  );
};

export default Inbox;
