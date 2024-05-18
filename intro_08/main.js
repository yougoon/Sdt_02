const src_bar = document.getElementById("src_bar");
const btn = document.getElementById("btn");
const player_dis = document.getElementById("player_dis");
const cart_inside = document.getElementById("cart_inside");
const total = document.getElementById("total");

btn.addEventListener("click", () => {
    const searchValue = src_bar.value;
    searchPlayer(searchValue);
});

const searchPlayer = (searchVal) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchVal}`)
        .then(response => {
           
            return response.json();
        })
        .then(data => {
            player_dis.innerHTML = "";
            if (data.player) {
                playerData = data.player.filter(player => player.strThumb);
                playerData.forEach((player, info) => {
                    player_dis.innerHTML += `
                    <div class="innerItem">
                        <div style="width: 100%; margin:5px;">
                            <img
                                class="itemImg"
                                src="${player.strThumb}"
                                alt=""
                            />
                        </div>
                        <div style="width: 100%; padding: 5px" class="text_des">
                            <h1>${player.strPlayer}</h1>
                            <p class="tag">${player.strGender}</p>
                            <p class="tag">${player.strTeam}</p>
                            <p class="tag">${player.strSport}</p>
                            <p class="details">

                            ${player.strDescriptionEN ? player.strDescriptionEN.slice(0, 40) : 'N/A'}
                            </p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-info btn-sm" onclick="showPlayerDetails(${info})" data-bs-toggle="modal" data-bs-target="#playerModal">See More</button>
                                
                                <button class="btn btn-success btn-sm ms-2" onclick="addToSquad('${player.strPlayer}')">Add To Squad</button>
                            </div>
                            <div class="social-icons mt-2">
                                ${player.strFacebook ? `<a href="https://${player.strFacebook}" target="_blank" class="me-2"><i class="fab fa-facebook"></i></a>` : ''}
                                ${player.strTwitter ? `<a href="https://${player.strTwitter}" target="_blank" class="me-2"><i class="fab fa-twitter"></i></a>` : ''}
                            </div>
                        </div>
                    </div>`;
                });
            } else {
                player_dis.innerHTML = "<p>No player found.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const addToSquad = (playerName) => {
    if (squad.length >= 11) {
        alert("You cannot add more than 11 players to your squad.");
        return;
    }
    if (!squad.includes(playerName)) {
        squad.push(playerName);
        updateCart();
    } else {
        alert("Player is already in the squad.");
    }
};

let squad = [];
const updateCart = () => {
    cart_inside.innerHTML = "";
    squad.forEach(player => {
        cart_inside.innerHTML += `<p>${player}</p>`;
    });
    total.innerText = squad.length;
};

const showPlayerDetails = (info) => {
    const player = playerData[info];
    if (!player) {
        console.error('Player not exists ', info);
        return;
    }
    const modalBody = document.querySelector('#playerModal .modal-body');
    modalBody.innerHTML = `
        <h2>${player.strPlayer}</h2>
        <p><strong>Gender:</strong> ${player.strGender}</p>
        <p><strong>Team:</strong> ${player.strTeam}</p>
        <p><strong>Sport:</strong> ${player.strSport}</p>
        <p><strong>Status:</strong> ${player.strStatus}</p>
        <p><strong>Description:</strong> ${player.strDescriptionEN ? player.strDescriptionEN.slice(0, 50) : 'N/A'}</p>
        <img src="${player.strThumb}" class="img-fluid" alt="${player.strPlayer}">
        <div class="social-icons mt-2">
            ${player.strFacebook ? `<a href="https://${player.strFacebook}" target="_blank" class="me-2"><i class="fab fa-facebook"></i></a>` : ''}
            ${player.strTwitter ? `<a href="https://${player.strTwitter}" target="_blank" class="me-2"><i class="fab fa-twitter"></i></a>` : ''}
        </div>
    `;
};

searchPlayer("n");
