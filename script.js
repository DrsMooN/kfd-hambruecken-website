// Globale Variablen
let galleryItems = [];
let calendarEvents = [];

// Admin System Variables
let isAdminMode = false;
let adminTimer = null;
let adminTimeRemaining = 1800; // 30 Minuten in Sekunden
const ADMIN_PASSWORD = 'h4m-frauen-brücken';

// DOM Elements
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');
const addGalleryBtn = document.getElementById('addGalleryBtn');
const addEventBtn = document.getElementById('addEventBtn');
const galleryGrid = document.getElementById('galleryGrid');
const calendarGrid = document.getElementById('calendarGrid');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderGallery();
    renderCalendar();
    setupSearchAndFilters();
    setupAdminSystem();
});

// Admin-protected event listeners
if (addGalleryBtn) {
    addGalleryBtn.addEventListener('click', function() {
        if (!isAdminMode) {
            alert('Sie müssen als Admin angemeldet sein, um neue Ausflüge hinzuzufügen.');
            return;
        }
        openGalleryModal();
    });
}

if (addEventBtn) {
    addEventBtn.addEventListener('click', function() {
        if (!isAdminMode) {
            alert('Sie müssen als Admin angemeldet sein, um neue Termine hinzuzufügen.');
            return;
        }
        openEventModal();
    });
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === document.getElementById('adminModal')) {
        closeAdminModal();
    }
    if (event.target === document.getElementById('imageHelpModal')) {
        closeImageHelp();
    }
});

// Setup search and filter functionality
function setupSearchAndFilters() {
    // Real-time search for gallery
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
    
    // Real-time search for calendar
    const calendarSearchInput = document.getElementById('calendarSearchInput');
    if (calendarSearchInput) {
        calendarSearchInput.addEventListener('input', performCalendarSearch);
    }
    
    // Filter change events
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');
    const eventTypeFilter = document.getElementById('eventTypeFilter');
    
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (monthFilter) monthFilter.addEventListener('change', applyFilters);
    if (eventTypeFilter) eventTypeFilter.addEventListener('change', applyCalendarFilters);
    
    // Populate year filter
    populateYearFilter();
    
    // Populate year filter after loading data
    setTimeout(populateYearFilter, 100); // Small delay to ensure data is loaded
}

