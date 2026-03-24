const CSV_PATH = './insurer_jobs_available.csv';

const searchInput = document.getElementById('searchInput');
const companyFilter = document.getElementById('companyFilter');
const countryFilter = document.getElementById('countryFilter');
const statusFilter = document.getElementById('statusFilter');
const cardsEl = document.getElementById('cards');
const statsEl = document.getElementById('stats');
const countPill = document.getElementById('countPill');

let rows = [];

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQuotes = false;
    for (let i=0;i<line.length;i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { vals.push(cur); cur=''; }
      else cur += ch;
    }
    vals.push(cur);
    const obj = {};
    headers.forEach((h, i) => obj[h] = (vals[i] || '').trim());
    return obj;
  });
}

function renderStats(data) {
  const open = data.filter(r => (r.Status || '').toLowerCase().includes('open')).length;
  const verify = data.filter(r => (r.Status || '').toLowerCase().includes('verify')).length;
  const companies = new Set(data.map(r => r.Company)).size;
  statsEl.innerHTML = `
    <article class="stat"><div class="k">${data.length}</div><div class="l">Roles shown</div></article>
    <article class="stat"><div class="k">${open}</div><div class="l">Open status</div></article>
    <article class="stat"><div class="k">${companies}</div><div class="l">Companies</div></article>
  `;
}

function renderCards(data) {
  if (!data.length) {
    cardsEl.innerHTML = '<div class="empty">No roles match your filters.</div>';
    countPill.textContent = '0 roles';
    renderStats([]);
    return;
  }
  cardsEl.innerHTML = data.map(r => `
    <article class="card">
      <div class="company">${r.Company || 'Unknown company'}</div>
      <h3 class="title">${r.JobTitle || 'Role'}</h3>
      <p class="desc">${r.JobDescription || ''}</p>
      <div class="meta">
        <span class="tag">${r.Status || 'Unknown status'}</span>
        <span class="tag">Country: ${r.Country || '-'}</span>
        <span class="tag">Checked: ${r.DateChecked || '-'}</span>
        <span class="tag">Salary: ${r['ExpectedSalary(ZAR)'] || 'Not listed'}</span>
      </div>
      <div class="actions"><a href="${r.JobLink || '#'}" target="_blank" rel="noopener">Open role link</a></div>
    </article>
  `).join('');
  countPill.textContent = `${data.length} roles`;
  renderStats(data);
}

function applyFilters() {
  const q = searchInput.value.toLowerCase().trim();
  const c = companyFilter.value;
  const country = countryFilter.value;
  const s = statusFilter.value.toLowerCase();
  const filtered = rows.filter(r => {
    const blob = `${r.Company} ${r.JobTitle} ${r.JobDescription} ${r.Country || ''}`.toLowerCase();
    const okQ = !q || blob.includes(q);
    const okC = !c || r.Company === c;
    const okCountry = !country || (r.Country || '') === country;
    const okS = !s || (r.Status || '').toLowerCase().includes(s);
    return okQ && okC && okCountry && okS;
  });
  renderCards(filtered);
}

async function init() {
  const res = await fetch(CSV_PATH, { cache: 'no-store' });
  const text = await res.text();
  rows = parseCSV(text);
  [...new Set(rows.map(r => r.Company).filter(Boolean))].sort().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c; companyFilter.appendChild(opt);
  });
  [...new Set(rows.map(r => r.Country).filter(Boolean))].sort().forEach(cn => {
    const opt = document.createElement('option');
    opt.value = cn; opt.textContent = cn; countryFilter.appendChild(opt);
  });
  searchInput.addEventListener('input', applyFilters);
  companyFilter.addEventListener('change', applyFilters);
  countryFilter.addEventListener('change', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
  applyFilters();
}

init().catch(err => {
  console.error(err);
  cardsEl.innerHTML = '<div class="empty">Failed to load CSV data.</div>';
  countPill.textContent = 'Error';
});
