const publicKey = "da4d97f480cf88990079b8840f27623c";
const privateKey = "f718261b4e6d51f28d90987960691bcd83c1e32b";


const timestamp = new Date().getTime();

const hash = md5(`${timestamp}${privateKey}${publicKey}`);


const MARVEL_URL = 
`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

const marvel = document.querySelector(".characters");

function addNewCharacter() {
  const promise = fetch(MARVEL_URL);
  promise 
  .then(function(response) {
    console.log("OG Response from API", response);
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
    console.log("Response after .json()", processedResponse);
    const character = processedResponse.data.results[19];
    const thumbnail = character.thumbnail;
    const img = document.createElement("img");

    img.src = `${thumbnail.path}.${thumbnail.extension}`;
    img.alt = character.name;
    marvel.appendChild(img);
  });
  console.log("this will log first");
}

document.querySelector(".add-character").addEventListener("click", addNewCharacter);



