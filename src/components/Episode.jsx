import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Episode = ({ title, pubDate, mp3, link }) => {
  const [user] = useContext(UserContext);

  return (
    <div
      className="flex flex-row items-center justify-around
     border rounded-lg pl-2 pr-2 my-4"
    >
      <div
        className="pl-2 mt-2 mb-4 border w-3/4 max-w-2xl py-2 px-5
     rounded-lg flex flex-col justify-between"
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-70 flex flex-row items-start justify-start"
        >
          <p>{title}</p>
        </a>
        <audio src={mp3} controls className="my-4 w-full px-2" />
        <p className="text-center font-medium">{pubDate}</p>
      </div>
      <div className="flex flex-col gap-3 my-1">
        <label htmlFor="notes" className="font-semibold text-gray-800 ">
          Make Note
        </label>
        <textarea
          id="notes"
          placeholder={
            "what did you learn from the episode " +
            `${user.given_name}` +
            " " +
            "?"
          }
          className="border rounded-md p-2 focus:outline-none"
          rows={5}
          cols={50}
        />
      </div>
    </div>
  );
};

export default Episode;
