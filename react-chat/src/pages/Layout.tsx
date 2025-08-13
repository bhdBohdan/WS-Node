import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const Layout: React.FC = () => {
  return (
    <div className="mainPage">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
