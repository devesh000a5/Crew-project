const button = document.querySelector('.btn');
const inputText = document.querySelector('textarea');
const output = document.getElementById('output');
const downloadLink = document.getElementById('download-link');

button.addEventListener('click', async () => {
    const prompt = inputText.value.trim().toLowerCase();
    inputText.value = '';

    // Define keywords and corresponding file paths
    const templates = {
        "simple website ": "serverjs/simple-website.html",
        "portfolio website": "serverjs/portfolio-website.html",
        "traveling website" :"serverjs/traveling-website.html",
        "blog website" : "serverjs/blog-website.html",
        "e-commerce website" : "serverjs/E-commerce-website.html"
    };

    let templateFile = null;

    // Match prompt with template file
    for (let keyword in templates) {
        if (prompt.includes(keyword)) {
            templateFile = templates[keyword];
            break;
        }
    }

    const loadingAnimation = document.querySelector('.loading-animation');
    const codeDisplay = document.querySelector('.code-display');

    // Show loading animation
    output.style.display = 'block';
    loadingAnimation.style.display = 'block';
    output.innerHTML = '';  // Clear any previous content

    if (templateFile) {
        // Fetch and display the template
        try {

            // Simulate loading time for testing the animation effect
            await new Promise(resolve => setTimeout(resolve, 7000)); // 1-second delay

            const response = await fetch(templateFile);
            const templateContent = await response.text();

             // Hide loading animation
             loadingAnimation.style.display = 'none';

            // Show the output block when content is ready
            output.style.display = 'block';  // Make the output block visible

            output.innerHTML = `<strong>Output :</strong><pre class="code-display"><code></code></pre>`;
            const codeDisplay = output.querySelector("code");


            const lines = templateContent.split("\n");
            let index = 0;

            function typeLineByLine() {
                if (index < lines.length) {
                    codeDisplay.innerHTML += lines[index]
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;') + "<br>";
                    index++;
                    setTimeout(typeLineByLine, 80); // Adjust speed
                }
            }

            // Start typewriter effect
            typeLineByLine();

            // Create downloadable link
            const blob = new Blob([templateContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            downloadLink.innerHTML = `<a href="${url}" download="template.html">Download HTML Template</a>`;

        } catch (error) {
            output.innerHTML = `<p>"Prompt Dhang se likh". Please try again.</p>`;
            console.error("Error fetching template:", error);
        }
    } else {
        output.innerHTML = "<strong>Output:</strong><p>Aukaat ke bahar mat likh. Please try another prompt.</p>";
        downloadLink.innerHTML = ''; // Clear download link if no match
    }
});
