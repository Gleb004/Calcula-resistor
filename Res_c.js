let cnt = 1;
val = [{f: 0, s: 0}];
val.splice(0, 1);
let curval = 1000;
let prec = 0.01;
let vice = 0;
let values = ['Om', 'KOm', 'MOm', 'GOm', 'TOm'];
let remcolour = {'Om':'green', 'KOm':'red', 'MOm':'gold', 'GOm':'violet', 'TOm':'blue'};
let dres = {'Om':1, 'KOm':1000, 'MOm':1000000, 'GOm':1000000000, 'TOm':1000000000000};

function smallerthan(a, b) {
    return a - b;
}

function correct() {
    if ((event.key < "0" || event.key > "9") && event.key != "." && event.key != "Backspace")
        event.preventDefault();
}

window.addEventListener("keydown", key => {
    if (event.key == "Enter") {
        Add();
        document.getElementById('hidden').style.display = "none";
    } // enter listener
});

function Add() {
    document.getElementById('hidden').style.display = "none";
    let x = document.getElementById("Input" + cnt).value;
    let ch = 0;
    for (let i = 0; i < x.length; i++) {
        if (x[i] == '.') ch++;
        if ((x[i] < "0" || x[i] > "9") && x[i] != ".") ch = -100;
    }
    if (!(x[0] == '.' || x[x.length - 1] == '.' || ch > 1 || x.length == 0 || ch < 0)) {
        let clone1 = document.getElementById("Input" + cnt).cloneNode(true);
        clone1.id = "Input" + (cnt + 1);
        clone1.style.marginTop = "1%";
        clone1.value = '';
        let clone2 = document.getElementById("Type" + cnt).cloneNode(true);
        clone2.id = "Type" + (cnt + 1);
        let clone3 = document.getElementById("Add" + cnt).cloneNode(true);
        clone3.id = "Add" + (cnt + 1);
        if (cnt != 1) document.getElementById("Add" + cnt).innerHTML = 'Delete';
        document.getElementById("Add" + cnt).style.borderColor = 'red';
        document.getElementById('Add' + cnt).addEventListener('click', event => {
            x = event.target.id.replace('Add', '');
            document.getElementById('All' + x).remove();
        });
        let p = document.createElement("div");
        p.append(clone1); p.append(clone2); p.append(clone3);
        p.id = "All" + (cnt + 1);
        document.getElementById("clone_field").append(p);
        cnt += 1;
        document.getElementById('Input' + cnt).focus();
    } else alert('Typo in input ' + x);
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

function calc() {
    if (cnt <= 2) return;
    let x = 0;
    for (let i = 1; i <= cnt; i++) {
        try {
            let k = document.getElementById('Input' + i).value;
        }
        catch (e) {continue;}
        if (k == 0) continue;
        let r = document.getElementById('Type' + i).innerHTML;
        x += 1 / (k * dres[r]);
    }
    x = 1 / x;
    x = Math.round(x * 100000) / 100000;
    let clone1 = document.getElementById("Input" + cnt).cloneNode(true);
    clone1.id = "Input" + (cnt + 1);
    clone1.disabled = true;
    clone1.style.marginTop = "2%";
    clone1.classList.add('answ1');
    let rem = 0;
    for (let sel = 0; sel < 5; sel++) {
        if ((x / dres[values[sel]]) == Math.ceil(x / dres[values[sel]])) rem = sel;
    }
    clone1.value = 'Total parallel resistment = ' + (x / dres[values[rem]]) + ' ' + values[rem];
    document.getElementById("Type" + cnt).disabled = true;
    document.getElementById("Input" + cnt).disabled = true;
    document.getElementById("Add" + cnt).disabled = true;
    if (document.getElementById("Input" + cnt).vaue == undefined) {
        document.getElementById('All' + cnt).remove();
        cnt -= 1;
    }
    let p = document.createElement("div");
    p.append(clone1);
    p.id = "All" + (cnt + 1);
    document.getElementById("clone_field").append(p);
    cnt += 1;
}

function remove() {
    while (cnt != 1){
        document.getElementById('All' + cnt).remove();
        cnt--;
    }
    document.getElementById('hidden').style.display = "none";
    Add();
}

function Type(key) {
    if (document.getElementById('hidden').style.display == 'block') {
        document.getElementById('hidden').style.display = "none";
        return;
    }
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
    document.getElementById('Type' + cnt).innerHTML = key.innerHTML;
    document.getElementById('Type' + cnt).style.borderColor = remcolour[key.innerHTML];
    document.getElementById('hidden').style.display = "none";
}


Add();













