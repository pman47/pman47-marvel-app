const key = "5a8c32c388f6d60cfb79758f85fb9e29";

// GET List of Character Names For Searching Purpose
function getNameList(searchName) {
  if (searchName != "") {
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
        searchName +
        "&apikey=" +
        key
    )
      .then((response) => response.json())
      .then((response) => {
        if (document.getElementById("nameList")) {
          document.getElementById("nameList").remove();
        }

        const dataList = document.createElement("datalist");
        dataList.id = "nameList";

        response.data.results.forEach((res) => {
          const option = document.createElement("option");
          option.value = res.name;
          dataList.append(option);
        });

        const form = document.getElementById("form");
        form.append(dataList);
      })
      .catch((err) => console.log(err));
  } else {
    if (document.getElementById("nameList")) {
      document.getElementById("nameList").remove();
    }
  }
}

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault;
  // const characterName = document.getElementById("searchName").textContent;
  let searchNameEle = document.getElementById("searchName");
  let searchName = searchNameEle.value.trim();
  if (searchName == null || searchName == "") {
    console.log("Not Valid");
    searchNameEle.style.border = "2px solid red";
    searchNameEle.style.borderRadius = "5px";
    searchNameEle.value = "";
  } else {
    searchNameEle.style.border = "";
    searchNameEle.style.borderRadius = "";
    const characterName = searchName;

    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?name=" +
        characterName +
        "&apikey=" +
        key
    )
      .then((response) => response.json())
      .then((response) => {
        // Check if we have data or not
        if (response.data.count == 0) {
          removeElements(); // Remove all elements and show character not found card
        } else {
          // If we found data then
          addElements(); // Add Body Elements
          updateCharacterData(response); // Update character Image, Name, Description

          // COMIC URL
          if (response.data.results[0].comics.available > 0) {
            // If there is a comic
            const comicUrl = response.data.results[0].comics.collectionURI;
            printComicDetails(comicUrl + "?apikey=" + key);
          } else {
            // If there is not
            document.getElementById("comics").innerHTML =
              "<h3 style='text-align:center'>No Comics Available for this character :(</h3>";
          }
        }
      })
      .catch((err) => console.error(err));
  }
});

function removeElements() {
  document.getElementById("container").style.display = "none";
  document.getElementById("characterNotFound").style.display = "flex";
  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
}

function addElements() {
  document.getElementById("container").style.removeProperty("display");
  document.getElementById("characterNotFound").style.display = "none";
  document.querySelector("footer").style.removeProperty("position");
  document.querySelector("footer").style.removeProperty("bottom");
}

function updateCharacterData(response) {
  const CharacterId = response.data.results[0].id;
  console.log(CharacterId);
  const name = response.data.results[0].name;
  const description = response.data.results[0].description.trim();
  const imgPath =
    response.data.results[0].thumbnail.path +
    "." +
    response.data.results[0].thumbnail.extension;

  const imgTag = document.getElementById("mainImage");
  imgTag.src = imgPath;

  const nameTag = document.getElementById("characterName");
  nameTag.innerText = name;

  const desTag = document.getElementById("characterDescription");
  if (description == null || description == "") {
    desTag.classList.add("noCharDes");
    desTag.innerText = "--";
  } else {
    desTag.classList.remove("noCharDes");
    desTag.innerText = description;
  }
}

function printComicDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      const allComicData = res.data.results;

      const comics = document.getElementById("comics");
      comics.innerHTML = "";

      allComicData.forEach((comic) => {
        const comicPoster =
          comic.thumbnail.path + "." + comic.thumbnail.extension;
        const comicTitle = comic.title;
        const comicDescription = comic.description;

        const comicCard = document.createElement("div");
        comicCard.classList.add("comicCard");

        const poster = document.createElement("img");
        poster.classList.add("tmp");
        poster.src = comicPoster;
        poster.alt = comicTitle;

        const comicDetail = document.createElement("div");
        comicDetail.classList.add("comicDetail");

        const comicName = document.createElement("div");
        comicName.classList.add("comicName");
        comicName.innerText = comicTitle;

        const comicDes = document.createElement("div");
        comicDes.classList.add("comicDescription");
        comicDes.innerHTML = comicDescription;

        comicDetail.append(comicName, comicDes);

        comicCard.append(poster, comicDetail);

        comics.append(comicCard);
      });
    })
    .catch((error) => console.log(error));
}
