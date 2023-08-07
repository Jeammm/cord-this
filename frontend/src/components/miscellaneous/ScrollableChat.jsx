import { Avatar, Box, Image, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";

const MessageWithAvatar = ({ message }) => {
  return (
    <Box
      display="flex"
      gap="12px"
      px={2}
      py={0.5}
      width="98%"
      mt="2px"
      _hover={{ bg: "#24262b" }}
    >
      <Avatar
        boxSize="45px"
        cur0or="pointer"
        name={message.sender.name}
        src={message.sender.picture}
        p={1}
      />
      <Box>
        <Text>{message.sender.name}</Text>
        <Text fontWeight={300} fontSize={14}>
          {message.content}
        </Text>
      </Box>
    </Box>
  );
};

const MessageWithOutAvatar = ({ message }) => {
  return (
    <Box
      display="flex"
      gap="12px"
      px={2}
      py={0.5}
      width="98%"
      mt="2px"
      color="transparent"
      _hover={{ color: "white", bg: "#24262b" }}
      alignItems="center"
    >
      <Text width="45px" fontSize="10px" fontWeight={300}>
        22:22 PM
      </Text>
      <Text fontWeight={300} fontSize={14} color="white">
        {message.content}
      </Text>
    </Box>
  );
};

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div key={message._id}>
            {isSameSender(messages, message, i, user._id) ||
            isLastMessage(messages, i, user._id) ? (
              <MessageWithAvatar message={message} />
            ) : (
              <MessageWithOutAvatar message={message} />
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
