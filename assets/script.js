const checkbox = document.getElementById('checkboxInput');
const body = document.body;

// Check if dark mode is enabled in local storage
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
  checkbox.checked = true;
} else {
  body.classList.remove('dark-mode');
  checkbox.checked = false;
}

// Toggle dark mode on checkbox click
checkbox.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});