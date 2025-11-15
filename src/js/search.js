const ITEMS_PER_PAGE = 10;
let currentSnippets = {};
let currentPage = 1;

function initSnippets(snippets) {
  const container = document.getElementById('snippetsContainer');
  const searchInput = document.getElementById('searchInput');
  currentSnippets = snippets;
  currentPage = 1;
  container.innerHTML = '';

  if (!snippets || Object.keys(snippets).length === 0) {
    container.innerHTML = `<p class="text-gray-500 italic">No HTML snippets found.</p>`;
    return;
  }

  renderSnippets();

  // Setup filter only for HTML snippets
  searchInput.addEventListener('input', handleSearch);
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const allEntries = Object.entries(snippitJson);

  const filtered = Object.fromEntries(
    allEntries.filter(([key, val]) =>
      key.toLowerCase().includes(query) ||
      val.prefix.toLowerCase().includes(query) ||
      (val.description && val.description.toLowerCase().includes(query))
    )
  );

  currentSnippets = filtered;
  currentPage = 1;
  renderSnippets();
}

function renderSnippets() {
  const container = document.getElementById('snippetsContainer');
  container.innerHTML = '';

  const entries = Object.entries(currentSnippets);
  const totalItems = entries.length;

  if (totalItems === 0) {
    container.innerHTML = `<p class="text-gray-500 italic">No HTML snippets found.</p>`;
    return;
  }

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pagedEntries = entries.slice(startIndex, endIndex);

  pagedEntries.forEach(([title, snippet]) => {
    const code = snippet.body.join('\n');
    const card = document.createElement('div');
    card.className = "bg-white shadow-md rounded-lg overflow-hidden border border-gray-200";
    card.dataset.title = title;

    let prefixHtml = '';
    let prefixButtonHtml = '';

    if (snippet.prefix) {
      prefixHtml = `<span class="text-sm font-normal text-gray-500"> (${snippet.prefix})</span>`;
      prefixButtonHtml = `
        <button class="copyPrefixBtn text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md">
          Copy Prefix
        </button>`;
    }

    card.innerHTML = `
      <div class="flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">${title}${prefixHtml}</h2>
          <p class="text-sm text-gray-500">${snippet.description || ''}</p>
        </div>
        <div class="flex space-x-2">
          ${prefixButtonHtml}
          <button class="copyBtn text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md">Copy</button>
        </div>
      </div>

      <pre class="bg-gray-900 text-green-300 p-4 text-sm overflow-x-auto">
        <code>${escapeHTML(code)}</code>
      </pre>
    `;

    renderSubTechGrid(snippet.prefix);
    container.appendChild(card);
  });

  // Pagination controls
  if (totalPages > 1) {
    const pagination = document.createElement('div');
    pagination.className = 'flex justify-center items-center mt-6 space-x-2';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.className = 'px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderSnippets();
      }
    });

    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pageInfo.className = 'text-gray-600 mx-4';

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderSnippets();
      }
    });

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextBtn);
    container.appendChild(pagination);
  }

  // Copy button logic
  document.querySelectorAll('.copyBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.closest('[data-title]').dataset.title;
      const snippetText = currentSnippets[title].body.join('\n');

      navigator.clipboard.writeText(snippetText).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.replace('bg-blue-600', 'bg-green-600');

        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.replace('bg-green-600', 'bg-blue-600');
        }, 1500);
      });
    });
  });

  // Copy prefix button logic
  document.querySelectorAll('.copyPrefixBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.closest('[data-title]').dataset.title;
      const prefix = currentSnippets[title].prefix;

      if (prefix) {
        navigator.clipboard.writeText(prefix).then(() => {
          btn.textContent = 'Copied!';
          btn.classList.replace('bg-green-600', 'bg-blue-600');

          setTimeout(() => {
            btn.textContent = 'Copy Prefix';
            btn.classList.replace('bg-blue-600', 'bg-green-600');
          }, 1500);
        });
      }
    });
  });
}

function renderSubTechGrid(prefix) {
  if (!prefix) return;

  const firstPart = prefix.split('-')[0].toLowerCase();
  const gridContainer = document.querySelector("#techGrid");
  if (!gridContainer) return;

  fetch("../data/tech-stack-subcat.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load tech-stack.json");
      return response.json();
    })
    .then(data => {

      const match = data.filter(item =>
        item.name.toLowerCase() == firstPart
      );

      if (match.length === 0) {
        gridContainer.innerHTML = ``;
        return;
      }

      gridContainer.innerHTML = match
        .map(item => {

          // Detect if current location contains "code-snippets"
          const baseUrl = location.href.includes("code-snippets")
            ? `${location.origin}/code-snippets`
            : location.origin;

          const iconUrl = `${baseUrl}${item.icon.replace(/^\.+/, '')}`;
          const itemUrl = `${baseUrl}${item.route.replace(/^\.+/, '')}`;

          return `
            <a href="${itemUrl}" class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
              <img src="${iconUrl}" alt="${item.name} Logo" class="h-14 w-14 mb-4">
              <h2 class="font-semibold text-sm text-gray-800">${item.name}</h2>
            </a>
          `;
        })
        .join("");
    })
    .catch(error => {
      console.error("❌ Error:", error);
      gridContainer.innerHTML = `
        <p class="text-red-500 italic text-center">Failed to load tech stack.</p>`;
    });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}