// Data
const AMENITIES = [
    "WiFi",
    "Attached Bathroom",
    "Shared Bathroom",
    "Hot Water",
    "Balcony",
    "Natural Light",
    "Air Conditioning",
    "Fan",
    "Storage",
    "Kitchen Access",
    "Home Food Available",
    "Nearby Restaurants",
    "Workspace",
    "Desk & Chair",
    "Washing Machine",
    "Housekeeping",
    "Drinking Water",
    "Power Backup"
];

const STAYS = [
    {
        id: "1",
        name: "Private Stay — Executive Room",
        type: "private",
        capacity: 2,
        price: 299,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyNTQyNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Attached Bathroom", "Air Conditioning", "Balcony", "Hot Water"],
        description: "Comfortable private room suitable for short or extended stays",
        floor: 5
    },
    {
        id: "2",
        name: "Shared Stay — Modern Room",
        type: "shared",
        capacity: 4,
        price: 99,
        image: "https://images.unsplash.com/photo-1703355685952-03ed19f70f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25mZXJlbmNlJTIwcm9vbXxlbnwxfHx8fDE3NjI1MzI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Shared Bathroom", "Natural Light", "Storage", "Fan"],
        description: "Affordable shared accommodation with essential amenities",
        floor: 3
    },
    {
        id: "3",
        name: "Family Stay — Spacious Suite",
        type: "family",
        capacity: 6,
        price: 399,
        image: "https://images.unsplash.com/photo-1560821630-1a7c45c3286e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjI1MzM4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Kitchen Access", "Washing Machine", "Balcony", "Hot Water"],
        description: "Spacious family accommodation with kitchen and multiple beds",
        floor: 2
    },
    {
        id: "4",
        name: "Studio Stay — Compact Living",
        type: "studio",
        capacity: 2,
        price: 199,
        image: "https://images.unsplash.com/photo-1663186867803-bd547d4bd5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBzdWl0ZSUyMHJvb218ZW58MXx8fHwxNzYyNTg5OTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Attached Bathroom", "Workspace", "Air Conditioning", "Kitchen Access"],
        description: "Modern studio with workspace, perfect for working professionals",
        floor: 4
    },
    {
        id: "5",
        name: "Long-term Stay — Furnished Flat",
        type: "longterm",
        capacity: 3,
        price: 179,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyNTQyNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Kitchen Access", "Washing Machine", "Housekeeping", "Power Backup"],
        description: "Fully furnished flat ideal for extended stays with all amenities",
        floor: 1
    },
    {
        id: "6",
        name: "Private Stay — Deluxe Room",
        type: "private",
        capacity: 2,
        price: 249,
        image: "https://images.unsplash.com/photo-1560821630-1a7c45c3286e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjI1MzM4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        amenities: ["WiFi", "Attached Bathroom", "Natural Light", "Balcony", "Home Food Available"],
        description: "Comfortable deluxe room with home food service available",
        floor: 6
    }
];

// State
let filters = {
    type: 'all',
    minCapacity: 0,
    maxPrice: 500,
    amenities: []
};

let savedStays = JSON.parse(localStorage.getItem('savedStays')) || [];
let selectedStay = null;

// Helper Functions
function getTypeLabel(type) {
    const typeMap = {
        'private': 'Private Stay',
        'shared': 'Shared Stay',
        'family': 'Family Stay',
        'studio': 'Studio Stay',
        'longterm': 'Long-term Stay'
    };
    return typeMap[type] || type;
}

function getFloorLabel(floor) {
    if (floor === 1) return 'Ground floor access';
    return `${floor}th Floor (lift available)`;
}

// Filter Functions
function applyFilters() {
    const filtered = STAYS.filter(stay => {
        if (filters.type !== 'all' && stay.type !== filters.type) return false;
        if (stay.capacity < filters.minCapacity) return false;
        if (stay.price > filters.maxPrice) return false;
        if (filters.amenities.length > 0) {
            const hasAllAmenities = filters.amenities.every(amenity => 
                stay.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }
        return true;
    });

    renderStays(filtered);
    updateResultsCount(filtered.length);
}

function updateResultsCount(count) {
    const resultsText = document.getElementById('results-text');
    resultsText.textContent = `Showing ${count} of ${STAYS.length} stays`;
    
    const noResults = document.getElementById('no-results');
    const staysGrid = document.getElementById('stays-grid');
    
    if (count === 0) {
        noResults.style.display = 'block';
        staysGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        staysGrid.style.display = 'grid';
    }
}

function resetFilters() {
    filters = {
        type: 'all',
        minCapacity: 0,
        maxPrice: 500,
        amenities: []
    };
    
    document.getElementById('type-filter').value = 'all';
    document.getElementById('guests-filter').value = 0;
    document.getElementById('price-filter').value = 500;
    document.getElementById('guests-value').textContent = '0 guests';
    document.getElementById('price-value').textContent = '₹500/day';
    
    // Uncheck all amenities
    const checkboxes = document.querySelectorAll('#amenities-list input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    applyFilters();
}

// Render Functions
function renderAmenityFilters() {
    const amenitiesList = document.getElementById('amenities-list');
    amenitiesList.innerHTML = AMENITIES.map(amenity => `
        <div class="amenity-item">
            <input type="checkbox" id="amenity-${amenity.replace(/\s+/g, '-')}" value="${amenity}">
            <label for="amenity-${amenity.replace(/\s+/g, '-')}">${amenity}</label>
        </div>
    `).join('');
    
    // Add event listeners
    amenitiesList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                filters.amenities.push(e.target.value);
            } else {
                filters.amenities = filters.amenities.filter(a => a !== e.target.value);
            }
            applyFilters();
        });
    });
}

