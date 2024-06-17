import { useEffect, useState, useRef } from "react";

import { jwtDecode } from "jwt-decode";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Episode from "./components/Episode";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);

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

  const rssFeed = "https://cdn.atp.fm/rss/public?yjnbwvb2";

  useEffect(() => {
    fetch(rssFeed)
      .then((res) => res.text())
      .then((str) => {
        const parser = new window.DOMParser();
        const data = parser.parseFromString(str, "text/xml");
        const itemList = data.querySelectorAll("item");
        const items = [];
        itemList.forEach((el) => {
          items.push({
            title: el.querySelector("title").innerHTML,
            pubDate: new Date(el.querySelector("pubDate").textContent),
            mp3: el.querySelector("enclosure").getAttribute("url"),
            link: el.querySelector("link").innerHTML,
          });
        });
        setData(items);
      });
  }, [rssFeed]);

  // console.log(data); //*TESTING

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        signInButton={signInButton}
      />
      {data.map((ep, idx) => (
        <>
          <Episode
            key={idx}
            title={ep.title}
            pubDate={ep.pubDate}
            mp3={ep.mp3}
            link={ep.link}
          />
        </>
      ))}
    </UserContext.Provider>
  );
}

export default App;
