'use strict';

const link = 'http://api.weatherstack.com/current?access_key=5bb972dcb0bc0895b882c81a4f4d854b'
const components = document.querySelector('.city')
const cityinMemory = localStorage.getItem('city');
const submitBtn = document.getElementById('submit');
const input = document.getElementById('text-input');
const setting = document.getElementById('setting-icon');
const popup = document.getElementById('popup');
const cityText = document.querySelector('.city');
const feel = document.querySelector('.feels-like');
const localTime = document.querySelector('.local-time');
const localTemperature = document.querySelector('.description_temperature')

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
    cityText.textContent = store.city;
    feel.textContent = `Ощущается как ${store.feelsLike}°C`;
    localTime.textContent = store.localTime.replace(/\d{4}\-\d{2}\-\d{2} /g, '');
    localTemperature.textContent = `${store.temperature}°C`
}


const fetchData = async ()=>{
    const result = await fetch(`${link}&query=${store.city}`);
    
    if (result.status < 400){
        const newData = await result.json();
        console.log(newData);
        const {
            location : {name : city,country,localtime : localTime},
            current: {feelslike : feelsLike, temperature, humidity,wind_speed : windSpeed, pressure, weather_icons:weatherIcon,
                weather_descriptions : weatherDescription}
        } = newData;
    
    
        store = {
            ...store,
            city,
            country,
            localTime,
            feelsLike,
            temperature,
            humidity,
            windSpeed,
            pressure,
            weatherDescription,
            
        }
    
        renderComponent()
    }else{
        throw new Error('Ошибка загрузки данных');
    }

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


setting.addEventListener('click',function(event){
    popup.classList.toggle('popup_active');
    event.stopImmediatePropagation();

})

popup.addEventListener('click',function(event){
    (event.target != input) ? popup.classList.remove('popup_active') : '';
})

