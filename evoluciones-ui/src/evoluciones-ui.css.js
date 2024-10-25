import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.pokemon-card {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 350px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pokemon-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.pokemon-name {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #3498db;
  margin-bottom: 15px;
}

.types {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-top: 10px;
}

.evolution-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.evolution-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  transition: transform 0.3s;
}

.evolution-item:hover {
  transform: scale(1.05);
}

.evolution-item img {
  width: 80px;
  height: 80px;
  border: 2px solid #2ecc71;
  border-radius: 10px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

bbva-button-default {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

bbva-button-default:hover {
  background-color: #2980b9;
}
`;
