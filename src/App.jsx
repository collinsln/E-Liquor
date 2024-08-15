import { useState } from "react";
import { Button, Stack, ChakraProvider, Divider } from "@chakra-ui/react";
import "./App.css";
import ProductCatalog from "./ProductCatalog";
import { Login, Signup } from "./AuthForms";
import UserPage from "./UserPage";
import ReviewForm from "./ReviewForm";
import CartButton from "./CartButton";
import FooterContent from "./FooterContent";
import NavBar from "./NavBar";

function AuthButtons({ openLoginModal, openSignupModal, cartCount }) {
  return (
    <Stack direction="row" spacing={4} id="login">
      <Button colorScheme="teal" variant="solid" onClick={openLoginModal}>
        Login
      </Button>
      <Button colorScheme="teal" variant="solid" onClick={openSignupModal}>
        Sign Up
      </Button>
    </Stack>
  );
}

function App() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const openLoginModal = () => setLoginIsOpen(true);
  const closeLoginModal = () => setLoginIsOpen(false);
  const openSignupModal = () => setSignupIsOpen(true);
  const closeSignupModal = () => setSignupIsOpen(false);
  const handleLogout = () => setUser(null);

  const removeFromCart = (updatedProducts) => {
    setCartItems(updatedProducts);
  };

  const handleReviewSubmit = (reviewText, user) => {
    if (!user) {
      alert("You need to log in or sign up to leave a review.");
      return;
    }

    const newReview = {
      user: user.firstName + " " + user.lastName,
      text: reviewText,
      timestamp: new Date().toISOString(),
    };
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <ChakraProvider>
      <>
        <CartButton className="cart" cartCount={cartItems.length} selectedProducts={cartItems} removeFromCart={removeFromCart}/>
        <p>
          Everyday is a weekend if you&apos;re brave enough!
          <br />
          Cheers!!
        </p>
        <Stack className="stack" direction="row" spacing={4}>
          <AuthButtons
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
            // cartCount={cartItems.length}
          />
        </Stack>
        {user ? (
          <UserPage user={user} onLogout={handleLogout} />
        ) : (
          <>
            <Login
              isOpen={loginIsOpen}
              onClose={closeLoginModal}
              setUser={setUser}
            />
            <Signup
              isOpen={signupIsOpen}
              onClose={closeSignupModal}
              setUser={setUser}
            />
          </>
        )}
        <ProductCatalog addToCart={addToCart} />
        <Divider />
        <ReviewForm onSubmit={handleReviewSubmit} user={user} />
        <Divider />
        <h2>Customer Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>
              <strong>{review.user}</strong>: {review.text}
            </p>
            <p>
              <em>{review.timestamp}</em>
            </p>
          </div>
        ))}
        <FooterContent />
      </>
    </ChakraProvider>
  );
}

export default App;
