import { ACHIEVEMENTS } from '../../data/content';
import MediaSlot from '../MediaSlot';

const percentOf = ({ obtained, total }) => Math.round((obtained / total) * 1000) / 10;

export default function AchievementsSection() {
  return (
    <div className="achievements">
      <h3 className="block-title reveal" style={{ '--i': 4 }}>Hall of Records</h3>
      <div className="records">
        {ACHIEVEMENTS.records.map((record, i) => {
          const pct = record.score ? percentOf(record.score) : null;
          const note = record.detail ?? record.hint;
          return (
            <article className="record reveal" style={{ '--i': 5 + i }} key={record.id}>
              <div className="record__badge">
                {pct !== null ? (
                  <div className="ring" style={{ '--pct': pct }}>
                    <span>{pct}%</span>
                  </div>
                ) : (
                  <span className="record__icon" aria-hidden="true">{record.icon}</span>
                )}
              </div>
              {record.value && <p className="record__value">{record.value}</p>}
              <h4 className="record__label">{record.label}</h4>
              {note && (
                <p className={`record__detail${record.detail ? '' : ' is-placeholder'}`}>{note}</p>
              )}
            </article>
          );
        })}
      </div>

      <h3 className="block-title reveal" style={{ '--i': 10 }}>Wall of Recognition</h3>
      <p className="block-note reveal" style={{ '--i': 11 }}>{ACHIEVEMENTS.recognitionNote}</p>
      <div className="wall">
        {ACHIEVEMENTS.recognition.map((item, i) => (
          <figure className="exhibit reveal" style={{ '--i': 12 + i }} key={item.id}>
            <div className="exhibit__frame">
              <MediaSlot
                src={item.image}
                alt={item.caption}
                label={item.type}
                hint="Add image path in content.js"
                ratio="4 / 3"
              />
            </div>
            <figcaption className="exhibit__caption">
              <span className="ribbon">{item.type}</span>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}