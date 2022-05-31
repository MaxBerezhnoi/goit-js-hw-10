import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Наработка по видео
console.log(fetch('https://restcountries.com/v3.1/name/peru').then(response => {
    console.log(response.json());
    return response.json();
}).then(country => {
    console.log(country);

}).catch(error => {
    console.log(error);
    Notify.info("Too many matches found. Please enter a more specific name.");
}));
//-----------------------------------

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
}

refs.input.addEventListener("input", fetchCountries);

fetchCountries().then().catch(error => {
    console.log(error);
    Notify.info("Too many matches found. Please enter a more specific name.");
})

function fetchCountries(e) {
    let name = e.currentTarget.textCntent;
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            return response.json();
        },
        );
}


        /*.then(name => {
            console.log({ name });
        })*/
        
    
