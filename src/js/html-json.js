let htmlJson;

fetch('./src/js/html.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  })
  .then(data => {
    htmlJson = data;
    console.log('✅ html.json loaded');
    checkIfAllLoaded();
  })
  .catch(error => {
    console.error('❌ Error loading html.json:', error);
    showErrorPopup('Failed to load html.json.');
  });