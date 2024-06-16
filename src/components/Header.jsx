import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Header = ({ loggedIn, setLoggedIn }) => {
  const [user, setUser] = useContext(UserContext);

  const handleLogOut = () => {
    setLoggedIn(false);
    setUser({});
  };

  return (
    <>
      {loggedIn ? (
        <>
          <div className="flex flex-row items-center justify-center">
            <img
              className="w-14 rounded-full mr-2"
              src={user.picture}
              alt="user_img"
            />
            <button
              className="border py-1 px-3 rounded-lg bg-blue-500 text-white font-semibold my-4"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
          <h1 className="text-3xl font-medium text-center">
            Hi there, {user.given_name}
          </h1>
        </>
      ) : (
        <div className="mt-8">
          <div id="SignIn"></div>
        </div>
      )}
      <h1 className="text-5xl text-center font-semibold mt-3 py-2">
        Podcasts App
      </h1>
    </>
  );
};

export default Header;
