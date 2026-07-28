/*
 * Blocco: Hero
 * Struttura attesa nel documento (tabella "Hero"):
 *
 *   | Hero                                                        |
 *   | Costruttore automobilistico — dal 2013                      |   <- eyebrow
 *   | Ingegnerizzata per la notte.                                |   <- titolo (H1)
 *   | La maggior parte delle case... [testo libero]               |   <- paragrafo
 *   | Scopri i modelli (link) · Come funziona la tecnologia (link)|   <- riga con i CTA
 *   | 612 CV        | Potenza di picco — EV-1                     |   <- righe extra facoltative: stat
 *   | 2.9 s         | 0–100 km/h — SC                              |
 *
 * Convenzione bottoni: nel documento, un link isolato nel proprio
 * paragrafo e formattato in GRASSETTO diventa bottone primario;
 * in CORSIVO diventa bottone secondario (standard aem-boilerplate).
 * Qui applichiamo comunque la classe corretta per sicurezza.
 */

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const [eyebrowRow, headingRow, paraRow, ctaRow, ...statRows] = rows;

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-grid';

  const textCol = document.createElement('div');
  textCol.className = 'hero-text';

  if (eyebrowRow) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = eyebrowRow.textContent.trim();
    textCol.append(eyebrow);
  }

  if (headingRow) {
    const heading = document.createElement('h1');
    heading.innerHTML = headingRow.innerHTML;
    textCol.append(heading);
  }

  if (paraRow) {
    const lede = document.createElement('p');
    lede.className = 'hero-lede';
    lede.innerHTML = paraRow.innerHTML;
    textCol.append(lede);
  }

  if (ctaRow) {
    const btnRow = document.createElement('div');
    btnRow.className = 'btn-row';
    const links = ctaRow.querySelectorAll('a');
    links.forEach((a, i) => {
      a.className = i === 0 ? 'button' : 'button secondary';
      btnRow.append(a);
    });
    if (links.length) textCol.append(btnRow);
  }

  if (statRows.length) {
    const statsWrap = document.createElement('div');
    statsWrap.className = 'hero-stats';
    statRows.forEach((row) => {
      const value = row.children[0]?.textContent.trim();
      const label = row.children[1]?.textContent.trim();
      if (!value) return;
      const stat = document.createElement('div');
      stat.className = 'hero-stat';
      stat.innerHTML = `<b>${value}</b><span>${label || ''}</span>`;
      statsWrap.append(stat);
    });
    textCol.append(statsWrap);
  }

  wrapper.append(textCol);
  block.textContent = '';
  block.append(wrapper);
}
