import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import calendarIcon from "../../../images/icon.svg";

export const DatePickerContainer = styled.div`
  position: relative;

  .react-datepicker {
    border: 1px solid #ccc;
  }

  .react-datepicker__input-container input {
    background: #424242;
    width: 301px;
    height: 57px;
    position: relative;
    padding-top: 16px;
    padding-left: 18px;
    padding-bottom: 17px;
    color: white;
  }

  .datepicker-icon {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    width: 24px;
    height: 22px;
    background-image: url(${calendarIcon});
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
  }
`;