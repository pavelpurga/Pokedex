import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import groupIcon from "../../../images/Group.svg";

export const ModalOverlay = styled.div`
  position: absolute;
  background: #232323;
  width: 686px;
  height: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const ModalContent = styled.div`
  background-color: #232323;
  padding: 16px;
  position: relative;
`;
export const ModalIcon = styled.div`
  display: flex;
  justify-content: center;
  top: 42px;
  margin-left: 310px;
  margin-right: 310px;
  width: 66px;
  height: 66px;
  background-image: url(${groupIcon});
  background-size: cover;
`;

export const ModalTitle = styled.h2`
  margin-top: 31px;
  margin-bottom: 29px;
  display: flex;
  justify-content: center;
  color: #FFF;
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
export const ModalDescr = styled.p`
  color: #FFF;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: auto; 
  margin-left: 192px;
  margin-right: 192px;
`;
export const ModalDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 padding-top: 29px;
  color: white;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: #ccc;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;