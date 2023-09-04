import {Formik, Form, ErrorMessage} from 'formik';
import {FC} from "react";
import {Button, Col, Input, Row} from "antd";
import {validationSchema} from "./FormValidation";
import {useTypedDispatch} from "../../store/store";
import {PokemonTypes} from "../../entitysData/models/Pokemon.types";
import {addPokemon} from "../../store/PokemonSlice";
import {useTranslation} from "react-i18next";

interface FormValues {
    name: string;
    types:string;
    image: string;
    stats: string;
    moves: string;
}
interface Props {
  onAddPokemon: (pokemon: PokemonTypes) => void;
}
const AddPokemonForm:FC<Props> = ({onAddPokemon}) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const initialValues: FormValues = {
    name: "",
    types:"",
    image: "",
    stats: "",
    moves: ""
  };

  const handleSubmit = (values: FormValues) => {
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
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Row gutter={[16,16]}>
            <Col span={24} sm={12}>
              <div className={`form-group ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}>

                <Input id="name" name="name" value={values.name}
                  placeholder={t('Name')}
                  onChange={handleChange}
                  className="form-control"
                />
                <ErrorMessage
                  name="name" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${touched.types && errors.types ? 'is-invalid' : touched.types && !errors.types ? 'is-valid' : ''}`}>
                <Input id="types" name="types" value={values.types}
                  placeholder={t('Type/s')}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="types" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${touched.image && errors.image ? 'is-invalid' : touched.image && !errors.image ? 'is-valid' : ''}`} >
                <Input id="image" name="image" value={values.image}
                  placeholder={t('Image(URL)')}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="image" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24} sm={12}>
              <div className={`form-group ${touched.stats && errors.stats ? 'is-invalid' : touched.stats && !errors.stats ? 'is-valid' : ''}`}>
                <Input id="stats" name="stats" value={values.stats}
                  placeholder={t("Stats(through comma)")}
                  onChange={handleChange} />
                <ErrorMessage
                  name="stats" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col span={24}>
              <div className={`form-group ${touched.moves && errors.moves ? 'is-invalid' : touched.moves && !errors.moves ? 'is-valid' : ''}`}>
                <Input id="moves" name="moves" value={values.moves}
                  placeholder={t("Moves(through comma)")}
                  onChange={handleChange} />
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