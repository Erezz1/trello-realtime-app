import styled from "styled-components";

export const TaskCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;
`;

export const TaskTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
`;

export const TaskDescription = styled.p`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 4px;
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
