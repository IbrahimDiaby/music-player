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
  pathname();

  const AudioPlayer = document.querySelector("#audio-player");
  const audioControllerButtonIcon = document.querySelector("#play-pause-btn");

  const previousSong = document.querySelector(".hgi-previous");
  const nextSong = document.querySelector(".hgi-next");
  const playBackRateX2 = document.querySelector(".btn-playback");

  const autoNextBtn = document.querySelector("#auto-next-btn");
  const replaytBtn = document.querySelector("#repeat-btn");

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

    if(autoRepeatState){
      autoRepeat();
    }

    if(autoNextState){
      autoNext();
    }
    
  })

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

// Change Song
const updateSong = (action) => {
  const AudioPlayer = document.querySelector("#audio-player");
  const playBackRateX2 = document.querySelector(".btn-playback");

  const titleSong = document.querySelector(".song-title-container .song-title");

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
};

const updateTimeInfo = () => {
  const AudioPlayer = document.querySelector("#audio-player");

  const currentTimeContainer = document.querySelector(
    ".time-info-container .current-time",
  );
  const fullTimeContainer = document.querySelector(
    ".time-info-container .song-full-time",
  );

  const interval = setInterval(() => {
    // Duration
    const duration = AudioPlayer.duration;
    const currentTime = AudioPlayer.currentTime;

    // Current time converter
    const minutesCT =
      Math.floor(currentTime / 60) < 10
        ? "0" + Math.floor(currentTime / 60)
        : Math.floor(currentTime / 60);
    const secondesCT =
      Math.ceil(currentTime % 60) < 10
        ? "0" + Math.ceil(currentTime % 60)
        : Math.ceil(currentTime % 60);

    // Full time converter
    const minutesFT =
      Math.floor(duration / 60) < 10
        ? "0" + Math.floor(duration / 60)
        : Math.floor(duration / 60);
    const secondesFT =
      Math.floor(duration % 60) < 10
        ? "0" + Math.floor(duration % 60)
        : Math.floor(duration % 60);

    currentTimeContainer.textContent = `${minutesCT}:${secondesCT}`;
    fullTimeContainer.textContent = `${minutesFT}:${secondesFT}`;
  }, 1000);

  return interval;
};

const autoNext = () => {
  updateSong("next");
}

const pathname = () => {
  const base = document.querySelector("base");
  base.setAttribute("href", window.origin);
};

const autoRepeat = () => {
  const AudioPlayer = document.querySelector("#audio-player");
  if(autoRepeatState) {
    AudioPlayer.setAttribute("loop", "");
  } else {
    AudioPlayer.removeAttribute("loop");
  }
}