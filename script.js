// Array of quotes with categories (text, author, category)
const quotesArray = [
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "inspiration"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "motivation"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "life"
    },
    {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
        category: "life"
    },
    {
        text: "If you look at what you have in life, you'll always have more.",
        author: "Oprah Winfrey",
        category: "inspiration"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        category: "life"
    },
];

// Function to get a random quote (with an optional category filter)
async function getRandomQuote(category = '') {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    quoteText.innerText = "Loading quote...";
    quoteAuthor.innerText = '';

    try {
        // Filter quotes by category, if provided
        const filteredQuotes = category 
            ? quotesArray.filter(quote => quote.category === category)
            : quotesArray;

        if (filteredQuotes.length === 0) throw new Error('No quotes found for this category');

        // Pick a random quote from the filtered array
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quoteData = filteredQuotes[randomIndex];

        // Update the quote display
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
        await getRandomQuote(category); // Fetch a new quote based on the selected category
    });
});

// Initialize the page by fetching a random quote
getRandomQuote();
