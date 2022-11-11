'use strict';
const link = 'http://api.weatherstack.com/current?access_key=303b9abf761b6f7f5c9422281962f1d7'
const components = document.querySelector('.city')
const cityinMemory = localStorage.getItem('city');
const submitBtn = document.getElementById('submit');
const input = document.getElementById('text-input');

if (!cityinMemory){
    localStorage.setItem('city', 'Москва');
}

let store = {
    city: localStorage.getItem('city'),
    temperature : '5',
    feelslike: '0',
    humidity: '96',
    pressure: '1100',
    windSpeed: '10',
    localtime: '17:36'

}   

const renderComponent = () =>{
    components.innerHTML = `Город: ${store.city} <br>
    Страна ${store.country} <br>
    Температура: ${store.temperature}°C`
}


const fetchData = async ()=>{
    const result = await fetch(`${link}&query=${store.city}`);
    const newData = await result.json();
    console.log(result)
    const {
        location : {name : city,country,localtime},
        current: {feelslike : feelsLike, temperature, humidity,wind_speed : windSpeed, pressure}
    } = newData;


    store = {
        ...store,
        city,
        country,
        localtime,
        feelsLike,
        temperature,
        humidity,
        windSpeed,
        pressure
    }
    // renderComponent()
}

    
fetchData();

submitBtn.addEventListener('click',function(event){
    let inputText = input.value;
    localStorage.setItem('city', inputText)
    event.preventDefault();
    store = {
        ...store,
        city : inputText
    }

    fetchData();
})


