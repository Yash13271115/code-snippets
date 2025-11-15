const ITEMS_PER_PAGE = 10;
let currentSnippets = {};
let allSnippets = {};
let currentPage = 1;
let subFilter = null;
let currentPageTitle = '';

function initSnippets(snippets, pageTitle = 'Snippets') {
  const container = document.getElementById('snippetsContainer');
  const searchInput = document.getElementById('searchInput');
  currentSnippets = snippets;
  allSnippets = snippets;
  currentPage = 1;
  container.innerHTML = '';

  // ---- APPLY URL SUBFILTER HERE ----
  const urlParams = new URLSearchParams(window.location.search);
  subFilter = urlParams.get("sub");

  if (subFilter) {
    const filterValue = subFilter.toLowerCase();

    const filtered = Object.fromEntries(
      Object.entries(currentSnippets).filter(([key, val]) =>
        val.prefix && val.prefix.toLowerCase().includes(filterValue)
      )
    );

    const allfiltered = Object.fromEntries(
      Object.entries(allSnippets).filter(([key, val]) =>
        val.prefix && val.prefix.toLowerCase().includes(filterValue)
      )
    );

    currentSnippets = filtered;
    allSnippets = allfiltered;
  }
  // ----------------------------------

  if (!currentSnippets || Object.keys(currentSnippets).length === 0) {
    container.innerHTML = `<p class="text-gray-500 italic">No HTML snippets found.</p>`;
    return;
  }

  currentPageTitle = pageTitle;

  renderSubTechGrid();
  renderSnippets();
  renderTitle();

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

function renderTitle() {
  const snippetsTitle = document.getElementById('snippetsTitle');

  // If subFilter exists and is not empty → show it
  if (subFilter && subFilter.trim() !== "") {
    snippetsTitle.innerHTML = `${currentPageTitle} (${subFilter})`;
  } else {
    snippetsTitle.innerHTML = `${currentPageTitle}`;
  }
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

      <pre class="bg-gray-900 text-green-300 p-4 text-sm overflow-x-auto"><code>${escapeHTML(code)}</code></pre>
    `;

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

async function renderSubTechGrid() {
  const gridContainer = document.querySelector("#techGrid");
  if (!gridContainer) return;

  const allEntries = Object.entries(allSnippets);
  if (allEntries.length === 0) return;

  // If subFilter already applied, do not show sub-tech grid
  if (subFilter) {
    gridContainer.innerHTML = "";
    return;
  }

  // -----------------------------------------
  // 1. COLLECT UNIQUE FIRST PARTS
  // -----------------------------------------
  const uniqueParts = new Set();

  allEntries.forEach(([title, snippet]) => {
    if (snippet.prefix && snippet.prefix.toLowerCase().includes("-")) {
      const prefixPart = snippet.prefix.toLowerCase().split("-")[0];
      uniqueParts.add(prefixPart);
    }
  });

  // -----------------------------------------
  // 2. LOAD JSON ONLY ONCE
  // -----------------------------------------
  let data = [];
  try {
    const response = await fetch("../data/tech-stack-icons.json");
    if (!response.ok) throw new Error("Failed to load JSON");
    data = await response.json();
  } catch (error) {
    console.error("❌ JSON Load Error:", error);
    gridContainer.innerHTML =
      `<p class="text-red-500 text-center">Failed to load tech stack.</p>`;
    return;
  }

  // -----------------------------------------
  // 3. MATCH UNIQUE PARTS WITH DATA
  // -----------------------------------------
  const matchedItems = data.filter(item =>
    uniqueParts.has(item.name.toLowerCase())
  );

  if (matchedItems.length === 0) {
    gridContainer.innerHTML = "";
    return;
  }

  // -----------------------------------------
  // 4. BUILD GRID HTML
  // -----------------------------------------
  const baseUrl = location.href.includes("code-snippets")
    ? `${location.origin}/code-snippets`
    : location.origin;

  gridContainer.innerHTML = matchedItems
    .map(item => {
      const iconUrl = `${baseUrl}${item.icon.replace(/^\.+/, "")}`;
      const itemUrl = window.location +"?" + `sub=${item.name.toLowerCase()}`;

      return `
      <a href="${itemUrl}" 
         class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
        <img src="${iconUrl}" alt="${item.name} Logo" class="h-14 w-14 mb-4">
        <h2 class="font-semibold text-sm text-gray-800">${item.name}</h2>
      </a>`;
    })
    .join("");
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}