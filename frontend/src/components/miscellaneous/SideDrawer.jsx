import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

import { ChatState } from "../../context/ChatProvider";
import { useEffect } from "react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("currentChat");
    history.push("/");
    toast({
      title: "Successful!",
      description: "Logged out successfully.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const searchHandler = async () => {
    if (!search) {
      toast({
        title: "Please provide name or email",
        // description: "Logged out successfully.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error while searching",
        // description: "Logged out successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      onClose();
      setSelectedChat(data);
      setSearch();
      setSearchResult();
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error while accessing chat",
        // description: "Logged out successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#1e2124"
        w="100%"
        p="5px 10px 5px 10px"
      >
        <Tooltip label="search User to chat" hasArrow placement="bottom-end">
          <Button bg="transparent" _hover={{ bg: "#424549" }} onClick={onOpen}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#ffffff" }}
            ></i>
            <Text display={{ base: "none", md: "flex" }} px="4" color="white">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl">Cord This</Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon color="white"/>}
              bg="#36393e"
              _hover={{ bg: "#424549" }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.picture}
              />
            </MenuButton>
            <MenuList bg="#36393e" p={0} borderColor="transparent">
              <ProfileModal user={user}>
                <MenuItem bg="#36393e" _hover={{ bg: "#424549" }}>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider m={0}/>
              <MenuItem bg="#36393e" _hover={{ bg: "#424549" }} onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#36393e" color="white">
          <DrawerHeader fontSize="2xl">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderWidth="0px"
                bg="#424549"
              />
              <Button onClick={searchHandler}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
