// const key = "5a8c32c388f6d60cfb79758f85fb9e29";

const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (e) => {});
}

// const characterName = "wong";
// fetch(
//   "https://gateway.marvel.com:443/v1/public/characters?name=" +
//     characterName +
//     "&apikey=" +
//     key
// )
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);

//     const CharacterId = `${response.data.results[0].id}`;
//     const name = `${response.data.results[0].name}`;
//     const description = `${response.data.results[0].description}`;
//     const imgPath =
//       `${response.data.results[0].thumbnail.path}` +
//       "." +
//       `${response.data.results[0].thumbnail.extension}`;

//     console.log(response.data.results[0].thumbnail);
//     var img = document.createElement("img");
//     img.src = imgPath;
//     document.getElementById("body").appendChild(img);

//     var nameElement = document.createElement("h3");
//     nameElement.innerHTML = name;
//     document.getElementById("body").appendChild(nameElement);

//     var desElement = document.createElement("p");
//     desElement.innerHTML = description;
//     document.getElementById("body").appendChild(desElement);
//   })
//   .catch((err) => console.error(err));
