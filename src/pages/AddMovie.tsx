import React, {useState} from 'react';
import {ROUTES} from "../entitysData/constants/API_ROUTS";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Selector from "../styles/ui/selector/Selector";
import {Input} from "../styles/ui/input/Input.styles";
import {TextArea} from "../styles/ui/textArea/TextArea.styles";
import {DatePickerContainer} from "../styles/ui/datePicker/DatePicker.styles";
import {
  ModalButton, ModalButtonContainer,
  ModalContent,
  ModalDataContainer,
  ModalDescr,
  ModalIcon,
  ModalOverlay, ModalTextArea,
  ModalTitle
} from "../styles/ui/movieModal/MovieModal.styles";
import {Button, ButtonContainer} from "../styles/ui/button/Button.styles";
import {
  AddMovieContainer,
  FormColumnContainer,
  FormContainer
} from "../styles/ui/movieFormContainers/MovieFormContainers.styles";
import {ErrorMessage, Label, Title, TitleContainer} from "../styles/ui/movieTitle/MovieTitle.styles";

interface FormData {
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: string;
  genre: string;
  runtime: string;
  overview: string;
}
const AddMovie = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
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
                pattern: /^(10|[0-9](,[0-9])?)$/,
              })} />
              {errors.movieUrl && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.rating?.type === 'pattern' && (
                <ErrorMessage>Invalid rating</ErrorMessage>
              )}
            </div>
            <div>
              <Label>Genre</Label>
              <Selector onSelectGenre={setSelectedGenre} />
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
                <p style={{marginBottom:5}}>Genre: {selectedGenre}</p>
                <p style={{marginBottom:5}}>Runtime: {formData.runtime}</p>
                <p style={{ marginBottom:5}}>
                  Overview:
                </p>
                <ModalTextArea readOnly value={formData.overview} />
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