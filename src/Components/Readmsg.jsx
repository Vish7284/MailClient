import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

const Readmsg = () => {
  const { emailId } = useParams();
  const email = useSelector((state) =>
    state.mails.mails.find((mail) => mail.id === emailId)
  );

  return (
    <div className="flex justify-center h-96 bg-sky-100">
      {email ? (
        <div className=" bg-emerald-200 shadow-lg rounded-lg p-6 m-4 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">From: {email.senderEmail}</h1>
          <h2 className="text-xl font-semibold mb-2">
            Subject: {email.subject}
          </h2>
          <h3 className="text-gray-700 mb-4">Message:</h3>
          <p className="bg-gray-200 p-4 rounded-lg h-48">{email.value}</p>
        </div>
      ) : (
        <p className="text-red-500 font-semibold">Email not found.</p>
      )}
    </div>
  );
};

export default Readmsg;
