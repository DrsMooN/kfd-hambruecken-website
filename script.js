// Globale Variablen
let galleryItems = [];
let calendarEvents = [];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const calendarGrid = document.getElementById('calendarGrid');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderGallery();
    renderCalendar();
    setupSearchAndFilters();
});

// Daten laden (hardcoded - keine localStorage mehr)
function loadData() {
    // Beispieldaten für Ausflüge - immer frisch laden
        galleryItems = [
            {
                id: 1,
                title: "Herbstspaziergang im Stadtpark",
                date: "15. Oktober 2024",
                sortDate: "2024-10-15",
                image: "images/placeholder.jpg",
                description: "Ein wunderschöner Herbstspaziergang durch den Stadtpark mit anschließendem Kaffee und Kuchen im Parkrestaurant. Die bunten Blätter haben uns alle verzaubert und wir hatten viele schöne Gespräche bei strahlendem Sonnenschein."
            },
            {
                id: 2,
                title: "Besuch im Heimatmuseum",
                date: "28. September 2024",
                sortDate: "2024-09-28",
                image: "images/placeholder.jpg",
                description: "Eine interessante Führung durch das Heimatmuseum mit vielen spannenden Geschichten aus vergangenen Zeiten. Besonders die alte Küche und die historischen Kleider fanden großen Anklang bei unseren Mitgliedern."
            }
        ];
    
    // Beispieldaten für Events - immer frisch laden
        calendarEvents = [
            {
            id: 1,
            title: "Gedenkgottesdienst für verstorbene Frauen",
            day: "16",
            month: "JAN",
            time: "18:30 Uhr",
            type: "Treffen",
            description: "Gedenkgottesdienst für die verstorbenen Frauen des vergangenen Jahres, anschließend im Pfarrheim St. Josef Jahreshauptversammlung: Rückblick auf das vergangene Jahr mit Diaschau - Ausblick",
            sortDate: "2025-01-16",
            details: ""
            },
            {
            id: 2,
            title: "Valentinstag Beisammensein",
            day: "14",
            month: "FEB",
            time: "16:00 Uhr",
            type: "Treffen",
            description: "Gemütliches Beisammensein im Pfarrheim St. Josef mit besinnlichen Gedanken zum Valentinstag",
            sortDate: "2025-02-14",
            details: ""
            },
            {
            id: 3,
            title: "Weltgebetstag der Frauen",
            day: "07",
            month: "MÄR",
            time: "19:00 Uhr",
            type: "Treffen",
            description: "Weltgebetstag der Frauen in Kirrlach, gestaltet von den Frauengruppen der Seelsorgeeinheit und der ev. Gemeinde",
            sortDate: "2025-03-07",
            details: ""
            },
            {
            id: 4,
            title: "Kreuzwegandacht",
            day: "23",
            month: "MÄR",
            time: "18:00 Uhr",
            type: "Treffen",
            description: "Kreuzwegandacht in der Kirche",
            sortDate: "2025-03-23",
            details: ""
            },
            {
            id: 5,
            title: "Gesundheitsvortrag",
            day: "11",
            month: "APR",
            time: "19:00 Uhr",
            type: "Treffen",
            description: "Vortrag: Gesundheitsfürsorge: Wieviel ist noch gesund? Wie wirken sich Alkohol und Medikamente auf meinen Körper aus? Referentin Ann-Kathrin Merz, Suchtberatungsstelle Ettlingen",
            sortDate: "2025-04-11",
            details: ""
        },
        {
            id: 6,
            title: "Maiandacht",
            day: "20",
            month: "MAI",
            time: "18:00 Uhr",
            type: "Treffen",
            description: "Maiandacht, anschließend gemütliches Beisammensein im Pfarrgarten",
            sortDate: "2025-05-20",
            details: ""
        },
        {
            id: 7,
            title: "Moorwanderung",
            day: "08",
            month: "JUL",
            time: "17:00 Uhr",
            type: "Ausflug",
            description: "Moorwanderung mit Führung im Weingartener Moor",
            sortDate: "2025-07-08",
            details: ""
        },
        {
            id: 8,
            title: "Ausflug nach Pirmasens",
            day: "28",
            month: "AUG",
            time: "",
            type: "Ausflug",
            description: "Ausflug nach Pirmasens",
            sortDate: "2025-08-28",
            details: "Dieses Jahr führt uns unser Ausflug in die Pfalz. Zunächst erkunden wir Pirmasens, einen Ort, den wohl bisher nur wenige von euch besucht haben. Pirmasens ist extrem hügelig, daher werden wir die Stadtführung vormittags mit unserem Bus machen. Zuvor nehmen wir uns Zeit für unser traditionelles Frühstück und genießen den schönen Park. Nach dem Mittagessen kann Pirmasens noch etwas alleine erkundet werden, bevor wir nach Hauenstein in ein Schuhmuseum aufbrechen werden. Das Schuhmuseum zeigt uns auf drei Stockwerken neben allem Wissenswertem über die Schuhherstellung auch Schuhmodelle aus ganz unterschiedlichen Zeiten und Ländern... und manche werden sich daran erinnern, was sie schon selber getragen haben! Danach fahren wir weiter nach Neupotz am Rhein und lassen den Tag bei einem guten Fischessen ausklingen.\nAbfahrt wird am 28.8.2025 um 8.00 Uhr an der Kirche sein, Rückkehr spätestens um 21 Uhr. Die Fahrtkosten betragen voraussichtlich 30 € für die Mitglieder (ist noch abhängig von der Teilnehmerzahl). Gäste sind willkommen! Bitte meldet euch bis spätestens 22.8.2025 an unter Tel.1011 (M.Baader). Wir freuen uns auf euch und einen schönen gemeinsamen Ausflug!"
        },
        {
            id: 9,
            title: "Kochworkshop",
            day: "23",
            month: "SEP",
            time: "18:00 Uhr",
            type: "Ausflug",
            description: "Kochworkshop im Ernährungszentrum Bruchsal",
            sortDate: "2025-09-23",
            details: "Smart Kochen – gut geplant, nachhaltig und lecker, Referentin Kerstin Streibl"
        },
        {
            id: 10,
            title: "Glaubensvortrag",
            day: "17",
            month: "OKT",
            time: "19:00 Uhr",
            type: "Treffen",
            description: "Vortrag: Wie gebe ich meinen Glauben weiter? Auch in die nächste und übernächste Generation?",
            sortDate: "2025-10-17",
            details: "Referentin Marieluise Gallinat-Schneider, Bruchsal"
        },
        {
            id: 11,
            title: "Universum-Vortrag",
            day: "14",
            month: "NOV",
            time: "19:00 Uhr",
            type: "Treffen",
            description: "Vortrag: Faszination Universum – Ein Physiker stellt die Frage nach Gott",
            sortDate: "2025-11-14",
            details: "Referent: Prof. Dr. Thomas Schimmel, KIT Karlsruhe"
        },
        {
            id: 12,
            title: "Adventsbasar",
            day: "29",
            month: "NOV",
            time: "14:00 Uhr",
            type: "Sonstiges",
            description: "Adventsbasar",
            sortDate: "2025-11-29",
            details: ""
        },
        {
            id: 13,
            title: "Adventsfeier der Turnerinnen",
            day: "15",
            month: "DEZ",
            time: "17:30 Uhr",
            type: "Feier",
            description: "Adventsfeier der Turnerinnen",
            sortDate: "2025-12-15",
            details: ""
        }
    ];
}

