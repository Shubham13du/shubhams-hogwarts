import { CONTACT, PROFILE } from '../../data/content';
import { OwlIcon } from '../DestinationPanel';

function PostCard({ method }) {
  const hasValue = Boolean(method.value);
  const isLink = hasValue && Boolean(method.href);
  const external = isLink && !method.href.startsWith('mailto:');

  const inner = (
    <>
      <span className="post__icon" aria-hidden="true">{method.icon}</span>
      <span className="post__text">
        <span className="post__label">{method.label}</span>
        <span className="post__value">{hasValue ? method.value : method.placeholder}</span>
        {!hasValue && <span className="post__hint">Placeholder: set value and href in content.js</span>}
      </span>
    </>
  );

  if (isLink) {
    return (
      <a
        className="post"
        href={method.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {inner}
      </a>
    );
  }

  return <div className={`post${hasValue ? '' : ' is-placeholder'}`}>{inner}</div>;
}

export default function ContactSection() {
  return (
    <div className="contact">
      <div className="letter reveal" style={{ '--i': 4 }}>
        <span className="letter__seal" aria-hidden="true">✦</span>
        <OwlIcon className="letter__owl" />
        <p className="letter__greeting">Dear visitor,</p>
        <p className="letter__intro">{CONTACT.intro}</p>
        <p className="letter__sign">— {PROFILE.name}</p>
      </div>

      <ul className="post-list">
        {CONTACT.methods.map((method, i) => (
          <li className="reveal" style={{ '--i': 5 + i }} key={method.id}>
            <PostCard method={method} />
          </li>
        ))}
      </ul>
    </div>
  );
}