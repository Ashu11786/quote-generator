async function getRandomQuote(category = '') {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    quoteText.innerText = "Loading quote...";
    quoteAuthor.innerText = '';

    try {
        const apiUrl = `https://type.fit/api/quotes`;
        const response = fetch(apiUrl);

        if (!response.ok) throw new Error('Failed to fetch quote');

        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        const quoteData = data[randomIndex];

        quoteText.innerText = quoteData.text;
        quoteAuthor.innerText = quoteData.author || 'Unknown';
    } catch (error) {
        console.error('Error fetching quotes:', error);
        quoteText.innerText = 'Failed to load quote.';
    }
}

// Event listener for "New Quote" button
document.getElementById('new-quote-btn').addEventListener('click', () => {
    getRandomQuote(); // Fetch a new random quote
});


// Event listener for "Copy Quote" button
document.getElementById('copy-btn').addEventListener('click', () => {
    const quoteText = document.getElementById('quote-text').innerText;
    navigator.clipboard.writeText(quoteText)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
});

// Event listener for "Share Quote" button
document.getElementById('share-btn').addEventListener('click', () => {
    const quoteText = document.getElementById('quote-text').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: quoteText,
            url: window.location.href
        }).then(() => {
            console.log('Quote shared successfully!');
        }).catch(err => {
            console.error('Error sharing:', err);
        });
    } else {
        alert('Sharing is not supported on this browser.');
    }
});

// Event listeners for category buttons
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const category = button.getAttribute('data-category');
        await getRandomQuote(category);
    });
});

// Initialize the page by fetching a random quote
getRandomQuote();
