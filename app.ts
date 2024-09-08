// Function to dynamically add more education fields
function addEducationField(): void {
    const educationFields = document.getElementById('education-fields') as HTMLElement;
    const entryCount = educationFields.getElementsByClassName('education-entry').length + 1;

    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label for="edu-institute-${entryCount}">Institute:</label>
        <input type="text" id="edu-institute-${entryCount}" name="edu-institute" required>

        <label for="edu-degree-${entryCount}">Degree:</label>
        <input type="text" id="edu-degree-${entryCount}" name="edu-degree" required>

        <label for="edu-year-${entryCount}">Year:</label>
        <input type="text" id="edu-year-${entryCount}" name="edu-year" required>
    `;
    educationFields.appendChild(newEntry);
}

// Function to dynamically add more work experience fields
function addWorkExperienceField(): void {
    const workExperienceFields = document.getElementById('work-experience-fields') as HTMLElement;
    const entryCount = workExperienceFields.getElementsByClassName('work-experience-entry').length + 1;

    const newEntry = document.createElement('div');
    newEntry.classList.add('work-experience-entry');
    newEntry.innerHTML = `
        <label for="work-company-${entryCount}">Company:</label>
        <input type="text" id="work-company-${entryCount}" name="work-company" required>

        <label for="work-role-${entryCount}">Role:</label>
        <input type="text" id="work-role-${entryCount}" name="work-role" required>

        <label for="work-period-${entryCount}">Period:</label>
        <input type="text" id="work-period-${entryCount}" name="work-period" required>
    `;
    workExperienceFields.appendChild(newEntry);
}

// Function to generate resume from form data
function generateResume(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('resume-form') as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const contact = (form.elements.namedItem('contact') as HTMLInputElement).value;
    const skills = (form.elements.namedItem('skills') as HTMLTextAreaElement).value;

    // Handle profile picture upload
    const profilePicInput = document.getElementById('profile-pic-upload') as HTMLInputElement;
    const profilePic = profilePicInput.files?.[0] ? URL.createObjectURL(profilePicInput.files[0]) : '';

    const educationEntries = Array.from(form.querySelectorAll('.education-entry')).map(entry => {
        const institute = (entry.querySelector('[name="edu-institute"]') as HTMLInputElement).value;
        const degree = (entry.querySelector('[name="edu-degree"]') as HTMLInputElement).value;
        const year = (entry.querySelector('[name="edu-year"]') as HTMLInputElement).value;
        return `<li>${institute} - ${degree} (${year})</li>`;
    }).join('');

    const workEntries = Array.from(form.querySelectorAll('.work-experience-entry')).map(entry => {
        const company = (entry.querySelector('[name="work-company"]') as HTMLInputElement).value;
        const role = (entry.querySelector('[name="work-role"]') as HTMLInputElement).value;
        const period = (entry.querySelector('[name="work-period"]') as HTMLInputElement).value;
        return `<li>${company} - ${role} (${period})</li>`;
    }).join('');

    const resumeContainer = document.getElementById('resume-container') as HTMLElement;
    resumeContainer.innerHTML = `
        <header class="resume-header">
            <div class="profile-img-container">
                <img id="profile-img" src="${profilePic}" alt="Profile picture" class="profile-img">
            </div>
            <div>
                <h1>${name}</h1>
                <p>Email: ${email}</p>
                <p>Contact #: ${contact}</p>
            </div>
        </header>
        <div class="resume-content">
            <aside class="resume-sidebar">
                <h2>Skills</h2>
                <section id="skills" class="resume-section">
                    <ul>
                        ${skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('')}
                    </ul>
                </section>
            </aside>
            <section class="resume-main">
                <h2>Education</h2>
                <section id="education" class="resume-section">
                    <ul>
                        ${educationEntries}
                    </ul>
                </section>
                <h2>Work Experience</h2>
                <section id="work-experience" class="resume-section">
                    <ul>
                        ${workEntries}
                    </ul>
                </section>
            </section>
        </div>
    `;
}

// Add event listeners
document.getElementById('add-education')?.addEventListener('click', addEducationField);
document.getElementById('add-work-experience')?.addEventListener('click', addWorkExperienceField);
document.getElementById('resume-form')?.addEventListener('submit', generateResume);
