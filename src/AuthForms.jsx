import React, { useState } from 'react';
import { Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button } from '@chakra-ui/react';
import { Formik, 
    Form, 
    Field, 
    ErrorMessage } from 'formik';
import usersData from '../users.json';


function Login({ isOpen, onClose, setUser }) {
  const [error, setError] = useState(null);

  const handleLogin = (values) => {
    const { email, password } = values;
    const user = usersData.users.find(user => user.email === email && user.password === password);
    if (user) {
      setUser(user);
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter your details below</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" /><br /><br />
                <Field type="password" name="password" placeholder="Password" /><br /><br />
                <Button colorScheme='teal' type="submit" isLoading={isSubmitting}>Login</Button>
              </Form>
            )}
          </Formik>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </ModalBody>
        <ModalFooter>
          {'Bottoms Up!!'}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Signup({ isOpen, onClose, setUser }) {
  const handleSignup = (values) => {

    const { firstName, lastName, email, password } = values;
    const newUser = {
      id: usersData.users.length + 1,
      firstName,
      lastName,
      email,
      password
    };
    // Append the new user to the existing users.json file
    usersData.users.push(newUser);
    // Update the users.json file 
    console.log('New user signed up:', newUser);
    setUser(newUser);
    onClose();
    alert('Welcome ' + firstName + '! You have successfully signed up.');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Let&apos;s create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
            validate={(values) => {
              const errors = {};
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
              }
              return errors;
            }}
            onSubmit={handleSignup}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="firstName" placeholder="First Name" /><br /><br />
                <Field type="text" name="lastName" placeholder="Last Name" /><br /><br />
                <Field type="email" name="email" placeholder="Email" /><br /><br />
                <Field type="password" name="password" placeholder="Password" /><br /><br />
                <Field type="password" name="confirmPassword" placeholder="Confirm Password" /><br /><br />
                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                <Button colorScheme='teal' type="submit" isLoading={isSubmitting}>Sign Up</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          { 'Welcome! Lets get tipsy!'}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { Login, Signup };
