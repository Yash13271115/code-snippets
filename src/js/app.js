function showErrorPopup(message) {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorPopup').classList.remove('hidden');
}

document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('errorPopup').classList.add('hidden');
});

const scrollUpBtn = document.getElementById('scrollUpBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.remove('hidden');
  } else {
    scrollUpBtn.classList.add('hidden');
  }
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const baseUrl = location.href.includes("code-snippets")
  ? `${location.origin}/code-snippets`
  : location.origin;

document.getElementById("favicon").href = `${baseUrl}/src/media/favicon.png`;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
