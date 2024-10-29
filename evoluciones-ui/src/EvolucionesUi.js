import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './evoluciones-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-progress-content/bbva-progress-content.js';
import '@pokedex/pokemones-dm/pokemones-dm.js';

export class EvolucionesUi extends LitElement {
  static get properties() {
    return {
      pokemonDetails: { type: Object },
      evolutions: { type: Array },
      noEvolutionsMessage: { type: String },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.pokemonDetails = {};
    this.evolutions = [];
    this.noEvolutionsMessage = '';
    this.loading = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolutiones-ui-shared-styles'),
    ];
  }

  firstUpdated() {
    // Escuchar el evento que trae los detalles del Pokémon
    this.addEventListener('pokemon-details-loaded', (e) => {
      this.pokemonDetails = e.detail.pokemonDetails;
      this.evolutions = e.detail.evolutions;
      this.noEvolutionsMessage = e.detail.noEvolutionsMessage;
      this.loading = false;
    });

    const pokemonesDm = this.shadowRoot.querySelector('pokemones-dm');
    if (pokemonesDm) {
      const pokemonId = this.getAttribute('pokemon-id'); 
      if (pokemonId) {
        pokemonesDm.fetchPokemonDetails(pokemonId);
      }
    }
  }

  render() {
    return html`
      <div class="main-container">
        ${this.loading
          ? html`<bbva-progress-content
              accessibility-text="bbva-progress-content-loading"
              visible=""
            ></bbva-progress-content>`
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
      </div>
      <pokemones-dm></pokemones-dm>
    `;
  }

  goTopokemon() {
    this.navigate('pokemon');
  }
}
