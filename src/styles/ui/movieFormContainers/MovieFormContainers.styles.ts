import styled from "styled-components";

export const AddMovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: #232323;
  width: 976px;
  height: auto;
  padding: 40px 60px 0;
`;
export const FormColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-column-gap: 20px; 
`;