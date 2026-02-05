/* assets/js/explorer.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize the page
    renderBooks(booksData);
    setupEventListeners();
});

// Function to display books on the screen
function renderBooks(booksToRender) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = ''; // Clear existing content

    if (booksToRender.length === 0) {
        grid.innerHTML = '<p>No books found matching your criteria.</p>';
        return;
    }

    booksToRender.forEach(book => {
        // Create the card HTML dynamically
        const card = document.createElement('div');
        card.className = 'book-card';
        // We add an onclick event to open the modal
        card.onclick = () => openModal(book);

        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p><small>${book.genre}</small></p>
            <button class="btn-primary" style="margin-top:10px;">View Details</button>
        `;

        grid.appendChild(card);
    });
}

// Function to handle Search and Filter
function setupEventListeners() {
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');

    // Helper function to filter data
    function filterBooks() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value;

        const filtered = booksData.filter(book => {
            // Check matches for Title OR Author
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm);
            // Check match for Genre (or if "all" is selected)
            const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });

        renderBooks(filtered);
    }

    // Attach events
    searchBar.addEventListener('input', filterBooks);
    genreFilter.addEventListener('change', filterBooks);
}

// Function to Open the Pop-up Modal
function openModal(book) {
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');

    // Fill modal with specific book data
    modalBody.innerHTML = `
        <div style="text-align:center;">
            <img src="${book.cover}" style="height:200px; border-radius:10px;">
            <h2>${book.title}</h2>
            <h3>by ${book.author}</h3>
            <p><strong>Genre:</strong> ${book.genre} | <strong>Length:</strong> ${book.length}</p>
            <p><strong>Rating:</strong> ⭐ ${book.rating}/5</p>
        </div>
        <hr style="margin: 15px 0;">
        <p><strong>Synopsis:</strong> ${book.synopsis}</p>
        
        <div style="margin-top:15px;">
            <strong>Sequels/Related:</strong>
            <ul>
                ${book.sequels.length > 0 ? book.sequels.map(s => `<li>${s}</li>`).join('') : '<li>No sequels listed.</li>'}
            </ul>
        </div>
    `;

    // Show the modal
    modal.style.display = 'flex';
}

// function to Close the Modal (Global scope needed for the 'X' button)
// We attach this to the window object so it's always accessible
const closeBtn = document.querySelector('.close-btn');
const modal = document.getElementById('book-modal');

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// close if user clicks outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});