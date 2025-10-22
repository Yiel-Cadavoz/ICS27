
document.addEventListener('DOMContentLoaded', () => {
  initSearchFeature();
  initVerseFeature();
  initCommentSection();
  initContactForm();
  initAuthFeature();
  initSignupModal();
  showLogoutButton();
});

function initSearchFeature() {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const term = searchInput.value.trim();
      if (term) {
        window.location.href = `categories.html?search=${encodeURIComponent(term)}`;
      } else {
        alert('Please enter a search term.');
      }
    });
  }
}

function initVerseFeature() {
  const buttons = document.querySelectorAll('.emotion-btn');
  const modal = document.getElementById('verseModal');
  const verseText = document.getElementById('verseText');
  const closeBtn = document.querySelector('.close');

  const verses = {
    sad: [
      "Psalm 34:18 — The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      "Revelation 21:4 — He will wipe every tear from their eyes.",
      "Matthew 5:4 — Blessed are those who mourn, for they will be comforted."
    ],
    anxious: [
      "Philippians 4:6–7 — Do not be anxious about anything, but in every situation, pray and give thanks.",
      "1 Peter 5:7 — Cast all your anxiety on Him because He cares for you.",
      "John 14:27 — Peace I leave with you; my peace I give you."
    ],
    joyful: [
      "Psalm 118:24 — This is the day the Lord has made; let us rejoice and be glad in it.",
      "Nehemiah 8:10 — The joy of the Lord is your strength.",
      "Philippians 4:4 — Rejoice in the Lord always. I will say it again: Rejoice!"
    ],
    confused: [
      "James 1:5 — If any of you lacks wisdom, ask God, who gives generously.",
      "Proverbs 3:5–6 — Trust in the Lord with all your heart; do not lean on your own understanding.",
      "Psalm 32:8 — I will instruct you and teach you in the way you should go."
    ],
    tired: [
      "Matthew 11:28 — Come to me, all you who are weary and burdened, and I will give you rest.",
      "Isaiah 40:31 — Those who hope in the Lord will renew their strength.",
      "Psalm 23:2–3 — He makes me lie down in green pastures, He restores my soul."
    ],
    angry: [
      "Ephesians 4:26 — In your anger do not sin: Do not let the sun go down while you are still angry.",
      "Proverbs 15:1 — A gentle answer turns away wrath, but a harsh word stirs up anger.",
      "James 1:19 — Everyone should be quick to listen, slow to speak and slow to become angry."
    ],
    lonely: [
      "Deuteronomy 31:6 — The Lord your God goes with you; He will never leave you nor forsake you.",
      "Psalm 27:10 — Though my father and mother forsake me, the Lord will receive me.",
      "Isaiah 41:10 — So do not fear, for I am with you; do not be dismayed, for I am your God."
    ],
    grateful: [
      "1 Thessalonians 5:18 — Give thanks in all circumstances; for this is God’s will for you.",
      "Psalm 107:1 — Give thanks to the Lord, for He is good; His love endures forever.",
      "Colossians 3:15 — Let the peace of Christ rule in your hearts and be thankful."
    ]
  };

  if (buttons.length && modal && verseText && closeBtn) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const emotion = button.dataset.emotion;
        const list = verses[emotion];
        const randomVerse = list[Math.floor(Math.random() * list.length)];
        verseText.textContent = randomVerse;
        modal.style.display = 'block';
      });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}



function initCommentSection() {
  const commentBtn = document.querySelector('.comments button');
  const commentInput = document.querySelector('.comments textarea');
  const commentList = document.createElement('div');
  const commentSection = document.querySelector('.comments');

  if (commentSection) {
    commentList.classList.add('comment-list');
    commentSection.appendChild(commentList);

    const comments = JSON.parse(localStorage.getItem('lessonComments') || '[]');
    comments.forEach(comment => addCommentToDOM(commentList, comment));

    if (commentBtn && commentInput) {
      commentBtn.addEventListener('click', () => {
        const text = commentInput.value.trim();
        if (!text) {
          alert('Please write a comment.');
          return;
        }

        const newComment = {
          text,
          date: new Date().toLocaleString()
        };
        comments.push(newComment);
        localStorage.setItem('lessonComments', JSON.stringify(comments));
        addCommentToDOM(commentList, newComment);
        commentInput.value = '';
      });
    }
  }
}

function addCommentToDOM(container, comment) {
  const div = document.createElement('div');
  div.classList.add('comment');
  div.innerHTML = `<p>${comment.text}</p><span>${comment.date}</span>`;
  container.appendChild(div);
}

function initContactForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type=\"text\"]').value.trim();
    const email = form.querySelector('input[type=\"email\"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const messages = JSON.parse(localStorage.getItem('userMessages') || '[]');
    messages.push({ name, email, message, date: new Date().toLocaleString() });
    localStorage.setItem('userMessages', JSON.stringify(messages));

    alert('Thank you for your message! 💌');
    form.reset();
  });
}

// 🌸 Handles the login system
function initAuthFeature() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] && users[email] === password) {
      alert('Welcome back!');
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password.');
    }
  });
}

// 🌷 Sign-up modal and new user registration
function initSignupModal() {
  const modal = document.getElementById('signupModal');
  const openBtn = document.getElementById('openSignup');
  const closeBtn = document.querySelector('.close');
  const signupForm = document.getElementById('signupForm');

  if (!modal) return;

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      alert('That email is already registered.');
      return;
    }

    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! You can now sign in.');
    modal.style.display = 'none';
  });
}

// 🌻 Show logout link if logged in
function showLogoutButton() {
  const header = document.querySelector('header nav');
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser && header) {
    const logoutLink = document.createElement('a');
    logoutLink.textContent = 'Logout';
    logoutLink.href = '#';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      alert('You have logged out.');
      window.location.reload();
    });
    header.appendChild(logoutLink);
  }
}

