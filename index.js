//const DOG_URL = "https://dog.ceo/api/breeds/image/random"
const ALL_BREEDS_URL =  "https://dog.ceo/api/breeds/list/all"
const BREEDS_URL = "https://dog.ceo/api/breed"

const dogs = document.querySelector(".dogs");
const loader = document.querySelector(".loader");

function addNewDoggo(e) {
    e.preventDefault();
    // const promise = fetch(DOG_URL);
    const sel = document.querySelector('#breeds-list');
    const option = sel.options[sel.selectedIndex];
    let breedPath = "";

    option.value.split("-")
    .forEach((s) => {
        if (!breedPath) {
            breedPath = s;
        } else {
            breedPath += `/${s}`;
        }     
    });

    const promise = fetch(`${BREEDS_URL}/${breedPath}/images/random`);

    promise
    .then(function(response) {
        const processingPromise = response.json();
        
        dogs.style.display = "none";
        loader.style.display = "initial";
        
        return processingPromise;
    })
    .then(function(processedResponse) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const i = document.createElement("i");

        div.className = "dog-img";
        img.src = processedResponse.message;
        img.alt = option.innerText;
        btn.className = "del-btn"
        btn.style.visibility = "hidden";
        i.className = "fa fa-close";

        img.onmouseover = (e) => e.target.nextSibling.style.visibility = "visible";
        div.onmouseleave = (e) => e.target.children[1].style.visibility = "hidden";
        /* btn.onclick = (e) => {
            const par = e.target.parentElement;
            const sel = document.querySelector("#breeds-list");
            console.log(e);
            console.log(par, sel);
        } */
        
        btn.appendChild(i);
        div.appendChild(img);
        div.appendChild(btn);
        dogs.appendChild(div);
        
        setTimeout(() => {
            dogs.style.display = "flex";
            loader.style.display = "none";
        }, 1000);
    });
}

document.querySelector(".add-dog").addEventListener("click", addNewDoggo);

function fetchBreeds() {
    const promise = fetch(ALL_BREEDS_URL);

    promise
    .then(function(response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function(processedResponse) {
        const breedsList = [];
        
        for (breed in processedResponse.message) {
            if (processedResponse.message[breed].length > 0) {
                for (index in processedResponse.message[breed]) {
                    const option = document.createElement("option");
                    const breedType = processedResponse.message[breed][index];
                    option.value = `${breed}-${breedType}`;
                    option.innerText = `${breedType[0].toUpperCase()}${breedType.slice(1)} ${breed[0].toUpperCase()}${breed.slice(1)}`;
                    breedsList.push(option);
                }
            } else {
                const option = document.createElement("option");
                option.value = breed;
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