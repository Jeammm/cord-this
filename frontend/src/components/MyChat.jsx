import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./miscellaneous/ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChat = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error loading chat",
        // description: "Logged out successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    console.log(selectedChat);
  }, [fetchAgain]);

  const selectChatHandler = (chat) => {
    setSelectedChat(chat);
    localStorage.setItem("currentChat", JSON.stringify(chat));
  };

  useEffect(() => {
    const currentChat = JSON.parse(localStorage.getItem("currentChat"));
    if (!currentChat) return;

    setSelectedChat(currentChat);
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#1e2124"
      w={{ base: "100%", md: "31%" }}
      borderRadius="5px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "12px", md: "10px", lg: "12px" }}
            px={2}
            rightIcon={<AddIcon />}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        // bg="#36393e"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => selectChatHandler(chat)}
                cursor="pointer"
                bg={selectedChat?._id === chat?._id ? "#7289da" : "#36393e"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {!chat.isGroupChat ? (
                  <>
                    <Text>{getSender(loggedUser, chat.users)}</Text>
                    <Text fontSize="12px">
                      {chat.latestMessage
                        ? chat.latestMessage.content
                        : "Start chatting"}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text>{chat.chatName}</Text>
                    <Text fontSize="12px">
                      {chat.latestMessage
                        ? `${chat.latestMessage.sender.name} : ${chat.latestMessage.content}`
                        : "Start chatting"}
                    </Text>
                  </>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
