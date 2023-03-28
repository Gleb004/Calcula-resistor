let cnt = 1;
let cnt1 = 1;
val = [{f: 0, s: 0}];
val.splice(0, 1);
let curval = 1000;
let prec = 0.01;
let vice = 0;
delst = 0;
delid = 0;
let remcolour = {'Om':'green', 'KOm':'red', 'MOm':'gold', 'GOm':'violet', 'TOm':'blue'};
let dres = {'Om':1, 'KOm':1000, 'MOm':1000000, 'GOm':1000000000, 'TOm':1000000000000};
let values = ['Om', 'KOm', 'MOm', 'GOm', 'TOm'];

document.getElementById("goal").value = curval;
document.getElementById("precision").value = prec * 100.0;

document.getElementById('goal').addEventListener("keydown", key => {
    if ((event.key < "0" || event.key > "9") && event.key != "." && event.key != "Backspace")
        event.preventDefault(); // only 1 - 9, .
});

window.addEventListener("keydown", key => {
    if (event.key == "Enter") Add(); // enter listener
});

document.getElementById('precision').addEventListener("keydown", key => {
    if ((event.key < "0" || event.key > "9") && event.key != "." && event.key != "Backspace")
        event.preventDefault(); // only 1 - 9, .
});

document.getElementById('minput').addEventListener("keydown", key => {
    if ((event.key < "0" || event.key > "9") && event.key != "." && event.key != "Backspace")
        event.preventDefault(); // only 1 - 9, .
});

function onAction() {
    document.getElementById('hidden').style.display = 'none';
    document.getElementById('back').style.zIndex = '-1';
    if (delid != 0) {
        document.getElementById(delid).style.background = 'white';
        document.getElementById(delid).style.color = 'black';
        document.getElementById(delid).style.borderColor = '#400080';
        delid = 0;
        delst = 0;
    }
}

function smallerthan(a, b) {
    return a - b;
}

function smallerthan1(a, b) {
    return a.f - b.f;
}

function ultimate(i, j, k) { //with three positions creates an answer
    let x = val[i].f + val[j].f + val[k].f;
    let vec = [val[i].s, val[j].s, val[k].s];
    vec.sort(smallerthan);
    let y = "(" + vec[0] + ", " + vec[1] + ", " + vec[2] + ")";
    document.getElementById("In" + val[i].s).style.background = "#400080";
    document.getElementById("In" + val[j].s).style.background = "#400080";
    document.getElementById("In" + val[k].s).style.background = "#400080";
    document.getElementById("In" + val[j].s).style.color = "white";
    document.getElementById("In" + val[i].s).style.color = "white";
    document.getElementById("In" + val[k].s).style.color = "white";
    let clone = document.createElement('div');
    let rem = 0;
    for (let sel = 0; sel < 5; sel++) {
        if ((x / dres[values[sel]]) == Math.ceil(x / dres[values[sel]])) rem = sel;
    }
    clone.innerHTML = y + " = " + x / dres[values[rem]] + ' ' + values[rem];
    clone.classList.add("add");
    document.getElementById('right').append(clone);
    clone.id = 'Answ' + cnt1++;
    let vec1 = [i, j, k];
    vec1.sort(smallerthan);
    val.splice(vec1[2], 1);
    val.splice(vec1[1], 1);
    val.splice(vec1[0], 1);
}

function redo() {//Checks all to find which fits
    if (val.length > 120) {
        alert("Too many elements< please consider reloading the page.");
        return;
    }
    curval = document.getElementById("goal").value * dres[values[document.getElementById('select1').selectedIndex]];
    prec = document.getElementById("precision").value / 100.0;
    for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < val.length; j++) {
            for (let k = 0; k < val.length; k++) {
                if (i == j || j == k || i == k) continue;
                let x = val[i].f + val[j].f + val[k].f;
                if (x >= curval * (1 - prec) && x <= curval * (1 + prec)) {
                    console.log(i, j, k);
                    ultimate(i, j, k);
                    i = j = 0;
                    k = -1;
                }
            }
        }
    }
}

