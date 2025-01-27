/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div"); 

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }  
}  


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalBackers.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const totalGames = GAMES_JSON.length;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Add the unfunded games to the DOM
    console.log(unfundedGames); // Log the array of unfunded games
    addGamesToPage(unfundedGames); // Display the unfunded games
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Add the funded games to the DOM
    console.log(fundedGames); // Log the array of funded games
    addGamesToPage(fundedGames); // Display the funded games
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', () => {
    deleteChildElements(document.getElementById('games-container')); // Clear the current game list
    addGamesToPage(filterUnfundedOnly(GAMES_JSON)); // Show unfunded games
});
fundedBtn.addEventListener('click', () => {
    deleteChildElements(document.getElementById('games-container')); // Clear the current game list
    addGamesToPage(filterFundedOnly(GAMES_JSON)); // Show funded games
});
allBtn.addEventListener('click', () => {
    deleteChildElements(document.getElementById('games-container')); // Clear the current game list
    addGamesToPage(GAMES_JSON); // Show all games
});
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numfundedGames = GAMES_JSON.reduce((count, game) => {
    // Check if the game is unfunded
    if (game.pledged >= game.goal) {
      return count + 1; // Increment the count if the game is unfunded
    }
    return count; // Return the current count if the game is funded
  }, 0);
  console.log(numfundedGames);

const numUnfundedGames = GAMES_JSON.reduce((count, game) => {
    // Check if the game is unfunded
    if (game.pledged < game.goal) {
      return count + 1; // Increment the count if the game is unfunded
    }
    return count; // Return the current count if the game is funded
  }, 0);
  console.log(numUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = ` A total of 
  $${totalRaised.toLocaleString()} has been raised for ${numfundedGames} ${numfundedGames === 1 ? "game" : "games"}.
  Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container

const summaryParagraph = document.createElement("p");
summaryParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(summaryParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondTopGame, ...rest] = sortedGames;
const firstWordTopGame = topGame.name.split(" ")[0];
const firstWordSecondTopGame = secondTopGame.name.split(" ")[0];
console.log(firstWordTopGame); 
console.log(firstWordSecondTopGame); 

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
const secondTopGameElement = document.createElement("p");
topGameElement.innerHTML = `Top Funded Game: ${topGame.name}`;
secondTopGameElement.innerHTML = `Second Most Funded Game: ${secondTopGame.name}`;

firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(secondTopGameElement);



// Search Functionality

// Grab the search input and games container
const searchInput = document.getElementById("search-bar");

// Add an event listener for the search input
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter the games based on the search term
    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(searchTerm)
    );

    // Clear the current game cards
    deleteChildElements(gamesContainer);

    // Add the filtered games to the page
    addGamesToPage(filteredGames);
});
