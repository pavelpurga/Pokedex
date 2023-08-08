import {Formik, Form, Field, ErrorMessage} from 'formik';
import { addPokemon } from '../../store/PokemonActions';
import {PokemonTypes} from "../../models/Pokemon.types";
import {FC} from "react";
import {Button} from "antd";
import {validationSchema} from "./FormValidation";
import {useTypedDispatch} from "../../store/store";

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
    localStorage.setItem('pokemonList', JSON.stringify([...pokemonList, newPokemon]));
    onAddPokemon(newPokemon);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <div className={`form-group ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}>

            <Field id="name" name="name" value={values.name}
              placeholder="Name"
              onChange={handleChange}
              className="form-control"
            />
            <ErrorMessage
              name="name" component="div" className="invalid-feedback" />
          </div>
          <div className={`form-group ${touched.types && errors.types ? 'is-invalid' : touched.types && !errors.types ? 'is-valid' : ''}`}>
            <Field id="types" name="types" value={values.types}
              placeholder="Type/s"
              onChange={handleChange}
            />
            <ErrorMessage
              name="types" component="div" className="invalid-feedback" />
          </div>
          <div className={`form-group ${touched.image && errors.image ? 'is-invalid' : touched.image && !errors.image ? 'is-valid' : ''}`} >
            <Field id="image" name="image" value={values.image}
              placeholder="Image(URL)"
              onChange={handleChange} />
            <ErrorMessage
              name="image" component="div" className="invalid-feedback" />
          </div>
          
          <div className={`form-group ${touched.stats && errors.stats ? 'is-invalid' : touched.stats && !errors.stats ? 'is-valid' : ''}`}>
            <Field id="stats" name="stats" value={values.stats}
              placeholder="Stats(through comma)"
              onChange={handleChange} />
            <ErrorMessage
              name="stats" component="div" className="invalid-feedback" />  
          </div>
          
          <div className={`form-group ${touched.moves && errors.moves ? 'is-invalid' : touched.moves && !errors.moves ? 'is-valid' : ''}`}>
            <Field id="moves" name="moves" value={values.moves}
              placeholder="Moves(through comma)"
              onChange={handleChange} />
            <ErrorMessage
              name="moves" component="div" className="invalid-feedback" />
          </div>

          <Button
            style={{marginLeft:'160px',marginTop:'10px'}}
            type="primary"
            htmlType="submit">
            Add pokemon
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPokemonForm;