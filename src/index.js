import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryInfo from './templates/countryInfo.hbs';

//Наработка по видео
/*console.log(fetch('https://restcountries.com/v3.1/name/peru').then(response => {
    console.log(response.json());
    return response.json();
}).then(country => {
    console.log(country);

}).catch(error => {
    console.log(error);
    Notify.info("Too many matches found. Please enter a more specific name.");
}));*/
//-----------------------------------

const DEBOUNCE_DELAY = 300;


const refs = {
    countryInfoDiv: document.querySelector(".country-info"),
    input: document.querySelector('#search-box'),
}

refs.input.addEventListener("input", debounce(fetchCountries, DEBOUNCE_DELAY));

/*fetchCountries().then(country => {
    console.log(country);
}).catch(error => {
    console.log(error);
    Notify.info("Too many matches found. Please enter a more specific name.");
})
*/
function fetchCountries(e) {
    if (refs.input.value === "") {
        console.log("Let's start!");
        return;
    }
    else {
        let name = e.target.value.trim();
    
        console.log(name);
        return fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                //console.log(response.json());
                return response.json();
            },
            )
            .then(countryFullInfo => {
                
                if (countryFullInfo.length === 1) {
                    console.log(countryFullInfo);
                    const markup = countryInfo(countryFullInfo);
                    console.log(markup);
                    refs.countryInfoDiv.innerHTML = markup;
                }
                else if (countryFullInfo.length > 10) {
                    console.log("Too match!");
                    Notify.info("Too many matches found. Please enter a more specific name.");
            }
                else {
                   Notify.failure("Oops, there is no country with that name"); 
               } 
                
            })
            .catch(error => {
                console.log(error);
                
            })
    }
}


