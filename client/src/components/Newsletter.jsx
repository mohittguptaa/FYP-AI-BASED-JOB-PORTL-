import React, { useState, useContext } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Newsletter = () => {
  const baseUrl = "http://localhost:5000";
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pdfFile) {
      console.log("The PDF has been submitted.");
      setShowModal(false);
      setPdfFile(null);
    }
  };

  const sendEmail = async () => {
    let dataSend = { email: user.email };
    console.log(dataSend);

    try {
      const res = await fetch(`${baseUrl}/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Send Successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div>
      <div>
        <h3 className="flex items-center gap-2 mb-2 text-lg font-bold">
          <FaEnvelopeOpenText /> Email me for jobs
        </h3>
        <p className="mb-4 text-base text-primary/75">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <div className="w-full space-y-4">
          <input
            onClick={sendEmail}
            type="submit"
            value="Subscribe"
            className="block w-full py-2 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />
        </div>
      </div>

      {/* Second section */}
      <div className="mt-20">
        <h3 className="flex items-center gap-2 mb-2 text-lg font-bold">
          <FaRocket /> Get noticed faster
        </h3>
        <p className="mb-4 text-base text-primary/75">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea foes.
        </p>
        <div className="w-full space-y-4">
          <input
            onClick={handleButtonClick}
            type="submit"
            value="Upload your resume"
            className="block w-full py-2 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />

{showModal && (
  <div className="modal">
    <div className="modal-content">
      {/* Close button for the modal */}
      <span className="close" onClick={handleCloseModal}>
        &times;
      </span>

      {/* File submission form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pdf-upload" className="form-label">
            Upload your PDF:
          </label>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit PDF
        </button>
      </form>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;




