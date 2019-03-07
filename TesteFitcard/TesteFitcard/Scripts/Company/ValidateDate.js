function ValidateDate(inputDate, currentDate) {
    //Criando array separado pela '/'
    var splitCurrentDate = currentDate.split("/");
    var splitInputDate = inputDate.split("/");

    var currentDay = parseInt(splitCurrentDate[0]);
    var currentMonth = parseInt(splitCurrentDate[1]);
    var currentYear = parseInt(splitCurrentDate[2]);

    var inputDay = parseInt(splitInputDate[0]);
    var inputMonth = parseInt(splitInputDate[1]);
    var inputYear = parseInt(splitInputDate[2]);

    var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (inputDay > 31) {
        document.getElementById("WrongMessageDate").innerHTML = "O Dia informado deve ser menor que 31";
        return false;
    }

    if (inputMonth > 12) {
        document.getElementById("WrongMessageDate").innerHTML = "O Mês informado deve ser menor que 12";
        return false;
    }

    //Ano bisexto
    if (inputYear % 4 == 0) {
        daysPerMonth[1] = 29;
    }

    if (inputDay > daysPerMonth[inputMonth - 1]) {
        document.getElementById("WrongMessageDate").innerHTML = "O Dia informado não é válido para este mês";
        return false;
    }

    if (inputYear > currentYear) {
        document.getElementById("WrongMessageDate").innerHTML = "O Data informada deve ser menor ou igual que a data atual";
        return false;
    }

    if (inputYear < currentYear) {
        return true;
    }

    if (inputYear = currentYear) {
        if (inputMonth < currentMonth) {
            return true;
        } else if (inputMonth == currentMonth) {
            if (inputDay <= currentDay) {
                return true;
            }
        }
        document.getElementById("WrongMessageDate").innerHTML = "O Data informada deve ser menor que a data atual";
        return false;
    }
}
