fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  .then((resp) => resp.json())
  .then(function (data) {
    let fullSearch = data.meals;
    console.log(fullSearch);
    for (let index = 0; index < fullSearch.length; index++) {
      const element = fullSearch[index];
      const thisIngredient = `<p>${element.strIngredient}</p>`;
      document.getElementById("um").innerHTML += thisIngredient;
    }
  });
