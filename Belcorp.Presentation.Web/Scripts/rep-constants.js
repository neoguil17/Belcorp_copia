function default_validate(handler, validateHidden) {
    var defaults = {
        highlight: function (element) {
            $("input").removeClass("error-message");
            $("textarea").removeClass("error-message");
            $("select").removeClass("error-message");
        },
        errorClass: "error-message",
        submitHandler: handler
    };
    if (validateHidden) {
        defaults.ignore = ".ignore-validation";
    }
    return defaults;
}    