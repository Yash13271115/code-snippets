let pythonJson;

fetch('../../../python.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  })
  .then(data => {
    pythonJson = data;
    initSnippets(pythonJson);
  })
  .catch(error => {
    console.error('❌ Error loading python.json:', error);
    showErrorPopup('Failed to load python.json.');
  });