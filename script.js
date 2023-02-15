const pokemon_cont = document.querySelector(".pokemon_cont");

const pokemons = [" "];
const pokemon_limit = 12;
const type_colors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
};

const getPokemon = async () => {
    const endpoint = new URL( `https://pokeapi.co/api/v2/pokemon?limit=${pokemon_limit}` );

    const response = await fetch(endpoint);
    const data = await response.json();
    
    for ( let i = 0; i < pokemon_limit; i++ ) {
        pokemons.push({
            id: i + 1,
            name: data.results[i].name,
            types: []
        });
    }
    await getAllTypes();
    displayPokemon();
};

const displayPokemon = () => {
    for ( let i = 1; i < pokemon_limit + 1; i++ ) {
        const pokemonBox = document.createElement("div");
        pokemonBox.classList.add("pokemon_box");

        pokemonBox.innerHTML = `
        <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons[i].id}.png" alt="Pokemon">
        <div class="ms-3">
            <p class="pokemon_num my-1">#${pokemons[i].id}</p>
            <h3>${pokemons[i].name?.charAt(0).toUpperCase() + pokemons[i].name?.slice(1)}</h3>
            <div class="type_cont d-flex gap-1">
                <p class="type_color" style="background: ${type_colors[pokemons[i].types[1]]}">${pokemons[i].types[1]}</p>
                <p class="type_color" style="background: ${type_colors[pokemons[i].types[0]]}">${pokemons[i].types[0]}</p>
            </div>
        </div>
        `;
  
        pokemon_cont.appendChild(pokemonBox);
    }
};

const getAllTypes = async () => {
    for ( let i = 0; i < 18; i++ ) {
        const endpoint = new URL( "https://pokeapi.co/api/v2/type/" + (i + 1) );
        const response = await fetch(endpoint);
        const data = await response.json();

        const pokemon_type = data.pokemon;
        
        for ( j = 0; j < pokemon_type.length; j++ ) {
            const pokemon_id = pokemon_type[j].pokemon.url.replace( 'https://pokeapi.co/api/v2/pokemon/', '' ).replace('/', '');

            if ( pokemon_id <= pokemons.length && pokemons[pokemon_id] ) {
                pokemons[pokemon_id].types.push(data.name);
            }
        }
    }
};
console.log(pokemons);
getPokemon();