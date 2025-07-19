import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const UserTemplates = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserTemplates;
