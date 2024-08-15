import React, { useState } from "react";
import {
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Link,
  Box,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function FooterComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAbove18, setIsAbove18] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleApplyNow = () => {
    if (!name || !email) {
      alert("Please enter your name and email address.");
      return;
    }

    if (!isAbove18) {
      alert("You must confirm that you are 18 or above to apply.");
      return;
    }

    setSuccessMessage("Application successful! We'll get back to you.");
  };

  return (
    <Flex
      as="footer"
      bgColor="gray.800"
      p={4}
      justify="space-between"
      align="center"
      direction={{ base: "column", md: "row" }}
    >

      <Box>
  <Text fontSize="sm" fontWeight="bold" color="teal">
    About Us!
  </Text>
  <Text fontSize="xs" color="white">
    At The Liqour Cave, we&apos;re all about good vibes and great deals.
  </Text>
  <Text fontSize="xs" color="white">
    Based in Nairobi, we specialize in offering a curated selection of the finest alcoholic beverages.
  </Text>
  <Text fontSize="xs" color="white">
    From premium spirits to craft beers, we&apos;ve got everything you need to elevate your drinking experience!
  </Text>
  </Box>

      <HStack spacing={4} mt={{ base: 4, md: 0 }}>
        <Link href="https://www.instagram.com/" isExternal>
          <FaInstagram boxSize={6} color="white" />
        </Link>
        <Link href="https://www.facebook.com/" isExternal>
          <FaFacebook boxSize={6} color="white" />
        </Link>
        <Link href="https://twitter.com/" isExternal>
          <FaTwitter boxSize={6} color="white" />
        </Link>
      </HStack>

      <Flex direction="column" alignItems="flex-end" mt={{ base: 4, md: 0 }}>
        <Text fontSize="sm" fontWeight="bold" color="white">
          Join Our Community
        </Text>
        <Button colorScheme="teal" onClick={handleOpen} size="sm">
          Join Now
        </Button>
      </Flex>

     
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Let’s work together!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {successMessage ? (
              <Text fontSize="lg" textAlign="center" color="green.500">
                {successMessage}
              </Text>
            ) : (
              <>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Checkbox
                    isChecked={isAbove18}
                    onChange={(e) => setIsAbove18(e.target.checked)}
                  >
                    I confirm that I am 18 years or above.
                  </Checkbox>
                </VStack>
                <Button
                  colorScheme="teal"
                  size="lg"
                  width="100%"
                  mt="4"
                  onClick={handleApplyNow}
                >
                  Apply now
                </Button>
              </>
            )}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="teal" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default FooterComponent;

