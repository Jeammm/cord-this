import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const {setUser} = ChatState()

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async () => {
    setUploading(true);
    if (!email || !password) {
      toast({
        title: "Error!",
        description: "Please Fill all the Fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Successful!",
        description: "Login successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data)
      setUploading(false);

      history.push("/chats");
    } catch (e) {
      toast({
        title: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
    }
  };

  return (
    <VStack spacing="5px" color="white">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={showpassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement mr="0.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              p="0 1rem"
              bg="transparent"
              color="white"
              _hover={{}}
              _active={{ bg: "#7289da" }}
            >
              {showpassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        bg="#7289da"
        width="100%"
        mt={15}
        isLoading={uploading}
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        bg="#7289da"
        width="100%"
        mt={15}
        onClick={() => {
          setEmail("ayotest.gmail.com");
          setPassword("123456password");
        }}
      >
        Get Guest Credential
      </Button>
    </VStack>
  );
};

export default Login;
