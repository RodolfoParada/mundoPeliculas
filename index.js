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

        // Botón Anterior
        const btnPrev = document.createElement('a');
        btnPrev.href = "#";
        btnPrev.innerHTML = "&laquo; Anterior";
        if (currentPage === 1) btnPrev.style.opacity = "0.5"; 
        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayGallery();
            }
        });
        paginacionContainer.appendChild(btnPrev);

        // Indicador de Página Actual (puedes añadir números si prefieres)
        const info = document.createElement('span');
        info.textContent = ` Página ${currentPage} de ${totalPages} `;
        info.style.padding = "0 15px";
        paginacionContainer.appendChild(info);

        // Botón Siguiente
        const btnNext = document.createElement('a');
        btnNext.href = "#";
        btnNext.innerHTML = "Siguiente &raquo;";
        if (currentPage === totalPages) btnNext.style.opacity = "0.5";
        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayGallery();
            }
        });
        paginacionContainer.appendChild(btnNext);
    }

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
                alert("Esta página (Letra " + link.textContent + ") aún no tiene películas.");
                currentPage = 1;
            }
            displayGallery();
        });
    });

    displayGallery();
});