// Gallery Rendering
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="gallery-content">
                <h3>${item.title}</h3>
                <p class="gallery-date">${item.date}</p>
                <p>${item.description}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Calendar Rendering
function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    // Filter nur zukünftige Termine
    const today = new Date();
    const futureEvents = calendarEvents.filter(event => {
        const eventDate = new Date(event.sortDate);
        return eventDate > today;
    });
    
    futureEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'calendar-item';
        
        // Check if event has detailed information
        const hasDetails = event.details && event.details.trim() !== '';
        
        // Add clickable class and cursor if event has details
        if (hasDetails) {
            eventItem.classList.add('clickable-event');
            eventItem.style.cursor = 'pointer';
            eventItem.addEventListener('click', () => showEventDetails(event));
        }
        
        eventItem.innerHTML = `
            <div class="calendar-date">
                <span class="day">${event.day}</span>
                <span class="month">${event.month}</span>
            </div>
            <div class="calendar-content">
                <h3>${event.title}</h3>
                ${event.time ? `<p class="time">${event.time}</p>` : ''}
                ${event.description ? `<p>${event.description}</p>` : ''}
                ${hasDetails ? '<p class="click-hint">📋 Klicken für Details</p>' : ''}
            </div>
        `;
        calendarGrid.appendChild(eventItem);
    });
}

