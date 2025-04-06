"use client";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  min-height: 100dvh;
  grid-template-rows: auto 1fr;
`;

export const HeaderContainer = styled.div`
  background-color: #f4f5f7;
  padding: 16px;
  display: flex;
  position: sticky;
  justify-content: space-between;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
`;
