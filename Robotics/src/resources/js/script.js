const menuToggle = document.getElementById('menu-toggle');
const popupMenu = document.getElementById('popup-menu');

function toggleMenu() {
    if (popupMenu.classList.contains('show')) {
        popupMenu.classList.remove('show');
        setTimeout(() => popupMenu.classList.add('hidden'), 300);
    } else {
        popupMenu.classList.remove('hidden');
        setTimeout(() => popupMenu.classList.add('show'), 10);
    }
}

menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

popupMenu.addEventListener('click', (e) => {
    if (e.target === popupMenu) {
        toggleMenu();
    }
});

const searchToggle = document.getElementById('search-toggle');
const searchPopup = document.getElementById('search-popup');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const pagesData = [
    { id: 'home', title: 'Home', content: 'Welcome to the Mechalorians. This is the homepage content.' },
    { id: 'about', title: 'About Us', content: 'Put your about us text here later.' },
    { id: 'events', title: 'Events', content: 'Event info here later.' },
    { id: 'achievements', title: 'Achievements', content: 'Put your achievements content here later.' },
    { id: 'sponsorship', title: 'Sponsorship', content: 'Put your sponsorship information here later.' },
    { id: 'contact', title: 'Contact Us', content: 'Put your contact info here later.' },
];

function toggleSearch() {
    if (searchPopup.classList.contains('show')) {
        searchPopup.classList.remove('show');
        setTimeout(() => searchPopup.classList.add('hidden'), 400);
    } else {
        searchPopup.classList.remove('hidden');
        setTimeout(() => {
            searchPopup.classList.add('show');
            searchInput.focus();
        }, 10);
    }
}

function updateSearchResults(query) {
    const q = query.trim().toLowerCase();
    searchResults.innerHTML = '';
    
    if (!q) {
        searchResults.innerHTML = '<li class="no-results">Start typing to search...</li>';
        return;
    }

    const filtered = pagesData.filter(page =>
        page.title.toLowerCase().includes(q) || page.content.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<li class="no-results">No results found.</li>';
        return;
    }

    filtered.forEach(page => {
        const li = document.createElement('li');
        li.textContent = page.title;
        li.addEventListener('click', () => {
            loadPage(page.id);
            toggleSearch();
        });
        searchResults.appendChild(li);
    });
}

searchToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearch();
});

document.addEventListener('click', (e) => {
    if (!searchPopup.contains(e.target) && e.target !== searchToggle) {
        if (searchPopup.classList.contains('show')) toggleSearch();
    }
    if (!popupMenu.contains(e.target) && e.target !== menuToggle) {
        if (popupMenu.classList.contains('show')) toggleMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchPopup.classList.contains('show')) {
            toggleSearch();
        }
        if (popupMenu.classList.contains('show')) {
            toggleMenu();
        }
    }
});

searchInput.addEventListener('input', (e) => {
    updateSearchResults(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    updateSearchResults('');
});