import { useState } from 'react';
import useCommonsImage from '../../hooks/useCommonsImage';

// Shows a Commons photo (with credit) when one is configured and loads,
// otherwise a themed emblem in the character's house colours.
// Use key={character.id} on this component so its state resets per character.
export default function CharacterPortrait({ character, house }) {
  const { status, image } = useCommonsImage(character.commonsFile);
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = status === 'ready' && Boolean(image) && !imageFailed;

  return (
    <figure className="portrait-card" style={{ '--c1': house.colors[0], '--c2': house.colors[1] }}>
      <div className="portrait-card__frame">
        {showPhoto ? (
          <img
            className="portrait-card__img"
            src={image.src}
            alt={character.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className={`emblem${status === 'loading' ? ' is-loading' : ''}`}
            role="img"
            aria-label={`${character.name} emblem`}
          >
            <span className="emblem__symbol" aria-hidden="true">{character.symbol}</span>
          </div>
        )}
      </div>

      {showPhoto && (
        <figcaption className="portrait-card__credit">
          Image: {image.author} ·{' '}
          {image.licenseUrl ? (
            <a href={image.licenseUrl} target="_blank" rel="noreferrer noopener">{image.license}</a>
          ) : (
            image.license
          )}{' '}
          ·{' '}
          <a href={image.pageUrl} target="_blank" rel="noreferrer noopener">Wikimedia Commons</a>
        </figcaption>
      )}
    </figure>
  );
}