// Daten laden und speichern
function loadData() {
    const savedGallery = localStorage.getItem('galleryItems');
    const savedEvents = localStorage.getItem('calendarEvents');
    
    if (savedGallery) {
        galleryItems = JSON.parse(savedGallery);
    } else {
        // Beispieldaten für Ausflüge hinzufügen wenn keine Daten vorhanden sind
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
        saveData(); // Beispieldaten speichern
    }
    
    if (savedEvents) {
        calendarEvents = JSON.parse(savedEvents);
    } else {
        // Beispieldaten für Termine hinzufügen wenn keine Daten vorhanden sind
        calendarEvents = [
            {
                id: 1,
                title: "Weihnachtsfeier",
                day: "20",
                month: "DEZ",
                time: "15:00 Uhr",
                type: "Feier",
                description: "Gemütliche Weihnachtsfeier im Gemeindehaus mit Kaffee, Kuchen und Wichtelgeschenken",
                sortDate: "2024-12-20",
                location: "Gemeindehaus St. Martin",
                address: "Kirchgasse 12, 12345 Musterstadt",
                meetingPoint: "Haupteingang Gemeindehaus",
                departureTime: "14:45 Uhr",
                transport: "Zu Fuß oder eigene Anreise",
                costs: "5€ pro Person für Kaffee und Kuchen",
                registration: "Bis 15. Dezember bei Maria",
                contact: "Maria Müller (0123-456789)",
                bringAlong: "Wichtelgeschenk bis 5€"
            },
            {
                id: 2,
                title: "Geburtstag Maria",
                day: "05",
                month: "JAN",
                time: "",
                type: "Geburtstag",
                description: "Maria wird 75 Jahre! Wir gratulieren herzlich",
                sortDate: "2025-01-05",
                location: "",
                address: "",
                meetingPoint: "",
                departureTime: "",
                transport: "",
                costs: "",
                registration: "",
                contact: "",
                bringAlong: ""
            },
            {
                id: 3,
                title: "Neujahrsbrunch",
                day: "12",
                month: "JAN",
                time: "11:00 Uhr",
                type: "Treffen",
                description: "Gemeinsamer Brunch zum neuen Jahr im Restaurant Zur Post",
                sortDate: "2025-01-12",
                location: "Restaurant Zur Post",
                address: "Marktplatz 8, 12345 Musterstadt",
                meetingPoint: "Restaurant-Eingang",
                departureTime: "",
                transport: "Eigene Anreise",
                costs: "Buffet ca. 15€ pro Person",
                registration: "Bis 8. Januar erforderlich",
                contact: "Anna Schmidt (0123-987654)",
                bringAlong: "Gute Laune für das neue Jahr"
            },
            {
                id: 4,
                title: "Handarbeitskreis",
                day: "18",
                month: "JAN",
                time: "14:00 Uhr",
                type: "Treffen",
                description: "Monatliches Treffen des Handarbeitskreises - Stricken und Häkeln",
                sortDate: "2025-01-18",
                location: "Gemeindesaal",
                address: "Am Kirchplatz 3, 12345 Musterstadt",
                meetingPoint: "Seiteneingang Gemeindesaal",
                departureTime: "",
                transport: "Eigene Anreise",
                costs: "2€ für Kaffee und Gebäck",
                registration: "Nicht erforderlich",
                contact: "Gisela Hartmann (0123-333444)",
                bringAlong: "Aktuelle Handarbeit und Materialien"
            },
            {
                id: 5,
                title: "Ausflug ins Grüne",
                day: "15",
                month: "FEB",
                time: "10:00 Uhr",
                type: "Ausflug",
                description: "Frühlingsausflug zum nahegelegenen Naturpark (wetterabhängig)",
                sortDate: "2025-02-15",
                location: "Naturpark Waldtal",
                address: "Am Waldrand 1, 12346 Waldstadt",
                meetingPoint: "Bushaltestelle Marktplatz",
                departureTime: "9:30 Uhr",
                transport: "Gemeinsame Busfahrt",
                costs: "12€ (Bus + Eintritt)",
                registration: "Bis 10. Februar bei Ingrid",
                contact: "Ingrid Weber (0123-555666)",
                bringAlong: "Festes Schuhwerk und wetterfeste Kleidung"
            }
        ];
        // Termine nach Datum sortieren
        calendarEvents.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
        saveData(); // Beispieldaten speichern
    }
}

function saveData() {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
}

// Gallery-Funktionen
function openGalleryModal() {
    modalBody.innerHTML = `
        <h2>Neuen Ausflug hinzufügen</h2>
        <form id="galleryForm">
            <div class="form-group">
                <label for="galleryTitle">Titel des Ausflugs:</label>
                <input type="text" id="galleryTitle" required>
            </div>
            <div class="form-group">
                <label for="galleryDate">Datum:</label>
                <input type="date" id="galleryDate" required>
            </div>
            <div class="form-group">
                <label for="galleryImage">Bild-URL oder lokaler Pfad:</label>
                <input type="text" id="galleryImage" placeholder="z.B. images/ausflug1.jpg">
            </div>
            <div class="form-group">
                <label for="galleryDescription">Beschreibung:</label>
                <textarea id="galleryDescription" required></textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Ausflug hinzufügen</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
            </div>
        </form>
    `;
    
    const form = document.getElementById('galleryForm');
    form.addEventListener('submit', handleGallerySubmit);
    
    modal.style.display = 'block';
}

function handleGallerySubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('galleryTitle').value;
    const date = document.getElementById('galleryDate').value;
    const image = document.getElementById('galleryImage').value || 'images/placeholder.jpg';
    const description = document.getElementById('galleryDescription').value;
    
    const formattedDate = new Date(date).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const newItem = {
        id: Date.now(),
        title,
        date: formattedDate,
        image,
        description
    };
    
    galleryItems.unshift(newItem);
    saveData();
    renderGallery();
    closeModal();
}

function renderGallery() {
    // Gallery-Grid leeren
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
                ${isAdminMode ? `<button onclick="deleteGalleryItem(${item.id})" class="btn btn-secondary" style="margin-top: 15px; font-size: 14px;">Löschen</button>` : ''}
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

function deleteGalleryItem(id) {
    if (confirm('Möchten Sie diesen Ausflug wirklich löschen?')) {
        galleryItems = galleryItems.filter(item => item.id !== id);
        saveData();
        renderGallery();
    }
}

// Calendar-Funktionen
function openEventModal() {
    modalBody.innerHTML = `
        <h2>Neuen Termin hinzufügen</h2>
        <form id="eventForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="eventTitle">Titel des Termins:</label>
                    <input type="text" id="eventTitle" required>
                </div>
                <div class="form-group">
                    <label for="eventType">Art des Termins:</label>
                    <select id="eventType">
                        <option value="Ausflug">Ausflug</option>
                        <option value="Geburtstag">Geburtstag</option>
                        <option value="Feier">Feier</option>
                        <option value="Treffen">Treffen</option>
                        <option value="Sonstiges">Sonstiges</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="eventDate">Datum:</label>
                    <input type="date" id="eventDate" required>
                </div>
                <div class="form-group">
                    <label for="eventTime">Uhrzeit:</label>
                    <input type="time" id="eventTime">
                </div>
            </div>
            
            <div class="form-group">
                <label for="eventDescription">Beschreibung:</label>
                <textarea id="eventDescription"></textarea>
            </div>
            
            <div class="form-section">
                <h3>📍 Ort & Anfahrt</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventLocation">Veranstaltungsort:</label>
                        <input type="text" id="eventLocation" placeholder="z.B. Restaurant Zur Post">
                    </div>
                    <div class="form-group">
                        <label for="eventAddress">Adresse:</label>
                        <input type="text" id="eventAddress" placeholder="z.B. Marktplatz 8, 12345 Stadt">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventMeetingPoint">Treffpunkt:</label>
                        <input type="text" id="eventMeetingPoint" placeholder="z.B. Haupteingang">
                    </div>
                    <div class="form-group">
                        <label for="eventDepartureTime">Abfahrtszeit:</label>
                        <input type="time" id="eventDepartureTime">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="eventTransport">Anfahrt/Transport:</label>
                    <input type="text" id="eventTransport" placeholder="z.B. Gemeinsame Busfahrt, eigene Anreise">
                </div>
            </div>
            
            <div class="form-section">
                <h3>💰 Organisation</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventCosts">Kosten:</label>
                        <input type="text" id="eventCosts" placeholder="z.B. 15€ pro Person">
                    </div>
                    <div class="form-group">
                        <label for="eventRegistration">Anmeldung:</label>
                        <input type="text" id="eventRegistration" placeholder="z.B. Bis 10. Januar erforderlich">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventContact">Kontaktperson:</label>
                        <input type="text" id="eventContact" placeholder="z.B. Maria Müller (0123-456789)">
                    </div>
                    <div class="form-group">
                        <label for="eventBringAlong">Mitbringen:</label>
                        <input type="text" id="eventBringAlong" placeholder="z.B. Festes Schuhwerk">
                    </div>
                </div>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Termin hinzufügen</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
            </div>
        </form>
    `;
    
    const form = document.getElementById('eventForm');
    form.addEventListener('submit', handleEventSubmit);
    
    modal.style.display = 'block';
}

function handleEventSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const type = document.getElementById('eventType').value;
    const description = document.getElementById('eventDescription').value;
    
    // Extended fields
    const location = document.getElementById('eventLocation').value;
    const address = document.getElementById('eventAddress').value;
    const meetingPoint = document.getElementById('eventMeetingPoint').value;
    const departureTime = document.getElementById('eventDepartureTime').value;
    const transport = document.getElementById('eventTransport').value;
    const costs = document.getElementById('eventCosts').value;
    const registration = document.getElementById('eventRegistration').value;
    const contact = document.getElementById('eventContact').value;
    const bringAlong = document.getElementById('eventBringAlong').value;
    
    const eventDate = new Date(date);
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = eventDate.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase();
    
    const newEvent = {
        id: Date.now(),
        title,
        day,
        month,
        time: time ? `${time} Uhr` : '',
        type,
        description,
        sortDate: date,
        location,
        address,
        meetingPoint,
        departureTime: departureTime ? `${departureTime} Uhr` : '',
        transport,
        costs,
        registration,
        contact,
        bringAlong
    };
    
    calendarEvents.push(newEvent);
    calendarEvents.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
    
    saveData();
    renderCalendar();
    closeModal();
}

function renderCalendar() {
    // Calendar-Grid leeren
    calendarGrid.innerHTML = '';
    
    calendarEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'calendar-item';
        
        // Check if event is in the future and has detailed information
        const eventDate = new Date(event.sortDate);
        const today = new Date();
        const isFuture = eventDate > today;
        const hasDetails = event.location || event.address || event.meetingPoint;
        
        // Add clickable class and cursor if it's a future event with details
        if (isFuture && hasDetails) {
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
                ${isFuture && hasDetails ? '<p class="click-hint">📋 Klicken für Details</p>' : ''}
                ${isAdminMode ? `<button onclick="deleteCalendarEvent(${event.id})" class="btn btn-secondary" style="margin-top: 10px; font-size: 14px;">Löschen</button>` : ''}
            </div>
        `;
        calendarGrid.appendChild(eventItem);
    });
}

function deleteCalendarEvent(id) {
    if (confirm('Möchten Sie diesen Termin wirklich löschen?')) {
        calendarEvents = calendarEvents.filter(event => event.id !== id);
        saveData();
        renderCalendar();
    }
}

// Modal schließen
function closeModal() {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
}

// Event Details Modal Functions
function showEventDetails(event) {
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    const eventDetailsBody = document.getElementById('eventDetailsBody');
    
    eventDetailsBody.innerHTML = `
        <div class="event-details-header">
            <h2>${event.title}</h2>
            <div class="event-date-time">
                <span class="event-main-date">${event.day}. ${event.month.toLowerCase()}</span>
                ${event.time ? `<span class="event-main-time">${event.time}</span>` : ''}
            </div>
        </div>
        
        ${event.description ? `
            <div class="event-section">
                <h3>📝 Beschreibung</h3>
                <p>${event.description}</p>
            </div>
        ` : ''}
        
        ${event.location || event.address ? `
            <div class="event-section">
                <h3>📍 Ort</h3>
                ${event.location ? `<p><strong>Veranstaltungsort:</strong> ${event.location}</p>` : ''}
                ${event.address ? `<p><strong>Adresse:</strong> ${event.address}</p>` : ''}
            </div>
        ` : ''}
        
        ${event.meetingPoint || event.departureTime || event.transport ? `
            <div class="event-section">
                <h3>🚗 Anfahrt & Treffpunkt</h3>
                ${event.meetingPoint ? `<p><strong>Treffpunkt:</strong> ${event.meetingPoint}</p>` : ''}
                ${event.departureTime ? `<p><strong>Abfahrt:</strong> ${event.departureTime}</p>` : ''}
                ${event.transport ? `<p><strong>Transport:</strong> ${event.transport}</p>` : ''}
            </div>
        ` : ''}
        
        ${event.costs || event.registration ? `
            <div class="event-section">
                <h3>💰 Kosten & Anmeldung</h3>
                ${event.costs ? `<p><strong>Kosten:</strong> ${event.costs}</p>` : ''}
                ${event.registration ? `<p><strong>Anmeldung:</strong> ${event.registration}</p>` : ''}
            </div>
        ` : ''}
        
        ${event.contact ? `
            <div class="event-section">
                <h3>📞 Kontakt</h3>
                <p>${event.contact}</p>
            </div>
        ` : ''}
        
        ${event.bringAlong ? `
            <div class="event-section">
                <h3>🎒 Mitbringen</h3>
                <p>${event.bringAlong}</p>
            </div>
        ` : ''}
    `;
    
    eventDetailsModal.style.display = 'block';
}

function closeEventDetails() {
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    eventDetailsModal.style.display = 'none';
}

// Smooth Scrolling für Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Event Details Modal Event Listeners
window.addEventListener('click', function(event) {
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    if (event.target === eventDetailsModal) {
        closeEventDetails();
    }
    
    const adminHelpModal = document.getElementById('adminHelpModal');
    if (event.target === adminHelpModal) {
        closeAdminHelp();
    }
});

// Bilder-Upload Funktion (vereinfacht)
function handleImageUpload() {
    // Diese Funktion könnte erweitert werden, um echte Bild-Uploads zu handhaben
    // Für jetzt verwenden wir Pfade zu lokalen Bildern
    console.log('Bild-Upload-Funktionalität kann hier implementiert werden');
}

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
    const eventType = document.getElementById('eventTypeFilter').value;
    
    filteredCalendarEvents = calendarEvents.filter(event => {
        const matchesSearch = !searchTerm || 
            event.title.toLowerCase().includes(searchTerm) ||
            (event.description && event.description.toLowerCase().includes(searchTerm)) ||
            event.type?.toLowerCase().includes(searchTerm);
            
        const matchesType = !eventType || event.type === eventType;
        
        return matchesSearch && matchesType;
    });
    
    renderFilteredCalendar();
}

// Apply Filters (Gallery)
function applyFilters() {
    performSearch();
}

// Apply Calendar Filters
function applyCalendarFilters() {
    performCalendarSearch();
}

// Clear Filters (Gallery)
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('monthFilter').value = '';
    filteredGalleryItems = [];
    renderGallery();
}

// Clear Calendar Filters
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
                ${isAdminMode ? `<button onclick="deleteGalleryItem(${item.id})" class="btn btn-secondary" style="margin-top: 15px; font-size: 14px;">Löschen</button>` : ''}
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Render Filtered Calendar
function renderFilteredCalendar() {
    const eventsToRender = filteredCalendarEvents.length > 0 ? filteredCalendarEvents : 
                          (document.getElementById('calendarSearchInput').value || 
                           document.getElementById('eventTypeFilter').value) ? [] : calendarEvents;
    
    calendarGrid.innerHTML = '';
    
    if (eventsToRender.length === 0 && (document.getElementById('calendarSearchInput').value || 
        document.getElementById('eventTypeFilter').value)) {
        calendarGrid.innerHTML = '<div class="no-results">Keine Termine gefunden. Versuchen Sie es mit anderen Suchbegriffen.</div>';
        return;
    }
    
    eventsToRender.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'calendar-item';
        
        // Check if event is in the future and has detailed information
        const eventDate = new Date(event.sortDate);
        const today = new Date();
        const isFuture = eventDate > today;
        const hasDetails = event.location || event.address || event.meetingPoint;
        
        // Add clickable class and cursor if it's a future event with details
        if (isFuture && hasDetails) {
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
                ${isFuture && hasDetails ? '<p class="click-hint">📋 Klicken für Details</p>' : ''}
                ${isAdminMode ? `<button onclick="deleteCalendarEvent(${event.id})" class="btn btn-secondary" style="margin-top: 10px; font-size: 14px;">Löschen</button>` : ''}
            </div>
        `;
        calendarGrid.appendChild(eventItem);
    });
}