// Event Details Modal Functions
function showEventDetails(event) {
    const modal = document.getElementById('eventDetailsModal');
    const eventDetailsBody = document.getElementById('eventDetailsBody');
    
    eventDetailsBody.innerHTML = `
        <div class="event-detail-header">
            <h2>${event.title}</h2>
            <div class="event-detail-meta">
                <span class="event-date">${event.day}. ${event.month}</span>
                ${event.time ? `<span class="event-time">${event.time}</span>` : ''}
                <span class="event-type">${event.type}</span>
            </div>
        </div>
        
        <div class="event-detail-content">
            ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
            ${event.details ? `<div class="event-details-text">${event.details}</div>` : ''}
            </div>
    `;
    
    modal.style.display = 'block';
}

function closeEventDetails() {
    const modal = document.getElementById('eventDetailsModal');
    modal.style.display = 'none';
}

// Event Details Modal Event Listeners
window.addEventListener('click', function(event) {
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    if (event.target === eventDetailsModal) {
        closeEventDetails();
    }
});

// Search and Filter Functions
let filteredGalleryItems = [];
let filteredCalendarEvents = [];

// Gallery Search Function
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const yearFilter = document.getElementById('yearFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
    
    filteredGalleryItems = galleryItems.filter(item => {
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.date.toLowerCase().includes(searchTerm);
            
        const matchesYear = !yearFilter || item.sortDate?.includes(yearFilter);
        const matchesMonth = !monthFilter || item.sortDate?.includes(`-${monthFilter}-`);
        
        return matchesSearch && matchesYear && matchesMonth;
    });
    
    renderFilteredGallery();
}

// Calendar Search Function
function performCalendarSearch() {
    const searchTerm = document.getElementById('calendarSearchInput').value.toLowerCase();
    const typeFilter = document.getElementById('eventTypeFilter').value;
    
    // Filter nur zukünftige Termine
    const today = new Date();
    const futureEvents = calendarEvents.filter(event => {
        const eventDate = new Date(event.sortDate);
        return eventDate > today;
    });
    
    filteredCalendarEvents = futureEvents.filter(event => {
        const matchesSearch = !searchTerm || 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.details.toLowerCase().includes(searchTerm);
            
        const matchesType = !typeFilter || event.type === typeFilter;
        
        return matchesSearch && matchesType;
    });
    
    renderFilteredCalendar();
}

// Clear Filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('monthFilter').value = '';
    filteredGalleryItems = [];
    renderGallery();
}

function clearCalendarFilters() {
    document.getElementById('calendarSearchInput').value = '';
    document.getElementById('eventTypeFilter').value = '';
    filteredCalendarEvents = [];
    renderCalendar();
}

