import { Button } from "antd";
import { useState } from "react";
import api from "../../../utils/configApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/send-code-signin", { email });
      navigate("/auth/email-verification", {
        state: { email },
      });
      toast.success(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white  px-8 py-4 flex flex-col justify-center items-center text-center">
      <img src="/img/logo.png" alt="logo" className="w-12 h-12 mb-4" />
      <h1 className="text-sm text-gray-800 font-medium mb-4">
        Log in to continue
      </h1>
      <form className="w-full" onSubmit={handleLogin}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full !py-5" type="primary" htmlType="submit">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Login;
