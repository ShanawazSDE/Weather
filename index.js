const APIKey = `3f6080ef198cb72fb2db795d4ad6182f`;
const submit = document.querySelector(`button`);
const input = document.querySelector(`input`);
const cardContainer = document.querySelector(`.card-container`);
const array = [];



function onSubmit(e){
   const city = input.value;
   if(city ===`` || city === null){
    alert(`please provide a city name`);
    return;
   }

   fetch(`https://api.openweathermap.org/data/2.5/weather?q={${city}}&appid={${APIKey}}&units=metric`)
.then((res)=>{
    if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
 })
.then(res =>{
    const obj = {
     weather: res.data[0].weather[0].main,
     temp: res.data[0].temp,
     humidity: res.data[0].humidity,
     pressure: res.data[0].pressure,
     windSpeed: res.data[0].wind_speed,
    };
    array.push(obj);
    if(array.length !== 0) cardContainer.innerHTML = ``;
    array.sort((a,b)=> a.temp - b.temp);

    array.forEach((item) =>{

        const div =  document.createElement(`div`);
        div.classList.add(`card`);
        // div.innerHTML = ` <img src="images/cloudy.jpg" alt="cloudy" />
        // <div class="text">
        //     <h2 class="city">Japan</h2>
        //     <h1 class="temp">30<span>&deg</span></h1>
        //     <h3>windy</h3>
        //     <h3>humidity: 64</h3>
        //     <h3>pressure: 1069</h3>
        //     <h3>wind speed: 3.6</h3>
        // </div>`;
        const img = document.createElement(`img`);
        if(weather === `Clear`){
          img.setAttribute(`src`,`images/sunny.jpg`);
        }
        else if(weather === `Rain` || weather === `Drizzle`){
          img.setAttribute(`src`,`images/rainy.jpg`);
        }else if(weather === `Tornado`){
          img.setAttribute(`src`,`images/windy.jpg`);
        }else{
          img.setAttribute(`src`,`images/cloudy.jpg`);
        }
      
        div.appendChild(img);
      
        const textDiv = document.createElement(`div`);
        textDiv.classList.add(`text`);
        textDiv.innerHTML = `
        <h2 class="city">city: ${city}</h2>
        <h1 class="temp">temp: ${item.temp}<span>&deg</span></h1>
        <h3>weather: ${item.weather}</h3>
        <h3>humidity: ${item.humidity}</h3>
        <h3>pressure: ${item.pressure}</h3>
        <h3>wind speed: ${item.windSpeed}</h3>`;
      
        div.appendChild(textDiv);
      
        cardContainer.appendChild(div);
        
    })


})
.catch(err => alert(` ${err}`));

}

submit.addEventListener(`click`,onSubmit);