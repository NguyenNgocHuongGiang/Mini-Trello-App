import { Button } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../utils/configApi";
import { toast } from "react-toastify";
import { checkLogin } from "../../../utils/helpers";

const EmailVerification = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataLogin = {
      email,
      verificationCode,
    };
    try {
      const response = await api.post("auth/signin", dataLogin);
      localStorage.setItem("authInfo", JSON.stringify(response.data));
      if(checkLogin()){
        navigate("/");
      }
      toast.success("Login successfull");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white px-8 py-4 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-medium">Email Verification</h1>
      <p className="text-xs text-gray-500 my-4">
        Please enter your code that send to your email address
      </p>
      <form className="w-full" onSubmit={handleLogin}>
        <input
          type="text"
          required
          placeholder="Enter code verification"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <Button className="w-full !py-5" type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmailVerification;
