$(document).ready(function () {
    $("#provinsi").on("change", function () {
        var provinsi = $(this).val();
        if (provinsi) {
            $.ajax({
                url: "/kabupaten",
                type: "POST",
                cache: false,
                data: {
                    provinsi: provinsi
                },
                success: function (data) {
                    $("#kabupaten").html(data);
                }
            });
        }
    });
});