import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import Login from "../components/Authen/Login";
import Signup from "../components/Authen/Signup";

export default function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"#424549"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        // borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Open Sans" color="white">
          Cord this
        </Text>
      </Box>
      <Box
        // display="flex"
        // justifyContent="center"
        p={4}
        bg={"#424549"}
        w="100%"
        borderRadius="lg"
        color="white"
      >
        <Tabs isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
