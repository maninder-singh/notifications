(function (window,$){


    function showError(msg) {
        var error = $("#error")[0];
        error.innerText = msg;
        error.className = error.className.replace("hide","");
    }

    function hideError() {
        var error = $("#error")[0];
        error.classList.add("hide");
    }

    function showMessage() {
        var ele = document.getElementById("notification");
        ele.className = ele.className.replace("hide","");
    }

    function clearForm() {
        var email = $("#email")[0];
        var date = $("#notificationDate")[0];
        var message = $("#message")[0];

        email.value = "";
        date.value = "";
        message.value = "";
    }

    function validateNotificationForm() {
        var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-\d{4}$/;
        // validate email address
        var email = $("#email")[0];
        if(!email.value){
            showError("Email should not be empty");
            return false;
        }

        if(!emailRegex.test(email.value)){
            showError("Please enter a valid email address");
            return false;
        }

        // validate date
        var date = $("#notificationDate")[0];
        if(!date.value){
            showError("Date should not be blank");
            return false;
        }

        if(!dateRegex.test(date.value)){
            showError("Enter date in correct format DD-MM-YYYY");
            return false;
        }

        hideError();
        return true;
    }

    function createNotifications(data) {
        var promise = $.ajax({
            url:"/notifications",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data:JSON.stringify(data)
        });
        promise.then(function (response) {
            showMessage();
            hideError();
            clearForm();
        },function (error) {
            showError("Error occur while creating notification");
        });
    }

    function parseDate(input) {
        return input.split("-").reverse().join("");
    }

    function getDataFromForm(form) {
      return {
          "email":form.querySelector("#email").value,
          "date":parseDate(form.querySelector("#notificationDate").value),
          "message":form.querySelector("#message").value
      };
    }

    function attachEvents() {
        // click event on submit
        $("#notificationForm").submit(function () {
            if(!validateNotificationForm.call(this)){
                return false;
            }
            createNotifications(getDataFromForm(this));
            return false;
        });


    }

    function notificationDatePicker() {
        $("#notificationDate").datepicker({dateFormat: 'dd-mm-yy'});
    }

    function init() {
        notificationDatePicker();
        attachEvents();
    }

    init();
})(window,$);