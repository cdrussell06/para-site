const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.02 });

document.querySelectorAll('main section').forEach((s) => observer.observe(s));

const titles = [[document.querySelector('.splash h1'), 0.96], [document.querySelector('#music h2'), 0.5], [document.querySelector('#shop h2'), 0.5], [document.querySelector('#behind h2'), 0.8]];

function fitTitle() {
  titles.forEach(([el, share]) => {
    el.style.fontSize = '100px';
    // Negative letter-spacing lets the last glyph overhang the box, so count it.
    const overhang = -Math.min(parseFloat(getComputedStyle(el).letterSpacing) || 0, 0);
    el.style.fontSize = (100 * window.innerWidth * share / (el.scrollWidth + overhang)) + 'px';
  });
}

document.fonts.ready.then(fitTitle);
window.addEventListener('resize', fitTitle);

// [title, price, handle, image] from the store's public product feed; images load from its CDN.
const shopItems = [
  ["Turning Your Children Gay T-Shirt", "$45", "turning-your-children-gay-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_24_ECOMM_FAN_MARIALOPEZ_GAY_SSTEE.png?v=1738778324"],
  ["Paramore is my Favorite Singer T-Shirt III (White)", "$45", "paramore-is-my-favorite-singer-t-shirt-iii-white", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_BrianRJ_FAVE_WHITE_SSTee_1.png?v=1731635583"],
  ["Paramore is my Favorite Singer T-Shirt I (Black)", "$45", "paramore-is-my-favorite-singer-t-shirt-i-black", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_BrianRJ_FAVE_BLACK_SSTee_1.png?v=1731635547"],
  ["Cowboy Hayley Long Sleeve", "$60", "cowboy-hayley-long-sleeve", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_ILARIA_COWBOY_LSTEE.png?v=1738778316"],
  ["AWKIF Forever Dad Hat", "$40", "awkif-forever-dad-hat", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/hat-front.png?v=1753214680"],
  ["Our Kissing Spot Sleep T-Shirt", "$45", "our-kissing-spot-sleep-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARASLEEPTEE.png?v=1753214676"],
  ["Our Kissing Spot T-Shirt", "$45", "our-kissing-spot-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_25_ECOMM_AWKIFSSTEE_IVRY.png?v=1753214672"],
  ["Thick Skull Baby Raglan", "$45", "thick-skull-baby-raglan", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-4.png?v=1749820334"],
  ["Shove It Baby Tee", "$45", "shove-it-baby-tee", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6.png?v=1749820483"],
  ["Shove It T-Shirt", "$45", "shove-it-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-8_7a7135fc-0f4f-4956-accd-18a99e96911a.png?v=1749820610"],
  ["Thick Skull Raglan", "$45", "thick-skull-raglan", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-7.png?v=1749820639"],
  ["The Killer And The Final Girl Flowy Crop Tee", "$45", "the-killer-and-the-final-girl-flowy-crop-tee", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-21.png?v=1749820663"],
  ["The Killer And The Final Girl T-Shirt", "$45", "the-killer-and-the-final-girl-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-14.png?v=1749820689"],
  ["Crave Baby Tee", "$45", "crave-t-shirt-copy", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-17.png?v=1749820716"],
  ["Crave T-Shirt", "$45", "crave-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/P6.11-6-12_4bff3fc7-fe3f-43f4-bce6-8dd7ba6b4661.png?v=1749820745"],
  ["Paramore Natural Bucket Hat", "$35", "paramore-natural-bucket-hat", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/FD31D2E3-9468-431C-B187-ACFF05887B5C_281_29_1.png?v=1738770564"],
  ["EST 03 Ringer", "$45", "est-03-ringer", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/Paramore_Ringer.png?v=1738247246"],
  ["Stacked Jacket", "$150", "stacked-jacket", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/ParamoreJacket_Front_3ea52c58-5c8a-4e16-8b56-1fcf1ac2aabf.png?v=1738247137"],
  ["Cowboy Hayley Tote", "$45", "cowboy-hayley-tote", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_ILARIA_COWBOY_TOTE.png?v=1738778331"],
  ["Still Into You Crewneck", "$70", "still-into-you-crewneck", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_24_ECOMM_FAN_MARIALOPEZ_STILLINTOYOU_CREW_1.png?v=1738778328"],
  ["Moustachu T-Shirt", "$45", "moustachu-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_24_ECOMM_FAN_TANU_MOUSTACHE_SSTEE.png?v=1738778326"],
  ["Same Lesson Again / Thick Skull T-Shirt", "$45", "same-lesson-again-thick-skull-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_24_ECOMM_FAN_ELANORA_SAMELESSON_SSTEE.png?v=1738778319"],
  ["This Is Why LP", "$24.98", "this-is-why-lp", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/ParamoreTIWLP.png?v=1734361727"],
  ["This Is Why CD", "$14.98", "this-is-why-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/TIW_ProductImages-CD.png?v=1731440687"],
  ["Thick Skull Zine Long Sleeve", "$60", "thick-skull-zine-long-sleeve", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ILARIA_ZINE_LS_1A.png?v=1731357196"],
  ["Thick Skull Zine", "$25", "thick-skull-zine", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/39722FE7-9CA5-4B38-BBB6-F42BDFCB5B64.png?v=1731357354"],
  ["Thick Skull Van Tote", "$35", "thick-skull-van-tote", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ELANORA_VAN_TOTE_2.png?v=1731356462"],
  ["Thick Skull Van Crewneck", "$70", "thick-skull-van-crewneck", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ELANORA_VAN_CREW_1.png?v=1731356337"],
  ["The News Single Flexi Disc", "$9.98", "the-news-single-flexi-disc", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/121222-Paramore_TheNews_FlexiDisc_ProductPic.png?v=1731635619"],
  ["Running Out Of Time Woven Blanket", "$60", "running-out-of-time-woven-blanket", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_CJ_NEWS_BLANKET_2.png?v=1731356045"],
  ["Running Out Of Time T-Shirt", "$45", "running-out-of-time-t-shirt", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ILARIA_ECOMM24_ROOT_SSTEE_1.png?v=1731635599"],
  ["Riot! CD", "$9.98", "riot-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PAramoreRiotCD_1.png?v=1731441149"],
  ["Running Out of Time Flexi Disc", "$9.98", "running-out-of-time-flexi-disc", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/121222-Paramore_RunningOutOfTime_FlexiDisc_ProductPic.png?v=1731440094"],
  ["Riot! Silver Vinyl", "$24.98", "riot-silver-vinyl", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/040721_Paramore-Riot_SilverVinyl.webp?v=1731434929"],
  ["Riot! Cassette", "$14.98", "riot-cassette", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/RiotCassette_1.png?v=1731440446"],
  ["Re: This is Why (Remix Album) Red Vinyl", "$24.98", "re-this-is-why-remix-album-red-vinyl", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/111524_Paramore_ReThisIsWhy_Vinyl.png?v=1731943180"],
  ["Paramore Vines Hoodie", "$75", "paramore-vines-hoodie", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_BRJ_VINES_HOODIE_1.png?v=1731355873"],
  ["Paramore Self-Titled CD", "$16.98", "paramore-self-titled-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/ParamoreSTcd_1.png?v=1731440869"],
  ["Paramore is my Favorite Singer T-Shirt II (Red)", "$45", "paramore-is-my-favorite-singer-t-shirt-ii-red", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_BrianRJ_FAVE_RED_SSTee_1.png?v=1731635568"],
  ["Liar Hoodie", "$75", "liar-hoodie", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ILARIA_LIAR_HOODIE_1A.png?v=1731356969"],
  ["Brand New Eyes CD", "$9.98", "brand-new-eyes-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/ParamorebrandNewEyesCD_1.png?v=1731441565"],
  ["C'est Comme Ca Flexi Disc", "$9.98", "cest-comme-ca-flexi-disc", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/121222-Paramore_C_estCommeCa_FlexiDisc_ProductPic.png?v=1731435731"],
  ["Everyone is a Bad Guy Journal", "$20", "everyone-is-a-bad-guy-journal", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PARA_ELANORA_BADGUY_JOURNAL_1.png?v=1731635465"],
  ["I Still Need a Certain Degree of Disorder Mug", "$20", "i-still-need-a-certain-degree-of-disorder-mug", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/PRODUCT_PARA_CJ_DISORDER_MUG_1_83c40e62-04af-493f-92dd-64519b251136.png?v=1732559783"],
  ["All We Know Is Falling CD", "$9.98", "all-we-know-is-falling-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/AWKIFCD.png?v=1731529772"],
  ["All We Know Is Falling Silver Vinyl", "$21.98", "all-we-know-is-falling-silver-vinyl", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/all_we_know_is_falling_silver_vinyl.png?v=1731434393"],
  ["After Laughter CD", "$13.98", "after-laughter-cd", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/ParamoreAfterLaughterCD_1.png?v=1731441342"],
  ["After Laughter Black & White Vinyl", "$24.98", "after-laughter-black-white-vinyl", "https://cdn.shopify.com/s/files/1/0895/5494/4287/files/Untitled_design_-_2026-09-28T135853.409.png?v=1790618883"],
];
const STORE = 'https://store.paramore.net/products/';
const palette = [['#ff7a00', '#7a1f00'], ['#222', '#555'], ['#c0392b', '#2c0b0b'], ['#f5c518', '#7a5b00'], ['#8e44ad', '#2a1236']];

const shopRows = [
  ['T-Shirts', /t-shirt|tee\b|raglan|long sleeve|ringer/i],
  ['Hoodies & Jackets', /hoodie|crewneck|jacket/i],
  ['Vinyl', /vinyl|\blp\b|flexi/i],
  ['CDs & Cassettes', /\bcd\b|cassette/i],
  ['Hats, Bags & More', /./],
];
// Each product goes in the first row whose pattern matches its title (order below matters).
const rowOf = (title) => {
  for (const t of [2, 3, 1, 0]) if (shopRows[t][1].test(title)) return t;
  return 4;
};

document.querySelectorAll('.shop-rows').forEach((rows) => {
  shopRows.forEach(([label], r) => {
    const heading = document.createElement('h4');
    heading.className = 'shop-label';
    heading.textContent = label;
    rows.appendChild(heading);
    const row = document.createElement('div');
    row.className = 'shop-row';
    const track = document.createElement('div');
    track.className = 'shop-track';
    shopItems.filter(([title]) => rowOf(title) === r).forEach(([name, price, handle, img], i) => {
      const [c1, c2] = palette[(i + r) % palette.length];
      const item = document.createElement('a');
      item.className = 'item';
      item.href = STORE + handle;
      item.target = '_blank';
      item.rel = 'noopener';
      item.draggable = false;
      item.innerHTML = `<div class="photo" style="--c1:${c1};--c2:${c2};--img:url('${img}&width=400')"></div><div class="label"></div><div class="price">${price}</div>`;
      item.querySelector('.label').textContent = name;
      track.appendChild(item);
    });
    row.appendChild(track);
    rows.appendChild(row);

    let startX = 0, startScroll = 0, lastX = 0, down = false, moved = false, tilt = 0;
    const setTilt = (deg) => row.style.setProperty('--tilt', deg);

    row.addEventListener('pointerdown', (e) => {
      down = true; moved = false;
      startX = lastX = e.clientX; startScroll = row.scrollLeft;
      row.classList.add('dragging');
      row.setPointerCapture(e.pointerId);
    });
    row.addEventListener('pointermove', (e) => {
      if (!down) return;
      if (Math.abs(e.clientX - startX) > 5) moved = true;
      row.scrollLeft = startScroll - (e.clientX - startX);
      // Content moves with the pointer, so items lag behind it and swing the other way.
      const target = Math.max(-25, Math.min(25, (e.clientX - lastX) * 2));
      tilt += (target - tilt) * 0.3;
      setTilt(tilt);
      lastX = e.clientX;
    });
    const end = () => { down = false; tilt = 0; setTilt(0); row.classList.remove('dragging'); };
    row.addEventListener('pointerup', end);
    row.addEventListener('pointercancel', end);
    row.addEventListener('click', (e) => { if (moved) e.preventDefault(); });
  });
});

// Artwork and 30s previews come from Apple's public iTunes Search API, not stored locally.
const ARTIST_ID = 75950796;
const player = new Audio();
player.volume = 0.7;
const previews = {};

async function itunes(query) {
  const res = await fetch(`https://itunes.apple.com/lookup?${query}`);
  return (await res.json()).results;
}

const ver = (n) => n.replace(/\s*[\(\[].*?[\)\]]/g, '').replace(/\s+-\s+(single|ep)$/i, '').replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
const isDeluxe = (n) => /deluxe/i.test(n);

// One entry per title: drop deluxe/bonus editions in favor of the standard release.
function uniqueByTitle(items, titleOf) {
  const map = new Map();
  items.forEach((it) => {
    const key = ver(titleOf(it));
    const cur = map.get(key);
    if (!cur || (isDeluxe(titleOf(cur)) && !isDeluxe(titleOf(it)))) map.set(key, it);
  });
  return [...map.values()];
}

function addCD(bin, { title, sub, slug, art, getPreview, poster }) {
  const cd = document.createElement('div');
  if (poster) {
    cd.className = 'feature';
    cd.innerHTML = `<div class="poster" style="background-image:url('imgs/posters/${slug}.jpg'),url('${art}')"></div><div class="song"><strong></strong><span></span></div>`;
    cd.querySelector('strong').textContent = title;
    cd.querySelector('span').textContent = sub;
  } else {
    cd.className = 'cd';
    cd.innerHTML = `<div class="disc" style="--art:url('${art}')"></div><div class="case" style="background-image:url('${art}')"><div class="title"></div></div>`;
    cd.querySelector('.title').textContent = title;
  }
  bin.appendChild(cd);

  cd.addEventListener('mouseenter', async () => {
    cd.dataset.hover = '1';
    let url;
    try { url = await getPreview(); } catch { return; }
    if (url && cd.dataset.hover) {
      player.src = url;
      player.play().catch(() => {});
    }
  });
  cd.addEventListener('mouseleave', () => {
    delete cd.dataset.hover;
    player.pause();
  });
}

function addGroup(container, heading, items, extraClass = '') {
  if (!items.length) return;
  const h = document.createElement('h3');
  h.textContent = heading;
  const bin = document.createElement('div');
  bin.className = `cd-bin ${extraClass}`;
  container.append(h, bin);
  items.forEach((it) => addCD(bin, it));
}

const big = (url) => url.replace('100x100', '400x400');
const byDate = (a, b) => a.releaseDate.localeCompare(b.releaseDate);

// Albums whose hover preview should be a specific song instead of the first track.
const previewSong = { paramore: 'Still Into You' };

function collectionItem(c) {
  return {
    title: `${c.collectionName.replace(/\s+-\s+(Single|EP)$/i, '')} (${c.releaseDate.slice(0, 4)})`,
    art: big(c.artworkUrl100),
    async getPreview() {
      if (!(c.collectionId in previews)) {
        const wanted = previewSong[ver(c.collectionName)];
        const tracks = await itunes(`id=${c.collectionId}&entity=song&limit=${wanted ? 40 : 5}`);
        const playable = tracks.filter((t) => t.previewUrl);
        previews[c.collectionId] = (wanted && playable.find((t) => ver(t.trackName) === ver(wanted)) || playable[0])?.previewUrl;
      }
      return previews[c.collectionId];
    },
  };
}

function songItem(t, label) {
  return { title: label, art: big(t.artworkUrl100), getPreview: async () => t.previewUrl };
}

async function search(term, extra = '') {
  const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=200${extra}`);
  return (await res.json()).results;
}

const relatedArtists = [
  { name: 'beabadoobee', query: 'beabadoobee', genre: 'Indie rock' },
  { name: 'Flyleaf', query: 'Flyleaf', genre: 'Alternative rock' },
  { name: 'Tonight Alive', query: 'Tonight Alive', genre: 'Pop punk' },
  { name: 'The Marías', query: 'The Marias', genre: 'Indie pop' },
  { name: 'Daisy Grenade', query: 'Daisy Grenade', genre: 'Alt pop punk' },
  { name: 'Avril Lavigne', query: 'Avril Lavigne', genre: 'Pop punk' },
  { name: 'Against the Current', query: 'Against the Current', genre: 'Pop rock' },
  { name: 'PVRIS', query: 'PVRIS', genre: 'Alternative rock' },
  { name: 'Meet Me @ The Altar', query: 'Meet Me @ The Altar', genre: 'Pop punk' },
  { name: 'The Linda Lindas', query: 'The Linda Lindas', genre: 'Punk rock' },
  { name: 'Hey Monday', query: 'Hey Monday', genre: 'Pop punk' },
  { name: 'Pale Waves', query: 'Pale Waves', genre: 'Indie rock' },
];

const artistKey = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function setupArtistScroller(track) {
  const buttons = [...document.querySelectorAll('#more .artist-scroll')];
  const [previous, next] = buttons;
  if (!previous || !next) return;

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      track.scrollBy({ left: Number(button.dataset.direction) * track.clientWidth * 0.8, behavior: 'smooth' });
    });
  });
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

async function loadRelatedArtists() {
  const root = document.querySelector('#more .artists');
  if (!root) return;

  const cards = await Promise.all(relatedArtists.map(async (artist) => {
    let album;
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist.query)}&entity=album&limit=15`);
      const data = await response.json();
      album = data.results.find((item) => artistKey(item.artistName) === artistKey(artist.name));
    } catch { /* the artist tile still renders without remote artwork */ }

    const card = document.createElement('a');
    card.className = 'artist';
    card.href = album?.artistViewUrl || `https://music.apple.com/us/search?term=${encodeURIComponent(artist.name)}`;
    card.target = '_blank';
    card.rel = 'noopener';
    card.setAttribute('aria-label', `Listen to ${artist.name} on Apple Music`);

    const cover = document.createElement('div');
    cover.className = 'artist-cover artist-cover-fallback';
    const monogram = document.createElement('span');
    monogram.textContent = artist.name.slice(0, 2).toUpperCase();
    cover.append(monogram);

    if (album?.artworkUrl100) {
      const image = document.createElement('img');
      image.src = big(album.artworkUrl100);
      image.alt = '';
      image.loading = 'lazy';
      image.onload = () => cover.classList.remove('artist-cover-fallback');
      image.onerror = () => image.remove();
      cover.append(image);
    }

    const copy = document.createElement('div');
    copy.className = 'artist-copy';
    const genre = document.createElement('span');
    genre.className = 'role';
    genre.textContent = artist.genre;
    const name = document.createElement('h3');
    name.textContent = artist.name;
    const listen = document.createElement('span');
    listen.className = 'artist-listen';
    listen.textContent = 'Listen on Apple Music';
    copy.append(genre, name, listen);
    card.append(cover, copy);
    return card;
  }));

  root.replaceChildren(...cards);
  root.scrollLeft = 0;
  setupArtistScroller(root);
}

loadRelatedArtists();

async function loadAlbums() {
  const root = document.querySelector('.cd-bin');
  root.className = 'cd-groups';
  let collections = [];
  try {
    collections = (await itunes(`id=${ARTIST_ID}&entity=album&limit=200`)).filter((a) => a.collectionType === 'Album');
  } catch {
    root.textContent = 'Could not load albums right now.';
    return;
  }
  collections.sort(byDate);

  const isSingle = (c) => /- Single$/i.test(c.collectionName);
  const isEP = (c) => /- EP$/i.test(c.collectionName);
  const albums = uniqueByTitle(collections.filter((c) => !isSingle(c) && !isEP(c)), (c) => c.collectionName);
  const singles = uniqueByTitle(collections.filter(isSingle), (c) => c.collectionName);
  const firstLine = ['my hero', 'i caught myself', 'decode'];
  const rank = (c) => { const i = firstLine.indexOf(ver(c.collectionName)); return i < 0 ? firstLine.length : i; };
  singles.sort((a, b) => rank(a) - rank(b));
  // Features: every movie with a Paramore/Hayley Williams song, as poster-style art beside the song.
  let featureItems = [];
  try {
    const results = await Promise.all([
      search('paramore soundtrack'),
      search('paramore motion picture'),
      search('hayley williams soundtrack'),
      search('hayley williams film'),
    ]);
    const filmAlbum = /soundtrack|motion picture|music from|netflix film/i;
    const songs = results.flat().filter((t) =>
      /paramore|hayley williams/i.test(t.artistName) && filmAlbum.test(t.collectionName)
      && !/degrassi/i.test(t.collectionName) && !/- single$/i.test(t.collectionName) && t.previewUrl);
    const picks = uniqueByTitle(songs, (t) => t.trackName);
    const byMovie = new Map();
    picks.forEach((t) => {
      const movie = t.collectionName.replace(/\s*[\(\[].*?[\)\]]/g, '').trim();
      if (!byMovie.has(movie)) byMovie.set(movie, []);
      byMovie.get(movie).push(t);
    });
    featureItems = [...byMovie].map(([movie, tracks]) => {
      const slug = movie.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const clean = (n) => n.replace(/\s*[\(\[].*?[\)\]]/g, '');
      return { poster: true, title: tracks.map((t) => clean(t.trackName)).join(' / '), sub: movie, slug, art: big(tracks[0].artworkUrl100), getPreview: async () => tracks[0].previewUrl };
    });
  } catch { /* features are optional */ }

  addGroup(root, 'Albums', albums.map(collectionItem));
  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent = 'Click and hover to listen';
  root.querySelector('h3')?.after(hint);
  addGroup(root, 'Movie Features', featureItems, 'feature-row');
  addGroup(root, 'Singles', singles.map(collectionItem), 'cd-row');
}

loadAlbums();


// Rotating member panel. 2000s-era photos load live from Wikimedia Commons by file name.
// Instrument silhouettes used as the panel's navigation icons.
const svg = (inner) => `<svg viewBox="0 0 64 64" fill="currentColor" stroke-linejoin="miter" aria-hidden="true">${inner}</svg>`;
// Angular, razor-edged shapes. Guitar: short neck, wide head, double horns. Bass: long neck, slim body.
const guitar = (tilt) => svg(`<g transform="rotate(${tilt} 32 34)"><polygon points="30,13 34,13 34,38 30,38"/><polygon points="25,0 39,3 38,13 32,15 26,11"/><polygon points="32,36 22,27 17,33 24,43 16,52 21,63 43,63 48,52 40,43 47,33 42,27"/></g>`);
const bass = (tilt) => svg(`<g transform="rotate(${tilt} 32 34)"><polygon points="30.5,6 33.5,6 33.5,44 30.5,44"/><polygon points="28.5,-2 36,1 35,10 30,12"/><polygon points="32,42 25,37 22,44 27,50 23,62 41,62 37,50 40,44"/></g>`);
const icons = {
  mic: svg('<g transform="rotate(-35 32 32)"><polygon points="32,2 44,8 44,21 32,27 20,21 20,8"/><polygon points="24,29 40,29 38,34 26,34"/><polygon points="27,36 37,36 34,61 30,61"/></g>'),
  guitar: guitar(25),
  guitar2: guitar(-25),
  bass: bass(25),
  drums: svg('<polygon points="2,13 26,11 29,15 5,18"/><polygon points="35,11 62,13 59,18 32,15"/><polygon points="12,17 14,17 14,30 12,30"/><polygon points="50,17 52,17 52,30 50,30"/><polygon points="10,31 22,26 31,32 19,38"/><polygon points="33,32 42,26 54,31 45,38"/><polygon points="32,31 44,38 44,54 32,61 20,54 20,38"/>'),
};

const members = [
  { name: 'Hayley Williams', extra: [{"file": "Hayley_Williams_of_Paramore_in_2008.jpg", "pos": "64%"}, {"file": "Paramore_Hayley_Williams03.jpg", "pos": "50%"}], layout: 'd', pos: 'center 0%', icon: 'mic', role: 'Lead vocals', file: 'Hayley_Williams_Warped_Tour_2007.jpg', cap: 'Warped Tour 2007', bio: "Grew up in Mississippi and Franklin, Tennessee, and co-founded Paramore in 2004 as a teenager. She writes the band's lyrics with Taylor York and released the solo albums Petals for Armor (2020) and Flowers for Vases / Descansos (2021)." },
  { name: 'Jeremy Davis', extra: [{"file": "Jeremy_Davis_Paramore_8-16-2010.jpg", "pos": "20%"}, {"file": "Jeremy_Davis_Soundwave.jpg", "pos": "58%"}], layout: 'd', pos: 'center 29%', icon: 'bass', role: 'Former bassist', file: 'Jeremy_from_Paramore.jpg', cap: '2000s', bio: "Played bass on the band's records through the self-titled album, then left in 2015." },
  { name: 'Zac Farro', extra: [{"file": "Zac_from_Paramore.jpg", "pos": "54%"}, {"file": "Zac_Farro_Paramore.jpg", "pos": "50%"}], layout: 'd', pos: 'center 32%', icon: 'drums', role: 'Drums', file: 'Zac_Farro_Warped_Tour_2007.jpg', cap: 'Warped Tour 2007', bio: 'A founding member who left in 2010, made music with his own project HalfNoise, and returned in 2017 for After Laughter.' },
  { name: 'Taylor York', extra: [{"file": "Taylor_from_Paramore.jpg", "pos": "70%"}, {"file": "Paramore_Amsterdam_5-2.jpg", "pos": "50%"}], layout: 'd', pos: 'center 17%', icon: 'guitar2', role: 'Guitar, songwriting, production', file: 'Paramore_Taylor_York01.jpg', cap: 'Warped Tour', bio: "Joined the band in its early years and became Hayley's main musical partner. He co-writes and produces much of the band's recent music, including After Laughter and This Is Why." },
  { name: 'Josh Farro', extra: [{"file": "Josh_Farro_2008_cropped.jpg", "pos": "50%"}, {"file": "Josh_Farro_2008-03-15.jpg", "pos": "50%"}], layout: 'd', pos: 'center 16%', icon: 'guitar', role: 'Former guitarist', file: 'Paramore_Josh_Farro01.jpg', cap: 'Warped Tour 2007', bio: "A founding member and co-writer of the band's early albums. He left in 2010 and later formed the band Novel American." },
];

(async function buildMemberPanel() {
  const panel = document.querySelector('.member-panel');
  if (!panel) return;
  panel.innerHTML = `
    <button class="m-prev" aria-label="Previous member"></button>
    <div class="m-slide"></div>
    <button class="m-next" aria-label="Next member"></button>
    <div class="m-dots"></div>`;
  const slide = panel.querySelector('.m-slide');
  const leftCol = document.querySelector('.vid-left');
  const rightCol = document.querySelector('.vid-right');
  const dots = panel.querySelector('.m-dots');

  members.forEach((m) => {
    m.photo = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(m.file)}?width=960`;
    new Image().src = m.photo;
  });

  members.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'm-dot';
    d.setAttribute('aria-label', `Show ${members[i].name}`);
    d.title = members[i].name;
    d.innerHTML = icons[members[i].icon];
    d.addEventListener('click', () => show(i, true));
    dots.appendChild(d);
  });

  let index = 0, timer;
  function show(i, userPicked) {
    index = (i + members.length) % members.length;
    const m = members[index];
    slide.classList.remove('in');
    setTimeout(() => {
      slide.dataset.layout = m.layout;
      slide.innerHTML = `<div class="m-photo"></div><div class="m-text"><h3></h3><span class="m-role"></span><p></p></div>`;
      const photo = slide.querySelector('.m-photo');
      if (m.photo) photo.style.setProperty('--img', `url('${m.photo}')`); else photo.textContent = m.name[0];
      slide.querySelector('h3').textContent = m.name;
      slide.querySelector('.m-role').textContent = m.role;
      slide.querySelector('p').textContent = m.bio;
      slide.classList.add('in');
    }, 250);
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === index));
    // Fixed-size banners: two other photos of the highlighted member (never the one in the card).
    [leftCol, rightCol].forEach((col, k) => {
      const file = m.extra[k].file;
      const pos = `${m.extra[k].pos} center`;
      col.innerHTML = `<div class="vid-frame" role="img" aria-label="${m.name}" style="--img:url('https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=960'); background-position:${pos}"></div>`;
    });
    // Side arrows show the neighbouring members' instruments.
    const side = (btn, n) => { const o = members[(index + n + members.length) % members.length]; btn.innerHTML = icons[o.icon]; btn.title = o.name; btn.setAttribute('aria-label', `Show ${o.name}`); };
    side(panel.querySelector('.m-prev'), -1);
    side(panel.querySelector('.m-next'), 1);
    if (userPicked) restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => show(index + 1), 7000); }

  panel.querySelector('.m-prev').addEventListener('click', () => show(index - 1, true));
  panel.querySelector('.m-next').addEventListener('click', () => show(index + 1, true));
  const stage = panel.parentElement;
  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', restart);
  show(0);
  restart();
})();


// Straight marquee strips between sections, scrolling PARAMORE.
document.querySelectorAll('main section').forEach((sec, i) => {
  const strip = document.createElement('div');
  strip.className = 'marquee' + (i % 2 ? ' reverse' : '');
  const run = Array.from({ length: 24 }, () => '<span>PARAMORE</span>').join('');
  strip.innerHTML = `<div class="marquee-track" aria-hidden="true">${run}${run}</div>`;
  sec.before(strip);
});
