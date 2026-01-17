// script.js
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
        return 1.8178100863244; // Aumento de 80%
    } else if (cantidadNum === 3) {
        return 2.8178100863244; // Aumento de 130%
    }
    return 1; // Sin aumento para 1 entrada
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

