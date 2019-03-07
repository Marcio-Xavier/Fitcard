function PaintDescriptionOk() {
    document.getElementById("TxtBoxDescription").classList.remove("is-invalid");
    document.getElementById("TxtBoxDescription").classList.add("is-valid");
}

function PaintDescriptionWrong() {
    document.getElementById("TxtBoxDescription").classList.remove("is-valid");
    document.getElementById("TxtBoxDescription").classList.add("is-invalid");
}

function PaintDescriptionDefault() {
    document.getElementById("TxtBoxDescription").classList.remove("is-valid");
    document.getElementById("TxtBoxDescription").classList.remove("is-invalid");
}