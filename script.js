const songsData = {
  songs: [
    {
      title: "آهنگ 1",
      artist: "خوننده 1",
      image: "picture/1-tomaj.jpg",
      file: "song/a.mp3",
    },
    {
      title: "آهنگ 2",
      artist: "خوننده 2",
      image: "picture/2-najafi.jpg",
      file: "song/b.mp3",
    },
    {
      title: "آهنگ 3",
      artist: "خوننده 3",
      image: "picture/3-sorena.jpg",
      file: "song/c.mp3",
    },
    {
      title: "آهنگ 4",
      artist: "خوننده 4",
      image: "picture/4-hichkas.jpg",
      file: "song/d.mp3",
    },
    {
      title: "آهنگ 5",
      artist: "خوننده 5",
      image: "picture/5-yas.jpg",
      file: "song/e.mp3",
    },
    {
      title: "آهنگ 6",
      artist: "خوننده 6",
      image: "picture/6-reza.jpg",
      file: "song/f.mp3",
    },
  ],
  remixes: [
    {
      title: "آهنگ 1",
      artist: "ریمیکس 1",
      image: "picture/1-tomaj.jpg",
      file: "remix/a.mp3",
    },
    {
      title: "آهنگ 2",
      artist: "ریمیکس 2",
      image: "picture/2-najafi.jpg",
      file: "remix/b.mp3",
    },
    {
      title: "آهنگ 3",
      artist: "ریمیکس 3",
      image: "picture/3-sorena.jpg",
      file: "remix/c.mp3",
    },
    {
      title: "آهنگ 4",
      artist: "ریمیکس 4",
      image: "picture/4-hichkas.jpg",
      file: "remix/d.mp3",
    },
    {
      title: "آهنگ 5",
      artist: "ریمیکس 5",
      image: "picture/5-yas.jpg",
      file: "remix/e.mp3",
    },
    {
      title: "آهنگ 6",
      artist: "ریمیکس 6",
      image: "picture/6-reza.jpg",
      file: "remix/f.mp3",
    },
  ],
};

function createCards(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <div class="right">
        <div class="img"><img src="${item.image}" alt="${item.title}"></div>
        <div class="text">
          <p class="n-music">${item.title}</p>
          <p class="name">${item.artist}</p>
        </div>
      </div>
      <div class="left">
        <img src="svg/p.svg" class="play-btn" onclick="playMusic('${item.file}', '${item.title}', '${item.artist}', '${item.image}', this)">
        <img src="svg/dl.svg" id="download-btn" onclick="downloadMusic('${item.file}')">
      </div>
    `;
    container.appendChild(card);
  });
}

createCards(songsData.songs, "song-list");
createCards(songsData.remixes, "song-list2");

function playMusic(file, title, artist, image, playButton) {
  document
    .querySelectorAll(".play-btn")
    .forEach((btn) => (btn.src = "svg/p.svg"));

  playButton.src = "svg/s.svg";

  const player = document.getElementById("player");
  player.style.display = "flex";
  document.getElementById("player-img").src = image;
  document.getElementById("player-title").textContent = title;
  document.getElementById("player-singer").textContent = artist;

  audio.src = file;
  audio.onerror = () => handleAudioError(playButton);

  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
    handleAudioError(playButton);
  });
  s.style.display = "none";
  p.style.display = "block";
  isPlaying = true;
  document.body.style.marginBottom = "70px";
  progressInterval = setInterval(updateProgress, 500);
}

function handleAudioError(playButton) {
  showErrorModal("این آهنگ خراب است.");
  resetPlayer(playButton);
}

function resetPlayer(playButton) {
  audio.pause();
  isPlaying = false;
  clearInterval(progressInterval);
  document.getElementById("player").style.display = "none";
  playButton.src = "svg/p.svg";
  document.body.style.marginBottom = "0px";
}

function updateProgress() {
  const progressRange = document.getElementById("progress-range");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");

  if (audio.duration) {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    progressRange.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
}

document
  .getElementById("progress-range")
  .addEventListener("input", function () {
    audio.currentTime = (this.value / 100) * audio.duration;
  });

function downloadMusic(file) {
  fetch(file)
    .then((response) => {
      if (response.ok) {
        const link = document.createElement("a");
        link.href = file;
        link.download = file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        showErrorModal("این آهنگ خراب است.");
      }
    })
    .catch(() => showErrorModal("این آهنگ خراب است."));
}
function showErrorModal(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("error-modal").style.display = "block";
  setTimeout(closeModal, 1000);
}

function closeModal() {
  document.getElementById("error-modal").style.display = "none";
}

const p = document.querySelector(".play-1");
const s = document.querySelector(".stop-1");

p.addEventListener("click", function () {
  togglePlayStop();
  p.style.display = "none";
  s.style.display = "block";
});

s.addEventListener("click", function () {
  togglePlayStop();
  s.style.display = "none";
  p.style.display = "block";
});

function togglePlayStop() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(() => {
      showErrorModal("خطا در پخش آهنگ.");
    });
    isPlaying = true;
  }
}

// main-1
const artic = [
  { image: "picture/1-tomaj.jpg", title: "توماج صالحی" },
  { image: "picture/2-najafi.jpg", title: "شاهین نجفی" },
  { image: "picture/3-sorena.jpg", title: "سورنا" },
  { image: "picture/4-hichkas.jpg", title: "سروش هیچکس" },
  { image: "picture/5-yas.jpg", title: "یاس" },
  { image: "picture/6-reza.jpg", title: "رضا پیشرو" },
  { image: "picture/7-fadaei.jpg", title: "فدایی" },
  { image: "picture/8-hosein.jpg", title: "حصین" },
  { image: "picture/9-shervin.jpg", title: "شروین" },
  { image: "picture/10-bahnam.jpg", title: "بهرام" },
  { image: "picture/11-khelvat.jpg", title: "امیر خلوت" },
  { image: "picture/12-putak.jpg", title: "پوریا پوتک" },
];
artic.forEach(({ image, title }) => {
  const songList = document.getElementById("allartic");
  const songCard = document.createElement("div");
  songCard.className = "item";
  songCard.innerHTML = `
  <div class="img"><img src="${image}" alt="${title}"></div>
  <h3>${title}</h3>
  `;
  songList.appendChild(songCard);
});
