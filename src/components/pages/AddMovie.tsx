import React, {useState} from 'react';
import {ROUTES} from "../../entitysData/constants/API_ROUTS";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/AddMovie.css'

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
const Label = styled.label`
  color: #F65261;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  background: #424242;
  padding: 8px;
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
  width: 525px;
  height: 57px;
  padding: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  background: #424242;
  width: 525px;
  height: 57px;
  padding: 8px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: black;
  color: #F65261;
  border: 2px solid #F65261;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 182px;
  height: 57px;
  &:active {
    background-color: #F65261;
    color: white;
  }
  
  &:focus {
    outline: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 16px;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
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
  .react-datepicker {
    
    border: 1px solid #ccc;
  }

  .react-datepicker__input-container {
    display: block;
  }

  .react-datepicker__input-container input {
    background: #424242;
    width: 301px;
    height: 57px;
    padding: 8px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 24px;
  color: #F65261;
`;
const AddMovie = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = (route:any) => {
    navigate(route);
  };

  const onSubmit = (data: any) => {
    if (releaseDate) {
      data.releaseDate = releaseDate.toLocaleDateString('en-US');
    }

    setModalOpen(true);
    console.log(data);
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
          <div>
            <div>
              <Label>Title</Label>
              <Input type="text" className="big_input"  {...register('title', { required: true })} />
              {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Movie URL</Label>
              <Input type="text" className="big_input" {...register('movieUrl', { required: true })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Genre</Label>
              <Select  {...register('genre', { required: true })}>
                <option value="">Select genre</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </Select>
              {errors.genre && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
          </div>
          <div>
            <div>
              <Label>Release Date</Label>
              <DatePickerContainer>
                <DatePicker
                  selected={releaseDate}
                  onChange={date => setReleaseDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  wrapperClassName="react-datepicker__input-container"
                />
              </DatePickerContainer>
              {errors.releaseDate && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Rating</Label>
              <Input type="text" className="small_input" {...register('rating', { required: true })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
            <div>
              <Label>Runtime</Label>
              <Input type="text" className="small_input" {...register('runtime', { required: true })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
            </div>
          </div>
          <Label>Overview</Label>
          <TextArea  {...register('overview', { required: true })} />
          {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
          
          <ButtonContainer>
            <Button type="reset" onClick={() => handleReset}>Reset</Button>
            <Button type="submit">Submit</Button>
          </ButtonContainer>
        </FormContainer>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Success!</ModalTitle>
              <p>Your form has been submitted successfully.</p>
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