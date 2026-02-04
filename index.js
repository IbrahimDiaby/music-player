const songs = [
  { source: "/music-player/assets/audios/test.mp3", title: "Count" },
  { source: "/music-player/assets/audios/Back For You.mp3", title: "Back For You" },
  {
    source:
      "/music-player/assets/audios/Chris Brown - Angel Numbers Ten Toes (Official Video).mp3",
    title: "Chris Brown - Angel Numbers Ten Toes (Official Video)",
  },
  {
    source: "/music-player/assets/audios/Chris Brown - Bruce Lee (Lyric Video).mp3",
    title: "Chris Brown - Bruce Lee (Lyric Video)",
  },
  {
    source:
      "/music-player/assets/audios/Chris Brown - It Depends (Audio) ft. Bryson Tiller.mp3",
    title: "Chris Brown - It Depends (Audio) ft. Bryson Tiller",
  },
  {
    source: "/music-player/assets/audios/Chris Brown - Talm' Bout (Official Video).mp3",
    title: "Chris Brown - Talm' Bout (Official Video)",
  },
  {
    source:
      "/music-player/assets/audios/Chris Brown - Wheels Fall Off From The Block @4ShootersOnly Performance.mp3",
    title:
      "Chris Brown - Wheels Fall Off From The Block @4ShootersOnly Performance",
  },
  {
    source: "/music-player/assets/audios/Justin Bieber - Ghost.mp3",
    title: "Justin Bieber - Ghost",
  },
  {
    source: "/music-player/assets/audios/Justin Bieber - Hold On.mp3",
    title: "Justin Bieber - Hold On",
  },
  {
    source:
      "/music-player/assets/audios/Justin Bieber - Love Yourself (PURPOSE _ The Movement).mp3",
    title: "Justin Bieber - Love Yourself (PURPOSE _ The Movement)",
  },
  {
    source:
      "/music-player/assets/audios/Justin Bieber - Mistletoe (Official Music Video).mp3",
    title: "Justin Bieber - Mistletoe (Official Music Video)",
  },
  {
    source: "/music-player/assets/audios/Justin Bieber - What Do You Mean_.mp3",
    title: "Justin Bieber - What Do You Mean_",
  },
  {
    source: "/music-player/assets/audios/One Direction - Better Than Words (Audio).mp3",
    title: "One Direction - Better Than Words (Audio)",
  },
  {
    source: "/music-player/assets/audios/One Direction - Steal My Girl.mp3",
    title: "One Direction - Steal My Girl",
  },
  {
    source: "/music-player/assets/audios/Shawn Mendes - Treat You Better.mp3",
    title: "Shawn Mendes - Treat You Better",
  },
];

let currentSongIndex = 0;
let currentInterval;
let autoNextState = false;
let autoRepeatState = false;

