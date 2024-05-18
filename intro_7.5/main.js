const src_bar = document.getElementById("src_bar");
const btn = document.getElementById("btn");
const food_display = document.getElementById("food_display");


btn.addEventListener("click", () => {
    const searchValue = src_bar.value;

    searchMeals(searchValue);
});

const searchMeals = (searchVal) => {
    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            food_display.innerHTML = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    food_display.innerHTML += `
                    <div class="innerItem">
                        <div style="width: 50%;margin:5px;">
                            <img
                                class="itemImg"
                                src="${meal.strMealThumb}"
                                alt=""
                            />
                        </div>
                        <div style="width: 50%; padding: 5pxm ">
                            <h1>${meal.strMeal}</h1>
                            <p class="tag">${meal.strTags}</p>
                            <p class="details">
                            ${meal.strInstructions.slice(0, 30)}
                            </p>
                            <button onclick" ">See More</button>
                        </div>
                    </div>`;
                });
            } else {
                food_display.innerHTML =
                    "<p>Meals Not Found</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

searchMeals("r");