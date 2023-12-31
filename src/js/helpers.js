import { loadingContent } from './DOMhelpers';

export async function getWeatherData (location) {
  try {
    if (!location) {
      location = 'Tokyo';
    }
    const key = '84b6efaf0a054a9cb09165855231512';
    const baseUrl = 'https://api.weatherapi.com/v1';
    // const jsonPath = '/current.json';
    const jsonPath = '/forecast.json';
    const forecastDays = 3;
    const city = processInput(location);
    const url = `${baseUrl}${jsonPath}?key=${key}&q=${city}&days=${forecastDays}`;

    loadingContent(true);
    const promise = await fetch(url, { mode: 'cors' });
    loadingContent(false);

    if (promise.status !== 200) {
      throw await promise.json();
    }
    const data = await promise.json();
    return data;
  } catch (err) {
    alert(`ERROR:\n \tCode: ${err.error.code}\n \tMessage: ${err.error.message}\n`);
    return false;
  }
}

export async function getSearchData (location) {
  try {
    const key = '84b6efaf0a054a9cb09165855231512';
    const baseUrl = 'https://api.weatherapi.com/v1';
    const jsonPath = '/search.json';
    const url = `${baseUrl}${jsonPath}?key=${key}&q=${location}`;

    loadingContent(true);
    const promise = await fetch(url, { mode: 'cors' });
    loadingContent(false);

    if (promise.status !== 200) {
      throw await promise.json();
    }
    const data = await promise.json();
    if (!data.length) {
      throw new Error('No matching location found.');
    }
    return data;
  } catch (err) {
    alert(err);
    return false;
  }
}

function processInput (location) {
  if (typeof location !== 'number') {
    const regex = /([^A-Za-z\s])/g;
    return location
      .trim()
      .replaceAll(regex, '')
      .replaceAll(' ', '+');
  }

  return prepareSearchID(location);
}

function prepareSearchID (location) {
  return `id:${location}`;
}

export function changeIconSize (icon) {
  const url = `https:${icon}`;
  return url.replace('64x64', '128x128');
}

export function populateObj (WEATHER_KEYS, FORECAST_KEYS, response) {
  try {
    const obj = {};
    obj.country = response.location.country;
    obj.name = response.location.name;
    obj.region = response.location.region;
    obj.forecast = [];

    for (const x in response.current) {
      WEATHER_KEYS.forEach(e => {
        if (e === x) {
          obj[x] = response.current[x];
        }
      });
    }

    response.forecast.forecastday.forEach(x => {
      const temp = {};
      for (const day in x.day) {
        FORECAST_KEYS.forEach(e => {
          if (e === day) {
            temp[day] = x.day[day];
          }
        });
      }
      temp.date = x.date;
      obj.forecast.push(temp);
    });

    saveDataToLocalStorage(obj);
    return obj;
  } catch (err) {
    alert(err);
  }
}

function saveDataToLocalStorage (obj) {
  if (!obj) {
    throw new Error('ERROR: object data does not exist');
  }
  const string = JSON.stringify(obj);
  localStorage.setItem('weather-app-data', string);
}

export function retrieveDataFromLocalStorage () {
  if (!localStorage.getItem('weather-app-data')) {
    return false;
  }
  const string = localStorage.getItem('weather-app-data');
  const obj = JSON.parse(string);
  return obj;
}