window.addEventListener("DOMContentLoaded", () => {
  // pathname();

  const progressIndicator = document.querySelector("#current-time-range");
  const AudioPlayer = document.querySelector("#audio-player");
  const audioControllerButtonIcon = document.querySelector("#play-pause-btn");

  const previousSong = document.querySelector(".hgi-previous");
  const nextSong = document.querySelector(".hgi-next");
  const playBackRateX2 = document.querySelector(".btn-playback");

  const autoNextBtn = document.querySelector("#auto-next-btn");
  const replaytBtn = document.querySelector("#repeat-btn");

  const updateProgress = (progress)=>{
    progressIndicator.style.background = `
      linear-gradient(
        90deg,
        var(--progress-bg) ${progress}%,
        transparent ${progress}%
      )
    `;
  }

  progressIndicator.addEventListener("change", (e) => {
    AudioPlayer.currentTime = e.target.value;
    const currentTimeContainer = document.querySelector(
      ".time-info-container .current-time",
    );
    const fullTimeContainer = document.querySelector(
      ".time-info-container .song-full-time",
    );

    const duration = AudioPlayer.duration;
    const currentTime = AudioPlayer.currentTime;

    currentTimeContainer.textContent = formatTime(currentTime);
    fullTimeContainer.textContent = formatTime(duration);

    // Progress bar
    const progress = (currentTime / duration) * 100;
    updateProgress(progress);
  });

  autoNextBtn.addEventListener("click", () => {
    autoNextBtn.classList.toggle("active");
    replaytBtn.classList.remove("active");
    autoNextState = autoNextBtn.classList.contains("active") ? true : false;
    autoRepeatState = false;

    autoRepeat();
  });

  replaytBtn.addEventListener("click", () => {
    replaytBtn.classList.toggle("active");
    autoNextBtn.classList.remove("active");
    autoRepeatState = replaytBtn.classList.contains("active") ? true : false;
    autoNextState = false;

    autoRepeat();
  });

  // Update Play Back Rate
  playBackRateX2.addEventListener("click", () => {
    playBackRateX2.classList.toggle("active");
    AudioPlayer.playbackRate = playBackRateX2.classList.contains("active")
      ? 2
      : 1;
  });

  AudioPlayer.addEventListener("ended", () => {
    if (autoRepeatState) {
      autoRepeat();
    }

    if (autoNextState) {
      autoNext();
    }

    progressIndicator.classList.add("ended");

    setTimeout(() => {
      progressIndicator.setAttribute(
        "value",
        progressIndicator.getAttribute("max"),
      );
    }, 200);
  });

  previousSong.addEventListener("click", () => {
    updateSong("previous");
    AudioPlayer.play();
  });

  nextSong.addEventListener("click", () => {
    updateSong("next");
    AudioPlayer.play();
  });

  updateSong("init");

  audioControllerButtonIcon.addEventListener("click", () => {
    AudioPlayer.paused ? AudioPlayer.play() : AudioPlayer.pause();
  });

  AudioPlayer.addEventListener("playing", () => {
    audioControllerButtonIcon.classList.replace("hgi-play-circle", "hgi-pause");

    // Update time info
    currentInterval = updateTimeInfo();
  });

  AudioPlayer.addEventListener("pause", () => {
    audioControllerButtonIcon.classList.replace("hgi-pause", "hgi-play-circle");
    clearInterval(currentInterval);
  });
});

// Time helpers
const formatTime = (time) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

// Change Song
const updateSong = (action) => {
  const AudioPlayer = document.querySelector("#audio-player");
  const playBackRateX2 = document.querySelector(".btn-playback");
  const progressIndicator = document.querySelector("#current-time-range");
  const titleSong = document.querySelector(".song-title-container .song-title");

  progressIndicator.classList.remove("ended");

  switch (action) {
    case "previous":
      currentSongIndex =
        currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
      break;

    case "next":
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      break;

    case "init":
      currentSongIndex = 0;
      break;

    default:
      alert("Are you sure about what you're trying to do ?");
      break;
  }

  titleSong.textContent = `${songs[currentSongIndex].title}`;
  AudioPlayer.setAttribute("src", songs[currentSongIndex].source);
  AudioPlayer.playbackRate = playBackRateX2.classList.contains("active")
    ? 2
    : 1;
  AudioPlayer.play();

  progressIndicator.setAttribute("value", 0);
};

const seekbar = () => {
  const audioPlayer = document.querySelector("#audio-player");
  const progressIndicator = document.querySelector("#current-time-range");
};

const updateTimeInfo = () => {
  const audioPlayer = document.querySelector("#audio-player");
  const progressIndicator = document.querySelector("#current-time-range");
  const currentTimeContainer = document.querySelector(
    ".time-info-container .current-time",
  );
  const fullTimeContainer = document.querySelector(
    ".time-info-container .song-full-time",
  );

  if (!audioPlayer || !progressIndicator) return;

  progressIndicator.min = 0;

  const interval = setInterval(() => {
    if (isNaN(audioPlayer.duration)) return;

    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;

    currentTimeContainer.textContent = formatTime(currentTime);
    fullTimeContainer.textContent = formatTime(duration);

    // Progress bar
    const progress = (currentTime / duration) * 100;

    progressIndicator.max = duration;
    progressIndicator.value = currentTime;
    progressIndicator.style.background = `
      linear-gradient(
        90deg,
        var(--progress-bg) ${progress}%,
        transparent ${progress}%
      )
    `;
  }, 1000);

  return interval;
};

const autoNext = () => {
  updateSong("next");
};

// const pathname = () => {
//   const base = document.querySelector("base");
//   base.setAttribute("href", window.origin);
// };

const autoRepeat = () => {
  const AudioPlayer = document.querySelector("#audio-player");
  if (autoRepeatState) {
    AudioPlayer.setAttribute("loop", "");
  } else {
    AudioPlayer.removeAttribute("loop");
  }
};
