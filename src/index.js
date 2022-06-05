import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryInfo from './templates/countryInfo.hbs';
import countryList from './templates/countryList.hbs';

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
    countryListUl: document.querySelector(".country-list"),
    countryInfoDiv: document.querySelector(".country-info"),
    input: document.querySelector('#search-box'),
    list: document.querySelector("li"),
}

    
refs.input.addEventListener("input", debounce(fetchCountries, DEBOUNCE_DELAY));

function clearCountriesBlock() {
    refs.countryListUl.innerHTML = "";
    refs.countryInfoDiv.innerHTML = "";
}
function fetchCountries(e) {

    if (refs.input.value.trim() === "") {
        console.log(refs.input.value);
        console.log("Let's start!");
        clearCountriesBlock();
        return;
    }
    else {
        let name = e.target.value.trim();
    
        console.log(name);
        return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        /*fetch(`https://restcountries.com/v3.1/name/${name}`)*/
            .then(response => {
                return response.json();
            },
            )
            .then(countryFullInfo => {
                
                if (countryFullInfo.length === 1) {
                    refs.countryListUl.innerHTML = "";
                    console.log(countryFullInfo);
                    const markup = countryInfo(countryFullInfo);
                    console.log(markup);
                    refs.countryInfoDiv.innerHTML = markup;
                }
                else if (countryFullInfo.length <= 10) {
                    refs.countryInfoDiv.innerHTML = "";
                    const markup = countryList(countryFullInfo);
                    refs.countryListUl.innerHTML = markup;
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