function renderStays(stays) {
    const staysGrid = document.getElementById('stays-grid');
    staysGrid.innerHTML = stays.map(stay => `
        <div class="stay-card">
            <div class="stay-image-container">
                <img src="${stay.image}" alt="${stay.name}" class="stay-image">
                <span class="stay-badge">${getTypeLabel(stay.type)}</span>
            </div>
            <div class="stay-content">
                <h3 class="stay-name">${stay.name}</h3>
                <p class="stay-description">${stay.description}</p>
                <div class="stay-info">
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <span>Up to ${stay.capacity} ${stay.capacity === 1 ? 'guest' : 'guests'}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-pin"></i>
                        <span>${getFloorLabel(stay.floor)}</span>
                    </div>
                </div>
                <div class="amenities-preview">
                    ${stay.amenities.slice(0, 3).map(amenity => `
                        <span class="badge">${amenity}</span>
                    `).join('')}
                    ${stay.amenities.length > 3 ? `<span class="badge">+${stay.amenities.length - 3} more</span>` : ''}
                </div>
            </div>
            <div class="stay-footer">
                <div class="price-section">
                    <div>
                        <div class="price-main">
                            <span class="price-amount">₹${stay.price}</span>
                            <span class="price-period">per day</span>
                        </div>
                        <p class="price-note">Lower rates for longer stays</p>
                    </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="openModal('${stay.id}')">
                    View stay details
                </button>
            </div>
        </div>
    `).join('');
}

