document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const container = document.querySelector('.container');
    
    // Create no results message if it doesn't exist
    let noResultsMessage = document.querySelector('.no-results');
    if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results';
        noResultsMessage.textContent = 'No results found';
        noResultsMessage.style.display = 'none';
        container.appendChild(noResultsMessage);
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const listItems = document.querySelectorAll('li');
        const sections = document.querySelectorAll('h2, h2 + p, h2 + ul');
        let hasResults = false;

        // If search is empty, show everything
        if (!searchTerm) {
            listItems.forEach(item => item.style.display = '');
            sections.forEach(section => section.style.display = '');
            noResultsMessage.style.display = 'none';
            return;
        }

        // Hide all sections initially
        sections.forEach(section => section.style.display = 'none');

        // Search through items
        listItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const link = item.querySelector('a');
            const section = item.closest('ul');
            const heading = section?.previousElementSibling;
            const description = heading?.previousElementSibling;

            if (text.includes(searchTerm)) {
                // Show matching item and its section
                item.style.display = '';
                if (section) section.style.display = '';
                if (heading) heading.style.display = '';
                if (description && description.tagName === 'P') description.style.display = '';
                hasResults = true;

                // Highlight matching text
                if (link) {
                    const originalText = link.textContent;
                    const regex = new RegExp(searchTerm, 'gi');
                    link.innerHTML = originalText.replace(regex, match => `<span class="highlight">${match}</span>`);
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on Enter key press
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Live search with debouncing
    let debounceTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(performSearch, 300);
    });
});
