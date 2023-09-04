import styled from "styled-components";

export const Input = styled.input`
  background: #424242;
  color: white;
  padding-top: 16px;
  padding-left: 18px;
  padding-bottom: 17px;
  border: 1px solid #ccc;
  &.big_input{
    width: 525px;
    height: 57px;
  }
  &.small_input{
    width: 301px;
    height: 57px;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #424242 inset !important;
    -webkit-text-fill-color: white !important;
  }
`;