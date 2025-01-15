// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // L'URL de votre backend NestJS
});

export default api;

// // Exemple d'utilisation dans un composant React
// import api from '../api/axios';

// const fetchData = async () => {
//   try {
//     const response = await api.get('/users');
//     // Traiter la réponse
//   } catch (error) {
//     // Gérer l'erreur
//   }
// };
