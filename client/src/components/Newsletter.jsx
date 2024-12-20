import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const baseUrl = "http://localhost:5000";
  const { user } = React.useContext(AuthContext);


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
          {/* <input
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full py-2 pl-3 border focus:outline-none"
            required
          /> */}
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
            type="submit"
            value="Upload your resume"
            className="block w-full py-2 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;