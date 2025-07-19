import { Outlet } from "react-router-dom";

const AuthTemplates = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute bottom-0 left-0 hidden md:block w-1/3 max-w-xs">
        <img src="/img/login1.png" alt="left-illustration" className="w-full" />
      </div>

      <div className="z-10 w-full max-w-md bg-white shadow-md rounded-md px-8 py-16 text-center border border-gray-200">
        <Outlet />
        <p className="text-xs/5 text-gray-400 ">
          Private Policy <br />
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      <div className="absolute bottom-0 right-0 hidden md:block w-1/3 max-w-xs">
        <img
          src="/img/login2.png"
          alt="right-illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AuthTemplates;
