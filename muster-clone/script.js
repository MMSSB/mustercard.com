document.addEventListener('DOMContentLoaded', function() {
    // Load saved profile data
    loadProfileData();
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
        darkModeToggle.checked = true;
    }
    
    // Profile image upload
    const profileImage = document.getElementById('profile-image');
    const profilePreview = document.getElementById('profile-preview');
    
    profileImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePreview.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Save profile
    const saveBtn = document.getElementById('save-profile');
    saveBtn.addEventListener('click', saveProfile);
});

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('name').value = profileData.name || '';
        document.getElementById('id').value = profileData.id || '';
        document.getElementById('faculty').value = profileData.faculty || '';
        document.getElementById('major').value = profileData.major || '';
        
        const profilePreview = document.getElementById('profile-preview');
        if (profileData.image) {
            profilePreview.src = profileData.image;
        }
    }
}

function saveProfile() {
    const profileData = {
        name: document.getElementById('name').value,
        id: document.getElementById('id').value,
        faculty: document.getElementById('faculty').value,
        major: document.getElementById('major').value,
        image: document.getElementById('profile-preview').src
    };
    
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile saved successfully!');
}


