import { useEffect, useState, useRef } from "react";

import { jwtDecode } from "jwt-decode";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const signInButton = useRef();

  const handleCallBack = (res) => {
    // console.log("Encoded token:" + res.credential);//*TESTING
    let user = jwtDecode(res.credential);
    // console.log(user);//*TESTING
    setUser(user);
    setLoggedIn(true);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "107023321751-1pol1c8vftuek7gr9ai58q56c6dle35i.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(signInButton.current, {
      theme: "outline",
      size: "large",
    });
  }, [loggedIn]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        signInButton={signInButton}
      />
    </UserContext.Provider>
  );
}

export default App;
