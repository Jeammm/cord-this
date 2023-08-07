import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChat from "../components/MyChat";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%", color: "white" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        h="91.5vh"
        p="10px"
        // color="white"
      >
        {user && (
          <MyChat fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
