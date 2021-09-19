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
const songs = ['Armand Van Helden - My My My (DJ KUBA & NEITAN Remix).mp3',
'Bassjackers ft. Luciana - Fireflies (Official Music Video).mp3',
'Catiso - Zanobi.mp3',
'Cazzette - Blind Heart (Broiler Remix).mp3',
'David Guetta, Martin Garrix & Brooks - Like I Do (Lyric Video).mp3',
'Dax - !Homicide! Freestyle [One Take Video].mp3',
'Doja Cat - Boss B!tch (from Birds of Prey! The Album) [Official Music Video].mp3',
'Dropgun - Drought ft. Nevve (Official Audio).mp3',
'Dropgun - Tomorrow Never Comes (feat. Bryan Finlay).mp3',
'Every Little Thing (Bazzflow Remix Radio).mp3',
"Florian Picasso - Final Call (Mesto & Justin Mylo Remix).mp3",
'Jay Eskar - Awakening.mp3',
'Jay Eskar - Chakra.mp3',
'Logic - Everybody (Lyrics).mp3',
'Masked Wolf - Astronaut In The Ocean (Ozlig Remix).mp3',
'Metrik - Gravity.mp3',
'Mike Williams - Konnichiwa (Original Mix).mp3',
'MR BLACK & Offer Nissim - Mucho Bien (MR.BLACK Remix).mp3',
'Netsky - Rio.mp3',
'New Workout Music Motivation Playlist 2018.mp3',
'NF - When I Grow Up.mp3',
'Phoebe Ryan - Mine (Elephante Remix).mp3',
'Queen Of A Lonely Heart (feat. Lourdiz) (Dastic x Robbie Mendez Club Mix).mp3',
'RIVERO & Triangle - WICKD (feat. Dean) [Official Audio].mp3',
'RYLLZ - I Gotta Know.mp3',
'SHAHMEN - MARK (EMR3YGUL Remix).mp3',
'Shahmen - Mark.mp3',
'SHAHMEN - MARK EMR3YGUL Remix INFINITY BASS #enjoybeauty.mp3',
'Steve Aoki - Back to Earth feat. Fall Out Boy (LA Riots Remix).mp3',
"The Black Eyed Peas - Let's Get It Started (Galwaro Remix).mp3",
'Timmy Trumpet Freaks (Radio Edit).mp3',
'Tupac  - Changes (Dax Remix) [One Take].mp3',
'WATEVA - Ber Zer Ker (Rob Gasser Remix) [NCS Release].mp3'
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}`;
  cover.src = `images/workout.jpg`;
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
