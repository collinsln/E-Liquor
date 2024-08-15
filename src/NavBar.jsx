import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import usersData from "../users.json";
import CartButton from "./CartButton";

function NavBar({ onSearch }) {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("blue.200", "blue.500");
  const color = useColorModeValue("gray.800", "white");

  const handleLogin = (values, { setSubmitting }) => {
    const { email, password } = values;
    const user = usersData.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // Mocking setUser function since it's not passed here
      console.log("Logged in successfully:", user);
      setLoginIsOpen(false);
      setSubmitting(false);
    } else {
      setError("Invalid email or password");
      setSubmitting(false);
    }
  };

  const handleSignup = (values, { setSubmitting }) => {
    const { firstName, lastName, email, password } = values;
    const newUser = {
      id: usersData.users.length + 1,
      firstName,
      lastName,
      email,
      password,
    };
    // Mocking setUser function since it's not passed here
    console.log("New user signed up:", newUser);
    setSignupIsOpen(false);
    setSubmitting(false);
    alert("Welcome " + firstName + "! You have successfully signed up.");
  };

  return (
    <>
      <Box className="navbar" mb={4} bg={bg} color={color}>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          size="md"
          fontSize="2rem"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://i.pinimg.com/474x/8a/74/10/8a741009f63f8d61e97517f83a4b8131.jpg"
              alt="Icon"
              style={{
                marginRight: "10px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
            The Liquor Cave
          </div>
        </Heading>
        <InputGroup marginY={"10"} w={"70"}>
          <InputLeftElement pointerEvents="none" marginRight={"4"}>
            <SearchIcon color="#f310e4" />
          </InputLeftElement>
          <Input
            onChange={onSearch}
            type="text"
            placeholder="Search for liquor..."
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight="extrabold"
          />
        </InputGroup>
        <ButtonGroup></ButtonGroup>
      </Box>

      {/* Login Modal */}
      <Modal isOpen={loginIsOpen} onClose={() => setLoginIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your details below</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="email" name="email" placeholder="Email" />
                  <br /> <br />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <br /> <br />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <Button type="submit" isLoading={isSubmitting}>
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </ModalBody>
          <ModalFooter>{"Bottoms Up!!"}</ModalFooter>
        </ModalContent>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={signupIsOpen} onClose={() => setSignupIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Let's create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors = {};
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Passwords do not match";
                }
                return errors;
              }}
              onSubmit={handleSignup}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <br /> <br />
                  <Field type="text" name="lastName" placeholder="Last Name" />
                  <br /> <br />
                  <Field type="email" name="email" placeholder="Email" />
                  <br /> <br />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <br /> <br />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <br /> <br />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <Button type="submit" isLoading={isSubmitting}>
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>{"Welcome! Let's get tipsy!"}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NavBar;