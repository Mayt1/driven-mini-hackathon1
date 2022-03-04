const x = document.getElementById("demo");


const apiKey = "fe830503c585a49550b17a2937c29de9";
let urlApi;
let language = "pt_br";
let savedApiData;
let latitudeAtual = -16.729003;
let longitudeAtual =-43.847090;
let temperatura;
let sensacao;
let tempMinima;
let tempMaxima;


function getLocationByNavigator() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitudeAtual = position.coords.latitude;
    longitudeAtual = position.coords.longitude;
    x.innerHTML = "Latitude: " + latitudeAtual +"<br>Longitude: " + longitudeAtual;
    urlApi = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitudeAtual + '&lon=' + longitudeAtual + '&appid=' + apiKey + '&lang=' + language;
    getApiResponse(urlApi);
}

function getLocationByCity() {
    cidade = document.getElementById(`cidade`).value
    console.log(cidade)
    showPositionCity(cidade)
}

function showPositionCity(cidade) {
    urlApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=' + apiKey
    getApiResponse(urlApi);
}

function getApiResponse(urlApi) {
    let promise = axios.get(urlApi);
    promise.then(displayClimate);
    promise.catch(erroPromise)
}

function erroPromise(erro){
    alert(`Erro: ` + erro.response.status);
    alert("Nao conseguimos encontrar os dados da sua localidade");
}

function displayClimate(promise) {
    console.log(promise);
    savedApiData = promise.data;
    convertKelvinCelcius();
    urlIcone = 'http://openweathermap.org/img/wn/'+ savedApiData.weather[0].icon + '@2x.png' //icone das clouds
    document.querySelector("section").innerHTML = `
        <div class="city-data">
            <img src="${urlIcone}"/>
            <p>Tempo agora em ${savedApiData.name}, ${savedApiData.sys.country}<p>
            <p><ion-icon name="thermometer-outline"></ion-icon>Temperatura:"${temperatura}"ºC</p>
            <p>Sensação termica:${sensacao}ºC</p>
            <p>Minima:${tempMinima}ºC</p>
            <p>Maxima:${tempMaxima}ºC</p>
            <p><ion-icon name="water-outline"></ion-icon>Umidade:${savedApiData.main.humidity}%</p>
            <p>Pressão:${savedApiData.main.pressure}</p>
            <p>Clima:${savedApiData.weather[0].main}</p>
            <p>Visibilidade:${savedApiData.visibility}</p>
            <p><ion-icon name="leaf-outline"></ion-icon>Vento:${savedApiData.wind.speed} m/s </p>
            <p><ion-icon name="cloud-outline"></ion-icon>nuvens:${savedApiData.clouds.all}%</p>
        </div>
    `
}

function convertKelvinCelcius() {
    temperatura =parseFloat(savedApiData.main.temp - 273.15).toFixed(2) ;
    sensacao = parseFloat(savedApiData.main.feels_like - 273.15).toFixed(2);
    tempMinima = parseFloat(savedApiData.main.temp_min - 273.15).toFixed(2);
    tempMaxima = parseFloat(savedApiData.main.temp_max - 273.15).toFixed(2);
}
