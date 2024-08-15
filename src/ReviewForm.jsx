import { useState } from "react";
import { Button, Textarea, VStack, Heading, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Divider, Box } from "@chakra-ui/react";

function ReviewForm({ onSubmit, user, reviews }) {
  const [reviewText, setReviewText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    if (user) {
      onSubmit(reviewText, user);
      setIsOpen(true);
      setReviewText("");
    } else {
      alert("You need to log in or sign up to leave a review.");
    }
  };

  const onClose = () => setIsOpen(false);

  return (
    <VStack align="flex-start" spacing={4}>
      <Heading size="md">We Value Your Feedback</Heading>
      <Textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={handleChange}
      />
      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit Review
      </Button>

      {reviews && reviews.length > 0 && (
        <>
          <Divider />
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <VStack align="flex-start" spacing={2} p={4}>
              <Heading size="md">Customer Reviews</Heading>
              {reviews.map((review, index) => (
                <Box key={index} borderWidth="1px" borderRadius="md" p={2}>
                  <p><strong>{review.user}</strong>: {review.text}</p>
                  <p><em>{review.timestamp}</em></p>
                </Box>
              ))}
            </VStack>
          </Box>
        </>
      )}

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Your Review has been submitted
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button colorScheme="teal" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
}

export default ReviewForm;

