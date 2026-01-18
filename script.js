console.log("Página cargada correctamente.");

// Precios base para todas las secciones
const preciosBase = {
    'Sivori Alta': 110.050,
    'Campo Delantero': 160.000,
    'Campo General': 130.000
};

// Función para calcular el multiplicador según la cantidad de entradas
function obtenerMultiplicador(cantidad) {
    const cantidadNum = parseInt(cantidad) || 1;
    if (cantidadNum === 2) {
        return 1.8178100863244;
    } else if (cantidadNum === 3) {
        return 2.8178100863244;
    }
    return 1;
}

// Función para actualizar el precio basado en cantidad
function calcularPrecioConCantidad(nombreSeccion, cantidad) {
    const precioBase = preciosBase[nombreSeccion] || 0;
    const multiplicador = obtenerMultiplicador(cantidad);
    return precioBase * multiplicador;
}

// Obtener la cantidad de entradas guardada
function obtenerCantidadEntradas() {
    return localStorage.getItem('cantidadEntradas') || '1';
}

// ============ FUNCIONES PARA MODAL DE VIDEOS ============
function abrirVideoModal(event) {
    event.stopPropagation();
    const videoCard = event.currentTarget;
    const video = videoCard.querySelector('video');
    const src = video.querySelector('source').src;
    
    console.log("Abriendo video:", src);
    
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!modal || !modalVideo) {
        console.error("Modal no encontrado");
        return;
    }
    
    modalVideo.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal cuando termine el video
    modalVideo.onended = function() {
        cerrarVideoModal();
    };
}

function cerrarVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (modal) {
        modal.classList.remove('active');
    }
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic en el fondo
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(event) {
            if (event.target === videoModal) {
                cerrarVideoModal();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarVideoModal();
        }
    });
});

// ============ FUNCIONES PARA MODAL DE IMÁGENES ============
function abrirImageModal(imagenSrc) {
    // Crear modal si no existe
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = 
            <div class="image-modal-content">
                <button class="modal-close-btn" onclick="cerrarImageModal()">&times;</button>
                <img id="modalImage" src="" alt="Imagen ampliada" style="max-width: 100%; max-height: 90vh; object-fit: contain;">
            </div>
        ;
        document.body.appendChild(modal);
    }
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imagenSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// Cerrar modal de imagen al hacer clic en el fondo
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const imageModal = document.getElementById('imageModal');
        if (imageModal && event.target === imageModal) {
            cerrarImageModal();
        }
    });
});
