// =====================================================================
// KNOW YOUR CHARACTER: all quiz content lives here.
//
// HOW SCORING WORKS
//  - Every answer option has a `scores` object, e.g. { harry: 3, neville: 2 }.
//  - Picking that option adds those points to those characters.
//  - After the last question, the character with the most points wins.
//  - Ties are broken by (1) most "strong matches" (options worth 3+ points),
//    then (2) the order of TIE_BREAK_ORDER below.
//
// HOW TO EDIT
//  - Change any text freely.
//  - To keep the quiz fair, give every character a few answers worth 3 points.
//  - Keep exactly 4 options per question; each round draws 6 from the pool.
// =====================================================================

export const HOUSES = {
  gryffindor: { label: 'Gryffindor', colors: ['#8c1d18', '#d4af37'] },
  slytherin: { label: 'Slytherin', colors: ['#17452b', '#c0c4cc'] },
  ravenclaw: { label: 'Ravenclaw', colors: ['#14306b', '#b8862f'] },
};

// If scores tie completely, the character listed first wins.
export const TIE_BREAK_ORDER = [
  'harry',
  'hermione',
  'ron',
  'luna',
  'neville',
  'hagrid',
  'dumbledore',
  'draco',
  'snape',
  'voldemort',
];

// ---------------------------------------------------------------------
// CHARACTERS
// symbol:      emoji shown on the themed emblem (used whenever there is no photo)
// commonsFile: optional. A Wikimedia Commons file title, e.g. 'File:Example.jpg'.
//              When set, the quiz fetches that image (with its author and
//              license) from the free Wikimedia Commons API and shows credit.
//              Only use files you have checked are freely licensed AND really
//              suit the character. Leave null to use the emblem.
// ---------------------------------------------------------------------
export const CHARACTERS = [
  {
    id: 'harry',
    name: 'Harry Potter',
    house: 'gryffindor',
    symbol: '⚡',
    commonsFile: null,
    traits: ['Brave', 'Loyal', 'Selfless', 'Resourceful'],
    description:
      'You act on instinct when it matters and put the people you care about first. You never asked to be the hero, but when someone needs help you step forward anyway. Your courage is the quiet kind: afraid, and going anyway.',
    message:
      'Some heroes are born in the spotlight. You are made by the choices you refuse to walk away from.',
  },
  {
    id: 'hermione',
    name: 'Hermione Granger',
    house: 'gryffindor',
    symbol: '📖',
    commonsFile: null,
    traits: ['Brilliant', 'Prepared', 'Principled', 'Determined'],
    description:
      'You believe most problems can be solved with enough curiosity, preparation and stubbornness, and you are usually right. You care deeply about fairness, and you are the friend who has read the chapter, packed the supplies and still stays up late to help.',
    message: 'Brains and bravery were never opposites. You prove it every time you raise your hand.',
  },
  {
    id: 'ron',
    name: 'Ron Weasley',
    house: 'gryffindor',
    symbol: '♞',
    commonsFile: null,
    traits: ['Loyal', 'Funny', 'Big-hearted', 'Underestimated'],
    description:
      'You are the heart of any group: loyal to the bone, quick with a joke and braver than you admit. You may doubt yourself, but when your friends are in trouble you show up every single time, usually with snacks.',
    message: 'Not every hero wants the spotlight. Some carry the whole team, and you are one of them.',
  },
  {
    id: 'luna',
    name: 'Luna Lovegood',
    house: 'ravenclaw',
    symbol: '🌙',
    commonsFile: null,
    traits: ['Original', 'Gentle', 'Perceptive', 'Fearless'],
    description:
      'You see the world a little differently, and you are perfectly comfortable with that. Curious, kind and unbothered by what others think, you notice wonders everyone else walks past and make people feel that being themselves is more than fine.',
    message: 'The world needs dreamers who see what others miss. Keep looking at the sky.',
  },
  {
    id: 'draco',
    name: 'Draco Malfoy',
    house: 'slytherin',
    symbol: '🐍',
    commonsFile: null,
    traits: ['Ambitious', 'Proud', 'Sharp', 'Image-conscious'],
    description:
      'You like to win, you like to be noticed, and you have standards. Underneath the polished surface is someone who feels the pressure to live up to expectations. Your ambition is real; the question is what you choose to aim it at.',
    message:
      'Ambition is a fine engine. Point it somewhere worthy and the world will notice for the right reasons.',
  },
  {
    id: 'neville',
    name: 'Neville Longbottom',
    house: 'gryffindor',
    symbol: '🌿',
    commonsFile: null,
    traits: ['Gentle', 'Persistent', 'Quietly brave', 'Growing'],
    description:
      'You are not the loudest in the room, but you may be the one who grows the most. Patient and humble, you doubt yourself more than you should, and still rise to the moment when it truly counts. Your courage burns slowly and never goes out.',
    message: 'Courage is not always loud. Sometimes it is simply staying and trying again.',
  },
  {
    id: 'dumbledore',
    name: 'Albus Dumbledore',
    house: 'gryffindor',
    symbol: '🕯️',
    commonsFile: null,
    traits: ['Wise', 'Kind', 'Curious', 'Strategic'],
    description:
      'You look at the long picture. Thoughtful and warm, with a twinkle of mischief, you believe in second chances and know that choices matter more than talent. People come to you for perspective, and you keep a few secrets of your own.',
    message: 'Wisdom grows from the choices you make. Yours say a great deal about you.',
  },
  {
    id: 'snape',
    name: 'Severus Snape',
    house: 'slytherin',
    symbol: '🧪',
    commonsFile: null,
    traits: ['Guarded', 'Brilliant', 'Secretly loyal', 'Complex'],
    description:
      'You are intense, observant and far more feeling than you let on. You keep your guard up, hold high standards and remember everything. Beneath the sharp edges lies a deep and stubborn loyalty that only the patient ever see.',
    message: 'Not everything valuable announces itself. Your depth shows to those who look closely.',
  },
  {
    id: 'voldemort',
    name: 'Lord Voldemort',
    house: 'slytherin',
    symbol: '💀',
    commonsFile: null,
    traits: ['Driven', 'Strategic', 'Controlling', 'Fearful of losing'],
    description:
      'Your answers lean towards power, control and never being overlooked. Take this as a story-world mirror, not a verdict: that drive, aimed at something kind, builds great things; aimed at control, it ends in loneliness. The good news is that you get to choose.',
    message:
      'Even the Sorting Hat would say ambition is not the problem. What you are willing to sacrifice for it is.',
  },
  {
    id: 'hagrid',
    name: 'Rubeus Hagrid',
    house: 'gryffindor',
    symbol: '🗝️',
    commonsFile: null,
    traits: ['Warm', 'Loyal', 'Gentle giant', 'Animal lover'],
    description:
      'You are big-hearted, fiercely loyal and happiest with the people (and creatures) you love close by. You see the good in anyone misunderstood, and feeding everyone is your love language. For the ones you care about, you will happily bend a rule or two.',
    message: 'A kind heart is the rarest magic. Your door is always open and the kettle is always on.',
  },
];

