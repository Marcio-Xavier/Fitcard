$(document).ready(function () {
    document.getElementById("BtnSubmit").style.display = "none";
});
//Confere Descrição -- Obrigatório
function ValidateFormDescription() {
    const description = document.getElementById("TxtBoxDescription").value.trim();
    if (description == "") {
        PaintDescriptionWrong();
        return false;
    }
    PaintDescriptionOk();
    return true;
}

//Verifica os Campos se estão OK
function VerifyFields() {
    if (ValidateFormDescription()) {
        return true;
    } else {
        ValidateFormDescription();
    }
    return false;
}

//Função Salvar
function Save() {
    if (VerifyFields()) {
        document.getElementById("BtnSubmit").click();
    }
}