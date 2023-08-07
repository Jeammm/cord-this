import { CloseIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="2xl"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="5px"
      bg="#424549"
      _hover={{
        background: "#7289da",
      }}
    >
      <Image boxSize="25px" borderRadius="full" src={user.picture} />
      <Text fontSize="sm">{user.name}</Text>
      {/* <CloseIcon fontSize="10px"/> */}
    </Box>
  );
};

export default UserBadgeItem;
