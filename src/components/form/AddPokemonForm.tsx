import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { addPokemon } from '../../helpers/Actions';
import {Pokemon} from "../pokemon/Pokemon";
import {FC} from "react";
import {Button} from "antd";
interface FormValues {
    name: string;
    types:string;
    image: string;
    stats: string;
    moves: string;
}
interface Props {
  onAddPokemon: (pokemon: Pokemon) => void;
}
const AddPokemonForm:FC<Props> = ({onAddPokemon}) => {
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    name: "",
    types:"",
    image: "",
    stats: "",
    moves: ""
  };

  const handleSubmit = (values: FormValues) => {
    const newPokemon: Pokemon = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: values.name,
      image: values.image,
      stats: values.stats.split(",").map((stat) => Number(stat)),
      types: values.types.split(",").map((type) => type.trim()),
      moves: values.moves.split(",").map((move) => move.trim()),
    };
    dispatch(addPokemon(newPokemon));
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList') || '[]') as Pokemon[];
    localStorage.setItem('pokemonList', JSON.stringify([...pokemonList, newPokemon]));
    onAddPokemon(newPokemon);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Field id="name" name="name" value={values.name}
            placeholder="Name"
            onChange={handleChange}
            style={{ marginBottom: '16px', marginRight:'16px'}}
          />

          <Field id="types" name="types" value={values.types}
            placeholder="Type/s"
            onChange={handleChange}
          />
          
          <Field id="image" name="image" value={values.image}
            placeholder="Image(URL)"
            style={{ marginBottom: '16px', marginRight:'16px'}}
            onChange={handleChange} />

          <Field id="stats" name="stats" value={values.stats}
            placeholder="Stats(through comma)"
            onChange={handleChange} />
          
          <Field id="moves" name="moves" value={values.moves}
            placeholder="Moves(through comma)"
            onChange={handleChange} />
          <Button style={{marginLeft:'140px'}} type="primary" htmlType="submit">Добавить покемона</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPokemonForm;