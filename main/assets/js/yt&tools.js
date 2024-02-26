// Function to fetch and parse Markdown content
async function fetchAndParseMarkdown() {
    const response = await fetch('https://raw.githubusercontent.com/at0m-b0mb/at0m-b0mb/main/README.md');
    const markdownContent = await response.text();
    return markdownContent;
}

// Function to extract YouTube video information from Markdown
function extractYouTubeVideos(markdownContent) {
    const regex = /<!-- BEGIN YOUTUBE-CARDS -->\n(.*?)\n<!-- END YOUTUBE-CARDS -->/gs;
    const matches = regex.exec(markdownContent);
    return matches ? matches[1] : '';
}

// Function to extract projects information from Markdown
function extractProjects(markdownContent) {
    const regex = /<!-- BEGIN PROJECTS -->\n(.*?)\n<!-- END PROJECTS -->/gs;
    const matches = regex.exec(markdownContent);
    return matches ? matches[1] : '';
}

// Function to append HTML code to the specified div
function appendCodeToDiv(code, selector) {
    const targetDiv = document.querySelector(selector);
    if (targetDiv) {
        targetDiv.innerHTML = code;
    } else {
        console.error('Target div not found:', selector);
    }
}

// Main function to fetch, parse, and append content
async function main() {
    try {
        const markdownContent = await fetchAndParseMarkdown();
        const youtubeCode = extractYouTubeVideos(markdownContent);
        const projectsCode = extractProjects(markdownContent);
        appendCodeToDiv(youtubeCode, '.videos');
        appendCodeToDiv(projectsCode, '.projects');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();
