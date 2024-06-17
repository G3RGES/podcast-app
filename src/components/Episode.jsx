import React from "react";

const Episode = ({ title, pubDate, mp3, link }) => {
  return (
    <div
      className="pl-2 mt-2 mb-4 border w-3/4 max-w-2xl py-2 px-5
     rounded-lg flex flex-col  justify-between"
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
      <p className="text-center">{pubDate}</p>
    </div>
  );
};

export default Episode;
