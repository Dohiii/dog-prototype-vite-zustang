import { useState } from "react";
import styles from "../assets/styles/LoginPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authorisation.store";
import {
  Container,
  Box,
  Flex,
  Center,
  Text,
  Square,
  Button,
  Heading,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  FormControl,
} from "@chakra-ui/react";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { logIn, saveProfile, saveAccessToken } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const data: LoginData = { email, password };

    try {
      const res = await axios.post("/auth/login", data);

      saveAccessToken(res.data.user.accessToken);
      saveProfile(res.data.pfofileId);
      logIn();
      navigate("/dogs");
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <Container centerContent h={"93vh"} maxW={"xl"}>
        <form>
          <Flex
            w="400px"
            direction={"column"}
            align="center"
            justify={"center"}
          >
            <Heading marginTop={"20%"}>Login</Heading>

            <Input
              marginTop={"1rem"}
              placeholder="Email"
              size="md"
              onChange={(event) => setEmail(event.target.value)}
            />

            <InputGroup marginTop={"1rem"} size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              marginTop={"1rem"}
              colorScheme="teal"
              size="md"
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
          </Flex>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
