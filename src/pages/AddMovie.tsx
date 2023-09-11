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
import {Radio} from "antd";
import i18n from "../entitysData/i18n/i18n";

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
  const [selectedLanguage,setSelectedLanguage] = useState("en");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

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
        <Radio.Group value={selectedLanguage}>
          <Radio.Button value="ru" onChange={(e)=>handleLanguageChange(e.target.value)} >{t('RU')}</Radio.Button>
          <Radio.Button value="en" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('EN')}</Radio.Button>
          <Radio.Button value="ua" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('UA')}</Radio.Button>
        </Radio.Group>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.ABOUT)}>
          {t('Home')}
        </button>
      </div>
      <AddMovieContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TitleContainer>
            <Title>{t('Add Movie')}</Title>
          </TitleContainer>
          <FormColumnContainer>
            <div>
              <Label>{t('Title')}</Label>
              <Input type="text" className="big_input" placeholder={t('Title')}  {...register('title', {
                required: true,
                pattern: /^[A-Za-z].*$/,
              })} />
              {errors.title && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
              {errors.title?.type === 'pattern' && (
                <ErrorMessage>{t('Title must start with a letter')}</ErrorMessage>
              )}
            </div>
            <div>
              <Label>{t('Release Date')}</Label>
              <DatePickerContainer>
                <DatePicker
                  selected={releaseDate}
                  onChange={date => setReleaseDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={t('Select date')}
                  wrapperClassName="react-datepicker__input-container"
                />
                <span className="datepicker-icon"></span>
              </DatePickerContainer>
              {errors.releaseDate && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
            </div>
            <div>
              <Label>{t('Movie URL')}</Label>
              <Input type="text" className="big_input" placeholder="https://" {...register('movieUrl', {
                required: true,
                pattern: /^(ftp|http|https):\/\/[^ "]+$/,
              })} />
              {errors.movieUrl && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
              {errors.movieUrl?.type === 'pattern' && (
                <ErrorMessage>{t('Invalid URL')}</ErrorMessage>
              )}
            </div>
            <div>
              <Label>{t('Rating')}</Label>
              <Input type="text" className="small_input" placeholder="7,8" {...register('rating', {
                required: true,
                pattern: /^(10|[0-9](,[0-9])?)$/,
              })} />
              {errors.movieUrl && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
              {errors.rating?.type === 'pattern' && (
                <ErrorMessage>{t('Invalid rating')}</ErrorMessage>
              )}
            </div>
            <div>
              <Label>{t('Genre')}</Label>
              <Selector onSelectGenre={setSelectedGenre} />
              {errors.genre && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
            </div>
            <div>
              <Label>{t('Runtime')}</Label>
              <Input type="text" className="small_input" placeholder={t('minutes')} {...register('runtime', {
                required: true,
                pattern: /^\d+$/,
                min: 1,
              })} />
              {errors.movieUrl && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
              {errors.runtime?.type === 'pattern' && (
                <ErrorMessage>{t('Invalid runtime')}</ErrorMessage>
              )}
              {errors.runtime?.type === 'min' && (
                <ErrorMessage>{t('Runtime must be at least 1 minute')}</ErrorMessage>
              )}
            </div>
          </FormColumnContainer>
          <Label>{t('Overview')}</Label>
          <TextArea  placeholder={t('Movie description')} {...register('overview', { required: true })} />
          {errors.movieUrl && <ErrorMessage>{t('This field is required')}</ErrorMessage>}
          
          <ButtonContainer>
            <Button type="reset" onClick={() => handleReset}>{t('Reset')}</Button>
            <Button type="submit">{t('Submit')}</Button>
          </ButtonContainer>
        </FormContainer>

        {isModalOpen && formData && (
          <ModalOverlay>
            <ModalContent>
              <ModalIcon/>
              <ModalTitle>{t('Congratulation!')}</ModalTitle>
              <ModalDescr>{t('The movie has been added to database successfully')}</ModalDescr>
              <ModalDataContainer>
                <p style={{marginBottom:5}}>{t('Title')}: {formData.title}</p>
                <p style={{marginBottom:5}}>{t('Release Date')}: {formData.releaseDate}</p>
                <p style={{marginBottom:5}}>{t('Movie URL')}: {formData.movieUrl}</p>
                <p style={{marginBottom:5}}>{t('Rating')}: {formData.rating}</p>
                <p style={{marginBottom:5}}>{t('Genre')}: {selectedGenre}</p>
                <p style={{marginBottom:5}}>{t('Runtime')}: {formData.runtime}</p>
                <p style={{ marginBottom:5}}>
                  {t('Overview')}:
                </p>
                <ModalTextArea readOnly value={formData.overview} />
              </ModalDataContainer>
              <ModalButtonContainer>
                <ModalButton onClick={closeModal}>{t('Close')}</ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AddMovieContainer>
    </div>
  );
};

export default AddMovie;