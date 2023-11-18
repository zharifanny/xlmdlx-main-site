//reading.js
window.onload = function() {
    // Menggunakan XMLHttpRequest untuk membaca file teks
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'message.txt', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var isiFileTeks = xhr.responseText;
            document.getElementById('hasil').textContent = isiFileTeks;
        }
    };
    xhr.send();
};

//type.js
var typed5 = new Typed('#element', {
    strings: ['khindy <i>zharifany</i>', '<strong>forssellfritz</strong>', 'based on reality', '<b>xlmdlx</b>', 'pacitan', 'kota yogyakarta', 'karimun', 'compton', 'thv', '<s>peaceminusone</s>',
        'a ▀▀▀▀▀▀▀▀', 'bright character','california','sacramento','marshall mathers', 'morii aimi', 'baskara putra','<strong>d.o</strong>', 'aftermath', 'synchronize','masuk-e','march 4th','14th season','pesawat kertas 365 hari','misuh, monolog, mokok','searchlight',],
    typeSpeed: 0,
    backSpeed: 0,
    typeSpeed: 40,
    cursorChar: '_',
    shuffle: true,
    smartBackspace: false,
    loop: true
});