// ---------------------------------------------------------------------
// QUESTIONS (12-question pool; each round uses 6, each with exactly 4 options)
// ---------------------------------------------------------------------
export const QUESTIONS = [
  {
    id: 'door',
    prompt: 'A hidden door appears in a castle corridor at midnight. What do you do?',
    options: [
      {
        text: 'Push it open. Someone might need help, and you will find the courage on the way.',
        scores: { harry: 3, neville: 2, ron: 2 },
      },
      {
        text: 'Look it up first. Nobody should walk into the unknown unprepared.',
        scores: { hermione: 3, snape: 2, dumbledore: 1 },
      },
      {
        text: 'Open it quietly. Whatever a secret door hides is worth claiming for yourself.',
        scores: { voldemort: 3, draco: 2, harry: 1 },
      },
      {
        text: 'Wonder out loud what strange creature might be living behind it.',
        scores: { luna: 3, hagrid: 2, dumbledore: 1 },
      },
    ],
  },
  {
    id: 'exam',
    prompt: 'Your friend is anxious before a big exam. How do you help?',
    options: [
      {
        text: 'Quiz them with neat, colour-coded notes and a calm plan.',
        scores: { hermione: 2, neville: 2, dumbledore: 1 },
      },
      {
        text: 'Crack a joke, make sure they eat something and remind them they are braver than they think.',
        scores: { ron: 3, hagrid: 2, harry: 1 },
      },
      {
        text: 'Tell them honestly that fear is useful and that only results will matter.',
        scores: { snape: 3, draco: 2, voldemort: 1 },
      },
      {
        text: 'Take them outside to watch the sky and put the exam in perspective.',
        scores: { dumbledore: 3, luna: 2, neville: 1 },
      },
    ],
  },
  {
    id: 'want',
    prompt: 'What do you want most from your years at school?',
    options: [
      {
        text: 'To protect the people I care about.',
        scores: { harry: 3, neville: 2, ron: 1, hagrid: 1 },
      },
      {
        text: 'To be the best, and to make sure everyone knows it.',
        scores: { draco: 3, hermione: 1, voldemort: 1 },
      },
      {
        text: 'To understand how the world truly works.',
        scores: { dumbledore: 3, hermione: 2, luna: 1 },
      },
      {
        text: 'To never be powerless or overlooked again.',
        scores: { voldemort: 3, snape: 2, draco: 1 },
      },
    ],
  },
  {
    id: 'home',
    prompt: 'Which place feels most like home?',
    options: [
      {
        text: 'A warm kitchen, a crackling fire and far too much food.',
        scores: { ron: 3, hagrid: 3, neville: 1 },
      },
      {
        text: 'A quiet library corner with a tall stack of books.',
        scores: { hermione: 2, dumbledore: 2, snape: 1 },
      },
      {
        text: 'A greenhouse where something is always quietly growing.',
        scores: { neville: 3, luna: 1, hagrid: 1 },
      },
      {
        text: 'A cool, silent room where nobody disturbs me.',
        scores: { snape: 3, voldemort: 2, draco: 2 },
      },
    ],
  },
  {
    id: 'wronged',
    prompt: 'Someone wrongs you badly. What happens next?',
    options: [
      {
        text: 'I forgive them, but I will still stand up for others.',
        scores: { harry: 2, dumbledore: 2, neville: 2 },
      },
      {
        text: 'I make sure they regret it. Nobody treats me that way.',
        scores: { draco: 3, voldemort: 2, ron: 2 },
      },
      {
        text: 'I stay quiet, remember everything and wait for the right moment.',
        scores: { snape: 3, voldemort: 2, hermione: 1 },
      },
      {
        text: 'I assume they had a reason and answer with kindness.',
        scores: { luna: 3, hagrid: 2, dumbledore: 1 },
      },
    ],
  },
  {
    id: 'gift',
    prompt: 'Which gift would you choose for yourself?',
    options: [
      {
        text: 'A cloak that lets me slip unseen through any danger.',
        scores: { harry: 3, ron: 2, draco: 1 },
      },
      {
        text: 'A library card to every book ever written.',
        scores: { hermione: 2, dumbledore: 2, luna: 1 },
      },
      {
        text: 'A loyal, slightly strange creature as a lifelong companion.',
        scores: { hagrid: 3, luna: 2, neville: 2 },
      },
      {
        text: 'A wand that no one could ever challenge.',
        scores: { voldemort: 3, draco: 2, snape: 1 },
      },
    ],
  },
  {
    id: 'team',
    prompt: 'Your group is given a difficult task. What role do you naturally take?',
    options: [
      { text: 'I step forward and keep everyone moving.', scores: { harry: 3, ron: 1, neville: 1 } },
      { text: 'I organise the plan and make sure nothing is missed.', scores: { hermione: 3, dumbledore: 1 } },
      { text: 'I look for an unusual solution nobody has considered.', scores: { luna: 3, dumbledore: 1 } },
      { text: 'I quietly take responsibility for the hardest part.', scores: { snape: 2, draco: 2, neville: 2 } },
    ],
  },
  {
    id: 'clue',
    prompt: 'You find a mysterious note tucked inside an old book. What interests you most?',
    options: [
      { text: 'The hidden history behind whoever wrote it.', scores: { hermione: 2, dumbledore: 3 } },
      { text: 'The chance that it leads to an adventure.', scores: { harry: 3, ron: 2 } },
      { text: 'The strange symbols and what they might mean.', scores: { luna: 3, hagrid: 1 } },
      { text: 'The secret advantage the information could give me.', scores: { draco: 3, voldemort: 2, snape: 1 } },
    ],
  },
  {
    id: 'setback',
    prompt: 'A plan you worked hard on does not go as expected. What is your next move?',
    options: [
      { text: 'Review what went wrong and build a better plan.', scores: { hermione: 3, dumbledore: 2 } },
      { text: 'Try again, even if I have to start from the beginning.', scores: { neville: 3, harry: 2 } },
      { text: 'Ask a friend to help me see it differently.', scores: { ron: 3, hagrid: 2 } },
      { text: 'Keep my thoughts to myself and adapt quietly.', scores: { snape: 3, draco: 1 } },
    ],
  },
  {
    id: 'common-room',
    prompt: 'Which corner of the castle would you choose for a free afternoon?',
    options: [
      { text: 'A lively table full of friends and conversation.', scores: { ron: 3, hagrid: 2 } },
      { text: 'A quiet study space with books and notes.', scores: { hermione: 3, snape: 1 } },
      { text: 'A window seat with a view of the grounds and sky.', scores: { luna: 3, neville: 1 } },
      { text: 'A private room where I can work towards my ambitions.', scores: { draco: 3, voldemort: 2 } },
    ],
  },
  {
    id: 'lesson',
    prompt: 'Which lesson would you be most excited to attend?',
    options: [
      { text: 'Defence Against the Dark Arts: practical courage matters.', scores: { harry: 3, neville: 2 } },
      { text: 'Charms: small details can create wonderful results.', scores: { hermione: 2, dumbledore: 2 } },
      { text: 'Care of Magical Creatures: every creature deserves care.', scores: { hagrid: 3, luna: 2 } },
      { text: 'Potions: precision, patience and mastery.', scores: { snape: 3, draco: 1 } },
    ],
  },
  {
    id: 'legacy',
    prompt: 'What would you most like people to remember about you?',
    options: [
      { text: 'That I stood by people when it mattered.', scores: { harry: 3, ron: 2, hagrid: 1 } },
      { text: 'That I made knowledge and learning matter.', scores: { hermione: 3, dumbledore: 2 } },
      { text: 'That I stayed true to myself, even when I was different.', scores: { luna: 3, neville: 1 } },
      { text: 'That I achieved something remarkable through determination.', scores: { draco: 2, voldemort: 2, snape: 2 } },
    ],
  }
];