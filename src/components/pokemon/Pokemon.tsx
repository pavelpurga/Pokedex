export interface Pokemon {
    id: number;
    name: string;
    color: string;
    types: string[];
    image: string;
    stats: number[];
    moves: string[];
}
export interface PokemonListResponse {
    count: number;
    next: string;
    results: {
        name: string;
        url: string;
    }[];
}
export interface PokemonResponse {
    id: number;
    name: string;
    color:string;
    types: {
        type: {
            name: string;
        }
    }[];
    sprites: {
        front_default: string;
    };
    stats:{
        base_stat:number;
        effort:number;
    }[];
    moves:{
    move:{
        name:string;
        url:string;
    };
    version_group_details:{
        level_learned_at: number;
        move_learn_method:{
            name:string;
            url:string;
        };
        version_group:{
            name:string;
            url:string;
        };
     }[];
    }[];
}