// Populate Year Filter
function populateYearFilter() {
    const yearFilter = document.getElementById('yearFilter');
    if (!yearFilter) return;
    
    const years = new Set();
    galleryItems.forEach(item => {
        if (item.sortDate) {
            years.add(item.sortDate.split('-')[0]);
        }
    });
    
    const sortedYears = Array.from(years).sort().reverse();
    sortedYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Print Calendar Function
function printCalendar() {
    window.print();
}

// Update render functions to store sortDate for filtering
const originalHandleGallerySubmit = handleGallerySubmit;
function handleGallerySubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('galleryTitle').value;
    const date = document.getElementById('galleryDate').value;
    const image = document.getElementById('galleryImage').value || 'images/placeholder.jpg';
    const description = document.getElementById('galleryDescription').value;
    
    const formattedDate = new Date(date).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const newItem = {
        id: Date.now(),
        title,
        date: formattedDate,
        sortDate: date, // Store original date for filtering
        image,
        description
    };
    
    galleryItems.unshift(newItem);
    saveData();
    renderGallery();
    populateYearFilter(); // Update year filter
    closeModal();
}

// Admin System Functions
function setupAdminSystem() {
    // Setup admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Check if admin mode should be restored from localStorage
    const adminModeExpiry = localStorage.getItem('adminModeExpiry');
    if (adminModeExpiry && new Date().getTime() < parseInt(adminModeExpiry)) {
        const remainingTime = Math.floor((parseInt(adminModeExpiry) - new Date().getTime()) / 1000);
        if (remainingTime > 0) {
            adminTimeRemaining = remainingTime;
            enableAdminMode();
        }
    }
}

