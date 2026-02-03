const songs = [
  "assets/audios/Back For You.mp3",
  "assets/audios/Chris Brown - Angel Numbers Ten Toes (Official Video).mp3",
  "assets/audios/Chris Brown - Bruce Lee (Lyric Video).mp3",
  "assets/audios/Chris Brown - It Depends (Audio) ft. Bryson Tiller.mp3",
  "assets/audios/Chris Brown - Talm' Bout (Official Video).mp3",
  "assets/audios/Chris Brown - Wheels Fall Off From The Block @4ShootersOnly Performance.mp3",
  "assets/audios/Justin Bieber - Ghost.mp3",
  "assets/audios/Justin Bieber - Hold On.mp3",
  "assets/audios/Justin Bieber - Love Yourself (PURPOSE _ The Movement).mp3",
  "assets/audios/Justin Bieber - Mistletoe (Official Music Video).mp3",
  "assets/audios/Justin Bieber - What Do You Mean_.mp3",
  "assets/audios/One Direction - Better Than Words (Audio).mp3",
  "assets/audios/One Direction - Steal My Girl.mp3",
  "assets/audios/Shawn Mendes - Treat You Better.mp3",
];

let currentSongIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  const AudioPlayer = document.querySelector("#audio-player");
  const audioControllerButtonIcon = document.querySelector("#play-pause-btn");

  const previousSong = document.querySelector(".hgi-previous");
  const nextSong = document.querySelector(".hgi-next");
  const playBackRateX2 = document.querySelector(".btn-playback");

    // Update Play Back Rate  
  playBackRateX2.addEventListener("click", () => {
    playBackRateX2.classList.toggle("active");
    AudioPlayer.playbackRate = ( playBackRateX2.classList.contains("active") ) ? 2 : 1;
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
  });

  AudioPlayer.addEventListener("pause", () => {
    audioControllerButtonIcon.classList.replace("hgi-pause", "hgi-play-circle");
  });
});

// Change Song
const updateSong = (action) => {
  const AudioPlayer = document.querySelector("#audio-player");
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

  AudioPlayer.setAttribute("src", songs[currentSongIndex]);
};
