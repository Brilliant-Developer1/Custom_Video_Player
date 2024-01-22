const playButton = document.getElementsByClassName('player__button toggle')[0];
const videoPlayer = document.querySelector('.player__video');
const playerControls = document.querySelector('.player__controls');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const sliders = document.querySelectorAll('.player__slider');
const skipBtns = document.querySelectorAll('[data-skip]');
const currentTimeShow = document.querySelector('.current_time');
const totalTimeShow = document.querySelector('.total_time');
const videoTime = document.querySelector('.video_time');
const fullscreen = document.querySelector('.fullscreen');
const playerControlsBar = document.querySelector('.player__controls_bar');

import videosData from './videosData.js';

const getUrl = videosData => {
  const randomIndex = Math.floor(Math.random() * videosData.length);
  const url = videosData[randomIndex].sources[0];

  // console.log(url);
  videoPlayer.src = url;
  videoPlayer.poster = videosData[randomIndex].thumb;

  return url;
};

getUrl(videosData);

const handlePlay = () => {
  if (videoPlayer.paused || videoPlayer.ended) {
    videoPlayer.play();
    playButton.classList.add('playing');
  } else {
    videoPlayer.pause();
    console.log('hitted');
    playButton.classList.remove('playing');
  }

  playButton.innerHTML = videoPlayer.paused ? '►' : '❚❚';
};

const toggleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    // videoPlayer.pause();
  } else {
    videoPlayer.requestFullscreen().catch(err => {
      console.error('Fullscreen request failed:', err);
    });
  }
};

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
};

function handleProgress() {
  const progressPercentage =
    (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;

  const totalDuration = videoPlayer.duration;
  const currentTime = videoPlayer.currentTime;

  if (!isNaN(totalDuration) && !isNaN(currentTime)) {
    totalTimeShow.innerHTML = formatTime(totalDuration);
    currentTimeShow.innerHTML = formatTime(currentTime);
  }

  if (videoPlayer.currentTime === videoPlayer.duration) {
    setTimeout(() => {
      getUrl(videosData);
      handlePlay();
    }, 1000);
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
}

function handleSliderUpdate() {
  videoPlayer[this.name] = this.value;
}

function handleSkip() {
  videoPlayer.currentTime += +this.dataset.skip;
}

let hideControlsTimeout;

function showControls() {
  clearTimeout(hideControlsTimeout);
  playerControls.style.transform = 'translateY(0)';
  videoTime.style.transform = 'translateY(0)';
  videoTime.style.bottom = '56px';
}

function hideControls() {
  hideControlsTimeout = setTimeout(() => {
    playerControls.style.transform = 'translateY(82%)';
    videoTime.style.transform = 'translateY(82%)';
    videoTime.style.bottom = '71px';

    setTimeout(() => {
      videoTime.style.transform = 'translateY(212%)';
      videoTime.style.bottom = '71px'; // Adjust to your desired position
    }, 6000);
  }, 2000);
}

// Event Listeners
playButton.addEventListener('click', handlePlay);
videoPlayer.addEventListener('click', event => {
  event.preventDefault();
  handlePlay();
});

// videoPlayer.addEventListener('pointerup', event => {
//   event.preventDefault();
//   handlePlay();
// });
document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    handlePlay();
  }
});

videoPlayer.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    handlePlay();
  }
});

document.addEventListener('fullscreenchange', () => {
  // Add or remove the keydown event listener based on fullscreen status
  if (document.fullscreenElement) {
    videoPlayer.addEventListener('keydown', handleSpaceKey);
  } else {
    videoPlayer.removeEventListener('keydown', handleSpaceKey);
  }
});

function handleSpaceKey(event) {
  if (event.code === 'Space') {
    event.preventDefault();
    handlePlay();
  }
}
fullscreen.addEventListener('click', toggleFullscreen);
videoPlayer.addEventListener('dblclick', toggleFullscreen);

videoPlayer.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mouseup', () => (mousedown = false));

sliders.forEach(slider => {
  slider.addEventListener('change', handleSliderUpdate);
});

skipBtns.forEach(btn => {
  btn.addEventListener('click', handleSkip);
});

videoPlayer.addEventListener('mouseover', showControls);
videoPlayer.addEventListener('mouseout', hideControls);

playerControlsBar.addEventListener('mouseover', showControls);
playerControlsBar.addEventListener('mouseout', hideControls);
