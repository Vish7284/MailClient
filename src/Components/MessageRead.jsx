import React from "react";
import ReactDom from "react-dom";

const ModalOverlays = (props) => {
  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">{props.email.subject}</h2>
        <p className="mb-4">
          <strong>From:</strong> {props.email.sentEmail}
        </p>
        <p>{props.email.value}</p>
        <button
          className="mt-4 bg-red-500 text-white p-2 rounded"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const portalPlace = document.getElementById("modal");

const MessageRead = (props) => {
  return (
    <div>
      {ReactDom.createPortal(
        <ModalOverlays email={props.email} onClose={props.onClose} />,
        portalPlace
      )}
    </div>
  );
};

export default MessageRead;
