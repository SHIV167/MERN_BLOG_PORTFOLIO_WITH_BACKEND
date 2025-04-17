import React from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Text,
  FormErrorMessage,
  useToast,
  Heading
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Contact = () => {
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: Yup.string()
      .min(5, 'Subject must be at least 5 characters')
      .max(100, 'Subject is too long'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .max(1000, 'Message is too long')
      .required('Message is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      await axios.post('/api/contact', values, config);
      
      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });

      resetForm();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading textAlign="center">Contact Us</Heading>
        <Text textAlign="center">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </Text>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            subject: '',
            message: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ width: '100%' }}>
              <VStack spacing={4}>
                <Field name="name">
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name}>
                      <FormLabel>Name</FormLabel>
                      <Input {...field} placeholder="Your name" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                <Field name="email">
                  {({ field }) => (
                    <FormControl isInvalid={errors.email && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Your email address" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                <Field name="subject">
                  {({ field }) => (
                    <FormControl isInvalid={errors.subject && touched.subject}>
                      <FormLabel>Subject</FormLabel>
                      <Input {...field} placeholder="Subject of your message" />
                      <FormErrorMessage>{errors.subject}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                <Field name="message">
                  {({ field }) => (
                    <FormControl isInvalid={errors.message && touched.message}>
                      <FormLabel>Message</FormLabel>
                      <Textarea {...field} placeholder="Your message" rows={6} />
                      <FormErrorMessage>{errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                >
                  Send Message
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </VStack>
    </Container>
  );
};

export default Contact;
