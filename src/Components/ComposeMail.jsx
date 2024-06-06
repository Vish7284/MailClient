import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/mail";
const ComposeMail = (props) => {
  const [sentEmail, setSentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const sentEmailChangeHandler = (e) => {
    setSentEmail(e.target.value);
  };
  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };

  const formSenderHandler = (e) => {
    e.preventDefault();
    const quillEditor = document.querySelector(".ql-editor");
    const plainText = quillEditor.innerText;
    let senderEmail = JSON.parse(localStorage.getItem("cleanEmail"));
    const sendingEmailData = {
      sentEmail,
      senderEmail,
      subject,
      value: plainText,
      read: false,
    };

    console.log(sendingEmailData);
    const sendingData = async () => {
      const reciverCleanEmail = JSON.stringify(sentEmail.replace(/[@.]/g, ""));
      //   localStorage.setItem("receiver",JSON.stringify(reciverCleanEmail))
      //   console.log(reciverCleanEmail);
      try {
        const response = await fetch(
          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${senderEmail}/sentBox.json`,
          {
            method: "POST",
            body: JSON.stringify(sendingEmailData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errmail = await response.json();
          throw new Error("nhi hua firebase pe save ", errmail);
        }
        const dataSent = await response.json();
        // console.log(sentEmail);
        dispatch(
          mailActions.sendMail({
            mails: dataSent,
            receiverId: sentEmail,
            sent: dataSent,
          })
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(
          `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${reciverCleanEmail}/Inbox.json`,
          {
            method: "POST",
            body: JSON.stringify(sendingEmailData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errmail = await response.json();
          throw new Error("nhi hua firebase pe save ", errmail);
        }
        const dataSent = await response.json();
        console.log(sentEmail);
        dispatch(mailActions.sendMail({ mails: dataSent, id: sentEmail }));
      } catch (error) {
        console.log(error);
      }
    };

    sendingData();

    setSubject("");
    setSentEmail("");
    setValue("");
  };
  return (
    <div>
      <div className="m-4 bg-slate-200 rounded-2xl">
        <form onSubmit={formSenderHandler}>
          <div className="p-4 w-full">
            {/* <label htmlFor="emailsender">to:</label> */}
            <input
              type="email"
              id="emailsender"
              placeholder="To:"
              className="w-full border-b-2 p-3 border-purple-400 rounded-xl"
              value={sentEmail}
              onChange={sentEmailChangeHandler}
              required
            />
          </div>
          <div className="p-4">
            <input
              id="subject"
              type="text"
              placeholder="Subject Matter"
              className="w-full border-b-2  border-purple-400 p-3 rounded-xl"
              value={subject}
              onChange={subjectChangeHandler}
            />
          </div>
          <div className=" p-4">
            {/* <textarea  className="w-full h-full"/> */}
            <ReactQuill value={value} onChange={setValue} id="editor" />
          </div>
          <div className=" p-4 text-center  ">
            <button className="rounded-2xl p-4 bg-sky-200 hover:bg-sky-700 w-full">
              Send
            </button>
          </div>
        </form>
        <div className="p-4 text-center">
          <button
            className="rounded-2xl p-4 bg-rose-200 hover:bg-rose-700 w-full"
            onClick={() => props.onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeMail;
