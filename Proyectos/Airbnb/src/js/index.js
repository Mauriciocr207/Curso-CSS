(function() {
    const inputsDates = document.querySelectorAll('input[type="date"]');
    inputsDates.forEach( input => {
        input.style.color = '#686868';
        function changeColor() {
            input.style.color = '#e8505b';
            console.log('hola');
            input.removeEventListener('change', changeColor);
        }
        input.addEventListener('change', changeColor);
    })
})();