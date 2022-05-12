const key = "5a8c32c388f6d60cfb79758f85fb9e29";

// GET List of Character Names For Searching Purpose
function getNameList(searchName) {
  // console.log(searchName);
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
        // console.log(response);

        const CharacterId = `${response.data.results[0].id}`;
        const name = `${response.data.results[0].name}`;
        const description = `${response.data.results[0].description}`.trim();
        const imgPath =
          `${response.data.results[0].thumbnail.path}` +
          "." +
          `${response.data.results[0].thumbnail.extension}`;

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
        // console.log(response.data.results[0].thumbnail);
        // var img = document.createElement("img");
        // img.src = imgPath;
        // document.getElementById("body").appendChild(img);

        // var nameElement = document.createElement("h3");
        // nameElement.innerHTML = name;
        // document.getElementById("body").appendChild(nameElement);

        // var desElement = document.createElement("p");
        // desElement.innerHTML = description;
        // document.getElementById("body").appendChild(desElement);
      })
      .catch((err) => console.error(err));
  }
});
