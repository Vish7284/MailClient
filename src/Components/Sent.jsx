import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { mailActions } from "../store/mail";
import MessageRead from "./MessageRead";
import useFetch from "../CustomHooks/useFetch";
const Sent = () => {

const smails = useSelector((state) => state.mails.sent);
  const cleanEmail = localStorage.getItem("cleanEmail");
//   const [loading, setIsLoading] = useState(false);
   const [selectedEmail, setSelectedEmail] = useState(null);
const dispatch = useDispatch();

const { data, loading, error } = useFetch(
  `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox.json`
);
useEffect(()=>{
    if(data){
        dispatch(mailActions.setSent(data))
    };
    console.log("sent effect");
},[data ,dispatch])
  
//     const fetchSentEmails = async () => {
//       setIsLoading(true); // Start loading
//       try {
//         const response = await fetch(
//           `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/sentBox.json`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch sent emails.");
//         }
//         const data = await response.json();
//         const loadedEmails = [];
//         for (const key in data) {
//           loadedEmails.push({
//             id: key, 
//             ...data[key],
//           });
//         }
// console.log(loadedEmails);
//         dispatch(mailActions.setSent(loadedEmails));
//       } catch (error) {
//         console.error("Error fetching sent emails:", error);
//       } 
//         setIsLoading(false); // End loading
      
//     };
// useEffect(() => {
//   fetchSentEmails();
// }, [cleanEmail, dispatch]);

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
          dispatch(mailActions.markSentRead(email.id))
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
     dispatch(mailActions.setSentDelete(emailId));
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
        <h2 className="text-center">Sent Box</h2>
        {loading ? (
          <p>Loading...</p>
        ) : smails.length === 0 ? (
          <p>No sent emails found.</p>
        ) : (
          <ul className="m-4">
            {smails.map((email) => (
              <li
                key={email.id}
                className="flex justify-between bg-cyan-300 rounded-lg mb-4 hover:shadow-2xl p-4 space-x-4"
              >
                <div
                  className="flex space-x-4"
                  onClick={() => markSentHandler(email)}
                >
                  {!email.read && (
                    <span className="h-2 w-2 bg-blue-500 rounded-full m-2"></span>
                  )}
                  <div>
                    <p>To: {email.sentEmail}</p>
                    <h3>Subject: {email.subject}</h3>
                    <p>Text: {email.value}</p>
                  </div>
                </div>
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
        {selectedEmail && (
          <MessageRead email={selectedEmail} onClose={closeModalHandler} />
        )}
      </div>
    </div>
  );
};

export default Sent;
