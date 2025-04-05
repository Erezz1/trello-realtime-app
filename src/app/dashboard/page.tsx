"use client";
import { Board } from "@/components/Board";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
`;

const HeaderContainer = styled.div`
  background-color: #f4f5f7;
  padding: 16px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <HeaderContainer>
        <h1>Tablero</h1>
      </HeaderContainer>
      <Board />
    </DashboardContainer>
  );
};

export default Dashboard;
