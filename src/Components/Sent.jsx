import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { mailActions } from "../store/mail";
import MessageRead from "./MessageRead";
const Sent = () => {
//   const [smails, setEmails] = useState([]);
const smails = useSelector((state) => state.mails.mails);
  const cleanEmail = localStorage.getItem("cleanEmail");
  const [loading, setIsLoading] = useState(false);
   const [selectedEmail, setSelectedEmail] = useState(null);
const dispatch = useDispatch()
  useEffect(() => {
    const fetchSentEmails = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sent emails.");
        }
        const data = await response.json();
        const loadedEmails = [];
        for (const key in data) {
          loadedEmails.push({
            id: key, 
            ...data[key],
          });
        }

        dispatch(mailActions.setMails(loadedEmails));
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      } 
        setIsLoading(false); // End loading
      
    };

    fetchSentEmails();
  }, [cleanEmail]);

const markSentHandler =async(email)=>{
    try {
        const response = await fetch(
          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox/${email.id}.json`,{
            method:"PATCH",
            body:JSON.stringify({read : true}),
            headers:{
                "Content-Type":"application/json"
            }
          });
          dispatch(mailActions.markAsRead(email.id))
        setSelectedEmail(email)
    } catch (error) {
        console.log(error);
    }
}
 const deleteEmailHandler = async (emailId) => {
   try {
     await fetch(
       `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox/${emailId}.json`,
       {
         method: "DELETE",
       }
     );
     dispatch(mailActions.setDelete(emailId));
   } catch (error) {
     console.error("Error deleting email:", error);
   }
 };
const closeModalHandler =()=>{
    setSelectedEmail(null)
}
  return (
    <div className="bg-sky-100 flex justify-center items-center">
      <div className="m-4">
        <h2 className="text-center">Sent Emails</h2>

        {loading ? (
          <p>Loading...</p>
        ) : smails.length === 0 ? (
          <p>No sent emails found.</p>
        ) : (
          <ul className="m-4">
            {smails.map((email) => (
              <li
                key={email.id}
                className="flex justify-between space-x-3 bg-cyan-300 rounded-lg mb-4 hover:shadow-2xl p-4"
              >
                <div
                  className="flex space-x-4"
                  onClick={() => markSentHandler(email)}
                >
                  {!email.read && (
                    <span className="h-2 w-2 bg-blue-500 rounded-full m-2"></span>
                  )}
                  <div>
                    <p>From: {email.sentEmail}</p>
                    <h3>Subject: {email.subject}</h3>
                    <p>Text: {email.value}</p>
                  </div>
                </div>
                <button className="rounded-2xl p-2 bg-red-500 " onClick ={()=> deleteEmailHandler(email.id)}>Delete</button>
                <hr />
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

export default Sent;
