import { useRef, useState } from 'react';
import { CHARACTERS, HOUSES, QUESTIONS, TIE_BREAK_ORDER } from '../../data/quizData';
import { calculateResult, validateQuizData } from '../../utils/quizScoring';
import { prefersReducedMotion } from '../../utils/motion';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import './CharacterQuiz.css';

// While developing, warn in the console if the quiz data has a mistake.
if (import.meta.env.DEV) {
  const problems = validateQuizData(QUESTIONS, CHARACTERS, HOUSES, TIE_BREAK_ORDER);
  if (problems.length > 0) {
    console.warn(`[Know Your Character] Quiz data problems:\n${problems.join('\n')}`);
  }
}

const TOTAL = QUESTIONS.length;
const emptyAnswers = () => Array(TOTAL).fill(null);

export default function CharacterQuiz() {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [result, setResult] = useState(null);
  const rootRef = useRef(null);

  const question = QUESTIONS[index];
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const isLast = index === TOTAL - 1;
  const canAdvance = answers[index] !== null;

  const selectOption = (optionIndex) => {
    setAnswers((previous) => previous.map((value, i) => (i === index ? optionIndex : value)));
  };

  const goPrevious = () => {
    if (index === 0) return;
    setDirection('backward');
    setIndex((value) => value - 1);
  };

  const goNext = () => {
    if (!canAdvance) return;

    if (!isLast) {
      setDirection('forward');
      setIndex((value) => value + 1);
      return;
    }

    // The result appears only after every question has an answer.
    if (answers.every((answer) => answer !== null)) {
      setResult(calculateResult(answers, QUESTIONS, CHARACTERS, TIE_BREAK_ORDER));
    }
  };

  const retake = () => {
    setAnswers(emptyAnswers());
    setIndex(0);
    setDirection('forward');
    setResult(null);
    rootRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="quiz" ref={rootRef}>
      {result ? (
        <QuizResult result={result} onRetake={retake} />
      ) : (
        <>
          <div className="quiz__top">
            <p className="quiz__count" aria-live="polite">
              Question {index + 1} of {TOTAL}
            </p>
            <ol className="quiz__dots" aria-hidden="true">
              {QUESTIONS.map((item, i) => (
                <li
                  key={item.id}
                  className={`quiz__dot${answers[i] !== null ? ' is-done' : ''}${
                    i === index ? ' is-current' : ''
                  }`}
                />
              ))}
            </ol>
          </div>

          <div
            className="quiz__bar"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={answeredCount}
          >
            <div
              className="quiz__bar-fill"
              style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
            />
          </div>

          <div className="quiz__card">
            <QuizQuestion
              key={question.id}
              question={question}
              index={index}
              selected={answers[index]}
              onSelect={selectOption}
              direction={direction}
            />

            <div className="quiz__nav">
              <button type="button" className="btn-gold" onClick={goPrevious} disabled={index === 0}>
                ← Previous
              </button>
              <button type="button" className="btn-gold" onClick={goNext} disabled={!canAdvance}>
                {isLast ? 'Reveal my character' : 'Next →'}
              </button>
            </div>

            {!canAdvance && <p className="quiz__hint">Choose an answer to continue.</p>}
          </div>
        </>
      )}
    </div>
  );
}