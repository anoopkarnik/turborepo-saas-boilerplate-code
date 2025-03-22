"use client";

import React from "react";

const CrispChat = () => {
  return (
    <iframe
      src="https://go.crisp.chat/chat/embed/?website_id=c4503e9a-7d2a-4780-8a46-73fe9ea2acbb"
      width="100%"
      height="600px"
      style={{
        border: "none",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
      allow="clipboard-write"
    ></iframe>
  );
};

export default CrispChat;
