const key = "5a8c32c388f6d60cfb79758f85fb9e29";
window.onload = function funLoad() {
  fetchDetails("Daredevil");
};

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

// Main Code
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
    fetchDetails(characterName);
  }
});

// Fetching Character Details
function fetchDetails(characterName) {
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

        const CharacterId = response.data.results[0].id;

        // COMIC URL
        const comicUrl =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          CharacterId +
          "/comics?apikey=" +
          key;
        printComicDetails(comicUrl);

        // SERIES URL
        const seriesUrl =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          CharacterId +
          "/series?apikey=" +
          key;
        printSeriesDetails(seriesUrl);
      }
    })
    .catch((err) => console.error(err));
}

// Removing unnecessary elements from page
function removeElements() {
  document.getElementById("container").style.display = "none";
  document.getElementById("characterNotFound").style.display = "flex";
  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
}

// Adding those elements to page
function addElements() {
  document.getElementById("container").style.removeProperty("display");
  document.getElementById("characterNotFound").style.display = "none";
  document.querySelector("footer").style.removeProperty("position");
  document.querySelector("footer").style.removeProperty("bottom");
}

// Updating Character Card as soon as other character is searched
function updateCharacterData(response) {
  const CharacterId = response.data.results[0].id;
  // console.log(CharacterId);
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

// Printing Comic Details of character
function printComicDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      if (res.data.total == 0) {
        document.getElementById("comics").innerHTML =
          "<h3 style='text-align:center'>No Comics Available for this character :(</h3>";
      } else {
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
          if (comicDescription == null || comicDescription.trim() == "") {
            comicDes.innerHTML = "<h3 style='margin: 20px 10px;'> -- </h3>";
          } else {
            comicDes.innerHTML = comicDescription;
          }

          comicDetail.append(comicName, comicDes);

          comicCard.append(poster, comicDetail);

          comics.append(comicCard);
        });
      }
    })
    .catch((error) => console.log(error));
}

// Printing Series Details of character
function printSeriesDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      if (res.data.total == 0) {
        document.getElementById("series").innerHTML =
          "<h3 style='text-align:center'>No Series Available for this character :(</h3>";
      } else {
        const series = document.getElementById("series");
        series.innerHTML = "";

        const allSeriesData = res.data.results;

        allSeriesData.forEach((seriesData) => {
          const seriesTitle = seriesData.title;
          const seriesDes = seriesData.description;
          const startYear = seriesData.startYear;
          const endYear = seriesData.endYear;
          const rating = seriesData.rating;
          const type = seriesData.type;

          const thumbnail =
            seriesData.thumbnail.path + "." + seriesData.thumbnail.extension;

          const seriesCard = document.createElement("div");
          seriesCard.classList.add("seriesCard");
          seriesCard.innerHTML = ` <img class='tmp' src='${thumbnail}' alt='${seriesTitle}' />
            <div class='seriesDetail'>
              <div class='seriesName'>${seriesTitle}</div>
              <div class='seriesDescription'>
                ${
                  seriesDes == null || seriesDes.trim() == ""
                    ? "<h3 style='margin: 20px 10px;'> -- </h3>"
                    : seriesDes
                }
              </div>
              <div class='seriesYear'>${
                startYear == null || startYear == "" ? "-" : startYear
              } - ${endYear == null || endYear == "" ? "-" : endYear}</div>
              <div class='seriesRating'>
                <span>Rating:</span>
                <span class='rating'>${
                  rating == null || rating == "" ? "Not Provided" : rating
                }</span>
              </div>
              <div class='seriesType'>
                <span>Type:</span>
                <span class='type'>${
                  type == null || type == "" ? "Not Provided" : type
                }</span>
              </div>
            </div>`;

          series.append(seriesCard);
        });
      }
    })
    .catch((error) => console.log(error));
}
