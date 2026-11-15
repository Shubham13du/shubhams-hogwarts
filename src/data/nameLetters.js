// =====================================================================
// THE MAGIC WITHIN MY NAME: all content for the seven letters.
//
// NOTE: the descriptions are DRAFT copy written from the facts you shared
// (engineering, design, writing, poetry, learning JavaScript/CAD/GitHub).
// Edit them so they sound like you.
//
// matchType:
//   'initial'   = the character's first name or surname really starts with the letter
//   'thematic'  = matched by spirit only (add a matchNote to explain)
// reveal: which animation plays when the letter is opened
//   (smoke, pages, sprout, spark, bolt, candle, pounce; see MagicName.css)
// accent: the colour used for this letter's glow
// =====================================================================

export const MAGIC_NAME = {
  title: 'The Magic Within My Name',
  intro:
    'Seven letters, seven characters, one personality. Tap each letter to reveal which part of me it carries.',
  prompt: 'Tap a letter to reveal its magic.',
  finaleTitle: 'All seven letters revealed',
  finale:
    'Depth, curiosity, quiet courage, adventure, loyalty, imagination and discipline. That is the magic within my name.',
  letters: [
    {
      id: 's',
      letter: 'S',
      character: 'Severus Snape',
      matchType: 'initial',
      matchNote: '',
      trait: 'Depth and Hidden Layers',
      traits: ['Intelligence', 'Complexity', 'Depth'],
      symbol: '🧪',
      description:
        'Beneath every first impression there is usually more going on. Like Snape, I am drawn to ideas and people with hidden layers, the kind that reveal themselves slowly, and I trust quiet intelligence more than loud confidence.',
      accent: '#3f9b7a',
      reveal: 'smoke',
    },
    {
      id: 'h1',
      letter: 'H',
      character: 'Hermione Granger',
      matchType: 'initial',
      matchNote: '',
      trait: 'Curiosity and Clear Thinking',
      traits: ['Curiosity', 'Learning', 'Creativity', 'Analysis'],
      symbol: '📖',
      description:
        'I enjoy asking why, then taking a problem apart until it makes sense. Like Hermione, I believe learning is its own kind of magic, and that creativity and analytical thinking work best together, which is a lot like engineering.',
      accent: '#d4a017',
      reveal: 'pages',
    },
    {
      id: 'u',
      letter: 'U',
      character: 'Neville Longbottom',
      matchType: 'thematic',
      matchNote: 'U is not in his name; he stands for this quality',
      trait: 'Quiet Courage',
      traits: ['Quiet courage', 'Growth', 'Determination'],
      symbol: '🌱',
      description:
        'Real growth is slow and patient: starting unsure, practising anyway and becoming braver than expected. Learning new tools such as JavaScript, CAD and GitHub feels exactly like that.',
      accent: '#5fae4a',
      reveal: 'sprout',
    },
    {
      id: 'b',
      letter: 'B',
      character: 'Bill Weasley',
      matchType: 'initial',
      matchNote: '',
      trait: 'Independence and Adventure',
      traits: ['Independence', 'Adventure', 'Bravery'],
      symbol: '🧭',
      description:
        'Bill chose his own path far from home, working among ancient tombs and curses. That willingness to explore the unknown, in engineering and design as much as in ideas, is what B stands for.',
      accent: '#e0702b',
      reveal: 'spark',
    },
    {
      id: 'h2',
      letter: 'H',
      character: 'Harry Potter',
      matchType: 'initial',
      matchNote: '',
      trait: 'Courage and Loyalty',
      traits: ['Courage', 'Loyalty', 'Resilience'],
      symbol: '⚡',
      description:
        'Courage does not mean being unafraid. Harry keeps going for the people he cares about and gets back up every time. Loyalty and resilience matter more to me than being the best.',
      accent: '#e5484d',
      reveal: 'bolt',
    },
    {
      id: 'a',
      letter: 'A',
      character: 'Albus Dumbledore',
      matchType: 'initial',
      matchNote: '',
      trait: 'Imagination and Wisdom',
      traits: ['Imagination', 'Wisdom', 'Curiosity'],
      symbol: '🕯️',
      description:
        'Dumbledore treats imagination as a serious tool and wisdom as something you keep growing into. Stories, poetry and design are how I explore ideas, and curiosity keeps me asking what else is possible.',
      accent: '#8b7bff',
      reveal: 'candle',
    },
    {
      id: 'm',
      letter: 'M',
      character: 'Minerva McGonagall',
      matchType: 'initial',
      matchNote: '',
      trait: 'Discipline and Creativity',
      traits: ['Discipline', 'Intelligence', 'Creativity'],
      symbol: '🐈',
      description:
        'McGonagall is strict, sharp and quietly full of imagination. Discipline is the structure that lets creativity do its best work, the same balance engineering asks for, and one I am still building.',
      accent: '#d6586b',
      reveal: 'pounce',
    },
  ],
};