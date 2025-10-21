// ==============================================
// GODLYGIRLS WEBSITE SCRIPT.JS
// ==============================================

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSearchFeature();
  initVerseFeature();
  initCommentSection();
  initContactForm();
  initAuthFeature();
});

// ----------------------------------------------
// 🔍 SEARCH FEATURE
// ----------------------------------------------
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

// ----------------------------------------------
// 📖 VERSE GENERATOR FEATURE
// ----------------------------------------------
function initVerseFeature() {
  const verseBtn = document.getElementById('getVerse');
  const verseDisplay = document.getElementById('verseDisplay');

  const verses = {
    sad: [
      "Psalm 34:18 — The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      "Revelation 21:4 — He will wipe every tear from their eyes."
    ],
    anxious: [
      "Philippians 4:6-7 — Do not be anxious about anything, but in every situation, pray and give thanks.",
      "1 Peter 5:7 — Cast all your anxiety on Him because He cares for you."
    ],
    joyful: [
      "Psalm 118:24 — This is the day the Lord has made; let us rejoice and be glad in it.",
      "Nehemiah 8:10 — The joy of the Lord is your strength."
    ],
    confused: [
      "James 1:5 — If any of you lacks wisdom, ask God, who gives generously.",
      "Proverbs 3:5-6 — Trust in the Lord with all your heart; do not lean on your own understanding."
    ]
  };

  if (verseBtn && verseDisplay) {
    verseBtn.addEventListener('click', () => {
      const feeling = document.getElementById('feelingSelect').value;
      const verseList = verses[feeling];
      const randomVerse = verseList[Math.floor(Math.random() * verseList.length)];
      verseDisplay.textContent = randomVerse;
    });
  }
}

// ----------------------------------------------
// 💬 COMMENT SECTION FEATURE (in lessons.html)
// ----------------------------------------------
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

// ----------------------------------------------
// 📨 CONTACT FORM FEATURE
// ----------------------------------------------
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

// ----------------------------------------------
// 👩‍💻 SIMPLE AUTH FEATURE (Login / Signup Demo)
// ----------------------------------------------
function initAuthFeature() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = loginForm.querySelectorAll('input');
    const usernameOrEmail = inputs[0].value.trim();
    const password = inputs[1].value.trim();

    if (!usernameOrEmail || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[usernameOrEmail] && users[usernameOrEmail] === password) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', usernameOrEmail);
      window.location.href = 'index.html';
    } else {
      const create = confirm('Account not found. Create a new one?');
      if (create) {
        users[usernameOrEmail] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully!');
        window.location.href = 'index.html';
      }
    }
  });
}