function calc(a) {// the twopointers method
    a = a * dres[document.getElementById('Type1').innerHTML];
    curval = document.getElementById("goal").value * dres[values[document.getElementById('select1').selectedIndex]];
    prec = document.getElementById("precision").value / 100.0;
    let cur = curval - a;
    let l = 0;
    let r = val.length - 1;
    let ad = 0;
    while (r != l) {
        if (val.length < 2) break;
        if (val[l].f + val[r].f >= cur * (1 - prec) && val[l].f + val[r].f <= cur * (1 + prec)) {
            ad  = 1;
            val.push({f: Number(a), s: cnt - 1});
            ultimate(val.length - 1, l, r);
            break;
        }
        if (val[l].f + val[r].f > cur) r--;
        else l++;
    }
    if (ad == 0) val.push({f: Number(a), s: cnt - 1});
    val.sort(smallerthan1);
}

function Add() { //add an elemnet to the answer
    document.getElementById("minput").focus();
    let x = document.getElementById("minput").value;
    let ch = 0;
    for (let i = 0; i < x.length; i++) if (x[i] == '.') ch++; // check if correct
    if (!(x[0] == '.' || x[x.length - 1] == '.' || ch > 1 || x == 0)) {
        let clone = document.createElement("div");
        clone.innerHTML = "(" + cnt++ + ") " + x + " " + document.getElementById('Type1').innerHTML;
        clone.id = "In" + (cnt - 1);
        document.getElementById("minput").value = "";
        clone.classList.add("add");

        clone.addEventListener('click', obj => {
            if (document.getElementById(clone.id).style.background == 'rgb(64, 0, 128)') return;
            document.getElementById('back').style.zIndex = '0';
            if (delid != 0 && delid != clone.id) onAction();

            delid = clone.id;
            if (delst == 1) {
                document.getElementById('back').style.zIndex = '-1';
                clone.remove();
                for (let i = 0; i < val.length; i++) if (("In" + val[i].s) == clone.id) val.splice(i, 1);
                delid = 0;
                delst = 0;
            }else {
                clone.style.borderColor = 'red';
                clone.style.background = 'red';
                clone.style.color = 'white';
                delst += 1;
            }
        });
        document.getElementById("left").append(clone);
        calc(x);
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

function Type() { // the Om button activation
    if (document.getElementById('hidden').style.display == 'block') {
        document.getElementById('hidden').style.display = "none";
        document.getElementById('back').style.zIndex = '-1';
        return;
    }
    elem = document.getElementById('Type1');
    let box = elem.getBoundingClientRect();
    document.getElementById('hidden').style.display = "block";
    document.getElementById('hidden').style.left = box.left + 'px';
    document.getElementById('hidden').style.top = box.top + box.height + (window.screen.height / 100) + 'px';
    document.getElementById('back').style.zIndex = '9';

    document.getElementById(delid).style.background = 'white';
    document.getElementById(delid).style.color = 'black';
    document.getElementById(delid).style.borderColor = '#400080';
    delid = 0;
    delst = 0;
}

document.getElementById('back').addEventListener('click', () => { // the hole panel control
    document.getElementById('hidden').style.display = "none";
    document.getElementById('back').style.zIndex = '-1';
    if (delid != 0) {
        document.getElementById(delid).style.background = 'white';
        document.getElementById(delid).style.color = 'black';
        document.getElementById(delid).style.borderColor = '#400080';
        delid = 0;
        delst = 0;
    }
});

function set_r(key) { //the change resistance operation
    document.getElementById('Type1').innerHTML = key.innerHTML;
    document.getElementById('Type1').style.borderColor = remcolour[key.innerHTML];
    document.getElementById('hidden').style.display = "none";
    document.getElementById('back').style.zIndex = '-1';
}

function clearall() { //clear button
    while (cnt != 1) {
        document.getElementById('In' + (cnt - 1)).remove();
        cnt--;
    }
    while (cnt1 != 1) {
        document.getElementById('Answ' + (cnt1 - 1)).remove();
        cnt1--;
    }
    val.splice(0, val.length);
}

window.addEventListener('scroll', function() { //Scroll operations
    document.getElementById('hidden').style.display = 'none';
    document.getElementById('back').style.zIndex = '-1';
    if (delid != 0) {
        document.getElementById(delid).style.background = 'white';
        document.getElementById(delid).style.color = 'black';
        document.getElementById(delid).style.borderColor = '#400080';
        delid = 0;
        delst = 0;
    }
});



