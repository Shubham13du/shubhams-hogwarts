const LETTERS = ['A', 'B', 'C', 'D'];

// One question with four radio-style options. Native radio inputs give
// keyboard support (arrow keys, Space) for free.
export default function QuizQuestion({ question, index, selected, onSelect, direction }) {
  const headingId = `quiz-prompt-${question.id}`;

  return (
    <div className={`quiz__question quiz__question--${direction}`}>
      <h4 id={headingId} className="quiz__prompt">{question.prompt}</h4>

      <div className="quiz__options" role="radiogroup" aria-labelledby={headingId}>
        {question.options.map((option, optionIndex) => (
          <label
            key={optionIndex}
            className={`quiz__option${selected === optionIndex ? ' is-selected' : ''}`}
          >
            <input
              type="radio"
              name={`quiz-question-${index}`}
              value={optionIndex}
              checked={selected === optionIndex}
              onChange={() => onSelect(optionIndex)}
            />
            <span className="quiz__option-mark" aria-hidden="true">{LETTERS[optionIndex]}</span>
            <span className="quiz__option-text">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}