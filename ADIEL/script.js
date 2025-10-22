// ===== VERSE DATA =====
const verses = {
  happy: [
    "Psalm 118:24 - This is the day the Lord has made; let us rejoice and be glad in it.",
    "Nehemiah 8:10 - The joy of the Lord is your strength.",
    "Philippians 4:4 - Rejoice in the Lord always.",
    "Psalm 16:11 - You make known to me the path of life; in your presence there is fullness of joy.",
    "John 15:11 - I have told you this so that my joy may be in you.",
    "Romans 12:12 - Be joyful in hope, patient in affliction, faithful in prayer.",
    "Psalm 37:4 - Delight yourself in the Lord, and he will give you the desires of your heart.",
    "Proverbs 17:22 - A cheerful heart is good medicine.",
    "Psalm 100:2 - Serve the Lord with gladness.",
    "1 Thessalonians 5:16 - Rejoice always."
  ],
  sad: [
    "Psalm 34:18 - The Lord is close to the brokenhearted.",
    "Revelation 21:4 - He will wipe away every tear from their eyes.",
    "John 16:33 - In this world you will have trouble, but take heart!",
    "Psalm 30:5 - Weeping may stay for the night, but joy comes in the morning.",
    "Matthew 5:4 - Blessed are those who mourn, for they will be comforted.",
    "Psalm 42:11 - Why are you downcast, my soul? Put your hope in God.",
    "Isaiah 41:10 - Fear not, for I am with you.",
    "2 Corinthians 1:3-4 - God comforts us in all our troubles.",
    "Psalm 147:3 - He heals the brokenhearted and binds up their wounds.",
    "1 Peter 5:7 - Cast all your anxiety on Him because He cares for you."
  ],
  angry: [
    "James 1:19 - Be quick to listen, slow to speak, and slow to become angry.",
    "Proverbs 15:1 - A gentle answer turns away wrath.",
    "Ephesians 4:26 - In your anger do not sin.",
    "Colossians 3:8 - Rid yourselves of anger, rage, and malice.",
    "Psalm 37:8 - Refrain from anger and turn from wrath.",
    "Proverbs 14:29 - Whoever is patient has great understanding.",
    "Romans 12:21 - Do not be overcome by evil, but overcome evil with good.",
    "Matthew 5:9 - Blessed are the peacemakers.",
    "Ephesians 4:31 - Get rid of all bitterness and anger.",
    "Proverbs 19:11 - A person’s wisdom yields patience."
  ],
  lonely: [
    "Deuteronomy 31:6 - The Lord your God goes with you; He will never leave you.",
    "Psalm 27:10 - Though my father and mother forsake me, the Lord will receive me.",
    "Isaiah 43:2 - When you pass through the waters, I will be with you.",
    "John 14:18 - I will not leave you as orphans.",
    "Matthew 28:20 - I am with you always, to the very end of the age.",
    "Psalm 23:4 - Even though I walk through the valley, you are with me.",
    "Romans 8:38-39 - Nothing can separate us from God’s love.",
    "Joshua 1:9 - Be strong and courageous. The Lord your God is with you.",
    "Hebrews 13:5 - I will never leave you nor forsake you.",
    "1 Samuel 12:22 - The Lord will not forsake His people."
  ]
  // You can continue to add anxious, thankful, tired, afraid similarly
};

// ===== POPUP HANDLERS =====
function showVerse(emotion) {
  const random = Math.floor(Math.random() * verses[emotion].length);
  const verse = verses[emotion][random];
  document.getElementById('verseText').textContent = verse;
  document.getElementById('versePopup').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('versePopup').classList.add('hidden');
}

// ===== SEARCH FUNCTION =====
function searchEmotion() {
  const input = document.getElementById('searchBar').value.toLowerCase();
  if (verses[input]) {
    const random = Math.floor(Math.random() * verses[input].length);
    document.getElementById('searchResult').textContent = verses[input][random];
  } else {
    document.getElementById('searchResult').textContent = "Sorry, I don’t have a verse for that emotion yet.";
  }
}
