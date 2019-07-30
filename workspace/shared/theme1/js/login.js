$(document).ready(function () {
    $('#loginButton').click(function () {
        if ($('#User-Name').val() != "emily.ross@gep.com") {
            $('#User-Name').addClass('invalid').next().addClass('active');
            return false;
        }
        if ($('#password').val() != "Password123") {
            $('#password').addClass('invalid').next().addClass('active');
            return false;
        }
        document.location.href = "indexBegin.html";
    });
    $('#multi-language ul li').click(function () {
        $('#multi-language ul li').removeClass('selected');
        $(this).addClass('selected');
        $('.selected-flag').html($(this).html());
    });

    $('#User-Name, #password').keyup(function () {
        if ($('#password').val() != "" && $('#User-Name').val() != "") {
            $('#loginButton').removeAttr('disabled');
        }
        else {
            $('#loginButton').attr('disabled', 'disabled');
        }
    });
});

$('#password, #User-Name').keyup(function(e){
    if (e.keyCode == 13) {
	    $('#loginButton').trigger('click');
	}
});