import { getWeatherData, populateObj, retrieveDataFromLocalStorage } from './helpers';
import { createDispĺay, switchTypesText } from './DOMhelpers';

// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

export const switchTypes = document.getElementById('type'); ;

(() => {
  window.addEventListener('load', init);

  const input = document.getElementById('input-text');
  const searchBtn = document.getElementById('search-btn');

  const WEATHER_KEYS = ['cloud', 'condition', 'feelslike_c', 'feelslike_f', 'humidity', 'is_day', 'temp_c', 'temp_f', 'wind_kph', 'wind_mph'];
  let obj = {};

  async function init () {
    createDispĺay();

    obj = retrieveDataFromLocalStorage();

    if (obj) {
      main(obj.name);
      return;
    }
    main(null);
  };

  async function main (name) {
    let response = {};
    if (name) {
      response = await getWeatherData(name);
    } else {
      response = await getWeatherData(input.value);
    }
    if (response) {
      obj = populateObj(WEATHER_KEYS, response);
      switchTypesText(obj, null);
    }
  }

  input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      main(null);
    }
  });

  searchBtn.addEventListener('click', () => main(null));

  switchTypes.addEventListener('click', (e) => {
    switchTypesText(obj, e);
  });
})();
