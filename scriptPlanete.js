const listePlanete = document.querySelector("#listItem");
const populationAPI = document.querySelector("#populationAPI");
const diametreAPI = document.querySelector("#diametreAPI");
const graviteAPI = document.querySelector("#graviteAPI");
const climatAPI = document.querySelector("#climatAPI");
const terrainAPI = document.querySelector("#terrainAPI");
const nextPage = document.querySelector("#nextPage");
const populationFilter = document.querySelector("#populationFilter");

let minPopulation = 0;
let maxPopulation = Infinity;

populationFilter.addEventListener("change", function () {
  const selectValue = this.value;

  [minPopulation, maxPopulation] = selectValue.split("-").map(Number);

  if (isNaN(maxPopulation)) {
    maxPopulation = Infinity;
  }

  console.log(minPopulation, maxPopulation);
  getCountPages(minPopulation, maxPopulation);
});

//Mes fonctions asynchrones

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getCountPages(minPopulation, maxPopulation) {
  const planet = await getData("https://swapi.dev/api/planets/?page=1");
  let totalPlanets = planet.count;
  let pageCount;
  pageCount = totalPlanets / 10;
  let pageNow = 1;
  displayPlanets(planet.results, minPopulation, maxPopulation);

  nextPage.addEventListener("click", async function () {
    if (pageNow < pageCount) {
      pageNow++;
    } else {
      pageNow = 1;
    }
    const newPage = await getData(
      `https://swapi.dev/api/planets/?page=${pageNow}`
    );

    displayPlanets(newPage.results, minPopulation, maxPopulation);
  });
}

getCountPages();

// Mes fonctions synchrones

function displayPlanets(planets, minPopulation, maxPopulation) {
  removePlanets();
  planets.forEach((planete) => {
    let population =
      planete.population !== "unknown" ? parseInt(planete.population) : -1;

    if (
      population >= minPopulation &&
      (population <= maxPopulation || maxPopulation === Infinity)
    ) {
      let newPlanet = document.createElement("div");
      newPlanet.className = "newPlanet";

      let nomPlanet = document.createElement("span");
      nomPlanet.textContent = planete.name;

      let terrainPlanet = document.createElement("span");
      terrainPlanet.textContent = planete.terrain;

      listePlanete.appendChild(newPlanet);
      newPlanet.appendChild(nomPlanet);
      newPlanet.appendChild(terrainPlanet);

      newPlanet.addEventListener("click", function () {
        populationAPI.textContent = `Population: ${planete.population}`;
        diametreAPI.textContent = `Diamètre : ${planete.diameter}`;
        graviteAPI.textContent = `Gravité : ${planete.gravity}`;
        climatAPI.textContent = `Climat: ${planete.climate}`;
        terrainAPI.textContent = `Terrain : ${planete.terrain}`;
      });
    }
    console.log(planets.map((planete) => planete.population));
  });
}

function removePlanets() {
  while (listePlanete.firstChild) {
    listePlanete.removeChild(listePlanete.firstChild);
  }
}
