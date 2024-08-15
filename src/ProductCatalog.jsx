// ProductCatalog.jsx
import React, { useEffect, useState } from "react";
import data from "../db.json";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import NavBar from "./NavBar";

function ProductCatalog({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/liquors")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Call addToCart function with the selected product
    console.log("Cart items:", cartItems);
  };

  function handleSearchInput(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.type.toLowerCase().includes(searchTerm)
  );

  const productsCard = filteredProducts.map((product) => (
    <div className="card" key={product.id}>
      <div className="card-inner">
        <div className="card-front">
          <Heading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight="extrabold"
            size="md"
            fontSize="2rem"
          >
            {product.brand}
          </Heading>
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="card-back">
          <Card
            maxW="sm"
            key={product.id}
            alignItems="center"
            justifyContent="center"
            borderRadius="20px"
          >
            <CardBody>
              <Heading
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="extrabold"
                size="md"
              >
                {product.brand}
              </Heading>
              <Text color="black">Type: {product.type}</Text>
              <Flex w="100%" h="350px">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  borderRadius="lg"
                  objectFit="cover"
                  w={"100vw"}
                />
              </Flex>

              <Text colorScheme="black">Volume: {product.volume_ml}ml</Text>
              <Text colorScheme="black">Price: $ {product.price_usd}</Text>
              <Text colorScheme="green">{product.availability}</Text>

              <Button
                variant="solid"
                colorScheme="red"
                w="200px"
                alignItems="center"
                justifyContent="center"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <NavBar onSearch={handleSearchInput} />
      <div className="cards-container">{productsCard}</div>
    </>
  );
}

export default ProductCatalog;
