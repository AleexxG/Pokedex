const pokemonCont = document.querySelector(".pokemon_cont");

const pokemons = [" "];

const getPokemon = async () => {
    const endpoint = new URL( "https://pokeapi.co/api/v2/pokemon?limit=12" );

    const response = await fetch(endpoint);
    const data = await response.json();
    
    for ( let i = 0; i < data.results.length; i++ ) {
        pokemons.push({
            id: i + 1,
            name: data.results[i].name,
            types: []
        });
        await getAllTypes();
        displayPokemon(i + 1);
    }
};

const displayPokemon = (pokemon) => {
    const name = pokemons[pokemon].name?.charAt(0).toUpperCase() + pokemons[pokemon].name?.slice(1);
    const id = pokemons[pokemon].id;
    const type = pokemons[pokemon].types;
  
    const pokemonBox = document.createElement("div");
    pokemonBox.classList.add("pokemon_box");

    pokemonBox.innerHTML = `
    <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="Pokemon">
    <div class="ms-3">
        <p class="pokemon_num my-1">#${id}</p>
        <h3>${name}</h3>
        <div class="type_cont d-flex gap-1">
            <p class="grass">${type[0]}</p>
            <p class="poison">${type[1]}</p>
        </div>
    </div>
    `;
  
    pokemonCont.appendChild(pokemonBox);
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