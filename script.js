const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMeJoke(joke){
    VoiceRSS.speech({
        key:'26eedf69ff924da18a5a7a35b3166291',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokesFromAPI() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMeJoke(joke);
        toggleButton();
    } catch (error) {
        console.log('oooops', error);
    }
}

//Event Listeners
button.addEventListener('click', getJokesFromAPI);
audioElement.addEventListener('ended', toggleButton);