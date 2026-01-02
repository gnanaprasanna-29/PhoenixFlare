let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Element references
const jobForm = document.getElementById('jobForm');
const titleEl = document.getElementById('jobTitle');
const categoryEl = document.getElementById('jobCategory');
const descriptionEl = document.getElementById('jobDescription');
const budgetEl = document.getElementById('jobBudget');
const deadlineEl = document.getElementById('jobDeadline');

// Show/hide sections
function showJobForm() {
    document.getElementById('myJobsSection').style.display = 'none';
    document.getElementById('postJobSection').style.display = 'block';
}

function showMyJobs() {
    document.getElementById('postJobSection').style.display = 'none';
    document.getElementById('myJobsSection').style.display = 'block';
}

// Handle submit
if (jobForm) {
    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();
        postJob();
    });
}

function postJob() {
    // Basic validation
    if (!titleEl.value || !categoryEl.value || !budgetEl.value || !deadlineEl.value) {
        alert('Please fill in all required fields.');
        return;
    }

    const job = {
        title: titleEl.value.trim(),
        category: categoryEl.value,
        description: descriptionEl.value.trim(),
        budget: parseFloat(budgetEl.value) || 0,
        deadline: deadlineEl.value,
        applicants: []
    };

    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    // Reset form and go back to jobs list
    jobForm.reset();
    showMyJobs();
    renderJobs();
}

function renderJobs() {
    const tbody = document.getElementById('jobsTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!jobs.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">No jobs posted yet</td></tr>';
        return;
    }

    jobs.forEach((job, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.category}</td>
            <td>${job.budget}</td>
            <td>${job.deadline}</td>
            <td><button class="new-btn" onclick="viewApplicants(${index})">View (${job.applicants.length})</button></td>
        `;
        tbody.appendChild(row);
    });
}

function viewApplicants(index) {
    const job = jobs[index];
    if (!job || !job.applicants || !job.applicants.length) {
        alert('No applicants');
        return;
    }
    const details = job.applicants.map(a => `Name: ${a.name}\nAge: ${a.age}\nLocation: ${a.location}\nExperience: ${a.experience}\nApplied: ${new Date(a.appliedAt).toLocaleString()}\n`).join('\n---\n');
    alert(details);
}

function openChatbot() {
    localStorage.setItem('chatbot_from', 'business');
    window.location.href = 'chatbot.html';
}

function logout() {
    window.location.href = 'index.html';
}

// Initial render
renderJobs();