const peoples = document.querySelector("#peopleAPI");
const starships = document.querySelector("#starshipsAPI");
const planets = document.querySelector("#planetsAPI");

function fetchData() {
  fetch("https://swapi.dev/api/people")
    .then((response) => response.json())
    .then((data) => {
      const count = data.count;
      peoples.textContent = count;
    });

  fetch("https://swapi.dev/api/starships")
    .then((response) => response.json())
    .then((data) => {
      const count = data.count;
      starships.textContent = count;
    });

  fetch("https://swapi.dev/api/planets")
    .then((response) => response.json())
    .then((data) => {
      const count = data.count;
      planets.textContent = count;
    });
}
fetchData();
