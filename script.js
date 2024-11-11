const map = L.map('map').setView([54.738, 56.051], 10); // Центр карты (Уфа)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const locations = [
    {
        lat: 54.682089, 
        lon: 56.188307, 
        name: "КП Рождественский", 
        type: "КП", 
        price: "нет информации", 
        description: `
            <strong>Адрес строительства:</strong> с. Русский Юрмаш, ул. Сретенка, 56<br>
            <strong>Средняя цена за 1 м²:</strong> нет информации<br>
            <strong>Отделы продаж:</strong> с. Нагаево, Акбердино/Блохино - ул. М. Дорохова 101Х<br>
            <strong>Контакты менеджеров отдела продаж WA:</strong><br>
            Рудольф: +7-917-044-21-12<br>
            Ришат: +7 987 627-09-80<br>
            Аделина: +7-927-351-88-82<br>
            Артур: +7-917-348-69-84<br>
            Бахтиер: +7-927-354-35-88<br>
            <strong>Войдите в чат с застройщиком:</strong> 📲 Запросить информацию по планировкам и ценам: +7-987-495-26-45<br>
            <strong>Условия агентского вознаграждения:</strong><br>
            3% - договор подряда<br>
            100 000 ₽ - готовые дома
        `,
        imageUrl: "https://via.placeholder.com/100" 
    },
    // Добавьте остальные объекты
];

function createPopup(location) {
    return `
        <h4>${location.name}</h4>
        <p>${location.description}</p>
        <img class="popup-image" src="${location.imageUrl}" alt="${location.name}">
    `;
}

function addMarker(location) {
    const marker = L.marker([location.lat, location.lon]).addTo(map);
    marker.bindPopup(createPopup(location));
}

locations.forEach(location => {
    addMarker(location);
});

function applyFilters() {
    const typeFilter = document.getElementById("type").value;
    const priceMin = document.getElementById("priceMin").value;
    const priceMax = document.getElementById("priceMax").value;

    const filteredLocations = locations.filter(location => {
        const typeMatch = !typeFilter || location.type === typeFilter;
        const priceMatch = (!priceMin || location.price >= priceMin) && (!priceMax || location.price <= priceMax);
        return typeMatch && priceMatch;
    });

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    filteredLocations.forEach(location => {
        addMarker(location);
    });
}
