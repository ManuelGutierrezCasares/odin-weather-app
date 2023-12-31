import { switchTypes } from './main.js';
import { changeIconSize } from './helpers.js';
import loadingGif from '../img/loading.gif';

export function createMainDispĺay () {
  const container = document.getElementById('container');
  const h1 = document.createElement('h1');
  const h3 = document.createElement('h3');
  const icon = document.createElement('img');
  const ul = document.createElement('ul');

  h1.id = 'city';
  h3.id = 'region-country';
  icon.id = 'icon';

  createLi(7, ul, 'main');

  container.appendChild(h1);
  container.appendChild(h3);
  container.appendChild(icon);
  container.appendChild(ul);

  return container;
}

export function createForecastDisplay (number) {
  for (let i = 0; i < number; i++) {
    createForecastCard(i);
  }
}

function createForecastCard (number) {
  const container = document.getElementById('forecast');
  const card = document.createElement('div');
  const h3 = document.createElement('h3');
  const h4 = document.createElement('h4');
  const icon = document.createElement('img');
  const ul = document.createElement('ul');

  card.id = `forecast-card-${number}`;
  card.classList.add('col');
  h3.id = `forecast-date-${number}`;
  h4.id = `forecast-text-${number}`;
  icon.id = `forecast-icon-${number}`;

  createLi(4, ul, `forecast-${number}`);

  container.appendChild(card);
  card.appendChild(h3);
  card.appendChild(h4);
  card.appendChild(icon);
  card.appendChild(ul);

  return container;
}

function createLi (number, ul, type) {
  for (let i = 0; i < number; i++) {
    const li = document.createElement('li');
    li.style.listStyleType = 'none';
    li.id = `li-${type}-${i}`;
    ul.appendChild(li);
  }
  return ul;
}

export function refreshDisplay (obj, type) {
  const body = document.getElementsByTagName('body')[0];
  const city = document.getElementById('city');
  const regionCountry = document.getElementById('region-country');
  const temp = document.getElementById('li-main-0');
  const feelslike = document.getElementById('li-main-1');
  const wind = document.getElementById('li-main-2');
  const humidity = document.getElementById('li-main-3');
  const cloudPercent = document.getElementById('li-main-4');
  const cloudText = document.getElementById('li-main-5');
  const time = document.getElementById('li-main-6');
  const isDay = obj.is_day;
  const icon = document.getElementById('icon');

  city.textContent = obj.name;
  regionCountry.textContent = `${obj.region}, ${obj.country}`;
  if (type === 'celsius') {
    temp.textContent = `Temperature: ${obj.temp_c} °C`;
    feelslike.textContent = `Feels Like: ${obj.feelslike_c} °C`;
    wind.textContent = `Wind: ${obj.wind_kph} KPH`;
  } else if (type === 'farenheit') {
    temp.textContent = `Temperature: ${obj.temp_f} °F`;
    feelslike.textContent = `Feels Like: ${obj.feelslike_f} °F`;
    wind.textContent = `Wind: ${obj.wind_mph} MPH`;
  }
  humidity.textContent = `Humidity: ${obj.humidity}%`;
  cloudPercent.textContent = `Cloud: ${obj.cloud}%`;
  cloudText.textContent = `Condition: ${obj.condition.text}`;

  // Change color based on day/night
  if (isDay) {
    time.textContent = 'Is Day';
    body.style.background = 'linear-gradient(0.25turn,#4098DB,#ECF3FC,#C1EBFB,#A9E0F8,#5FD2FA,#4CB0ED)';
    // body.style.background = '#a0d2eb';
    body.style.color = 'black';
  } else if (!isDay) {
    time.textContent = 'Is Night';
    // body.style.backgroundColor = '#0c1445';
    body.style.background = 'linear-gradient(0.25turn,#855988,#6B4984,#483475,#2B2F77,#141852,#070B34)';
    body.style.color = 'white';
  }

  icon.src = changeIconSize(obj.condition.icon);

  for (let i = 0; i < 3; i++) {
    refreshForecast(obj, type, i);
  }
}

function refreshForecast (obj, type, number) {
  const date = document.getElementById(`forecast-date-${number}`);
  const textCondition = document.getElementById(`forecast-text-${number}`);
  const iconCondition = document.getElementById(`forecast-icon-${number}`);
  const maxTemp = document.getElementById(`li-forecast-${number}-0`);
  const minTemp = document.getElementById(`li-forecast-${number}-1`);
  const willRain = document.getElementById(`li-forecast-${number}-2`);
  const willSnow = document.getElementById(`li-forecast-${number}-3`);

  date.textContent = obj.forecast[number].date;
  textCondition.textContent = obj.forecast[number].condition.text;
  iconCondition.src = changeIconSize(obj.forecast[number].condition.icon);

  if (type === 'celsius') {
    maxTemp.textContent = `Max Temp: ${obj.forecast[number].maxtemp_c} °C`;
    minTemp.textContent = `Min Temp: ${obj.forecast[number].mintemp_c} °C`;
  } else if (type === 'farenheit') {
    maxTemp.textContent = `Max Temp: ${obj.forecast[number].maxtemp_f} °F`;
    minTemp.textContent = `Min Temp: ${obj.forecast[number].mintemp_f} °F`;
  }

  willRain.textContent = `Will Rain? ${obj.forecast[number].daily_will_it_rain ? 'Yes' : 'No'}`;
  willSnow.textContent = `Will Snow? ${obj.forecast[number].daily_will_it_snow ? 'Yes' : 'No'}`;
}

export function switchTypesText (obj, e) {
  if (!e) {
    switchTypes.textContent = 'Switch to Farenheit';
    refreshDisplay(obj, 'celsius');
    return;
  }

  if (e.target.textContent === 'Switch to Farenheit') {
    e.target.textContent = 'Switch to Celsius';
    refreshDisplay(obj, 'farenheit');
  } else if (e.target.textContent === 'Switch to Celsius') {
    e.target.textContent = 'Switch to Farenheit';
    refreshDisplay(obj, 'celsius');
  }
}

export function loadingContent (loading) {
  const div = document.getElementById('loading');
  if (loading) {
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.position = 'absolute';
    div.style.background = `no-repeat center/20% url(${loadingGif})`;
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    div.style.backgroundBlendMode = 'luminosity';
    div.style.opacity = '0.3';
    div.style.zIndex = '99';
    return;
  }
  div.style.width = '';
  div.style.height = '';
  div.style.position = '';
  div.style.background = '';
  div.style.backgroundColor = '';
  div.style.backgroundBlendMode = '';
  div.style.opacity = '';
  div.style.zIndex = '';
}

export function createDatalistOptions (e) {
  const datalist = document.getElementById('datalistOptions');
  const option = document.createElement('option');

  option.value = `${e.name}, ${e.region}, ${e.country}`;
  option.id = `${e.id}`;

  datalist.appendChild(option);
}

export function clearDatalistOptions () {
  const datalist = document.getElementById('datalistOptions');

  if (datalist.children.length > 0) {
    datalist.replaceChildren();
    return true;
  }
  return false;
}
