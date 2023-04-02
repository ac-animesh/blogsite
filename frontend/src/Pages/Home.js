import React from "react";
import Navbar from "../component/Navbar";
import useRefreshToken from "../hooks/useRefreshToken";
const Home = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <Navbar />
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Home;
