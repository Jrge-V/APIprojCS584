const publicKey = "da4d97f480cf88990079b8840f27623c";
const privateKey = "f718261b4e6d51f28d90987960691bcd83c1e32b";

const MARVEL_URL = (name) => {
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);
  return `https://gateway.marvel.com/v1/public/characters?name=${name}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
};

const marvel = document.querySelector(".characters");

function addNewCharacter(name) {
  const url = MARVEL_URL(name);
  const promise = fetch(url);
    promise
      .then(function (response) {
        console.log("OG Response from API", response);
        const processingPromise = response.json();
        return processingPromise;
      })
      .then(function (processedResponse) {
        console.log("Response after .json()", processedResponse);
        const character = processedResponse.data.results[0];
        if (!character) {
          console.log(`Character "${name}" not found.`);
          return;
        }
        const thumbnail = character.thumbnail;
        const img = document.createElement("img");

        img.src = `${thumbnail.path}.${thumbnail.extension}`;
        img.alt = character.name;

        //keyframe animations
        const animation = popmotion.keyframes({
          values: [{ opacity: 0}, {opacity: 1}],
          duration: 1000
        });

        //play animation
        animation.start({
          update: (v) => img.style.opacity = v.opacity //v is the current value of the animation at each frame
        });


        marvel.appendChild(img);
      });
  console.log("this will log first");
}

const form = document.querySelector(".add-character-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = form.querySelector(".character-name-input").value;
  addNewCharacter(name);
});