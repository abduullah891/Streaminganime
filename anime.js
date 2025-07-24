document.addEventListener("DOMContentLoaded", () => {
    const animeDetails = document.getElementById("anime-details");
    const animeTitle = document.getElementById("anime-title");
    const videoContainer = document.getElementById("video-container");

    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get("id");

    if (animeId) {
        // Ambil detail anime dari Jikan
        fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
            .then(response => response.json())
            .then(data => {
                const anime = data.data;
                animeTitle.textContent = anime.title;

                const details = `
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
                    <p><strong>Episodes:</strong> ${anime.episodes}</p>
                    <p><strong>Score:</strong> ${anime.score}</p>
                `;
                animeDetails.innerHTML = details;

                // Ambil sumber video dari Gogoanime
                return fetch(`https://gogoanime.consumet.stream/vidcdn/watch/${anime.title.replace(/\s/g, "-")}-episode-1`);
            })
            .then(response => response.json())
            .then(data => {
                if (data.sources && data.sources.length > 0) {
                    const videoSource = data.sources[0].file;
                    const videoElement = document.createElement("video");
                    videoElement.id = "player";
                    videoElement.playsInline = true;
                    videoElement.controls = true;
                    videoElement.src = videoSource;
                    videoContainer.appendChild(videoElement);
                    const player = new Plyr("#player");
                } else {
                    videoContainer.innerHTML = "<p>Video tidak ditemukan.</p>";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                videoContainer.innerHTML = "<p>Gagal memuat video.</p>";
            });
    }
});
