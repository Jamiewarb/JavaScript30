// Get out elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playPauseToggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let mousedown = false;

// Build out functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    playPauseToggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(amount) {
    video.currentTime += amount;
}

function handleRangeUpdate(name, value) {
    video[name] = value;
}

function handleProgress() {
    const percent = 100 / video.duration * video.currentTime;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(percent) {
    video.currentTime = percent;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

playPauseToggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', (event) => {
    skip(parseFloat(button.dataset.skip));
}));

ranges.forEach(range => range.addEventListener('change', (event) => {
    handleRangeUpdate(range.name, parseFloat(range.value));
}));
ranges.forEach(range => range.addEventListener('mousemove', (event) => {
    handleRangeUpdate(range.name, parseFloat(range.value));
}));

progress.addEventListener('click', progressScrub);
progress.addEventListener('mousemove', (event) => mousedown && progressScrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

function progressScrub(event) {
    let scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    scrub(scrubTime);
}
