import styled from "styled-components";

export const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 60px;
  padding-top: 60px;
  position: relative;
`;

export const Button = styled.button`
  background-color: black;
  color: #F65261;
  border: 2px solid #F65261;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 182px;
  height: 57px;
  margin-left: 13px;
  &:hover {
    background-color: #F65261;
    color: white;
  }
  
`;