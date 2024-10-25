import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './evoluciones-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-progress-content/bbva-progress-content.js';

export class EvolucionesUi extends LitElement {
  static get properties() {
    return {
      pokemonDetails: { type: Object },
      evolutions: { type: Array },
      noEvolutionsMessage: { type: String },
      pokemonId: { type: Number },
      loading: { type: Boolean } 
    };
  }

  constructor() {
    super();
    this.pokemonId = 10;
    this.pokemonDetails = {};
    this.evolutions = [];
    this.noEvolutionsMessage = '';
    this.loading = true; 
  }

  async fetchPokemonDetails() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`);
      const data = await response.json();
      this.pokemonDetails = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(typeInfo => typeInfo.type.name).join(', '),
      };

      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}/`);
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;

      const evolutionResponse = await fetch(evolutionChainUrl);
      const evolutionData = await evolutionResponse.json();
      this.evolutions = await this.extractEvolutionsWithImages(evolutionData.chain);

      this.noEvolutionsMessage = this.evolutions.length === 0
        ? 'Este Pokémon no tiene evoluciones.'
        : '';
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon:', error);
    }
  }

  async extractEvolutionsWithImages(chain) {
    const evolutions = [];
    let current = chain;

    while (current) {
      const evolutionName = current.species.name;
      const evolutionImage = await this.fetchPokemonImage(evolutionName);
      evolutions.push({ name: evolutionName, image: evolutionImage });
      current = current.evolves_to[0];
    }

    return evolutions;
  }

  async fetchPokemonImage(evolutionName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}/`);
      const data = await response.json();
      return data.sprites.front_default;
    } catch (error) {
      console.error(`Error al obtener imagen de ${evolutionName}:`, error);
      return '';
    }
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolutiones-ui-shared-styles'),
    ];
  }

  render() {
    return html`
      ${this.loading
        ? html`
            <bbva-progress-content
              accessibility-text="bbva-progress-content-login-loading-message"
              visible=""
            ></bbva-progress-content>
          `
        : html`
            <div class="pokemon-card">
              <h1 class="pokemon-name">${this.pokemonDetails.name}</h1>
              <img src="${this.pokemonDetails.image}" alt="${this.pokemonDetails.name}" class="pokemon-image" />
              <p><strong>Tipos:</strong> ${this.pokemonDetails.types}</p>
              
              ${this.noEvolutionsMessage
                ? html`<p>${this.noEvolutionsMessage}</p>`
                : html`
                    <div class="evolution-list">
                      <h2>Evoluciones</h2>
                      ${this.evolutions.map(evolution => html`
                        <div class="evolution-item">
                          <img src="${evolution.image}" alt="${evolution.name}" class="pokemon-image" />
                          <p>${evolution.name}</p>
                        </div>
                      `)}
                    </div>
                  `}
            </div>
            <div class="button-container">
              <bbva-button-default @click="${this.goTopokemon}">Ver Pokemones</bbva-button-default>
            </div>
          `}
    `;
  }

  firstUpdated() {
    this.fetchPokemonDetails();
    setTimeout(() => {
      this.loading = false; 
    }, 2000);
  }

  goTopokemon() {
    this.navigate('pokemon');
  }
}

customElements.define('evoluciones-ui', EvolucionesUi);
