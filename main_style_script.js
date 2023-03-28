let pageinfo = [{name: "Resistor_sum", ret: "text"}]
let pageset = [{name: "Resistor_sum", ret: "text"}]

window.onclick = function(event) {
    if (event.target == document.getElementById("popset")) {
        document.getElementById("popset").style.display = "none";
        if (document.getElementById("recalcbox").checked) redo();
    }
    if (event.target == document.getElementById("popinfo")) {
        document.getElementById("popinfo").style.display = "none";
    }
    if (event.target == document.getElementById("popmenu")) {
        document.getElementById("popmenu").style.display = "none";
    }
}

document.getElementById("settings").onclick = function() {
    document.getElementById("popset").style.display = "block";
}

document.getElementById("3sum1").onclick = function() {
    // let name = document.querySelector("title").innerHTML;
    // for (let i = 0; i < pages.length; i++) {
    //     if (pages[i].name == name) {
    //         alert(pages[i].ret);
    //         break;
    //     }
    // }
    location.href = "3SUM.html";

}

document.getElementById("Res_c").onclick = function() {
    location.href = "Res_c.html";
}

document.getElementById("Res_g").onclick = function() {
    location.href = "Res_g.html";
}

document.getElementById("HomePage").onclick = function() {
    location.href = "main.html";
}

document.getElementById("Menu").onclick = function() {
    document.getElementById("popmenu").style.display = "block";
}

document.getElementById("info1").onclick = function() {
    // let name = document.querySelector("title").innerHTML;
    // for (let i = 0; i < pages.length; i++) {
    //     if (pages[i].name == name) {
    //         alert(pages[i].ret);
    //         break;
    //     }
    // }
    document.getElementById("popinfo").style.display = "block";
}