import React, { useEffect, useState } from "react";

const Inbox = () => {
  const [smails, setEmails] = useState([]);
  const cleanEmail = localStorage.getItem("cleanEmail");
  const [loading, setIsLoading] = useState(false);

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
            id: key, // Using `id` instead of `name`
            ...data[key],
          });
        }

        console.log(loadedEmails);
        setEmails(loadedEmails);
      } catch (error) {
        console.error("Error fetching inbox emails:", error);
      } 
        setIsLoading(false); // End loading
      
    };

    fetchInboxEmails();
  }, [cleanEmail]);

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
            {smails.map((email, index) => (
              <li
                key={index}
                className="bg-cyan-300 rounded-lg mb-4 hover:shadow-2xl p-4"
              >
                <p>From: {email.sentEmail}</p>
                <h3>Subject: {email.subject}</h3>
                <p>Text: {email.value}</p>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Inbox;
