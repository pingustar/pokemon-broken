export class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.type = data.types[0].type.name;
  }
}

export async function getPokemon({ id }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          const pokemon = new Pokemon(data);
          resolve(pokemon);
        })
        .catch((err) => console.log(err));
    }, 2000);
  });
}
