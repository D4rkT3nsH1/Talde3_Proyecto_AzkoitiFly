// JavaScript para actualizar el valor seleccionado en tiempo real
var rangoInput = document.getElementById('rango');
var valorSeleccionadoSpan = document.getElementById('valorSeleccionado');

rangoInput.addEventListener('input', function () {
    valorSeleccionadoSpan.textContent = rangoInput.value;
});