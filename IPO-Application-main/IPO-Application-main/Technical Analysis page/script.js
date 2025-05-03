document.addEventListener("DOMContentLoaded", function () {
    // Get all module list items
    const moduleItems = document.querySelectorAll(".module-list li");
    const introductionSection = document.getElementById("introduction-section");
    const contentSection = document.querySelector(".content-section");

    // Initially show the introduction section
    introductionSection.style.display = "block";
    contentSection.appendChild(introductionSection);

    // Add click event to each module item
    moduleItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            // Remove active class from all items
            moduleItems.forEach(i => i.classList.remove("active"));
            
            // Add active class to clicked item
            this.classList.add("active");
            
            // Show introduction section for first item
            if (index === 0) {
                introductionSection.style.display = "block";
                contentSection.innerHTML = "";
                contentSection.appendChild(introductionSection);
            } else {
                // For other items, you can add content display logic here
                introductionSection.style.display = "none";
                contentSection.innerHTML = `<div class="content-box">
                    <h2 class="section-title">${this.textContent.trim()}</h2>
                    <div class="divider"></div>
                    <div class="image-placeholder"></div>
                    <p>Content for ${this.textContent.trim()} will be displayed here.</p>
                    <div class="feedback-box">
                        <p>Did you like this unit?</p>
                    </div>
                </div>`;
            }
        });
    });

    // Menu icon toggle for mobile
    const menuIcon = document.querySelector(".menu-icon");
    if (menuIcon) {
        menuIcon.addEventListener("click", () => {
            document.querySelector(".nav-links").classList.toggle("show");
        });
    }
});

function showContent(sectionId) {
    document.querySelectorAll('.content-box').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

