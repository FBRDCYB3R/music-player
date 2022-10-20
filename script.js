const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['- Masked Wolf Astronaut in the Ocean',
'- Nightcore Ride It Lyrics',
'Against The Current - Wildfire (Lyrics)',
'Against The Current - again&again (Lyrics) (feat. guardin)',
'Against the Current - Lullaby (Lyrics)',
'Against the Current - Weapon (Lyrics)',
'Alan Walker & Benjamin Ingrosso - Man On The Moon',
'Alan Walker x Jamie Miller - Running Out Of Roses (Official Lyric Video)',
'Alan Walker x VIZE Space Melody Lyrics Edward Artemyev ft Leony',
'Alok & Bhaskar - Fuego',
'Alok & Steve Aoki - Typical (feat. Lars Martin) [Official Audio]',
'it dont matter',
'CYBERPUNK 2077 SOUNDTRACK - PAIN by Le Destroy & The Red Glare (Official Video)',
'Calvin Harris & Disciples - How Deep Is Your Love (Audio)',
'Chris Lake & NPC - A Drug From God',
'Claptone - Heartbeat',
'Enemy (from the series Arcane League of Legends_Lyric Video)',
'Fly Me To The Moon Lofi Cover Prod YungRhythm',
'GAULLIN - MOONLIGHT',
'cant get over you',
'Harry Styles Golden Official Audio',
'K_DA - VILLAIN (feat. Madison Beer & Kim Petras)',
'Martin Garrix - Animals (Official Lyrics Video)',
'Michael Calfan x INNA - Call Me Now (Official Lyric Video)',
'Måneskin - Beggin (Lyrics)',
'Måneskin I WANNA BE YOUR SLAVE LyricsTesto Eurovision 2021',
'ORGAN & DELLA - Bad Generation (Magic Release)',
'Punctual - I Dont Wanna Know',
'Sting - Desert Rose (Official Music Video)',
'Swedish House Mafia - Moth To A Flame (Lyrics) ft. The Weeknd',
'Tiesto - The Business (Official Lyric Video)',
'Tokyo Ghoul - Glassy Sky [東京喰種 -トーキョーグール-]',
'Unprocessed - Real feat. Polyphia s Tim Henson & Clay Gober - LLUCID Remix_50k',
'aLIEz',
'e wa',
't.A.T.u.- All The Things She Said (Gaullin Remix)(Bass boosted)',
'yt1s.com - Yves V Ilkay Sencan Not So Bad feat Emie Official Music Video',
'Minelli - MMM (Lyrics)',
'Minelli - Nothing Hurts (Lyrics)',
'Minelli - Rampampam',
'Minelli x R3HAB - Deep Sea (Official Audio)',
'OCCXLLT - LITHIUM',
'OCCXLLT - NIGHTFALL',
'HVME - GOOSEBUMPS (Official Video)',
'Surf Mesa - ily',
'SAYONARA Baby',
'Shinunoga E-Wa',
'Tsumi No Kaori',
'Yasuha - Flyday Chinatown',
'Just the Two of Us',
];

shuffle(songs);

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//randomize array elements function
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/8.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	}

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	}

	// define seconds duration

	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;

};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
