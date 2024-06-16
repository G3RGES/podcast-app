import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCallBack = (res) => {
    // console.log("Encoded token:" + res.credential);//*TESTING
    let user = jwtDecode(res.credential);
    // console.log(user);//*TESTING
    setUser(user);
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setUser({});
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "107023321751-1pol1c8vftuek7gr9ai58q56c6dle35i.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(document.getElementById("SignIn"), {
      theme: "outline",
      size: "large",
    });
  }, [loggedIn]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl text-center font-semibold mt-3 py-2">
          Podcasts
        </h1>

        {loggedIn ? (
          <>
            <button
              className="border py-1 px-3 rounded-lg bg-blue-500 text-white font-semibold my-2"
              onClick={handleLogOut}
            >
              Log out
            </button>
            <h3>HI there, {user.given_name}</h3>
          </>
        ) : (
          <>
            <div id="SignIn"></div>
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
