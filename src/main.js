import './style.css';
import { formatMinutesAndSeconds } from './utils';
import { musicList } from './list';

const image = document.getElementById('image');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const elapsed = document.getElementById('current-time');
const duration = document.getElementById('duration');
const playButton = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

let isPlaying = false;
let index = 0;

function loadMusic() {
    let actualIndex = index % musicList.length;
    console.log(`actual music: ${actualIndex} and index: ${index}`);
    let currentMusic = musicList[actualIndex];
    image.src = currentMusic.image;
    audio.src = currentMusic.audio;
    title.textContent = currentMusic.title;
    artist.textContent = currentMusic.artist;
}

loadMusic();

function pauseMusic() {
    audio.pause();
    playButton.classList.replace('fa-pause', 'fa-play');
}

function playMusic() {
    audio.play();
    playButton.classList.replace('fa-play', 'fa-pause');
    
}

nextBtn.addEventListener('click', function () {
    index++;
    loadMusic();
    playMusic()
});

prevBtn.addEventListener('click', function () {
    index--;
    loadMusic();
    playMusic()
});

playButton.addEventListener('click', function () {
    if (isPlaying) {
        pauseMusic()
        isPlaying = false;
    } else {
        playMusic()
        isPlaying = true
    }
});

progressContainer.addEventListener('mouseup', function (event) {
    const percentage = event.offsetX / progressContainer.clientWidth;
    const timeToGo = audio.duration * percentage;
    progress.style.width = `${percentage}%`;
    audio.currentTime = timeToGo;
});

progressContainer.addEventListener('click', function (event) {
    const percentage = event.offsetX / progressContainer.clientWidth;
    const timeToGo = audio.duration * percentage;
    audio.currentTime = timeToGo;
});

audio.addEventListener('timeupdate', function () {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;
    elapsed.textContent = formatMinutesAndSeconds(audio.currentTime);
});

audio.addEventListener('canplaythrough', function () {
    duration.textContent = formatMinutesAndSeconds(audio.duration);
});
