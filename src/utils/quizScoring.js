// Pure scoring helpers for the Know Your Character quiz (no React in here).

// An option worth this many points (or more) counts as a "strong match".
export const STRONG_MATCH_POINTS = 3;

/**
 * answers: array with one chosen option index per question (e.g. [0, 3, 1, 2, 0, 1]).
 * Returns { winner, runnersUp, ranking }.
 *
 * Ranking order: total score, then number of strong matches,
 * then the position in tieBreakOrder. The result is always the same for the same answers.
 */
export function calculateResult(answers, questions, characters, tieBreakOrder = []) {
  const stats = Object.fromEntries(
    characters.map((character) => [character.id, { id: character.id, score: 0, strong: 0 }]),
  );

  answers.forEach((answerIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[answerIndex];
    if (!option) return;

    Object.entries(option.scores).forEach(([id, points]) => {
      if (!stats[id]) return;
      stats[id].score += points;
      if (points >= STRONG_MATCH_POINTS) stats[id].strong += 1;
    });
  });

  const tieRank = (id) => {
    const position = tieBreakOrder.indexOf(id);
    return position === -1 ? tieBreakOrder.length : position;
  };

  const ranking = Object.values(stats).sort(
    (a, b) => b.score - a.score || b.strong - a.strong || tieRank(a.id) - tieRank(b.id),
  );

  const byId = Object.fromEntries(characters.map((character) => [character.id, character]));

  return {
    winner: byId[ranking[0].id],
    runnersUp: ranking.slice(1, 3).map((entry) => byId[entry.id]),
    ranking,
  };
}

// Returns a list of human-readable problems (empty list = data looks good).
export function validateQuizData(questions, characters, houses, tieBreakOrder = []) {
  const problems = [];
  const ids = new Set(characters.map((character) => character.id));

  if (questions.length < 6) problems.push(`Expected at least 6 questions in the question pool, found ${questions.length}.`);

  questions.forEach((question, q) => {
    if (question.options.length !== 4) {
      problems.push(`Question ${q + 1} should have 4 options, found ${question.options.length}.`);
    }
    question.options.forEach((option, o) => {
      Object.keys(option.scores).forEach((id) => {
        if (!ids.has(id)) problems.push(`Question ${q + 1}, option ${o + 1}: unknown character "${id}".`);
      });
    });
  });

  characters.forEach((character) => {
    if (!houses[character.house]) problems.push(`${character.name}: unknown house "${character.house}".`);
    if (!tieBreakOrder.includes(character.id)) {
      problems.push(`${character.name} is missing from TIE_BREAK_ORDER.`);
    }
  });

  return problems;
}