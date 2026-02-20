document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.item'));
    const paginacionContainer = document.getElementById('paginacion');
    const letrasLinks = document.querySelectorAll('#letras a');
    
    // Identificador único por página (ej: /estrenos.html)
    const pageId = window.location.pathname; 
    const itemsPerPage = 6;

    // Recuperamos la página específica de ESTE html
    let currentPage = parseInt(localStorage.getItem('ultimaPagina_' + pageId)) || 1;

    function displayGallery() {
        items.forEach(item => item.style.display = 'none');
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = items.slice(start, end);
        
        itemsToShow.forEach(item => item.style.display = 'block');

        // Guardamos la página usando el ID único
        localStorage.setItem('ultimaPagina_' + pageId, currentPage);

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        if (!paginacionContainer) return;
        paginacionContainer.innerHTML = '';

        // Botón Anterior
        const btnPrev = document.createElement('a');
        btnPrev.href = "#";
        btnPrev.innerHTML = "&laquo; Anterior";
        btnPrev.className = (currentPage === 1) ? "disabled" : "";
        btnPrev.onclick = (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayGallery();
                window.scrollTo(0,0);
            }
        };
        paginacionContainer.appendChild(btnPrev);

        // Texto de página
        const info = document.createElement('span');
        info.textContent = ` Página ${currentPage} de ${totalPages} `;
        paginacionContainer.appendChild(info);

        // Botón Siguiente
        const btnNext = document.createElement('a');
        btnNext.href = "#";
        btnNext.innerHTML = "Siguiente &raquo;";
        btnNext.className = (currentPage === totalPages) ? "disabled" : "";
        btnNext.onclick = (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayGallery();
                window.scrollTo(0,0);
            }
        };
        paginacionContainer.appendChild(btnNext);
    }

    // Lógica para el menú de letras (si existe en el HTML)
    if (letrasLinks.length > 0) {
        letrasLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.textContent === '#') {
                    currentPage = 1;
                } else {
                    currentPage = index; 
                }
                
                const totalPages = Math.ceil(items.length / itemsPerPage);
                if (currentPage > totalPages) {
                    currentPage = 1;
                }
                displayGallery();
            });
        });
    }

    displayGallery();
});