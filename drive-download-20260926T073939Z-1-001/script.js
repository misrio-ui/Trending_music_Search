/*   
===================================================================  
 DATA STRUCTURES & DEEZER MUSIC PLAYER LOGIC  
 ===================================================================  
 1. Hash Table Map: O(1) Song lookup by song.id  
 2. Bubble Sort: Sorting array by song.duration (seconds)  
 3. Deezer API Integration: Fetch real music with fallback dataset  
 */  
  
 const MOCK_DEEZER_SONGS = [  
 {  
 id: 1109731,  
 title: "Blinding Lights",  
 duration: 200,  
 rank: 1250000,  
 preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",  
 artist: {  
 id: 83,  
 name: "The Weeknd",  
 picture_small: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80",  
 picture_medium: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80"  
 },  
 album: {  
 id: 142100,  
 title: "After Hours",  
 cover_small: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=80",  
 cover_medium: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",  
 cover_big: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80"  
 }  
 },  
 {  
 id: 9120442,  
 title: "Shape of You",  
 duration: 233,  
 rank: 1100000,  
 preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",  
 artist: {  
 id: 12,  
 name: "Ed Sheeran",  
 picture_small: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80",  
 picture_medium: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80"  
 },  
 album: {  
 id: 88120,  
 title: "÷ (Divide)",  
 cover_small: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&auto=format&fit=crop&q=80",  
 cover_medium: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",  
 cover_big: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=80"  
 }  
 },  
 {  
 id: 4501290,  
 title: "Levitating",  
 duration: 203,  
 rank: 890000,  
 preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",  
 artist: {  
 id: 44,  
 name: "Dua Lipa",  
 picture_small: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=100&auto=format&fit=crop&q=80",  
 picture_medium: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&auto=format&fit=crop&q=80"  
 },  
 album: {  
 id: 55012,  
 title: "Future Nostalgia",  
 cover_small: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&auto=format&fit=crop&q=80",  
 cover_medium: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",  
 cover_big: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=80"  
 }  
 },  
 {  
 id: 7201994,  
 title: "Stay",  
 duration: 141,  
 rank: 950000,  
 preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",  
 artist: {  
 id: 99,  
 name: "The Kid LAROI & Justin Bieber",  
 picture_small: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&auto=format&fit=crop&q=80",  
 picture_medium: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80"  
 },  
 album: {  
 id: 61002,  
 title: "F*CK LOVE 3: OVER YOU",  
 cover_small: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop&q=80",  
 cover_medium: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",  
 cover_big: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80"  
 }  
 },  
 {  
 id: 6120931,  
 title: "As It Was",  
 duration: 167,  
 rank: 1050000,  
 preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",  
 artist: {  
 id: 31,  
 name: "Harry Styles",  
 picture_small: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&auto=format&fit=crop&q=80",  
 picture_medium: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80"  
 },  
 album: {  
 id: 70192,  
 title: "Harry's House",  
 cover_small: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&auto=format&fit=crop&q=80",  
 cover_medium: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",  
 cover_big: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80"  
 }  
 }  
 ];  
  
 let songList = []; // Active list of track objects  
 const songHashTable = new Map(); // Hash Table mapping song.id -> song object  
 let currentSong = null; // Currently playing song  
 let activeCategory = 'all'; // Filter state: 'all', 'album', 'artist'  
 let isPlaying = false; // Audio playback state  
