import {types} from "../entitysData/constants/PokemonTypesColor";

export const getColorByType = (typeName: string) => {
  const type = types.find((t) => t.name === typeName);
  return type ? type.color : "#000000";
};