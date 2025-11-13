function showErrorPopup(message) {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorPopup').classList.remove('hidden');
}

document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('errorPopup').classList.add('hidden');
});