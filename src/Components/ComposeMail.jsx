import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
const ComposeMail = () => {
  const [sentEmail, setSentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const userEmailId = useSelector((state) => state.auth.userId);
//   console.log(userEmailId);
//   const cleanEmail = userEmailId.replace(/[@.]/g,"")
//   console.log(cleanEmail);
  const sentEmailChangeHandler = (e) => {
    setSentEmail(e.target.value);
  };
  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const editorChangeHandler = (editorState) => {
    setEditorState(editorState);
  };

  const formSenderHandler = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    const sendingEmailData = {
      sentEmail,
      subject,
      htmlContent,
    };
    console.log(sendingEmailData);
    const sendingData = async()=>{
        const cleanEmail = localStorage.getItem("cleanEmail");
        const reciverCleanEmail = sentEmail.replace(/[@.]/g,"")
        console.log(cleanEmail);
        try {
            const response = await fetch(
              `https://mailclient-dfad8-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/${reciverCleanEmail}.json`,{
                method:"POST",
                body:JSON.stringify(sendingEmailData),
                headers :{
                    "Content-Type":"application/json"
                }
              }
            );
            if(!response.ok){
                const errmail = await response.json();
                throw new Error("nhi hua firebase pe save ",errmail)
            }
            const dataSent = await response.json();
            console.log(dataSent);

        } catch (error) {
            console.log(error);
        }
    }

    sendingData();
    setEditorState(EditorState.createEmpty());
    setSubject("");
    setSentEmail("");
  };
  return (
    <div>
      <div className="m-8 bg-slate-200">
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
              type="text"
              placeholder="Subject Matter"
              className="w-full border-b-2  border-purple-400 p-3 rounded-xl"
              value={subject}
              onChange={subjectChangeHandler}
            />
          </div>
          <div className="w=full p-4">
            {/* <textarea  className="w-full h-full"/> */}
            <Editor
              toolbarClassName="border-b border-gray-300 mb-2"
              editorClassName="p-4 border border-gray-300 min-h-[400px]"
              wrapperClassName="border border-gray-300"
              editorState={editorState}
              onEditorStateChange={editorChangeHandler}
            />
          </div>
          <div className="flex justify-between p-4 text-center  ">
            <button className="rounded-2xl p-4 bg-sky-200 hover:bg-sky-700">
              Send
            </button>
            <button className="rounded-2xl p-4 bg-rose-200 hover:bg-rose-700">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeMail;
