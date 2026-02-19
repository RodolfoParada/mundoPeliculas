document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.item'));
    const paginacionContainer = document.getElementById('paginacion');
    const letrasLinks = document.querySelectorAll('#letras a');
    
    const itemsPerPage = 6;
    let currentPage = 1;

    function displayGallery() {
        items.forEach(item => item.style.display = 'none');

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        const itemsToShow = items.slice(start, end);
        itemsToShow.forEach(item => item.style.display = 'block');

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        if (!paginacionContainer) return;
        
        paginacionContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('a');
            btn.href = "#";
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayGallery();
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            paginacionContainer.appendChild(btn);
        }
    }

    letrasLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Si el primer link es '#', index 1 es 'A', index 2 es 'B', etc.
            if (link.textContent === '#') {
                currentPage = 1;
            } else {
                currentPage = index; 
            }

            const totalPages = Math.ceil(items.length / itemsPerPage);
            if (currentPage > totalPages) {
                alert("Esta página (Letra " + link.textContent + ") aún no tiene películas.");
                currentPage = 1;
            }
            displayGallery();
        });
    });

    displayGallery();
});