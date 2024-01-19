const playButton = document.getElementsByClassName('player__button toggle')[0];
const videoPlayer = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const sliders = document.querySelectorAll('.player__slider');
const skipBtns = document.querySelectorAll('[data-skip]');

const videos = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];

const getUrl = videos => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  const url = videos[randomIndex];

  return url;
};

videoPlayer.src = getUrl(videos);

const handlePlay = () => {
  if (videoPlayer.paused || videoPlayer.ended) {
    videoPlayer.play();
    playButton.classList.add('playing');
  } else {
    videoPlayer.pause();
    playButton.classList.remove('playing');
  }

  playButton.innerHTML = videoPlayer.paused ? '►' : '❚❚';
};

playButton.addEventListener('click', handlePlay);
videoPlayer.addEventListener('click', handlePlay);
document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    handlePlay();
  }
});

function handleProgress() {
  const progressPercentage =
    (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
}

videoPlayer.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mouseup', () => (mousedown = false));

function handleSliderUpdate() {
  videoPlayer[this.name] = this.value;
}

sliders.forEach(slider => {
  slider.addEventListener('change', handleSliderUpdate);
});

function handleSkip() {
  videoPlayer.currentTime += +this.dataset.skip;
}

skipBtns.forEach(btn => {
  btn.addEventListener('click', handleSkip);
});
