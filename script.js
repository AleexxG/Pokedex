const pokemonCont = document.querySelector(".pokemon_cont");

const pokemons = [" "];

const getPokemon = async () => {
    const endpoint = new URL( "https://pokeapi.co/api/v2/pokemon?limit=50" );

    const response = await fetch( endpoint );
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        pokemons.push({
            id: i + 1,
            name: data.results[i].name,
            types: []
        });
        displayPokemon(i + 1);
    }
};

const displayPokemon = (pokemon) => {
    const name = pokemons[pokemon].name?.charAt(0).toUpperCase() + pokemons[pokemon].name?.slice(1);
    const id = pokemons[pokemon].id;
  
    const pokemonBox = document.createElement("div");
    pokemonBox.classList.add("pokemon_box");
  
    pokemonBox.innerHTML = `
    <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="Pokemon">
    <div class="ms-3">
        <p class="pokemon_num my-1">#${id}</p>
        <h3>${name}</h3>
        <div class="type_cont d-flex gap-1">
            <p class="grass">Grass</p>
            <p class="poison">Poison</p>
        </div>
    </div>
    `;
  
    pokemonCont.appendChild(pokemonBox);
};

getPokemon();