let durationSortDescending = false;
let rankSortDescending = true;
let currentSearchQuery = 'music';
let currentDataSource = 'chart';
let nextSearchOffset = 0;
let hasMoreSongs = false;
let isLoadingMoreSongs = false;
let isAlbumListVisible = false;
let popularAlbumList = [];
let visibleAlbumCount = 0;
let hasMoreAlbums = false;
let isArtistListVisible = false;
let popularArtistList = [];
let visibleArtistCount = 0;
let hasMoreArtists = false;
let currentArtistId = null;
const DEEZER_PAGE_SIZE = 25;
const DEEZER_CHART_SIZE = 100;
const DEEZER_ALBUM_PAGE_SIZE = 25;
const DEEZER_ARTIST_PAGE_SIZE = 25;
  
 // DOM Element References  
 const audioEngine = document.getElementById('audio-engine');  
 const songListContainer = document.getElementById('song-list-container');  
 const playPauseBtn = document.getElementById('play-pause-btn');  
 const playIcon = document.getElementById('play-icon');  
 const vinylRecord = document.getElementById('vinyl-record');  
 const vinylCover = document.getElementById('vinyl-cover');  
 const audioProgress = document.getElementById('audio-progress');  
 const currentTimeTxt = document.getElementById('current-time-txt');  
 const totalTimeTxt = document.getElementById('total-time-txt');  
 const volumeSlider = document.getElementById('volume-slider');  
