"use client";
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100dvh;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  padding: 0;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const LoginInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export const LoginButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
