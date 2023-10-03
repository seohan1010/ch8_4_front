import { Outlet, useNavigation } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

const RootLayout = () => {



  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
