function SearchCompany() {
    $("#TxtBoxSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#CompanyTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}