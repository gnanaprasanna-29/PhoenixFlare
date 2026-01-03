let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
let selectedJobIndex = null;

const jobsTbody = document.getElementById('jobsTable');
const applyModal = document.getElementById('applyModal');
const applyForm = document.getElementById('applyForm');
const backBtn = document.getElementById('backBtn');
const pageTitle = document.getElementById('pageTitle');
const searchInput = document.getElementById('searchInput');

function renderJobs(filter = '') {
    if (!jobsTbody) return;
    jobsTbody.innerHTML = '';

    const filtered = jobs.filter(job => {
        const text = (job.title + ' ' + job.category + ' ' + (job.description || '')).toLowerCase();
        return text.includes(filter.toLowerCase());
    });

    if (!filtered.length) {
        jobsTbody.innerHTML = '<tr><td colspan="5" class="empty">No jobs available</td></tr>';
        return;
    }

    filtered.forEach((job, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.category}</td>
            <td>${job.budget}</td>
            <td>${job.deadline || ''}</td>
            <td><button class="new-btn" onclick="openApplyForm(${index})">Apply</button></td>
        `;
        jobsTbody.appendChild(row);
    });
}

function openApplyForm(index) {
    selectedJobIndex = index;
    if (applyModal) applyModal.style.display = 'block';
}

function closeApplyForm() {
    if (applyModal) applyModal.style.display = 'none';
    selectedJobIndex = null;
}

if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('appName').value.trim();
        const age = document.getElementById('appAge').value.trim();
        const location = document.getElementById('appLocation').value.trim();
        const experience = document.getElementById('appExperience').value.trim();

        if (!name || !age || !location || !experience) {
            alert('Please fill in all fields');
            return;
        }

        const applicant = { name, age, location, experience, appliedAt: new Date().toISOString() };

        jobs[selectedJobIndex].applicants = jobs[selectedJobIndex].applicants || [];
        jobs[selectedJobIndex].applicants.push(applicant);
        localStorage.setItem('jobs', JSON.stringify(jobs));

        closeApplyForm();
        alert('Application submitted');
        renderJobs(searchInput ? searchInput.value : '');
    });
}

function showApplications() {
    pageTitle.textContent = 'My Applications';
    backBtn.style.display = 'inline-block';

    const applied = jobs.filter(job => job.applicants && job.applicants.length > 0);

    jobsTbody.innerHTML = '';
    if (!applied.length) {
        jobsTbody.innerHTML = '<tr><td colspan="5" class="empty">You have not applied to any jobs yet</td></tr>';
        return;
    }

    applied.forEach((job, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.category}</td>
            <td>${job.budget}</td>
            <td>${job.deadline || ''}</td>
            <td>Applicants: ${job.applicants.length}</td>
        `;
        jobsTbody.appendChild(row);
    });
}



function showAvailableJobs() {
    pageTitle.textContent = 'Available Jobs';
    backBtn.style.display = 'none';
    renderJobs(searchInput ? searchInput.value : '');
}

function handleSearch() {
    const q = searchInput.value || '';
    renderJobs(q);
}

function openChatbot() {
    localStorage.setItem('chatbot_from', 'freelancer');
    window.location.href = 'chatbot.html';
}

function logout() {
    window.location.href = 'index.html';
}

// click outside modal to close
window.addEventListener('click', function (e) {
    if (e.target === applyModal) closeApplyForm();
});

function openFeedback() {
  window.location.href = "feedback.html";
}


// Initial render
renderJobs();