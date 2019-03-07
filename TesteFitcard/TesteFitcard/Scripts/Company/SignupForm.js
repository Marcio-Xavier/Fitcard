$(document).ready(function () {
    document.getElementById("BtnSubmit").style.display = "none";
    ChangeCheckboxLabel(document.getElementById("customSwitch1"));
    if (!IsNewRegister()) {
        $("#TxtBoxRegistrationDate").val(GetCurrentDate);
    }
});
$("#customSwitch1").click(function () {
    ChangeCheckboxLabel(document.getElementById("customSwitch1"));
});

//Confere Razão Social -- Obrigatório
function ValidateFormCompanyName() {
    const companyName = document.getElementById("TxtBoxCompanyName").value.trim();
    if (companyName == "") {
        PaintCompanyNameWrong();
        return false;
    }
    PaintCompanyNameOk();
    return true;
}

//Confere o CNPJ -- Obrigatório
function ValidateFormCnpj() {
    const originalCnpj = document.getElementById("TxtBoxCnpj").value;
    const cnpj = originalCnpj.replace(/[^\d]+/g, "");
    const lengthCnpj = cnpj.length;

    if (lengthCnpj == 0) {
        return false;
    }
    if (cnpj.length == 14) {
        if (ValidateCnpj(cnpj)) {
            PaintCnpjOk();
            return true;
        } else {
            PaintCnpjWrong();
            document.getElementById("WrongMessageCnpj").innerHTML = "O CNPJ informado não é válido";
            return false;
        }
    }
}

//Confere Estado -- Obrigatório
function ValidateFormState() {
    const state = document.getElementById("DropDownState").selectedIndex;
    const city = document.getElementById("DropDownCity").selectedIndex;
    if (state > 0) {
        if (city == 0) {
            PaintStateOk();
            PaintCityWrong();
            document.getElementById("WrongMessageCity").innerHTML = "Selecione uma Cidade";
            return true;
        } else {
            PaintStateOk();
            PaintCityOk();
            return true;
        }
    }
    PaintStateWrong();
    PaintCityDefault();
    return false;
}

//Confere Cidade -- Obrigatório
function ValidateFormCity() {
    const city = document.getElementById("DropDownCity").selectedIndex;
    if (city > 0) {
        PaintCityOk();
        return true;
    }
    PaintCityWrong();
    return false;
}

//Confere Categoria -- Obrigatório
function ValidateFormCategory() {
    const category = document.getElementById("DropDownCategory").selectedIndex;
    const inputTelephone = document.getElementById("TxtBoxTelephone").value;
    const telephone = inputTelephone.replace(/\D/g, '');
    if (category > 0) {
        if (IsSupermercado()) {
            if (telephone.length == 0) {
                PaintTelephoneWrong();
                PaintCategoryOk();
                document.getElementById("WrongMessageTelephone").innerHTML = "Esta categoria requer um Telefone";
                return true;
            } else {
                PaintTelephoneOk();
                PaintCategoryOk();
                //document.getElementById("StarTelephone").innerHTML = "";
                return true;
            }
        }
        //document.getElementById("StarTelephone").innerHTML = "";
        PaintCategoryOk();
        PaintTelephoneDefault();
        return true;
    }
    PaintCategoryWrong();
    return false;
}

//Confere Email -- Não Obrigatório
function ValidateFormEmail() {
    const inputEmail = document.getElementById("TxtBoxEmail").value.trim();
    if (inputEmail == "") {
        PaintEmailDefault();
        return true;
    } else {
        //Digitou email
        if (ValidateEmail(inputEmail)) {
            //Email é válido
            PaintEmailOk();
            return true;
        } else {
            //Email não é válido
            document.getElementById("WrongMessageEmail").innerHTML = "O E-mail informado não é válido";
            PaintEmailWrong();
            return false;
        }
    }
}

//Confere Telefone -- Obrigatório se for supermercado
function ValidateFormTelephone() {
    const inputTelephone = document.getElementById("TxtBoxTelephone").value;
    const telephone = inputTelephone.replace(/\D/g, '');

    if (telephone.length == 10) {
        PaintTelephoneOk();
        return true;
    } else {
        if (IsSupermercado()) {
            PaintTelephoneWrong();
            document.getElementById("WrongMessageTelephone").innerHTML = "Esta categoria requer um Telefone";
            return false;
        } else {
            if ((telephone.length == 0)) {
                PaintTelephoneDefault();
                return true;
            }
            PaintTelephoneWrong();
            document.getElementById("WrongMessageTelephone").innerHTML = "O Telefone informado não é válido";
            return false;
        }
    }
}

//Confere a Agência -- Não Obrigatório
function ValidateFormBankAgency() {
    if (VerifyAgencyAccotunt()) {
        return true;
    }
}

//Confere a Conta -- Não Obrigatório
function ValidateFormBankAccount() {
    if (VerifyAgencyAccotunt()) {
        return true;
    }
}

//Confere a Data de registro
function ValidateFormRegistrationDate() {
    const inputDate = document.getElementById("TxtBoxRegistrationDate").value
    const currentDate = GetCurrentDate();
    const date = inputDate.replace(/\D/g, '');
    if (date.length === 0) {
        PaintRegistrationDateDefault();
        return true;
    }
    if (date.length === 8) {
        if (ValidateDate(inputDate, currentDate)) {
            PaintRegistrationDateOk();
            return true;
        } else {
            PaintRegistrationDateWrong();
            return false;
        }
    }
    PaintRegistrationDateWrong();
    document.getElementById("WrongMessageDate").innerHTML = "A Data deve ser preenchida";
    return false;
}

//Obtem e formata a Data de hoje para dd/mm/yyyy
function GetCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Janeiro é 0

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

//Verifica se a categoria selecionada é supermercado
function IsSupermercado() {
    var categoryValue = $("#DropDownCategory option:selected").text();
    if (categoryValue == "Supermercado") {
        document.getElementById("StarTelephone").innerHTML = "*";
        return true;
    }
    document.getElementById("StarTelephone").innerHTML = "";
    return false;
}

//Verifica os Campos se estão OK
function VerifyFields() {
    if ((ValidateFormCompanyName()) &&
        (ValidateFormCnpj()) &&
        (ValidateFormState()) &&
        (ValidateFormCity()) &&
        (ValidateFormCategory()) &&
        (ValidateFormEmail()) &&
        (ValidateFormTelephone()) &&
        (ValidateFormBankAgency()) &&
        (ValidateFormBankAccount()) &&
        (ValidateFormRegistrationDate())) {
        return true;
    } else {
        ValidateFormCompanyName();
        ValidateFormCnpj();
        ValidateFormState();
        ValidateFormCity();
        ValidateFormCategory();
        ValidateFormEmail();
        ValidateFormTelephone();
        ValidateFormBankAgency();
        ValidateFormBankAccount();
        ValidateFormRegistrationDate();
    }
    return false;
}

//Função Salvar
function Save() {
    if (VerifyFields()) {
        ValidateFormExistingCnpj(function (response) {
            if (CnpjComparison(response)) {
                //Save
                document.getElementById("BtnSubmit").click();
            } else {
                PaintCnpjWrong();
                document.getElementById("WrongMessageCnpj").innerHTML = "O CNPJ informado já existe";
            }
        });
    }
}

//Verifica se é um novo registro
function IsNewRegister() {
    if ($("#companyID").val()) {
        return true;
    }
    return false;
}

//Verifica Agência e Conta
function VerifyAgencyAccotunt() {
    const inputAccount = document.getElementById("TxtBoxBankAccount").value
    const account = inputAccount.replace(/\D/g, '');
    const inputAgency = document.getElementById("TxtBoxBankAgency").value;
    const agency = inputAgency.replace(/\D/g, '');
    const lengthAgency = agency.length;
    const lengthAccount = account.length;

    if ((lengthAgency == 0) && (lengthAccount == 0)) {
        PaintAgencyDefault();
        PaintAccountDefault();
        return true;
    } if ((lengthAgency == 4) && (lengthAccount == 6)) {
        PaintAgencyOk();
        PaintAccountOk();
        return true;
    } if ((lengthAgency == 4) && (lengthAccount < 6)) {
        PaintAgencyOk();
        PaintAccountWrong();
        document.getElementById("WrongMessageAccount").innerHTML = "A Agência informada requer uma Conta";
        return false;
    } if ((lengthAgency < 4) && (lengthAccount == 6)) {
        PaintAgencyWrong();
        PaintAccountOk();
        document.getElementById("WrongMessageAgency").innerHTML = "A Conta informada requer uma Agência";
        return false;
    } if ((lengthAgency < 4) && (lengthAccount < 6)) {
        if ((lengthAgency > 0) && (lengthAccount > 0)) {
            PaintAgencyWrong();
            PaintAccountWrong();
            document.getElementById("WrongMessageAgency").innerHTML = "A Agência deve ser totalmente preenchida";
            document.getElementById("WrongMessageAccount").innerHTML = "A Conta deve ser totalmente preenchida";
            return false;
        }
        if ((lengthAgency > 0) && (lengthAccount == 0)) {
            PaintAgencyWrong();
            PaintAccountDefault();
            document.getElementById("WrongMessageAgency").innerHTML = "A Agência deve ser totalmente preenchida";
            return false;
        }
        if ((lengthAccount > 0) && (lengthAgency == 0)) {
            PaintAccountWrong();
            PaintAgencyDefault();
            document.getElementById("WrongMessageAccount").innerHTML = "A Conta deve ser totalmente preenchida";
            return false;
        }
        if (lengthAgency > 0) {
            PaintAgencyWrong();
            document.getElementById("WrongMessageAgency").innerHTML = "A Agência deve ser totalmente preenchida";
            return false;
        }
        if (lengthAccount > 0) {
            PaintAccountWrong();
            document.getElementById("WrongMessageAccount").innerHTML = "A Conta deve ser totalmente preenchida";
            return false;
        }
    }
}

//Verifica CheckBox
function ChangeCheckboxLabel(ckbx) {
    if (ckbx.checked) {
        document.getElementById("LabelChkBoxStatus").innerHTML = "Ativo";
    }
    else {
        document.getElementById("LabelChkBoxStatus").innerHTML = "Inativo";
    }
}