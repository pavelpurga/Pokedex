import axios from "axios";

export const fetchPokemonListLoad = async (limit:number,offset:number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset-limit}`);
    const data = await response.data;
    return data;
}
export const fetchPokemonList = async (limit:number,offset:number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.data;
    return data;
}