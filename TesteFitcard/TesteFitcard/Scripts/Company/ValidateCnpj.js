//Validador de CNPJ
function ValidateCnpj(cnpj) {
    //Verificação do 1° Dígito
    var lenght = cnpj.length - 2; //Tamanho = 12
    var numbers = cnpj.substring(0, lenght); //Pega os 12 primeiros dígitos do CNPJ
    var digits = cnpj.substring(lenght); //Pega os 2 (últimos) dígitos do CNOJ
    var sum = 0;
    var pos = lenght - 7; //12 - 7 = 5

    //For para fazer a multiplicação e soma das duas linha geradas
    for (var i = lenght; i >= 1; i--) {
        sum += numbers.charAt(lenght - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    var aux = sum % 11;
    //Calcula o primeiro dígito do CNPJ
    //Pega a o resto da divisão por 11 da soma feita anteriormente (var aux)
    //Se for menor que 2, o dígito será 0
    //Se for maior, retorna o 11 menos aux
    var result = aux < 2 ? 0 : 11 - aux;
    if (result != digits.charAt(0)) {
        return false;
    }

    //Verificação do 2° Dígito
    lenght = lenght + 1; // = 13
    numbers = cnpj.substring(0, lenght); //Pega os 13 primeiros dígitos do CNPJ
    sum = 0;
    pos = lenght - 7; //13 - 7 = 6
    //For para fazer a multiplicação e soma das duas linha geradas
    for (i = lenght; i >= 1; i--) {
        sum += numbers.charAt(lenght - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    aux = sum % 11;
    //Calcula o segundo dígito do CNPJ
    //Pega a o resto da divisão por 11 da soma feita anteriormente (var aux)
    //Se for menor que 2, o dígito será 0
    //Se for maior, retorna o 11 menos aux
    result = aux < 2 ? 0 : 11 - aux;
    if (result != digits.charAt(1)) {
        return false;
    }
    return true;
}

//Consulta Ajax do CNPJ na BD
function ValidateFormExistingCnpj(callback) {
    const originalCnpj = document.getElementById("TxtBoxCnpj").value;
    //Ajax GET
    $.ajax({
        type: "GET",
        data: { cnpj: originalCnpj },
        url: MyAppUrlSettings.ExistingCnpj,// /Company/GetExistingCnpj
        success: function (result) {
            return callback(result);
        }
    });
}

//Faz a comparação do CNPJ digitado
function CnpjComparison(result) {
    const inputCnpj = document.getElementById("TxtBoxCnpj").value;
    const idCompany = $("#companyID").val();

    //Editando o registro
    if (idCompany) {
        if (result[0]) {
            if (result[0].Cnpj == inputCnpj) {
                if (result[0].Id == idCompany) {
                    //PaintCnpjOk();
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    //Novo registro
    else {
        if (result[0]) {
            if (result[0].Cnpj == inputCnpj) {
                return false;
            }
        } else {
            return true;
        }
    }
}