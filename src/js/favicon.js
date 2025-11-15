const baseUrl = location.href.includes("code-snippets")
    ? `${location.origin}/code-snippets`
    : location.origin;

document.getElementById("favicon").href = `${baseUrl}/src/media/favicon.png`;
