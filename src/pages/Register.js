import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      password
      token
    }
  }
`;

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const registerUserCallback = () => {
    console.log("Callback hit");
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { username, email, password, confirmPassword } = values;

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: { username, email, password } }
  });

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Register</h3>
      <p>This is the register page, register below to create an account!</p>

      <Stack spacing={2} paddingBottom={2}>
        <TextField size="small" label="Username" name="username" onChange={onChange} />
        <TextField size="small" label="Email" name="email" onChange={onChange} />
        <TextField size="small" label="Password" name="password" onChange={onChange} />
        <TextField size="small" label="Confirm password" name="confirmPassword" onChange={onChange} />
      </Stack>
      {errors.map((error) => (
        <Alert severity="error">{error.message}</Alert>
      ))}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
