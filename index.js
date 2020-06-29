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
        const breedsList = [];

        for (breed in processedResponse.message) {
            if (processedResponse.message[breed].length > 0) {
                for (index in processedResponse.message[breed]) {
                    const option = document.createElement("option");
                    const breedType = processedResponse.message[breed][index];
                    option.val = `${breed}-${breedType}`;
                    option.innerText = `${breedType[0].toUpperCase()}${breedType.slice(1)} ${breed[0].toUpperCase()}${breed.slice(1)}`;
                    breedsList.push(option);
                }
            } else {
                const option = document.createElement("option");
                option.val = breed;
                option.innerText = `${breed[0].toUpperCase()}${breed.slice(1)}`
                breedsList.push(option);
            }
        }

        breedsList.sort((breedOne, breedTwo) => breedOne.innerText > breedTwo.innerText);
        const sel = document.querySelector("#breeds-list");

        for (index in breedsList) {
            sel.appendChild(breedsList[index]);
        }
    });
}

fetchBreeds();