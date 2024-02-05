// JavaScript para actualizar el valor seleccionado en tiempo real
var rangoInput = document.getElementById('rango');
var valorSeleccionadoSpan = document.getElementById('valorSeleccionado');
var bot = document.getElementById("boton");
rangoInput.addEventListener('input', function () {
    valorSeleccionadoSpan.textContent = rangoInput.value;
    bot.textContent = rangoInput.value + " €";
});

