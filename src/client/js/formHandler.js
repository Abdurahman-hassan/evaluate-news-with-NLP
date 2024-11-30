import { checkForURL } from './urlChecker';

const handleSubmit = async (event) => {
    event.preventDefault();
    const formText = document.getElementById('name').value;
    const resultsDiv = document.getElementById('results');

    if (!checkForURL(formText)) {
        alert('Invalid URL. Please enter a valid URL.');
        return;
    }

    try {
        resultsDiv.innerHTML = 'Loading...';
        const response = await fetch('http://localhost:8000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: formText })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        resultsDiv.innerHTML = `
            <div class="results-card">
                <div class="card-header">
                    <h2>Analysis Results</h2>
                </div>
                <div class="card-content">
                    <div class="result-item">
                        <span class="result-label">Polarity:</span>
                        <span class="result-value">${data.polarity || 'Not available'}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Subjectivity:</span>
                        <span class="result-value">${data.subjectivity || 'Not available'}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Text Analysis:</span>
                        <span class="result-value">${data.text || 'No text available'}</span>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
};

export { handleSubmit };
