const DOG_URL = "https://dog.ceo/api/breeds/image/random"
const DOG_BREEDS_URL =  "https://dog.ceo/api/breeds/list/all"

const doggos = document.querySelector(".doggos");

function addNewDoggo(e) {
    e.preventDefault();
    const promise = fetch(DOG_URL);

    promise
    .then(function(response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function(processedResponse) {
        const img = document.createElement("img");
        img.src = processedResponse.message;
        img.alt = "Cute doggo";
        doggos.appendChild(img);
    });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);

function fetchBreeds() {
    const promise = fetch(DOG_BREEDS_URL);

    promise
    .then(function(response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function(processedResponse) {
        const select = document.querySelector(".breeds-list");
        console.log('breeds list', processedResponse);
    });
}

fetchBreeds();