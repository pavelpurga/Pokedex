import * as Yup from 'yup';
import {allTypes} from "../../entitysData/constants/PokemonTypesColor";

export const validationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Name should contain only letters and spaces').required('Name is required'),
  stats: Yup.string().matches(/^(\d+,){5}\d+$/, 'Stats should contain 6 comma-separated numbers').required('Stats are required'),
  moves: Yup.string().matches(/^([a-zA-Z]+,)*[a-zA-Z]+$/, 'Moves should be comma-separated names of moves').required('Moves are required'),
  types: Yup.string().test(
    "is-valid-type",
    "Invalid type",
    (value) => {
      if (!value) {
        return true;
      }
      const types = value.split(",").map((type) => type.trim());
      return types.every((type) => allTypes.includes(type));
    }
  )
});