const loadMoreButton = document.getElementById('load-more-btn');
  
 function requestDeezerApi(endpoint) {
 return new Promise((resolve, reject) => {
 const callbackName = `deezerJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
 const script = document.createElement('script');
 const timeoutId = setTimeout(() => finish(reject, new Error('Deezer API request timed out')), 10000);

 function finish(callback, value) {
 clearTimeout(timeoutId);
 delete window[callbackName];
 script.remove();
 callback(value);
 }

 window[callbackName] = data => finish(resolve, data);
 script.onerror = () => finish(reject, new Error('Deezer API request failed'));
 const separator = endpoint.includes('?') ? '&' : '?';
 script.src = `https://api.deezer.com/${endpoint}${separator}output=jsonp&callback=${callbackName}`;
 document.head.appendChild(script);
 });
 }

 function requestDeezerSearch(searchQuery, offset = 0) {
 return requestDeezerApi(`search?q=${encodeURIComponent(searchQuery)}&index=${offset}&limit=${DEEZER_PAGE_SIZE}`);
 }

 function requestDeezerChart(offset = 0, limit = DEEZER_PAGE_SIZE) {
 return requestDeezerApi(`chart/0/tracks?index=${offset}&limit=${limit}`);
 }

 function requestDeezerAlbum(albumId) {
 return requestDeezerApi(`album/${albumId}`);
 }

 function requestDeezerArtistChart() {
 return requestDeezerApi(`chart/0/artists?limit=${DEEZER_CHART_SIZE}`);
 }

 function requestDeezerArtist(artistId) {
 return requestDeezerApi(`artist/${artistId}`);
 }

 function requestDeezerArtistTop(artistId, offset = 0) {
 return requestDeezerApi(`artist/${artistId}/top?index=${offset}&limit=${DEEZER_PAGE_SIZE}`);
 }

 async function loadDeezerData(searchQuery = 'music', append = false, fromChart = false, fromAlbum = false, albumId = null, artistId = null) {  
 showToast("กำลังดึงข้อมูลจาก Deezer API...", "info");  
   
try {  
 const query = searchQuery.trim() || 'music';
 const offset = append ? nextSearchOffset : 0;
 const artistProfile = artistId ? await requestDeezerArtist(artistId) : null;
 const data = artistId
 ? await requestDeezerArtistTop(artistId, offset)
 : fromAlbum
 ? await requestDeezerAlbum(albumId)
 : fromChart
 ? await requestDeezerChart(offset)
 : await requestDeezerSearch(query, offset);
 const tracks = fromAlbum ? data.tracks?.data : data.data;
   
if (data && tracks && tracks.length > 0) {  
 // Format API response to match our specification standard  
 const fetchedSongs = tracks.filter(item => item.album?.id !== 302127).map(item => ({  
 id: item.id,  
 title: item.title,  
 duration: item.duration, // In seconds (heart of Bubble Sort)  
 rank: item.rank || Math.floor(Math.random() * 500000 + 500000),  
 preview: item.preview, // 30s preview URL  
 artist: {  
 id: item.artist.id,  
 name: item.artist.name,  
 picture_small: item.artist.picture_small || item.artist.picture,  
 picture_medium: item.artist.picture_medium || item.artist.picture  
 },  
 album: {  
 id: item.album.id,  
 title: item.album.title,  
 cover_small: item.album.cover_small || item.album.cover,  
 cover_medium: item.album.cover_medium || item.album.cover,  
 cover_big: item.album.cover_big || item.album.cover  
 }  
 }));  
 if (append) {
 const existingIds = new Set(songList.map(song => song.id));
 songList.push(...fetchedSongs.filter(song => !existingIds.has(song.id)));
 } else {
 setActiveSortButton(null);
 isAlbumListVisible = false;
 isArtistListVisible = false;
 songList = fetchedSongs;
 currentSearchQuery = query;
 currentArtistId = artistId;
 currentDataSource = artistId ? 'artist' : fromChart ? 'chart' : 'search';
 if (fromAlbum) currentDataSource = 'album';
 setActiveFilter(artistId ? 'filter-artist' : fromAlbum ? 'filter-popular-albums' : 'filter-all');
 document.getElementById('collection-label').textContent = artistId
 ? `${artistProfile.name} · เพลงยอดนิยม`
 : fromAlbum
 ? `${data.title} · ${data.artist.name}`
 : fromChart ? 'เพลงฮิตจาก Deezer' : `ค้นหา: ${query}`;
 }
 nextSearchOffset = offset + tracks.length;
 hasMoreSongs = fromChart
 ? nextSearchOffset < DEEZER_CHART_SIZE
 : artistId
 ? nextSearchOffset < data.total
 : fromAlbum
 ? false
 : nextSearchOffset < data.total;
   
showToast(`โหลดเพลงจาก Deezer แล้ว ${songList.length} รายการ`, "success");  
 } else {  
 throw new Error("No track data found");  
 }  
 } catch (err) {  
 console.warn("Deezer API call failed; keeping available demo data:", err);  
 if (songList.length === 0) {  
 songList = [...MOCK_DEEZER_SONGS];  
 buildHashTable();  
 renderSongList();  
 if (songList.length > 0) selectSongByHash(songList[0].id, false);  
 }  
 hasMoreSongs = false;
 updateLoadMoreButton();
 showToast(songList.length ? "โหลดไม่สำเร็จ คงรายการเดิมไว้" : "เชื่อมต่อ Deezer ไม่ได้ ใช้เพลงตัวอย่างแทน", songList.length ? "error" : "info");  
 return;  
 }  
  
 buildHashTable();  
 renderSongList();  
 updateLoadMoreButton();
   
// Auto-select the first song using O(1) Hash lookup  
 if (!append && songList.length > 0) {  
 selectSongByHash(songList[0].id, false);  
 }  
 }  

 async function loadMoreDeezerData() {
 if (isLoadingMoreSongs || (isAlbumListVisible ? !hasMoreAlbums : isArtistListVisible ? !hasMoreArtists : !hasMoreSongs)) return;
 isLoadingMoreSongs = true;
 updateLoadMoreButton();
 if (isAlbumListVisible) {
 visibleAlbumCount = Math.min(visibleAlbumCount + DEEZER_ALBUM_PAGE_SIZE, popularAlbumList.length);
 hasMoreAlbums = visibleAlbumCount < popularAlbumList.length;
 renderAlbumList();
 isLoadingMoreSongs = false;
 updateLoadMoreButton();
 return;
 }
 if (isArtistListVisible) {
 visibleArtistCount = Math.min(visibleArtistCount + DEEZER_ARTIST_PAGE_SIZE, popularArtistList.length);
 hasMoreArtists = visibleArtistCount < popularArtistList.length;
 renderArtistList();
 isLoadingMoreSongs = false;
 updateLoadMoreButton();
 return;
 }
 await loadDeezerData(currentSearchQuery, true, currentDataSource === 'chart', currentDataSource === 'album', null, currentDataSource === 'artist' ? currentArtistId : null);
 isLoadingMoreSongs = false;
 updateLoadMoreButton();
 }

 function setActiveFilter(activeButtonId) {
 ['filter-all', 'filter-popular-albums', 'filter-artist'].forEach(buttonId => {
 const button = document.getElementById(buttonId);
 if (!button) return;
 button.classList.toggle('bg-pill-active', buttonId === activeButtonId);
 button.classList.toggle('bg-pill', buttonId !== activeButtonId);
 });
 }

 function loadDeezerChart() {
 setActiveFilter('filter-all');
 return loadDeezerData('เพลงฮิต Deezer', false, true);
 }

 function loadDeezerAlbum(albumId) {
 if (!albumId || albumId === 302127) return;
 setActiveFilter('filter-popular-albums');
 return loadDeezerData('album', false, false, true, albumId);
 }

 function loadDeezerArtist(artistId) {
 if (!artistId) return;
 setActiveFilter('filter-artist');
 return loadDeezerData('artist', false, false, false, null, artistId);
 }

 async function loadDeezerAlbums() {
 isArtistListVisible = false;
 setActiveSortButton(null);
 setActiveFilter('filter-popular-albums');
 showToast("กำลังรวบรวมอัลบั้มจาก Deezer...", "info");
 try {
 const data = await requestDeezerChart(0, DEEZER_CHART_SIZE);
 const albumsById = new Map();
 data.data.forEach((track, index) => {
 const album = track.album;
 if (!album || album.id === 302127) return;
 if (albumsById.has(album.id)) {
 albumsById.get(album.id).chartTrackCount++;
 return;
 }
 albumsById.set(album.id, {
 id: album.id,
 title: album.title,
 cover_small: album.cover_small,
 cover_medium: album.cover_medium || album.cover,
 artist: track.artist,
 position: track.position || index + 1,
 chartTrackCount: 1
 });
 });
 popularAlbumList = [...albumsById.values()];
 visibleAlbumCount = Math.min(DEEZER_ALBUM_PAGE_SIZE, popularAlbumList.length);
 hasMoreAlbums = visibleAlbumCount < popularAlbumList.length;
 isAlbumListVisible = true;
 currentDataSource = 'albums';
 document.getElementById('collection-label').textContent = 'อัลบั้มจาก Deezer';
 renderAlbumList();
 updateLoadMoreButton();
 showToast(`พบ ${popularAlbumList.length} อัลบั้มจากเพลงติดชาร์ต`, "success");
 } catch (err) {
 console.warn("Deezer chart albums failed:", err);
 showToast("โหลดอัลบั้มไม่สำเร็จ", "error");
 }
 }

 async function loadDeezerArtists() {
 isAlbumListVisible = false;
 setActiveSortButton(null);
 setActiveFilter('filter-artist');
 showToast("กำลังโหลดนักร้องยอดนิยมจาก Deezer...", "info");
 try {
 const data = await requestDeezerArtistChart();
 popularArtistList = data.data || [];
 visibleArtistCount = Math.min(DEEZER_ARTIST_PAGE_SIZE, popularArtistList.length);
 hasMoreArtists = visibleArtistCount < popularArtistList.length;
 isArtistListVisible = true;
 currentDataSource = 'artists';
 document.getElementById('collection-label').textContent = 'นักร้องฮิตจาก Deezer';
 renderArtistList();
 updateLoadMoreButton();
 showToast(`พบนักร้องยอดนิยม ${popularArtistList.length} คน`, "success");
 } catch (err) {
 console.warn("Deezer chart artists failed:", err);
 showToast("โหลดนักร้องยอดนิยมไม่สำเร็จ", "error");
 }
 }

 function renderArtistList() {
 const visibleArtists = popularArtistList.slice(0, visibleArtistCount);
 document.getElementById('track-count').textContent = `(${visibleArtists.length} นักร้อง)`;
 songListContainer.innerHTML = '';

 visibleArtists.forEach(artist => {
 const cardDiv = document.createElement('div');
 cardDiv.className = 'bg-card-item rounded-2xl p-3 flex items-center justify-between transition-all duration-200 hover:shadow-lg';
 cardDiv.innerHTML = `
 <div class="flex items-center gap-3 overflow-hidden pr-2">
 <img src="${artist.picture_medium || artist.picture_small || artist.picture}" alt="${artist.name}" class="w-14 h-14 rounded-full object-cover border-2 border-purple-800 shadow-md shrink-0" onerror="this.src='https://placehold.co/100x100/666666/ffffff?text=Artist'" />
 <div class="overflow-hidden">
 <h3 class="font-bold text-purple-950 text-base md:text-lg truncate leading-tight">${artist.name}</h3>
 <p class="text-purple-700/80 text-xs font-medium truncate">อันดับนักร้อง #${artist.position}</p>
 </div>
 </div>
 <button onclick="loadDeezerArtist(${artist.id})" class="bg-select-btn font-semibold px-4 py-2 rounded-full text-sm shadow transition-all duration-150 hover:scale-105 active:scale-95 shrink-0">ดูเพลง</button>
 `;
 songListContainer.appendChild(cardDiv);
 });
 }

 function renderAlbumList() {
 const visibleAlbums = popularAlbumList.slice(0, visibleAlbumCount);
 document.getElementById('track-count').textContent = `(${visibleAlbums.length} อัลบั้ม)`;
 songListContainer.innerHTML = '';

 visibleAlbums.forEach(album => {
 const cardDiv = document.createElement('div');
 cardDiv.className = 'bg-card-item rounded-2xl p-3 flex items-center justify-between transition-all duration-200 hover:shadow-lg';
 cardDiv.innerHTML = `
 <div class="flex items-center gap-3 overflow-hidden pr-2">
 <img src="${album.cover_medium || album.cover_small}" alt="${album.title}" class="w-14 h-14 rounded-xl object-cover border-2 border-purple-800 shadow-md shrink-0" onerror="this.src='https://placehold.co/100x100/666666/ffffff?text=Album'" />
 <div class="overflow-hidden">
 <h3 class="font-bold text-purple-950 text-base md:text-lg truncate leading-tight">${album.title}</h3>
 <p class="text-purple-800 text-xs md:text-sm font-medium truncate">${album.artist.name}</p>
 <p class="text-purple-700/80 text-[11px] md:text-xs font-medium truncate">ติดชาร์ต ${album.chartTrackCount} เพลง · อันดับ #${album.position}</p>
 </div>
 </div>
 <button onclick="loadDeezerAlbum(${album.id})" class="bg-select-btn font-semibold px-4 py-2 rounded-full text-sm shadow transition-all duration-150 hover:scale-105 active:scale-95 shrink-0">เปิดอัลบั้ม</button>
 `;
 songListContainer.appendChild(cardDiv);
 });
 }

 function updateLoadMoreButton() {
 loadMoreButton.hidden = isAlbumListVisible ? !hasMoreAlbums : isArtistListVisible ? !hasMoreArtists : !hasMoreSongs;
 loadMoreButton.disabled = isLoadingMoreSongs;
 loadMoreButton.innerHTML = isLoadingMoreSongs
 ? '<i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดเพลง...'
 : '<i class="fa-solid fa-plus"></i>';
 }
  
 // Build JavaScript Hash Table Map: Key = song.id, Value = song object  
 function buildHashTable() {  
 songHashTable.clear();  
 songList.forEach(song => {  
 songHashTable.set(song.id, song);  
 });  
 console.log("Hash Table Initialized:", songHashTable);  
 }  
  
 function renderSongList(dataToRender = songList) {  
 isAlbumListVisible = false;
 isArtistListVisible = false;
 document.getElementById('track-count').textContent = `(${dataToRender.length} เพลง)`;  
 songListContainer.innerHTML = '';  
  
 if (dataToRender.length === 0) {  
 songListContainer.innerHTML = `  
 <div class="text-center text-purple-200 py-12">  
 <i class="fa-solid fa-compact-disc text-4xl mb-2 opacity-50"></i>  
 <p>ไม่พบรายการเพลงที่ค้นหา</p>  
 </div>  
 `;  
 return;  
 }  
  
 dataToRender.forEach(song => {  
 const isSelected = currentSong && currentSong.id === song.id;  
   
const cardDiv = document.createElement('div');  
 cardDiv.className = `bg-card-item rounded-2xl p-3 flex items-center justify-between transition-all duration-200 hover:shadow-lg ${  
 isSelected ? 'ring-4 ring-purple-300 scale-[1.01]' : ''  
 }`;  
  
 // View count format helper  
 const formattedRank = song.rank > 1000000   
? (song.rank / 1000000).toFixed(1) + 'M'   
: (song.rank / 1000).toFixed(0) + 'K';  
  
 cardDiv.innerHTML = `  
 <!-- Left info: Circle picture + Title + Artist -->  
 <div class="flex items-center gap-3 overflow-hidden pr-2">  
 <img   
src="${song.album.cover_small || song.artist.picture_small}"   
alt="${song.title}"  
 class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-purple-800 shadow-md shrink-0"  
 onerror="this.src='https://placehold.co/100x100/666666/ffffff?text=Music'"
 />  
 <div class="overflow-hidden">  
 <h3 class="font-bold text-purple-950 text-base md:text-lg truncate leading-tight">  
 ${song.title}  
 </h3>  
 <p class="text-purple-800 text-xs md:text-sm font-medium truncate">  
 ${song.artist.name}  
 </p>  
 <p class="text-purple-700/80 text-[11px] md:text-xs font-medium truncate">
 อัลบั้ม: ${song.album.title}
 </p>
 </div>  
 </div>  
  
 <!-- Right info: Rank/Views + Select Button (matching Image 2) -->  
 <div class="flex items-center gap-3 shrink-0">  
 <div class="text-right hidden sm:block">  
 <span class="text-purple-900/80 text-[10px] block uppercase">ยอดวิว/ความนิยม</span>  
 <span class="text-purple-950 font-bold text-sm">${formattedRank}</span>  
 </div>  
   
<button   
onclick="selectSongByHash(${song.id}, true)"  
 class="bg-select-btn font-semibold px-4 py-2 rounded-full text-sm shadow transition-all duration-150 hover:scale-105 active:scale-95 flex items-center gap-1.5"  
 >  
 <span>${isSelected && isPlaying ? 'กำลังฟัง' : 'กดฟัง'}</span>  
 <i class="${isSelected && isPlaying ? 'fa-solid fa-waveform animate-pulse' : 'fa-solid fa-play text-xs'}"></i>  
 </button>  
 </div>  
 `;  
  
 songListContainer.appendChild(cardDiv);  
 });  
 }  
  
 function selectSongByHash(songId, autoPlay = true) {  
 const startTime = performance.now();  
   
// O(1) Hash Table lookup by song ID key  
 const song = songHashTable.get(songId);  
   
const lookupTime = (performance.now() - startTime).toFixed(3);  
  
 if (!song) {  
 showToast("ไม่พบเพลงใน Hash Table", "error");  
 return;  
 }  
  
 currentSong = song;  
   
// Update Detail Display Top Right Panel  
 document.getElementById('detail-title').textContent = song.title;  
 document.getElementById('detail-artist').textContent = `ศิลปิน: ${song.artist.name}`;  
 document.getElementById('detail-album').textContent = `อัลบั้ม: ${song.album.title}`;  
 document.getElementById('detail-rank').textContent = `${song.rank.toLocaleString()} วิว`;  
 document.getElementById('detail-duration').textContent = `${song.duration} วินาที`;  
 document.getElementById('hash-key-display').textContent = `ID: ${song.id} (${lookupTime}ms)`;  
  
 // Update Vinyl Record Image  
 vinylCover.src = song.album.cover_medium || song.artist.picture_medium;  
  
 // Update Audio Player source  
 audioEngine.src = song.preview;  
 audioEngine.load();  
  
 // Re-render Left list to update selection highlight  
 renderSongList();  
  
 if (autoPlay) {  
 playAudio();  
 showToast(`เลือกเพลง: "${song.title}" ผ่าน Hash Key: ${song.id}`);  
 }  
 }  
  
 function runBubbleSort() {
 if (songList.length <= 1) return;  
 const descending = durationSortDescending;
 durationSortDescending = !durationSortDescending;
 setActiveSortButton('sort-duration');
  
 const startTime = performance.now();  
 let n = songList.length;  
 let swapped;  
 let comparisons = 0;  
  
 // Bubble Sort by duration (seconds), in the selected direction.
 do {  
 swapped = false;  
 for (let i = 0; i < n - 1; i++) {  
 comparisons++;  
 const outOfOrder = descending
 ? songList[i].duration < songList[i + 1].duration
 : songList[i].duration > songList[i + 1].duration;
 if (outOfOrder) {  
 // Swap elements  
 let temp = songList[i];  
 songList[i] = songList[i + 1];  
 songList[i + 1] = temp;  
 swapped = true;  
 }  
 }  
 n--;  
 } while (swapped);  
  
 const durationSec = ((performance.now() - startTime)).toFixed(2);  
  
 // Re-render sorted list  
 renderSongList();  
 document.getElementById('sort-status-badge').textContent = descending
 ? 'ความยาวเพลง (มาก -> น้อย)'
 : 'ความยาวเพลง (น้อย -> มาก)';
 document.getElementById('sort-status-badge').className = 'bg-neutral-200 text-neutral-900 px-2.5 py-0.5 rounded';
  
 const sortDirection = descending ? 'มาก -> น้อย' : 'น้อย -> มาก';
 showToast(`เรียงความยาวเพลง ${sortDirection} สำเร็จใน ${durationSec}ms (${comparisons} เปรียบเทียบ)`, "success");
 }  
  
 // Sort songs by Rank/Popularity descending  
 function runRankSort() {
 const descending = rankSortDescending;
 rankSortDescending = !rankSortDescending;
 setActiveSortButton('sort-rank');
 songList.sort((a, b) => descending ? b.rank - a.rank : a.rank - b.rank);  
 renderSongList();  
 document.getElementById('sort-status-badge').textContent = descending
 ? 'ยอดวิว (มาก -> น้อย)'
 : 'ยอดวิว (น้อย -> มาก)';
 document.getElementById('sort-status-badge').className = 'bg-neutral-200 text-neutral-900 px-2.5 py-0.5 rounded';
 showToast(`เรียงลำดับยอดวิว ${descending ? 'มาก -> น้อย' : 'น้อย -> มาก'} เรียบร้อย`, "info");
 }  

 function setActiveSortButton(activeButtonId) {
 ['sort-duration', 'sort-rank'].forEach(buttonId => {
 const button = document.getElementById(buttonId);
 const selected = buttonId === activeButtonId;

 button.classList.toggle('bg-neutral-900', selected);
 button.classList.toggle('hover:bg-neutral-800', selected);
 button.classList.toggle('bg-white', !selected);
 button.classList.toggle('hover:bg-neutral-100', !selected);
 button.classList.toggle('text-white', selected);
 button.classList.toggle('text-neutral-900', !selected);
 });
 }
  
 function playAudio() {  
 if (!currentSong) return;  
 if (!currentSong.preview) {  
 showToast("เพลงนี้ไม่มีตัวอย่างเสียงให้เล่น", "error");  
 return;  
 }  
 audioEngine.play().then(() => {  
 isPlaying = true;  
 playIcon.className = 'fa-solid fa-pause text-lg';  
 vinylRecord.classList.remove('vinyl-paused');  
 }).catch(err => {  
 console.warn("Audio play blocked or preview URL failed:", err);  
 showToast("ไม่สามารถเล่นไฟล์เสียงตัวอย่างนี้ได้", "error");  
 });  
 }  
  
 function pauseAudio() {  
 audioEngine.pause();  
 isPlaying = false;  
 playIcon.className = 'fa-solid fa-play ml-0.5 text-lg';  
 vinylRecord.classList.add('vinyl-paused');  
 }  
  
 function togglePlayPause() {  
 if (!currentSong) return;  
 if (isPlaying) {  
 pauseAudio();  
 } else {  
 playAudio();  
 }  
 renderSongList();  
 }  
  
 function playNextSong() {  
 if (!currentSong || songList.length === 0) return;  
 const currentIndex = songList.findIndex(s => s.id === currentSong.id);  
 const nextIndex = (currentIndex + 1) % songList.length;  
 selectSongByHash(songList[nextIndex].id, true);  
 }  
  
 function playPrevSong() {  
 if (!currentSong || songList.length === 0) return;  
 const currentIndex = songList.findIndex(s => s.id === currentSong.id);  
 const prevIndex = (currentIndex - 1 + songList.length) % songList.length;  
 selectSongByHash(songList[prevIndex].id, true);  
 }  
  
 function seekAudio(percent) {  
 if (audioEngine.duration) {  
 audioEngine.currentTime = (percent / 100) * audioEngine.duration;  
 }  
 }  
  
 function changeVolume(val) {  
 audioEngine.volume = val;  
 }  
  
 // AUDIO EVENT LISTENERS  
 audioEngine.addEventListener('timeupdate', () => {  
 if (audioEngine.duration) {  
 const pct = (audioEngine.currentTime / audioEngine.duration) * 100;  
 audioProgress.value = pct;  
 currentTimeTxt.textContent = formatTime(audioEngine.currentTime);  
 totalTimeTxt.textContent = formatTime(audioEngine.duration) + " (Preview)";  
 }  
 });  
  
 audioEngine.addEventListener('ended', () => {  
 pauseAudio();  
 playNextSong(); // Auto play next track  
 });  

 audioEngine.addEventListener('error', () => {
 pauseAudio();
 showToast("โหลดตัวอย่างเสียงไม่สำเร็จ กรุณาลองเพลงอื่น", "error");
 });
  
 function formatTime(seconds) {  
 if (isNaN(seconds)) return "0:00";  
 const m = Math.floor(seconds / 60);  
 const s = Math.floor(seconds % 60);  
 return `${m}:${s < 10 ? '0' : ''}${s}`;  
 }  
  
 function filterCategory(cat) {  
 activeCategory = cat;  
 setActiveFilter(cat === 'artist' ? 'filter-artist' : 'filter-all');
  
 if (cat === 'all') {  
 renderSongList(songList);  
 } else if (cat === 'album') {  
 // Filter unique albums view representation  
 renderSongList(songList);  
 showToast("แสดงโหมด อัลบั้ม");  
 } else if (cat === 'artist') {  
 // Filter unique artists representation  
 renderSongList(songList);  
 showToast("แสดงโหมด นักร้อง");  
 }  
 }  
  
 function handleSearch(query) {  
 const q = query.trim().toLowerCase();  
 if (!q) {  
 renderSongList(songList);  
 return;  
 }  
 const filtered = songList.filter(s =>   
s.title.toLowerCase().includes(q) ||   
s.artist.name.toLowerCase().includes(q) ||  
 s.album.title.toLowerCase().includes(q)  
 );  
 renderSongList(filtered);  
 }  
  
 function triggerSearch() {  
 const input = document.getElementById('search-input');  
 const val = input.value.trim();  
 if (val) {  
 loadDeezerData(val);  
 }  
 }  
  
 function showToast(message, type = 'info') {  
 const toast = document.getElementById('toast');  
 const toastMsg = document.getElementById('toast-msg');  
 const toastIcon = document.getElementById('toast-icon');  
  
 toastMsg.textContent = message;  
  
 if (type === 'success') {  
 toastIcon.className = "fa-solid fa-circle-check text-neutral-300 text-lg";
 } else if (type === 'error') {  
 toastIcon.className = "fa-solid fa-circle-xmark text-neutral-300 text-lg";
 } else {  
 toastIcon.className = "fa-solid fa-circle-info text-neutral-300 text-lg";
 }  
  
 toast.classList.remove('translate-y-20', 'opacity-0');  
 toast.classList.add('translate-y-0', 'opacity-100');  
  
 setTimeout(() => {  
 toast.classList.remove('translate-y-0', 'opacity-100');  
 toast.classList.add('translate-y-20', 'opacity-0');  
 }, 3000);  
 }  
  
 // INITIALIZATION ON WINDOW LOAD  
 window.onload = function() {  
 songList = [...MOCK_DEEZER_SONGS];
 buildHashTable();
 renderSongList();
 selectSongByHash(songList[0].id, false);
 loadDeezerChart();  
 };