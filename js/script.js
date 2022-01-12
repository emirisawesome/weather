let body = document.body

let main = document.createElement('main')
body.append(main)

let searchCon = document.createElement('div')
searchCon.className = 'searchCon'
main.append(searchCon)

let searchInput = document.createElement('input')
searchInput.className = 'searchInput'
searchCon.append(searchInput)

searchInput.addEventListener('keypress', (e) => {

    if (e.which === 13) {
        search()
    }
});





const search = async () => {
    let api = 'http://api.openweathermap.org/data/2.5/weather'
    let key = '33eb9c417803cee4d9cf95b939995190'
    let query = searchInput.value

    let request = await fetch(`${api}?q=${query}&appid=${key}`)
    let response = await request.json()

    console.log(response);

    displayData(response)
}


let infoCon = document.createElement('div')
infoCon.className = 'infoCon'
main.append(infoCon)

let mapCon

const displayData = (data) => {
    infoCon.innerHTML = ''



    let mainInfo = document.createElement('article')
    mainInfo.className = 'mainInfo'
    infoCon.append(mainInfo)

    let temp = document.createElement('h2')
    temp.className = 'temp'
    mainInfo.append(temp)

    let feelsTemp = document.createElement('h3')
    feelsTemp.className = 'feelsTemp'
    infoCon.append(feelsTemp)

    let humidity = document.createElement('p')
    humidity.className = 'humidity'
    infoCon.append(humidity)

    let Qlocation = document.createElement('h2')
    Qlocation.className = 'Qlocation'
    mainInfo.append(Qlocation)


    temp.innerHTML = `${Math.ceil(data.main.temp - 273.15)} C`
    feelsTemp.innerHTML = `Ощущается как ${Math.ceil(data.main.feels_like - 273.15)} °C`

    Qlocation.innerHTML = `<svg width="38px" height="38px" fill="#c9d1b4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z"/></svg> ${data.name} / ${data.sys.country} `

    humidity.innerHTML = `влажность ${data.main.humidity}%`

    mapCon = document.createElement('div')
    mapCon.id = 'map'
    infoCon.append(mapCon)

    var map;

    DG.then(function () {
        mapCon = DG.map('map', {
            center: [data.coord.lat, data.coord.lon],
            zoom: 12
        });

        DG.marker([data.coord.lat, data.coord.lon]).addTo(mapCon).bindPopup('Вы кликнули по мне!');
    });
}