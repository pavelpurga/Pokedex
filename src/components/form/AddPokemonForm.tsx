import {Formik, Form, ErrorMessage, FormikHelpers} from 'formik';
import {FC} from "react";
import {Button, Col, Input, Row} from "antd";
import {validationSchema} from "./FormValidation";
import {useTypedDispatch} from "../../store/store";
import {PokemonTypes} from "../../entitysData/models/Pokemon.types";
import {addPokemon} from "../../store/Pokemon/PokemonSlice";
import {useTranslation} from "react-i18next";

export interface FormValues {
    name: string;
    types:string;
    image: string;
    stats: string;
    moves: string;
}
interface Props {
  onAddPokemon: (pokemon: PokemonTypes) => void;
  isModalVisible: boolean,
  closeModal: () => void;
}
const AddPokemonForm:FC<Props> = ({onAddPokemon,isModalVisible,closeModal}) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const initialValues: FormValues = {
    name: "",
    types:"",
    image: "",
    stats: "",
    moves: ""
  };

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const newPokemon: PokemonTypes = {
      id: Math.floor(Math.random() * 10000) + 1,
      name: values.name,
      image: values.image,
      stats: values.stats.split(",").map((stat) => Number(stat)),
      types: values.types.split(",").map((type) => type.trim()),
      moves: values.moves.split(",").map((move) => move.trim()),
    };
    dispatch(addPokemon(newPokemon));
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList') || '[]') as PokemonTypes[];
    localStorage.setItem('pokemonList', JSON.stringify([newPokemon,...pokemonList]));
    onAddPokemon(newPokemon);
    resetForm();
    closeModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {formik => (
        <Form>
          <Row gutter={[16,16]}>
            <Col span={24} sm={12}>
              <div className={`form-group ${formik.touched.name && formik.errors.name ? 'is-invalid' : formik.touched.name && !formik.errors.name ? 'is-valid' : ''}`}>

                <Input id="name" name="name" value={formik.values.name}
                  placeholder={t('Name')}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                <ErrorMessage
                  name="name" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${formik.touched.types && formik.errors.types ? 'is-invalid' : formik.touched.types && !formik.errors.types ? 'is-valid' : ''}`}>
                <Input id="types" name="types" value={formik.values.types}
                  placeholder={t('Type/s')}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  name="types" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${formik.touched.image && formik.errors.image ? 'is-invalid' : formik.touched.image && !formik.errors.image ? 'is-valid' : ''}`} >
                <Input id="image" name="image" value={formik.values.image}
                  placeholder={t('Image(URL)')}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  name="image" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${formik.touched.stats && formik.errors.stats ? 'is-invalid' : formik.touched.stats && !formik.errors.stats ? 'is-valid' : ''}`}>
                <Input id="stats" name="stats" value={formik.values.stats}
                  placeholder={t("Stats(through comma)")}
                  onChange={formik.handleChange} />
                <ErrorMessage
                  name="stats" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24}>
              <div className={`form-group ${formik.touched.moves && formik.errors.moves ? 'is-invalid' : formik.touched.moves && !formik.errors.moves ? 'is-valid' : ''}`}>
                <Input id="moves" name="moves" value={formik.values.moves}
                  placeholder={t("Moves(through comma)")}
                  onChange={formik.handleChange} />
                <ErrorMessage
                  name="moves" component="div" className="invalid-feedback" />
              </div>
            </Col>
          </Row>
          <Button
            style={{marginLeft:'160px',marginTop:'10px'}}
            type="primary"
            htmlType="submit">
            {t('Add Pokemon')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPokemonForm;