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
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [pic, setPic] = useState();
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const postDetail = (pics) => {
    setUploading(true);
    if (pics === undefined) {
      toast({
        title: "Error!",
        description: "Please Select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "cord-this");
      fetch("https://api.cloudinary.com/v1_1/dath5vgvt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    } else {
      toast({
        title: "Error!",
        description: "Please Select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
    }
  };

  const submitHandler = async () => {
    setUploading(true);
    if (!name || !email || !password || !cfPassword) {
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

    if (password !== cfPassword) {
      toast({
        title: "Password do not match.",
        description: "Please re-enter password confirmation.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Successful!",
        description: "Registeration successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUploading(false);
      history.push("/chats");
    } catch (e) {
      toast({
        title: e,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUploading(false);
    }
  };

  return (
    <VStack spacing="5px" color="white">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-assword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showpassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => setCfPassword(e.target.value)}
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

      <FormControl id="picture">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(e) => postDetail(e.target.files[0])}
        />
      </FormControl>

      <Button
        bg="#7289da"
        width="100%"
        mt={15}
        onClick={submitHandler}
        isLoading={uploading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
