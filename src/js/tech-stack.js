document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector("#techGrid");

    fetch("./src/data/tech-stack.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load tech-stack.json");
            return response.json();
        })
        .then(data => {
            gridContainer.innerHTML = data.map(item => `
              <a href="${item.route}" class="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
                <img src="${item.icon}" alt="${item.name} Logo" class="h-16 w-16 mb-4">
                <h2 class="font-semibold text-gray-800">${item.name}</h2>
              </a>
            `).join("");
        })
        .catch(error => console.error("❌ Error:", error));
});