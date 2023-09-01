import React, {useState} from 'react';
import {ROUTES} from "../../entitysData/constants/API_ROUTS";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/AddMovie.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import calendarIcon  from "../../images/icon.svg"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fillDownIcon from "../../images/FillDown.svg"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fillUpIcon from "../../images/FillUp.svg"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import groupIcon from "../../images/Group.svg"

interface FormData {
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: string;
  genre: string;
  runtime: string;
  overview: string;
}


const AddMovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 917px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: #232323;
  width: 976px;
  height: 917px;
  padding: 40px 60px 0;
`;
const FormColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-column-gap: 20px; 
`;
const Label = styled.label`
  color: #F65261;
  display: block;
  padding-top: 30px;
  padding-bottom: 13px;
`;

const Input = styled.input`
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
`;
const TextArea =styled.textarea`
  background: #424242;
  color: white;
  width: auto;
  height: 197px;
  padding-top: 16px;
  padding-left: 18px;
  padding-bottom: 17px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  background: #424242;
  width: 525px;
  height: 57px;
  padding-top: 16px;
  padding-left: 18px;
  padding-bottom: 17px;
  border: 1px solid #ccc;
  appearance: none;
  
  &{
    background-image: url(${fillUpIcon});
    background-repeat: no-repeat;
    background-position: right 23px center;
    background-size: 20px 12px;
  }
  
  &:focus {
    outline: none;
    background-image: url(${fillDownIcon});
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 60px;
  padding-top: 60px;
`;

const Button = styled.button`
  background-color: black;
  color: #F65261;
  border: 2px solid #F65261;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 182px;
  height: 57px;
  margin-left: 13px;
  &:active {
    background-color: #F65261;
    color: white;
  }
  
  &:focus {
    outline: none;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  background: #232323;
  width: 686px;
  height: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ModalContent = styled.div`
  background-color: #232323;
  padding: 16px;
  position: relative;
`;
const ModalIcon = styled.div`
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

const ModalTitle = styled.h2`
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
const ModalDescr = styled.p`
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
const ModalDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 padding-top: 29px;
  color: white;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: #ccc;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 4px;
`;

const DatePickerContainer = styled.div`
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

const TitleContainer = styled.div`
  display: flex;
  width: 249px;
  justify-content: center;
  align-items: center;
  padding-bottom: 71px;
  padding-top: 63px;
`;

const Title = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const AddMovie = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleButtonClick = (route:any) => {
    navigate(route);
  };

  const onSubmit :SubmitHandler<FieldValues> = (data: any) => {
    if (releaseDate) {
      data.releaseDate = releaseDate.toLocaleDateString('en-US');
    }

    setFormData(data);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const handleReset = () => {
    reset();
    setReleaseDate(null);
  };
  return (
    <div>
      <div>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.ABOUT)}>
          {t('Home')}
        </button>
      </div>
      <AddMovieContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TitleContainer>
            <Title>Add Movie</Title>
          </TitleContainer>
          <FormColumnContainer>
            <div>
              <Label>Title</Label>
              <Input type="text" className="big_input" placeholder="title"  {...register('title', {
                required: true,
                pattern: /^[A-Za-z].*$/,
              })} />
              {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.title?.type === 'pattern' && (
                <ErrorMessage>Title must start with a letter</ErrorMessage>
              )}
            </div>
            <div>
              <Label>Release Date</Label>
              <DatePickerContainer>
                <DatePicker
                  selected={releaseDate}
                  onChange={date => setReleaseDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  wrapperClassName="react-datepicker__input-container"
                />
                <span className="datepicker-icon"></span>
              </DatePickerContainer>
              {errors.releaseDate && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Movie URL</Label>
              <Input type="text" className="big_input" placeholder="https://" {...register('movieUrl', {
                required: true,
                pattern: /^(ftp|http|https):\/\/[^ "]+$/,
              })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.movieUrl?.type === 'pattern' && (
                <ErrorMessage>Invalid URL</ErrorMessage>
              )}
            </div>
            <div>
              <Label>Rating</Label>
              <Input type="text" className="small_input" placeholder="7,8" {...register('rating', {
                required: true,
                pattern: /^10$|^([0-9]|10),[0-9]$/,
              })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.rating?.type === 'pattern' && (
                <ErrorMessage>Invalid rating</ErrorMessage>
              )}
            </div>
            <div>
              <Label>Genre</Label>
              <Select  placeholder="select genre" {...register('genre', { required: true })} >
                <option value="">Select genre</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </Select>
              {errors.genre && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Runtime</Label>
              <Input type="text" className="small_input" placeholder="minutes" {...register('runtime', {
                required: true,
                pattern: /^\d+$/,
                min: 1,
              })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.runtime?.type === 'pattern' && (
                <ErrorMessage>Invalid runtime</ErrorMessage>
              )}
              {errors.runtime?.type === 'min' && (
                <ErrorMessage>Runtime must be at least 1 minute</ErrorMessage>
              )}
            </div>
          </FormColumnContainer>
          <Label>Overview</Label>
          <TextArea  placeholder="Movie description" {...register('overview', { required: true })} />
          {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
          
          <ButtonContainer>
            <Button type="reset" onClick={() => handleReset}>Reset</Button>
            <Button type="submit">Submit</Button>
          </ButtonContainer>
        </FormContainer>

        {isModalOpen && formData && (
          <ModalOverlay>
            <ModalContent>
              <ModalIcon/>
              <ModalTitle>Congratulation!</ModalTitle>
              <ModalDescr>The movie has been added to database successfully</ModalDescr>
              <ModalDataContainer>
                <p style={{marginBottom:5}}>Title: {formData.title}</p>
                <p style={{marginBottom:5}}>Release Date: {formData.releaseDate}</p>
                <p style={{marginBottom:5}}>Movie URL: {formData.movieUrl}</p>
                <p style={{marginBottom:5}}>Rating: {formData.rating}</p>
                <p style={{marginBottom:5}}>Genre: {formData.genre}</p>
                <p style={{marginBottom:5}}>Runtime: {formData.runtime}</p>
                <p style={{marginBottom:5}}>Overview: {formData.overview}</p>
              </ModalDataContainer>
              <ModalButtonContainer>
                <ModalButton onClick={closeModal}>Close</ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AddMovieContainer>
    </div>
  );
};

export default AddMovie;