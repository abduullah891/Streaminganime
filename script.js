document.addEventListener("DOMContentLoaded", () => {
    const animeList = document.getElementById("anime-list");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    const fetchAndDisplayAnime = (url) => {
        animeList.innerHTML = "";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.data.forEach(anime => {
                    const animeCard = document.createElement("div");
                    animeCard.classList.add("anime-card");

                    const title = document.createElement("h3");
                    title.textContent = anime.title;

                    const image = document.createElement("img");
                    image.src = anime.images.jpg.image_url;
                    image.alt = anime.title;

                    const link = document.createElement("a");
                    link.href = `anime.html?id=${anime.mal_id}`;
                    link.appendChild(image);

                    animeCard.appendChild(link);
                    animeCard.appendChild(title);
                    animeList.appendChild(animeCard);
                });
            })
            .catch(error => console.error("Error fetching anime data:", error));
    };

    fetchAndDisplayAnime("https://api.jikan.moe/v4/top/anime");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchAndDisplayAnime(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});
