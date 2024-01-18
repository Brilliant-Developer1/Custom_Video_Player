const playButton = document.getElementsByClassName('player__button toggle')[0];
const videoPlayer = document.querySelector('.player__video');

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
