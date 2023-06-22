import "./styles.css";
import React, { Component } from "react";
import { pokeClasses } from "./pokeClasses";
import sprites from "./sprites.png";
import { getPokemon } from "./api";
import noSelection from "./questionmark.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      loading: false
    };

    this.pokemonCache = new Map();
  }

  async handleOnClick(id) {
    let pokemon = this.pokemonCache.get(id);
    if (!pokemon) {
      this.setState({ loading: true });
      pokemon = await getPokemon({ id });
      this.setState({ loading: false });
      this.pokemonCache.set(id, pokemon);
    } else {
      this.setState({ pokemon });
    }
  }

  render() {
    return (
      <div className="App">
        <section className="poke-list">
          {pokeClasses.map(function (pokeClass) {
            return (
              <button
                key={pokeClass.id}
                onClick={() => this.handleOnClick(pokeClass.id)}
                style={{
                  backgroundImage: `url(${sprites})`,
                  backgroundPosition: pokeClass.backgroundPosition
                }}
                className="poke-cell"
                disabled={this.state.loading}
              ></button>
            );
          })}
        </section>
        <section className="detail-view">
          <img
            src={this.state.pokemon.sprite ?? noSelection}
            className="sprite-image"
            alt="sprite"
          />
          <div className="data-wrapper">
            <h1 className="data-name">
              Name: {this.state.pokemon.name ?? "???"}
            </h1>
            <h3>ID: {this.state.pokemon.id ?? "???"}</h3>
            <p className="data-char">
              Type: {this.state.pokemon.type ?? "???"}
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
