// One clickable letter tile in the row S H U B H A M.
export default function LetterTile({
  item,
  index,
  total,
  selected,
  discovered,
  onSelect,
  buttonRef,
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`magic-tile${selected ? ' is-selected' : ''}${discovered ? ' is-discovered' : ''}`}
      style={{ '--a': item.accent }}
      aria-pressed={selected}
      aria-label={`Letter ${index + 1} of ${total}: ${item.letter}${
        discovered ? `, ${item.character}` : ''
      }`}
      onClick={onSelect}
    >
      <span className="magic-tile__letter" aria-hidden="true">{item.letter}</span>
      <span className="magic-tile__symbol" aria-hidden="true">
        {discovered ? item.symbol : '✦'}
      </span>
    </button>
  );
}