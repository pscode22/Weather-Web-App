const locationName = document.querySelector('.name');

const infoSection = document.querySelector('.infoSection');

const loadbar = document.querySelector('.load-bar');

let getName = document.querySelector('.getName');

let getTemp = document.querySelector('.temperature');

let humidity = document.querySelector('.humidity');

let windSpeed = document.querySelector('.windSpeed');

let nothing = document.querySelector('.nothing')

let weatherArray = ['kOuaZs7jDZE','4CDdd1RCt6w',
'HOtPD7Z_74s','KT3WlrL_bsg','99F4mC79j1I','jU-JOEZ2saQ', 'xEqeuD6J-Ls', 
'bClr95glx6k', 'sGblr5yVXiM', 'vddccTqwal8', 'qpemSW6_1Z0', 'ohK_uJJm2G8','AaAmVr4OSwc','SMTy7emUVrk'];

window.onload = backgroundImage();

(() => {  
    let newArr = ['KT3WlrL_bsg','jU-JOEZ2saQ', 'xEqeuD6J-Ls','99F4mC79j1I']
    let index = Math.floor(Math.random() * 4);
    document.querySelector('.backgroundImage').setAttribute('src', `https://source.unsplash.com/${newArr[index]}/1600x750`);
})();

function displayBlock(props) {
    props.style.display = "block";
};

function displayNone(props) {
    props.style.display = "none";
}

function backgroundImage() { 
    setInterval(() => {
        let index = Math.floor(Math.random() * 14);
        document.querySelector('.backgroundImage').setAttribute('src', `https://source.unsplash.com/${weatherArray[index]}/1600x750`);
    },20000)        
};

document.querySelector('.name').addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        return requestApi();
    }
   })
   
document.querySelector('.submit').addEventListener('click', requestApi);

function requestApi() {
    let name = locationName.value;

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=e457ace54339e9ed224ea0dafa20dea7`;

    (function() { 
      displayBlock(loadbar);
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let finalData = data[0]; 
            return result(finalData);
        })
        .catch(function() {
            displayNone(loadbar);
            alert('An error occurred');
        });
    
    })();
}

function result(getdata) {
    getName.innerHTML = "Weather in " + getdata.name;

    let latitude = getdata.lat;
    let longitude = getdata.lon;

    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&current&appid=e457ace54339e9ed224ea0dafa20dea7`;

   (() => {
    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
        let kTemp = data['main'].temp;
        let icon = data.weather[0].icon;
        humidity.innerText = "Humidity : " + data['main'].humidity + "%";
        windSpeed.innerText = "Wind Speed : " + (data['wind'].speed * 3.6).toFixed(1) + " km/h";
        getTemp.innerText = (kTemp - 273.15).toFixed(1) + " °C";
        document.querySelector('.image').src = `https://openweathermap.org/img/wn/${icon}@2x.png `;
        document.querySelector('.weatherType').innerText = data.weather[0].description;
        displayBlock(infoSection);
        displayNone(loadbar);
        locationName.value = "";
    })
    .catch(() => { 
        displayNone(loadbar);
        alert('An error occured')})
   })();

};

// surat {lat: 21.1864607, lon: 72.8081281, country: 'IN'} 