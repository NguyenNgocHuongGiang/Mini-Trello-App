import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";
import { checkLogin } from "../../utils/helpers";

const UserTemplates = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkLogin()) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserTemplates;
