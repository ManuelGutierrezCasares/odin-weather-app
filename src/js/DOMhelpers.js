import { switchTypes } from './main.js';
import loadingGif from '../img/loading.gif';

export function createDispĺay () {
  const container = document.getElementById('container');
  const h1 = document.createElement('h1');
  const h3 = document.createElement('h3');
  const icon = document.createElement('img');
  const ul = document.createElement('ul');

  h1.id = 'city';
  h3.id = 'region-country';
  icon.id = 'icon';

  createLi(7, ul);

  container.appendChild(h1);
  container.appendChild(h3);
  container.appendChild(icon);
  container.appendChild(ul);

  return container;
}

function createLi (number, ul) {
  for (let i = 1; i <= number; i++) {
    const li = document.createElement('li');
    li.style.listStyleType = 'none';
    li.id = `li-${i}`;
    ul.appendChild(li);
  }
  return ul;
}

export function refreshDisplay (obj, type) {
  const body = document.getElementsByTagName('body')[0];
  const city = document.getElementById('city');
  const regionCountry = document.getElementById('region-country');
  const temp = document.getElementById('li-1');
  const feelslike = document.getElementById('li-2');
  const wind = document.getElementById('li-3');
  const humidity = document.getElementById('li-4');
  const cloudPercent = document.getElementById('li-5');
  const cloudText = document.getElementById('li-6');
  const time = document.getElementById('li-7');
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
    body.style.backgroundColor = '#a0d2eb';
    body.style.color = 'black';
  } else if (!isDay) {
    time.textContent = 'Is Night';
    body.style.backgroundColor = '#0c1445';
    body.style.color = 'white';
  }

  icon.src = `https:${obj.condition.icon}`;
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
