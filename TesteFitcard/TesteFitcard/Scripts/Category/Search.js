function SearchCategory() {
    $("#TxtBoxSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#CategoryTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}