// Render Filtered Gallery
function renderFilteredGallery() {
    const itemsToRender = filteredGalleryItems.length > 0 ? filteredGalleryItems : 
                         (document.getElementById('searchInput').value || 
                          document.getElementById('yearFilter').value || 
                          document.getElementById('monthFilter').value) ? [] : galleryItems;
    
    galleryGrid.innerHTML = '';
    
    if (itemsToRender.length === 0 && (document.getElementById('searchInput').value || 
        document.getElementById('yearFilter').value || 
        document.getElementById('monthFilter').value)) {
        galleryGrid.innerHTML = '<div class="no-results">Keine Ausflüge gefunden. Versuchen Sie es mit anderen Suchbegriffen.</div>';
        return;
    }
    
    itemsToRender.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="gallery-content">
                <h3>${item.title}</h3>
                <p class="gallery-date">${item.date}</p>
                <p>${item.description}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Render Filtered Calendar
function renderFilteredCalendar() {
    const itemsToRender = filteredCalendarEvents.length > 0 ? filteredCalendarEvents : 
                          (document.getElementById('calendarSearchInput').value || 
                          document.getElementById('eventTypeFilter').value) ? [] : 
                         calendarEvents.filter(event => {
                             const eventDate = new Date(event.sortDate);
                             return eventDate > new Date();
                         });
    
    calendarGrid.innerHTML = '';
    
    if (itemsToRender.length === 0 && (document.getElementById('calendarSearchInput').value || 
        document.getElementById('eventTypeFilter').value)) {
        calendarGrid.innerHTML = '<div class="no-results">Keine zukünftigen Termine gefunden. Versuchen Sie es mit anderen Suchbegriffen.</div>';
        return;
    }
    
    itemsToRender.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'calendar-item';
        
        // Check if event has detailed information
        const hasDetails = event.details && event.details.trim() !== '';
        
        // Add clickable class and cursor if event has details
        if (hasDetails) {
            eventItem.classList.add('clickable-event');
            eventItem.style.cursor = 'pointer';
            eventItem.addEventListener('click', () => showEventDetails(event));
        }
        
        eventItem.innerHTML = `
            <div class="calendar-date">
                <span class="day">${event.day}</span>
                <span class="month">${event.month}</span>
            </div>
            <div class="calendar-content">
                <h3>${event.title}</h3>
                ${event.time ? `<p class="time">${event.time}</p>` : ''}
                ${event.description ? `<p>${event.description}</p>` : ''}
                ${hasDetails ? '<p class="click-hint">📋 Klicken für Details</p>' : ''}
            </div>
        `;
        calendarGrid.appendChild(eventItem);
    });
}

// Setup Search and Filter functionality
function setupSearchAndFilters() {
    // Setup year filter options
    const yearFilter = document.getElementById('yearFilter');
    if (yearFilter) {
        const years = [...new Set(galleryItems.map(item => item.sortDate?.split('-')[0]).filter(Boolean))];
        years.sort((a, b) => b - a);
        years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

    // Setup search input event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
    
    const calendarSearchInput = document.getElementById('calendarSearchInput');
    if (calendarSearchInput) {
        calendarSearchInput.addEventListener('input', performCalendarSearch);
    }
    
    // Setup filter change listeners
    const yearFilterEl = document.getElementById('yearFilter');
    if (yearFilterEl) {
        yearFilterEl.addEventListener('change', performSearch);
    }
    
    const monthFilterEl = document.getElementById('monthFilter');
    if (monthFilterEl) {
        monthFilterEl.addEventListener('change', performSearch);
    }
    
    const eventTypeFilterEl = document.getElementById('eventTypeFilter');
    if (eventTypeFilterEl) {
        eventTypeFilterEl.addEventListener('change', performCalendarSearch);
    }
}

// Print Calendar Function
function printCalendar() {
    const printContent = document.getElementById('calendarGrid').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>kfd Hambrücken - Terminkalender</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .calendar-item { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
                    .calendar-date { font-weight: bold; }
                    .time { color: #666; }
                    .click-hint { display: none; }
                </style>
            </head>
            <body>
                <h1>kfd Hambrücken - Terminkalender</h1>
                <div>${printContent}</div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Open Year Program Function
function openYearProgram() {
    const pdfPath = 'Jahresprogramm 2025.pdf';
    
    // Try to open the PDF
    try {
        window.open(pdfPath, '_blank');
    } catch (error) {
        // If PDF doesn't exist, show friendly message
        alert('Das Jahresprogramm ist noch nicht verfügbar. Bitte versuchen Sie es später erneut oder wenden Sie sich an die Vereinsleitung.');
    }
}

 