// Variables
const tweetList = document.getElementById('tweet-list');




//Event Listeners
eventListeners();


function  eventListeners() {
    //Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    // Remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    // Load tweets from local storage
    document.addEventListener('DOMContentLoaded', loadTweetsFromLocalStorage);

}



//Functions

// Adding new tweet
function newTweet(event) {
    event.preventDefault();

    //Read the textarea value
    const tweet = document.getElementById('tweet').value;

    // Create remove button
    const removeTweetButton = document.createElement('a');
    removeTweetButton.classList = 'remove-tweet';
    removeTweetButton.textContent = 'X';

    // Create <li> element
    const li = document.createElement('li');
    li.innerText = tweet;

    // Add remove button to each tweet
    li.appendChild(removeTweetButton);

    // Add to the list
    tweetList.appendChild(li);

    // Store tweets in local storage
    storingTweetToTheLocalStorage(tweet);

    // Alert 'Tweet added'
    alert('Tweet added!');

    // Clear the form
    this.reset();
};

// Remove the tweets from the DOM
function removeTweet(event) {
    if(event.target.classList.contains('remove-tweet')) {
        event.target.parentElement.remove();
    }

    // Remove tweet from local storage
    removeTweetFromLocaleStorage(event.target.parentElement.textContent);
};

// Storing tweets to the local storage
function storingTweetToTheLocalStorage(tweet) {
    let tweetsArray = getTweetsFromTheLocalStorage();

    // Add the tweet into the array
    tweetsArray.push(tweet);

    // Convert array of tweets into a string, and add into the local storage
    localStorage.setItem('tweets', JSON.stringify(tweetsArray) );
};

// Get array of tweets from the local storage. If no tweets, then empty array
function getTweetsFromTheLocalStorage() {
    let tweetsArray;
    const itemLS = localStorage.getItem('tweets');

    // Get the values from the local storage. If null - create an empty array
    if (itemLS === null) {
        tweetsArray = [];
    } else {
        tweetsArray = JSON.parse( itemLS );
    }
    return tweetsArray;
};

// Print tweets from local storage, when page is loading
function loadTweetsFromLocalStorage() {
    let tweetsArray = getTweetsFromTheLocalStorage();

    // Loop throught array, and print the tweets
    tweetsArray.forEach(function (tweet) {
        // Create remove button
        const removeTweetButton = document.createElement('a');
        removeTweetButton.classList = 'remove-tweet';
        removeTweetButton.textContent = 'X';

        // Create <li> element
        const li = document.createElement('li');
        li.innerText = tweet;

        // Add remove button to each tweet
        li.appendChild(removeTweetButton);

        // Add to the list
        tweetList.appendChild(li);
    })
};

// Remove the tweet from local storage
function removeTweetFromLocaleStorage(tweet) {
    // Get array of tweets from the local storage
    let tweetsArray = getTweetsFromTheLocalStorage();

    // Remove 'X' symbol from the tweet
    let tweetWithoutX = tweet.substring(0, tweet.length - 1);

    tweetsArray.forEach(function (item, index) {
        if (tweetWithoutX === item) {
            tweetsArray.splice(index, 1);
        }
    });

    // Update local storage tweets array
    localStorage.setItem('tweets', JSON.stringify(tweetsArray));

};