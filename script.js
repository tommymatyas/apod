/* const API_KEY = "YMTrX9snZfy7He6qaP8dyieVNr2BY8STl7Y15Vua";

const fetchApod = () =>
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(
    (response) => response.json()
  );

const apodComponent = (title, imgUrl, date, explanation) => `
<div class="apod">
  <h2>${title}</h2>
  <img src="${imgUrl}" />
  <input type="date" value=${date} min="1995-06-16" max="${date} onkeydown="return false" />
  <p class="explanation">${explanation}</p>
</div>
`;

const makeDomFromData = (data, rootElement, component) => {
  rootElement.insertAdjacentHTML(
    "beforeend",
    component(data.title, data.hdurl, data.date, data.explanation)
  );
};

const init = () => {
  fetchApod().then((data) => {
    console.log(data);

    makeDomFromData(data, document.querySelector("#root"), apodComponent);
    const inputElement = document.querySelector("input");
    inputElement.addEventListener("input", () => {
      console.log(inputElement.value);
    });
  });
};

init(); */

// chatgpt

const API_KEY = "YMTrX9snZfy7He6qaP8dyieVNr2BY8STl7Y15Vua";

const fetchApod = (date = "") => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  if (date) {
    url += `&date=${date}`;
  }
  return fetch(url).then((response) => response.json());
};

const apodComponent = (title, imgUrl, date, explanation) => `
<div class="apod">
  <h2>${title}</h2>
  <img src="${imgUrl}" />
  <input type="date" value=${date} min="1995-06-16" max="${
  new Date().toISOString().split("T")[0]
}" onkeydown="return false" />
  <p class="explanation">${explanation}</p>
</div>
`;

const makeDomFromData = (data, rootElement, component) => {
  rootElement.innerHTML = ""; // Clear previous content
  rootElement.insertAdjacentHTML(
    "beforeend",
    component(data.title, data.hdurl, data.date, data.explanation)
  );
};

const init = () => {
  const rootElement = document.querySelector("#root");
  fetchApod().then((data) => {
    console.log(data);
    makeDomFromData(data, rootElement, apodComponent);

    const inputElement = document.querySelector("input");
    inputElement.addEventListener("input", () => {
      const selectedDate = inputElement.value;
      fetchApod(selectedDate).then((data) => {
        console.log(data);
        makeDomFromData(data, rootElement, apodComponent);
      });
    });
  });
};

init();
