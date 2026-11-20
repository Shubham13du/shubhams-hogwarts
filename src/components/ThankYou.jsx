
import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';
import { escapeHTML, readVisitorJourney } from '../utils/visitorJourney';
import './ThankYou.css';

export default function ThankYou() {
  const [ref, visible] = useReveal({ threshold: 0.3 });
  const [visitor, setVisitor] = useState(() => readVisitorJourney());
  const [recipient, setRecipient] = useState('');
  const [owlStage, setOwlStage] = useState('idle');

  useEffect(() => {
    const refresh = (event) => {
      setVisitor(event.detail || readVisitorJourney());
    };

    window.addEventListener('hogwarts:journey-updated', refresh);

    return () => {
      window.removeEventListener('hogwarts:journey-updated', refresh);
    };
  }, []);

  useEffect(() => {
    const handlePrintClosed = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.data?.type !== 'HOGWARTS_LETTER_PRINT_CLOSED'
      ) return;

      setOwlStage('departing');
    };

    window.addEventListener('message', handlePrintClosed);

    return () => {
      window.removeEventListener('message', handlePrintClosed);
    };
  }, []);

  const startOwlPost = () => {
    if (!recipient.trim()) {
      document.getElementById('thankyou-recipient')?.focus();
      return;
    }

    setOwlStage('arriving');
  };

  const handleOwlAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    if (owlStage === 'arriving') {
      setOwlStage('letter');
    }

    if (owlStage === 'departing') {
      setOwlStage('done');
    }
  };

  const nameCharacters = visitor.nameCharacters || [];
  const hasNameJourney = Boolean(visitor.nameExplored);
  const hasQuizJourney = Boolean(visitor.quizCharacter);

  const journeyLines = [
    hasNameJourney
      ? `You explored the magic hidden within your name, ${visitor.nameExplored}, and discovered ${nameCharacters.join(', ')}.`
      : '',
    hasQuizJourney
      ? `You also discovered your wizarding-world counterpart: ${visitor.quizCharacter}${visitor.quizHouse ? ` of ${visitor.quizHouse} House` : ''}.`
      : '',
  ].filter(Boolean);

  const downloadLetter = () => {
    const safeRecipient = escapeHTML(recipient.trim() || 'Fellow traveller');

    const journeyHTML = journeyLines.length
      ? `<section class="journey"><h2>Your Hogwarts Journey</h2>${journeyLines.map((line) => `<p>${escapeHTML(line)}</p>`).join('')}</section>`
      : '<section class="journey"><p>Whether you explored every corner or simply wandered through, thank you for being part of this little world.</p></section>';

    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      window.alert('Please allow pop-ups for this site, then try downloading your letter again.');
      return;
    }

    setOwlStage('printing');

    printWindow.document.write(`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>A Thank You Letter from Shubham</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 18px; background: #24180e; color: #3a2817; font-family: Georgia, 'Times New Roman', serif; }
  .paper { position: relative; max-width: 760px; min-height: 980px; margin: 0 auto; padding: 52px 58px; border: 8px double #9b762e; outline: 1px solid #d5b66a; background: radial-gradient(ellipse at center, #fff7df 0%, #f0dfb7 75%, #d7bd86 100%); box-shadow: 0 12px 42px #0008; }
  .crest { text-align: center; color: #7a5a20; font-size: 15px; letter-spacing: .3em; text-transform: uppercase; }
  .crest-mark { display: block; margin: 8px auto; font-size: 34px; color: #8a6828; }
  h1 { margin: 12px 0 6px; text-align: center; font-size: 34px; font-weight: normal; letter-spacing: .04em; color: #4b3219; }
  .rule { width: 55%; margin: 18px auto 32px; border: 0; border-top: 1px solid #9b762e; }
  .date { text-align: right; font-size: 13px; color: #70532e; }
  .salutation { margin-top: 36px; font-size: 20px; font-style: italic; }
  p { font-size: 17px; line-height: 1.8; }
  .journey { margin: 28px 0; padding: 18px 22px; border-left: 3px solid #9b762e; background: #8a682810; }
  .journey h2 { margin: 0 0 10px; font-size: 19px; font-weight: normal; color: #73521f; }
  .journey p { margin: 8px 0; font-size: 15px; }
  .signoff { margin-top: 38px; }
  .signature { margin-top: 6px; font-size: 28px; font-style: italic; color: #63441f; }
  .seal { position: absolute; right: 48px; bottom: 42px; display: grid; width: 74px; height: 74px; place-items: center; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #a84335, #641b20 75%); color: #f7df9a; border: 3px ridge #c79b47; box-shadow: 0 3px 8px #4b241e55; font-size: 28px; }
  @media print { body { padding: 0; background: white; } .paper { min-height: 0; max-width: none; margin: 0; box-shadow: none; break-inside: avoid; } }
</style>
</head>
<body>
<main class="paper">
  <div class="crest">A little magic from Shubham<span class="crest-mark">✦ ⚯ ✦</span></div>
  <h1>A Thank You Letter</h1>
  <hr class="rule" />
  <div class="date">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
  <p class="salutation">Dear ${safeRecipient},</p>
  <p>Thank you for taking the time to visit my little corner of the wizarding world. I built this place with imagination, curiosity, and countless little details, and it means a lot that you chose to explore it.</p>
  ${journeyHTML}
  <p>I hope something here made you pause, smile, or discover a little piece of magic of your own. Every visit becomes part of this story, and yours is now a page in it.</p>
  <p>Until our paths cross again, keep your curiosity alive and never stop finding wonder in ordinary things.</p>
  <div class="signoff"><p>With magical wishes,</p><div class="signature">Shubham</div></div>
  <div class="seal">✦</div>
</main>
<script>
  window.addEventListener('afterprint', () => {
    window.opener?.postMessage(
      { type: 'HOGWARTS_LETTER_PRINT_CLOSED' },
      window.location.origin
    );

    window.close();
  });

  window.addEventListener('load', () => {
    window.focus();
    window.print();
  });
</script>
</body>
</html>`);

    printWindow.document.close();
  };

  return (
    <section
      className={`thankyou${visible ? ' is-visible' : ''}`}
      ref={ref}
      aria-label="Thank you"
    >
      <div className="thankyou__particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            style={{
              '--i': i,
              '--left': `${(i * 17 + 5) % 100}%`,
              '--top': `${(i * 29 + 8) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="thankyou__content">

        {['arriving', 'letter', 'printing', 'departing'].includes(owlStage) && (
          <div className={`owl-post owl-post--${owlStage}`} aria-hidden="true">
            <span
              className="owl-post__owl"
              onAnimationEnd={handleOwlAnimationEnd}
            >
              🦉
            </span>
            <span className="owl-post__envelope">✉</span>
          </div>
        )}

        <p className="thankyou__eyebrow">Every story deserves a final page</p>
        <h2 className="thankyou__title">Thank You</h2>

        <div className="thankyou__divider" aria-hidden="true">
          <span /><i>✦</i><span />
        </div>

        <p className="thankyou__message">
          Thank you for taking a little time to explore my world.
          Until our paths cross again...
        </p>

        <div className="thankyou__letter">

          {owlStage === 'idle' ? (
            <>
              <p className="thankyou__letter-kicker">
                A keepsake from this little world
              </p>

              <h3>A Thank You Letter from Shubham</h3>

              <p className="thankyou__letter-copy">
                A personalized parchment letter, with the magical discoveries you made along the way.
              </p>

              <label htmlFor="thankyou-recipient">Your name</label>

              <input
                id="thankyou-recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value.slice(0, 40))}
                placeholder="Enter your name..."
                maxLength={40}
              />

              {(hasNameJourney || hasQuizJourney) && (
                <p className="thankyou__activity">
                  ✦ Your letter will include {[
                    hasNameJourney && 'your name discoveries',
                    hasQuizJourney && 'your character quiz result',
                  ].filter(Boolean).join(' and ')}.
                </p>
              )}

              <button
                type="button"
                className="btn-gold"
                onClick={startOwlPost}
              >
                Send my letter by owl 🦉
              </button>
            </>
          ) : (
            <div className="owl-letter-preview">
              <p className="owl-letter-preview__crest">✦ HOGWARTS POST ✦</p>

              <h3>Your letter has arrived!</h3>

              <p>Dear {recipient.trim()},</p>

              <p>
                A little magical thank-you letter has travelled all this way just for you.
              </p>

              {owlStage === 'letter' && (
                <button
                  type="button"
                  className="btn-gold"
                  onClick={downloadLetter}
                >
                  Download my letter as PDF
                </button>
              )}

              {owlStage === 'printing' && (
                <p>Your letter is waiting in the print window...</p>
              )}

              {owlStage === 'departing' && (
                <p>Your owl is preparing for its journey back...</p>
              )}

              {owlStage === 'done' && (
                <p>Letter delivered. Until our paths cross again! ✦</p>
              )}
            </div>
          )}

          {owlStage === 'idle' && (
            <p className="thankyou__print-note">
              Your browser will open the print window. Choose “Save as PDF”.
            </p>
          )}
        </div>

        <h3 className="thankyou__final">Mischief Managed.</h3>
        <div className="thankyou__wand" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
