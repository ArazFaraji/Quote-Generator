const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick a randome quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote)
    // If there is no author listed fill in with Unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


// Get quote from API
async function getQuoteFromApi() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote();

        // Stop loader and show quote
        removeLoadingSpinner();

    } catch (error) {
        // getQuoteFromApi();
        console.log('Get quote error', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuoteFromApi();