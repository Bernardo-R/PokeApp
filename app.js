const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// adds an event listener to the document that waits for the DOM to be fully loaded.
// Once the DOM is loaded, it calls the fetchData function which fetches data from the PokeAPI for a random Pokemon.
document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  fetchData(random);
});
/**
 * Fetches data from the PokeAPI for a random Pokemon.
 * @returns {Promise<void>} A Promise that resolves when the data is fetched and logged to the console.
 */
const fetchData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      hp: data.stats[0].base_stat,
      experience: data.base_experience,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    };

    populateCard(data); // Call the function to display the data on the browser
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const populateCard = (pokemon) => {
  const flex = document.querySelector(".flex");
  const template = document.querySelector("#template-card");
  const clone = template.content.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone
    .querySelector(".card-body-img")
    .setAttribute("src", pokemon.sprites.other.dream_world.front_default);
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`;
  clone.querySelector(
    ".card-body-text"
  ).textContent = `EXP ${pokemon.base_experience} `;
  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.stats[1].base_stat;
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.stats[2].base_stat;
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.stats[3].base_stat;

  fragment.appendChild(clone);
  flex.appendChild(fragment);

  // Add button with class "card-btn" and refresh the page when clicked
  const button = document.createElement("button");
  button.classList.add("card-btn");
  button.textContent = "Refresh";
  button.addEventListener("click", () => {
    location.reload();
  });
  flex.appendChild(button);
};

fetchData();
