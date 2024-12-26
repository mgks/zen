const quotes = [];
let currentQuote = {};
let audio = null;
let isMuted = true;
let appURL = "https://mgks.github.io/zen";

// load quotes from JSON
async function loadQuotes() {
  try {
    const response = await fetch('src/quotes.json');
    const data = await response.json();
    quotes.push(...data);
    loadQuote();
  } catch (error) {
    console.error('failed to load quotes:', error);
  }
}

// load a random quote
function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  displayQuote();
}

// display quote with animation
function displayQuote() {
  const quoteElem = document.getElementById('quote');
  const authorElem = document.getElementById('author');

  quoteElem.innerHTML = '';
  authorElem.innerHTML = '';

  const quoteText = currentQuote.quote;
  const authorText = `- ${currentQuote.author}`;

  let i = 0;
  const interval = setInterval(() => {
    if (i < quoteText.length) {
      quoteElem.innerHTML += quoteText[i];
      i++;
    } else {
      clearInterval(interval);
      authorElem.textContent = authorText;
    }
  }, 50);
}

// copy quote to clipboard
function copyQuote() {
  navigator.clipboard.writeText(`${currentQuote.quote} - ${currentQuote.author}\n\n${appURL}#clip`).then(() => {
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="2.384 4.795 15.237 9.606" fill="currentColor"><g><g><path d="M13.296 4.968a0.8 0.8 0 0 0 -1.128 0.136l-5.6 7.2 -2.744 -3.344a0.8 0.8 0 1 0 -1.248 1l3.336 4.144a0.8 0.8 0 0 0 0.624 0.296 0.8 0.8 0 0 0 0.664 -0.304l6.264 -8a0.8 0.8 0 0 0 -0.168 -1.128m4 0a0.8 0.8 0 0 0 -1.128 0.136l-5.6 7.2 -0.488 -0.6 -1.008 1.296 0.88 1.096a0.8 0.8 0 0 0 0.624 0.296 0.8 0.8 0 0 0 0.624 -0.304l6.264 -8a0.8 0.8 0 0 0 -0.168 -1.12"/><path d="M6.968 10.448 8 9.152l-0.16 -0.192a0.8 0.8 0 0 0 -1.144 -0.16 0.8 0.8 0 0 0 -0.12 1.128z"/></g></g></svg>';
    setTimeout(() => {
      copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="6.40000057220459 4 25.60000228881836 30.39999771118164" fill="currentColor"><path d="M14.8 4A4.403 4.403 0 0 0 10.399 8.4v17.6a4.403 4.403 0 0 0 4.4 4.4H27.6a4.403 4.403 0 0 0 4.4 -4.4V8.4A4.406 4.406 0 0 0 27.6 4zm-6 4 -0.975 0.65a3.203 3.203 0 0 0 -1.425 2.663v15.487a7.6 7.6 0 0 0 7.6 7.6h10.688a3.203 3.203 0 0 0 2.662 -1.425l0.65 -0.974H14a5.2 5.2 0 0 1 -5.2 -5.2z"/></svg>';
    }, 2000);
  });
}

// toggle audio
function toggleAudio() {
  const muteBtn = document.getElementById('mute-btn');
  isMuted = !isMuted;
  if (isMuted) {
    audio.pause();
    muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.4 2.4 14.4 14.4"><path d="M11.2 7.688V5.6h1.6c0.88 0 1.6 -0.72 1.6 -1.6s-0.72 -1.6 -1.6 -1.6h-2.4a0.803 0.803 0 0 0 -0.8 0.8v2.888zM4.096 2.848a0.797 0.797 0 1 0 -1.128 1.128L9.6 10.615v0.224c-0.752 -0.432 -1.68 -0.6 -2.664 -0.256 -1.072 0.384 -1.896 1.336 -2.088 2.456a3.206 3.206 0 0 0 3.672 3.72c1.568 -0.248 2.68 -1.688 2.68 -3.28v-1.264l4.016 4.016a0.797 0.797 0 1 0 1.128 -1.128z"/></svg>';
  } else {
    audio.play();
    muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19.2 19.2" fill="currentColor"><path fill="none" d="M0 0h19.2v19.2H0z"/><path d="M9.6 4v6.84c-0.752 -0.432 -1.68 -0.6 -2.664 -0.256 -1.072 0.384 -1.896 1.336 -2.088 2.456a3.206 3.206 0 0 0 3.672 3.72c1.568 -0.248 2.68 -1.688 2.68 -3.28V5.6h1.6c0.88 0 1.6 -0.72 1.6 -1.6s-0.72 -1.6 -1.6 -1.6h-1.6c-0.88 0 -1.6 0.72 -1.6 1.6"/></svg>';
  }
}

// toggle dark/light mode
function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
}

// share quote with others
function shareContent() {
  const shareText = `${currentQuote.quote} - ${currentQuote.author}`;
  const currentUrl = window.location.href;
  if (navigator.share) {
      // for supported devices (android/iOS)
      navigator.share({
          title: document.title,
          text: shareText,
          url: currentUrl
      }).then(() => {
          console.log('share successful');
      }).catch((error) => {
          console.log('error sharing:', error);
      });
  } else {
      // fallback for desktop devices (opens twitter share URL in a new tab)
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}#share`;
      window.open(twitterUrl, '_blank');
  }
}


// initialize app
window.addEventListener('load', () => {
  audio = new Audio('src/guts_theme.mp3');
  audio.muted=false;
  audio.autoplay=true;
  audio.loop = true;
  audio.volume = 0.1;
  audio.addEventListener('canplaythrough', () => {
    audio.play();
  });
  loadQuotes();
});
