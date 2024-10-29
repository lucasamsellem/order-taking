import { formatPrice } from '../utils.js';

export const generateReceiptText = (date, time, location, price) =>
  `<p>✔️ Order placed on: <strong>${date}</strong> at <strong>${time}</strong> ${location}</p>
    <br>    
    <p>Total: <strong>${formatPrice(price)}€</strong></p>`;
