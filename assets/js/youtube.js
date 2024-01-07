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

// Function to append YouTube HTML code to the specified div
function appendYouTubeCodeToDiv(youtubeCode) {
    const videosDiv = document.querySelector('.videos');
    videosDiv.innerHTML = youtubeCode;
}

// Main function to fetch, parse, and append YouTube code
async function main() {
    try {
        const markdownContent = await fetchAndParseMarkdown();
        const youtubeCode = extractYouTubeVideos(markdownContent);
        appendYouTubeCodeToDiv(youtubeCode);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();