function renderSavedStays() {
    const container = document.getElementById('saved-stays-container');
    
    if (savedStays.length === 0) {
        container.innerHTML = `
            <div class="saved-empty">
                <i class="fas fa-calendar"></i>
                <h3>No saved stays yet</h3>
                <p>Start by browsing available stays</p>
            </div>
        `;
        return;
    }
    
    const upcoming = savedStays.filter(s => new Date(s.startDate) >= new Date());
    const past = savedStays.filter(s => new Date(s.startDate) < new Date());
    
    let html = '';
    
    if (upcoming.length > 0) {
        html += `
            <div class="saved-section">
                <h2>Upcoming Stays</h2>
                <div class="saved-grid">
                    ${upcoming.map(booking => renderSavedCard(booking, true)).join('')}
                </div>
            </div>
        `;
    }
    
    if (past.length > 0) {
        html += `
            <div class="saved-section">
                <h2>Past Stays</h2>
                <div class="alert">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>These stays have already occurred</span>
                </div>
                <div class="saved-grid">
                    ${past.map(booking => renderSavedCard(booking, false)).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function renderSavedCard(booking, isUpcoming) {
    const stay = STAYS.find(s => s.id === booking.stayId);
    if (!stay) return '';
    
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    return `
        <div class="saved-card ${isUpcoming ? '' : 'past'}">
            <div class="saved-card-header">
                <h4>${booking.stayName}</h4>
                <span class="badge ${isUpcoming ? 'badge-upcoming' : 'badge-completed'}">
                    ${isUpcoming ? 'Upcoming' : 'Completed'}
                </span>
            </div>
            <div class="saved-card-content">
                <div class="saved-info-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(startDate)} - ${formatDate(endDate)}</span>
                </div>
                <div class="saved-info-item">
                    <i class="fas fa-users"></i>
                    <span>${booking.guests} ${booking.guests === 1 ? 'guest' : 'guests'}</span>
                </div>
                <div class="saved-info-item">
                    <i class="fas fa-map-pin"></i>
                    <span>${getFloorLabel(stay.floor)}</span>
                </div>
                <div class="saved-total">
                    <div class="summary-row">
                        <span>Total</span>
                        <span class="price-text">₹${booking.totalPrice}</span>
                    </div>
                </div>
                <div class="amenities-preview">
                    ${stay.amenities.slice(0, 3).map(amenity => `
                        <span class="badge">${amenity}</span>
                    `).join('')}
                </div>
                ${isUpcoming ? `
                    <button class="btn btn-danger btn-full" onclick="cancelBooking('${booking.id}')">
                        <i class="fas fa-trash"></i>
                        Cancel Booking
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Modal Functions
function openModal(stayId) {
    selectedStay = STAYS.find(s => s.id === stayId);
    if (!selectedStay) return;
    
    document.getElementById('modal-title').textContent = `Stay Information — ${selectedStay.name}`;
    document.getElementById('modal-type').textContent = getTypeLabel(selectedStay.type);
    document.getElementById('modal-capacity').textContent = `Up to ${selectedStay.capacity} ${selectedStay.capacity === 1 ? 'guest' : 'guests'}`;
    document.getElementById('modal-price').textContent = `₹${selectedStay.price}`;
    
    // Populate guest options
    const guestsSelect = document.getElementById('modal-guests');
    guestsSelect.innerHTML = Array.from({length: selectedStay.capacity}, (_, i) => i + 1)
        .map(num => `<option value="${num}">${num} ${num === 1 ? 'person' : 'people'}</option>`)
        .join('');
    
    // Populate amenities
    const amenitiesBadges = document.getElementById('modal-amenities');
    amenitiesBadges.innerHTML = selectedStay.amenities
        .map(amenity => `<span class="badge">${amenity}</span>`)
        .join('');
    
    // Reset dates
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('booking-summary').style.display = 'none';
    
    document.getElementById('stay-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('stay-modal').classList.remove('active');
    selectedStay = null;
}

function updateBookingSummary() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const guests = document.getElementById('modal-guests').value;
    
    if (!startDate || !endDate || !selectedStay) {
        document.getElementById('booking-summary').style.display = 'none';
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
        document.getElementById('booking-summary').style.display = 'none';
        return;
    }
    
    const total = selectedStay.price * days;
    
    document.getElementById('summary-duration').textContent = `${days} ${days === 1 ? 'day' : 'days'}`;
    document.getElementById('summary-guests').textContent = `${guests} ${guests === '1' ? 'person' : 'people'}`;
    document.getElementById('summary-total').textContent = `₹${total}`;
    
    document.getElementById('booking-summary').style.display = 'block';
    
    // Enable/disable confirm button
    document.getElementById('confirm-btn').disabled = false;
}

function confirmBooking() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const guests = parseInt(document.getElementById('modal-guests').value);
    
    if (!startDate || !endDate || !selectedStay) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total = selectedStay.price * days;
    
    const booking = {
        id: Date.now().toString(),
        stayId: selectedStay.id,
        stayName: selectedStay.name,
        startDate: startDate,
        endDate: endDate,
        guests: guests,
        totalPrice: total
    };
    
    savedStays.push(booking);
    localStorage.setItem('savedStays', JSON.stringify(savedStays));
    
    closeModal();
    
    // Show success message (you can enhance this)
    alert('Stay saved successfully!');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        savedStays = savedStays.filter(b => b.id !== bookingId);
        localStorage.setItem('savedStays', JSON.stringify(savedStays));
        renderSavedStays();
    }
}

// Tab Functions
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'browse') {
        document.getElementById('browse-tab').classList.add('active');
    } else {
        document.getElementById('saved-tab').classList.add('active');
        renderSavedStays();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    renderAmenityFilters();
    renderStays(STAYS);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Filter events
    document.getElementById('type-filter').addEventListener('change', (e) => {
        filters.type = e.target.value;
        applyFilters();
    });
    
    document.getElementById('guests-filter').addEventListener('input', (e) => {
        filters.minCapacity = parseInt(e.target.value);
        const guestsText = filters.minCapacity === 1 ? 'guest' : 'guests';
        document.getElementById('guests-value').textContent = `${filters.minCapacity} ${guestsText}`;
        applyFilters();
    });
    
    document.getElementById('price-filter').addEventListener('input', (e) => {
        filters.maxPrice = parseInt(e.target.value);
        document.getElementById('price-value').textContent = `₹${filters.maxPrice}/day`;
        applyFilters();
    });
    
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Modal events
    document.getElementById('start-date').addEventListener('change', updateBookingSummary);
    document.getElementById('end-date').addEventListener('change', updateBookingSummary);
    document.getElementById('modal-guests').addEventListener('change', updateBookingSummary);
    
    // Close modal on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').setAttribute('min', today);
    document.getElementById('end-date').setAttribute('min', today);
});
