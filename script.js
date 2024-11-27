// Access DOM elements
const form = document.getElementById("resume-form");
const resumeContent = document.getElementById("resume-content");
const saveBtn = document.getElementById("save-btn");
const generateBtn = document.getElementById("generate-btn");

// Save data to Local Storage and render preview
saveBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;

  const resumeData = {
    name,
    email,
    phone,
    summary,
    skills,
    experience,
    education,
  };

  // Save to local storage
  localStorage.setItem("resumeData", JSON.stringify(resumeData));

  renderResume(resumeData);
});

// Load data from Local Storage on page load
window.onload = () => {
  const savedData = localStorage.getItem("resumeData");
  if (savedData) {
    const resumeData = JSON.parse(savedData);
    populateForm(resumeData);
    renderResume(resumeData);
  }
};

// Populate form with saved data
function populateForm(data) {
  document.getElementById("name").value = data.name || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("skills").value = data.skills || "";
  document.getElementById("experience").value = data.experience || "";
  document.getElementById("education").value = data.education || "";
}

// Render resume preview
function renderResume(data) {
  resumeContent.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Summary:</strong> ${data.summary}</p>
        <p><strong>Skills:</strong> ${data.skills}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Education:</strong> ${data.education}</p>
    `;
}

// Generate PDF
generateBtn.addEventListener("click", () => {
  const element = document.getElementById("resume-content");
  const options = {
    margin: 1,
    filename: "Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
});