function toggleAdminLogin() {
    if (isAdminMode) {
        logoutAdmin();
    } else {
        document.getElementById('adminModal').style.display = 'block';
        document.getElementById('adminPassword').focus();
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        enableAdminMode();
        closeAdminModal();
        document.getElementById('adminPassword').value = '';
    } else {
        // Wrong password
        const passwordInput = document.getElementById('adminPassword');
        passwordInput.style.borderColor = '#ef4444';
        passwordInput.style.background = '#fef2f2';
        passwordInput.value = '';
        passwordInput.placeholder = 'Falsches Passwort - Versuchen Sie es erneut';
        
        setTimeout(() => {
            passwordInput.style.borderColor = '#e5e7eb';
            passwordInput.style.background = 'white';
            passwordInput.placeholder = 'Passwort eingeben...';
        }, 3000);
        
        // Shake animation
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

function enableAdminMode() {
    isAdminMode = true;
    adminTimeRemaining = 1800; // Reset to 30 minutes
    
    // Add admin class to body
    document.body.classList.add('admin-mode');
    
    // Show admin status bar
    document.getElementById('adminStatusBar').style.display = 'block';
    
    // Update admin toggle button
    const adminToggle = document.getElementById('adminToggle');
    adminToggle.textContent = 'Abmelden';
    adminToggle.style.background = 'rgba(239, 68, 68, 0.2)';
    adminToggle.style.borderColor = 'rgba(239, 68, 68, 0.5)';
    
    // Show all admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(element => {
        element.style.display = 'block';
    });
    
    // Start countdown timer
    startAdminTimer();
    
    // Save expiry time to localStorage
    const expiryTime = new Date().getTime() + (adminTimeRemaining * 1000);
    localStorage.setItem('adminModeExpiry', expiryTime.toString());
    
    console.log('Admin-Modus aktiviert');
}

