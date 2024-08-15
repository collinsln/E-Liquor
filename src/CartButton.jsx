import React, { useState } from "react";
import {
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

function CartButton({ cartCount, selectedProducts, removeFromCart }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentOpen, setPaymentOpen] = useState(false); // State for payment modal

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price_usd; 
    });
    setTotalPrice(total);
  };

  // Function to remove a single item from the cart
  const handleRemoveFromCart = (index) => {
    const updatedProducts = [...selectedProducts]; 
    updatedProducts.splice(index, 1); 
    removeFromCart(updatedProducts); 
    calculateTotalPrice(); 
  };

  //Clear Cart
  const handleClearCart = () => {
    setTotalPrice(0); 
    onClose(); 
    removeFromCart([]);
  };

  // Open payment modal
  const handlePay = () => {
    setPaymentOpen(true);
  };

  // Close payment modal
  const closePaymentModal = () => {
    setPaymentOpen(false);
  };

  return (
    <>
      <Button id="cart" colorScheme="teal" variant="solid" onClick={onOpen}>
        Cart <Badge ml={1} colorScheme="black">{cartCount}</Badge>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Cart ({cartCount}) Drinks</ModalHeader>
          <ModalCloseButton />
            <ModalBody> {/** Remove from cart**/}
              <ul style={{ listStyleType: 'none', padding: 0 }}> 
                {selectedProducts.map((product, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}> 
                    <div style={{ marginRight: 'auto' }}>{product.brand} - {product.name}</div> 
                    <div>${product.price_usd}</div> 
                    <Button colorScheme="red" size="sm" variant="ghost" onClick={() => handleRemoveFromCart(index)}>X</Button>
                  </li>
                ))}
              </ul>
            </ModalBody> 
          <ModalFooter>
            <Button colorScheme="green" variant="ghost" mr={3} onClick={calculateTotalPrice}>
              Add Total
            </Button>
            <div>Price: ${totalPrice.toFixed(2)}</div>
            <Button colorScheme="green" variant="outline" mr={3} onClick={handlePay}>
              Pay
            </Button>
            <Button colorScheme="red" onClick={handleClearCart}>
              Clear Cart
            </Button>
            {/**<Button colorScheme="yellow" mr={3} onClick={onClose}>
              Close
            </Button>**/}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentOpen} onClose={closePaymentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul>
              <Button colorScheme="green">M-Pesa</Button><br /> <br />
              <Button colorScheme="blue">PayPal</Button><br /> <br />
              <Button colorScheme="orange">Credit / Debit Card</Button>
              {/* Add more payment methods as needed */}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={closePaymentModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CartButton;
