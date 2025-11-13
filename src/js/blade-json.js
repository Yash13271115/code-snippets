let bladeJson;

fetch('../../blade.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  })
  .then(data => {
    bladeJson = data;
    console.log('✅ blade.json loaded');
    checkIfAllLoaded();
  })
  .catch(error => {
    console.error('❌ Error loading blade.json:', error);
    showErrorPopup('Failed to load blade.json.');
  });


function checkIfAllLoaded() {
  if (htmlJson && bladeJson) {
    const allSnippets = { ...htmlJson, ...bladeJson };
    renderSnippets(allSnippets);

    // Setup filter
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = Object.entries(allSnippets).filter(([key, val]) =>
        key.toLowerCase().includes(query) ||
        val.prefix.toLowerCase().includes(query) ||
        (val.description && val.description.toLowerCase().includes(query))
      );
      renderSnippets(Object.fromEntries(filtered));
    });
  }
}

function renderSnippets(snippets) {
  const container = document.getElementById('snippetsContainer');
  container.innerHTML = '';

  if (!snippets || Object.keys(snippets).length === 0) {
    container.innerHTML = `<p class="text-gray-500 italic">No snippets found.</p>`;
    return;
  }

  Object.entries(snippets).forEach(([title, snippet]) => {
    const code = snippet.body.join('\n');

    const card = document.createElement('div');
    card.className = "bg-white shadow-md rounded-lg overflow-hidden border border-gray-200";

    card.innerHTML = `
      <div class="flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">${title}</h2>
          <p class="text-sm text-gray-500">${snippet.description || ''}</p>
        </div>
        <button class="copyBtn text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md">Copy</button>
      </div>
      <pre class="bg-gray-900 text-green-300 p-4 text-sm overflow-x-auto"><code>${escapeHTML(code)}</code></pre>
    `;

    container.appendChild(card);
  });

  // Copy button logic
  document.querySelectorAll('.copyBtn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const snippetText = Object.values(snippets)[i].body.join('\n');
      navigator.clipboard.writeText(snippetText);
      btn.textContent = 'Copied!';
      btn.classList.replace('bg-blue-600', 'bg-green-600');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.replace('bg-green-600', 'bg-blue-600');
      }, 1500);
    });
  });
}

// Escape HTML characters for safe display
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}