function logoutAdmin() {
    isAdminMode = false;
    
    // Remove admin class from body
    document.body.classList.remove('admin-mode');
    
    // Hide admin status bar
    document.getElementById('adminStatusBar').style.display = 'none';
    
    // Reset admin toggle button
    const adminToggle = document.getElementById('adminToggle');
    adminToggle.textContent = 'Admin';
    adminToggle.style.background = 'transparent';
    adminToggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    
    // Hide all admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Clear timer
    if (adminTimer) {
        clearInterval(adminTimer);
        adminTimer = null;
    }
    
    // Clear localStorage
    localStorage.removeItem('adminModeExpiry');
    
    console.log('Admin-Modus beendet');
}

function startAdminTimer() {
    if (adminTimer) {
        clearInterval(adminTimer);
    }
    
    adminTimer = setInterval(() => {
        adminTimeRemaining--;
        updateTimerDisplay();
        
        // Update localStorage
        const expiryTime = new Date().getTime() + (adminTimeRemaining * 1000);
        localStorage.setItem('adminModeExpiry', expiryTime.toString());
        
        if (adminTimeRemaining <= 0) {
            logoutAdmin();
            alert('Admin-Sitzung abgelaufen. Bitte melden Sie sich erneut an.');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(adminTimeRemaining / 60);
    const seconds = adminTimeRemaining % 60;
    const timerDisplay = document.getElementById('adminTimer');
    if (timerDisplay) {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning colors
        if (adminTimeRemaining <= 300) { // Last 5 minutes
            timerDisplay.style.background = 'rgba(239, 68, 68, 0.3)';
            timerDisplay.style.color = '#fef2f2';
        } else if (adminTimeRemaining <= 600) { // Last 10 minutes
            timerDisplay.style.background = 'rgba(245, 158, 11, 0.3)';
            timerDisplay.style.color = '#fef3c7';
        }
    }
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// Image Help Functions
function openImageHelp() {
    document.getElementById('imageHelpModal').style.display = 'block';
}

function closeImageHelp() {
    document.getElementById('imageHelpModal').style.display = 'none';
}

// Admin Help Modal Functions
function openAdminHelp() {
    document.getElementById('adminHelpModal').style.display = 'block';
}

function closeAdminHelp() {
    document.getElementById('adminHelpModal').style.display = 'none';
}

function showHelpTab(tabName) {
    // Hide all help sections
    const sections = document.querySelectorAll('.help-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.help-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected section
    document.getElementById(`help-${tabName}`).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Enhanced delete functions with admin confirmation
const originalDeleteGalleryItem = deleteGalleryItem;
function deleteGalleryItem(id) {
    if (!isAdminMode) {
        alert('Sie müssen als Admin angemeldet sein, um Inhalte zu löschen.');
        return;
    }
    
    const item = galleryItems.find(item => item.id === id);
    if (item && confirm(`Möchten Sie den Ausflug "${item.title}" wirklich löschen?\n\nDiese Aktion kann nicht rückgängig gemacht werden.`)) {
        galleryItems = galleryItems.filter(item => item.id !== id);
        saveData();
        if (filteredGalleryItems.length > 0) {
            renderFilteredGallery();
        } else {
            renderGallery();
        }
        console.log(`Ausflug "${item.title}" gelöscht`);
    }
}

const originalDeleteCalendarEvent = deleteCalendarEvent;
function deleteCalendarEvent(id) {
    if (!isAdminMode) {
        alert('Sie müssen als Admin angemeldet sein, um Termine zu löschen.');
        return;
    }
    
    const event = calendarEvents.find(event => event.id === id);
    if (event && confirm(`Möchten Sie den Termin "${event.title}" wirklich löschen?\n\nDiese Aktion kann nicht rückgängig gemacht werden.`)) {
        calendarEvents = calendarEvents.filter(event => event.id !== id);
        saveData();
        if (filteredCalendarEvents.length > 0) {
            renderFilteredCalendar();
        } else {
            renderCalendar();
        }
        console.log(`Termin "${event.title}" gelöscht`);
    }
}

 