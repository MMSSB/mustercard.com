document.addEventListener('DOMContentLoaded', function() {
    // 4. Modal Logic
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    // Ensure elements exist before adding listeners
    if (btn && modal && span) {
        // Open modal
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // Close modal when clicking (X)
        span.onclick = function() {
            modal.style.display = "none";
        }

        // Close modal when clicking anywhere outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    // 1. Dark Mode Logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeText = document.getElementById('dark-mode-text');
    
    if (localStorage.getItem('mustDarkMode') === 'enabled') {
        document.body.classList.add('dark');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
            if(darkModeText) darkModeText.textContent = "Dark theme enabled";
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark');
                localStorage.setItem('mustDarkMode', 'enabled');
                if(darkModeText) darkModeText.textContent = "Dark theme enabled";
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('mustDarkMode', 'disabled');
                if(darkModeText) darkModeText.textContent = "Light theme enabled";
            }
        });
    }

    // 2. Greeting Logic
    const greetingEl = document.getElementById('greeting-time');
    if (greetingEl) {
        const hour = new Date().getHours();
        if (hour < 12) greetingEl.innerHTML = 'Good Morning';
        else if (hour < 18) greetingEl.innerHTML = 'Good Afternoon';
        else greetingEl.innerHTML = 'Good Evening';
    }

    // 3. Profile Maker Logic
    const defaultProfile = {
        name: "", 
        fullName: "",
        id: "00000",
        cgpa: "",
        semester: "Spring-2026",
        credits: "0/165",
        rank: "",
        image: "picture.png"
    };

    let savedProfile = JSON.parse(localStorage.getItem('mustProfileData')) || defaultProfile;

    // Apply to UI
    applyProfileDataToDOM(savedProfile);

    // Settings Page Actions
    const formImageInput = document.getElementById('form-image');
    const formPreviewImg = document.getElementById('form-preview-img');
    const saveBtn = document.getElementById('save-profile');

    if (saveBtn) {
        // Pre-fill inputs
        document.getElementById('form-name').value = savedProfile.fullName;
        document.getElementById('form-id').value = savedProfile.id;
        document.getElementById('form-cgpa').value = savedProfile.cgpa;
        document.getElementById('form-semester').value = savedProfile.semester;
        document.getElementById('form-credits').value = savedProfile.credits;
        document.getElementById('form-rank').value = savedProfile.rank;
        formPreviewImg.src = savedProfile.image;

        // Image Reader
        formImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    formPreviewImg.src = event.target.result;
                }
                reader.readAsDataURL(file);
            }
        });

        // Save
        saveBtn.addEventListener('click', function() {
            const newProfile = {
                fullName: document.getElementById('form-name').value,
                id: document.getElementById('form-id').value,
                cgpa: document.getElementById('form-cgpa').value,
                semester: document.getElementById('form-semester').value,
                credits: document.getElementById('form-credits').value,
                rank: document.getElementById('form-rank').value,
                image: formPreviewImg.src
            };
            
            newProfile.name = newProfile.fullName.split(" ")[0]; // Get first name
            localStorage.setItem('mustProfileData', JSON.stringify(newProfile));
            alert('Custom Profile Data Saved!');
            applyProfileDataToDOM(newProfile);
        });
    }
});

function applyProfileDataToDOM(profile) {
    // Inject into Home screen
    const updateEl = (id, val) => { 
        let el = document.getElementById(id); 
        if (el) el.textContent = val; 
    };
    
    updateEl('home-name', profile.name);
    updateEl('home-id', profile.id);
    updateEl('home-cgpa', profile.cgpa);
    updateEl('home-semester', profile.semester);
    updateEl('home-credits', profile.credits);
    updateEl('home-rank', profile.rank);

    const homeProfileImg = document.getElementById('home-profile-img');
    if (homeProfileImg) homeProfileImg.src = profile.image;
}