let snippitJson;

fetch('./../../../python.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  })
  .then(data => {
    snippitJson = data;
    initSnippets(snippitJson);
  })
  .catch(error => {
    console.error('❌ Error loading python.json:', error);
    showErrorPopup('Failed to load python.json.');
  });