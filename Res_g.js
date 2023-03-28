let remcolour = {'Om':'green', 'KOm':'red', 'MOm':'gold', 'GOm':'violet', 'TOm':'blue'};
let dres = {'Om':1, 'KOm':1000, 'MOm':1000000, 'GOm':1000000000, 'TOm':1000000000000};
let values = ['Om', 'KOm', 'MOm', 'GOm', 'TOm'];
savepos = 0;

function correct() {
    if ((event.key < "0" || event.key > "9") && event.key != "." && event.key != "Backspace")
        event.preventDefault();
}

document.getElementById("Res_c").onclick = function() {
    location.href = "Res_c.html";
}

document.getElementById("Res_g").onclick = function() {
    location.href = "Res_g.html";
}

document.getElementById("3sum1").onclick = function() {
    location.href = "3sum1.html";
}

window.addEventListener("keydown", key => {
    if (event.key == "Enter") calc();
});

function calc() {
    let x = document.getElementById('Input1').value * dres[document.getElementById('Type1').innerHTML];
    let y = document.getElementById('Input2').value * dres[document.getElementById('Type2').innerHTML];
    if (x == 0 || y == 0) {
        alert("Typo");
        return;
    }
    let res = 1 / (1 / x - 1 / y);
    if (res < 0) {
        alert('The total resistance is too small, please check your input');
        return;
    }
    document.getElementById('Input1').disabled = true;
    document.getElementById('Input2').disabled = true;
    document.getElementById('Type1').disabled = true;
    document.getElementById('Type2').disabled = true;
    res = Math.round(res * 10000) / 10000;
    let rem = 0;
    for (let sel = 0; sel < 5; sel++) {
        if ((res / dres[values[sel]]) == Math.ceil(res / dres[values[sel]])) rem = sel;
    }
    document.getElementById('Input3').value = 'Resistance of the 2 resistor = ' + (res / dres[values[rem]]) + ' ' + values[rem];
    document.getElementById('Input3').style.display = 'block';
}

function remove() {
    document.getElementById('Input1').disabled = false;
    document.getElementById('Input2').disabled = false;
    document.getElementById('Type1').disabled = false;
    document.getElementById('Type2').disabled = false;
    document.getElementById('Type1').style.borderColor = 'green';
    document.getElementById('Type2').style.borderColor = 'green';
    document.getElementById('Type1').innerHTML = 'Om';
    document.getElementById('Type2').innerHTML = 'Om';
    document.getElementById('Input1').value = '';
    document.getElementById('Input2').value = '';
    document.getElementById('Input3').style.display = 'none';
}

function Type(key) {
    if (document.getElementById('hidden').style.display == 'block') {
        document.getElementById('hidden').style.display = "none";
        return;
    }
    savepos = key.id;
    elem = document.getElementById(key.id);
    let box = elem.getBoundingClientRect();
    document.getElementById('hidden').style.display = "block";
    document.getElementById('hidden').style.left = box.left + 'px';
    document.getElementById('hidden').style.top = box.top + box.height + (window.screen.height / 100) + 'px';

}

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('hidden').style.display = "none";
});

function set_r(key) {
    document.getElementById(savepos).innerHTML = key.innerHTML;
    document.getElementById(savepos).style.borderColor = remcolour[key.innerHTML];
    document.getElementById('hidden').style.display = "none";
}













