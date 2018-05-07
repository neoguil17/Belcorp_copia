//Ajax post: make ajax post asking for antiforgery key
var rep_ajax = {
    post: function (options) {
        var ajaxSettings = {};
        if (options.formId) {
            var form = $('#' + options.formId);
            var token = $('input[name="__RequestVerificationToken"]', form).val();
            ajaxSettings.data = {
                __RequestVerificationToken: token
            };
            if (!options.variableName) {
                ajaxSettings.data["request"] = options.data;
            } else {
                ajaxSettings.data[options.variableName] = options.data;
            }
        } else {
            ajaxSettings.data = options.data;
        }
        ajaxSettings.url = setAjaxUrl(options.url);
        ajaxSettings.type = "POST";
        ajaxSettings.success = options.success;
        ajaxSettings.error = setAjaxError;
        if (options.isJsonContent) {
            ajaxSettings.data = JSON.stringify(options.data);
            ajaxSettings.contentType = "application/json; charset=utf-8";
        }        
        if (!(options.isJsonResponse !== undefined &&
            options.isJsonResponse !== null &&
            options.isJsonResponse == false)) {
            ajaxSettings.dataType = "json";
        }
        $.ajax(ajaxSettings);
    },
    post_file: function (options) {
        var formData = new FormData();
        formData.append("requestFile", options.file);
        formData.append(options.dataName || "data", JSON.stringify(options.data));
        var ajaxSettings = {
            type: "POST",
            url: setAjaxUrl(options.url),
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: options.success,
            error: setAjaxError
        };
        $.ajax(ajaxSettings);
    },
    get: function (options) {
        var ajaxSettings = {};
        ajaxSettings.url = setAjaxUrl(options.url);
        ajaxSettings.type = "GET";
        ajaxSettings.contentType = "application/json; charset=utf-8";
        if (!(options.isJsonResponse !== undefined &&
            options.isJsonResponse !== null &&
            options.isJsonResponse == false)) {
            ajaxSettings.dataType = "json";
        }
        ajaxSettings.success = options.success;
        ajaxSettings.error = setAjaxError;
        if (options.data) {
            ajaxSettings.data = options.data;
        }
        $.ajax(ajaxSettings);
    },
};

function setAjaxUrl(method) {
    if (siteFullUrl[siteFullUrl.length - 1] == '/') {
        return siteFullUrl + method;
    } else {
        return siteFullUrl + '/' + method;
    }
}

function setAjaxError(ajaxContext, status, error) {
    var errorBundle = messages.error[ajaxContext.status.toString()];
    switch (ajaxContext.status) {
        case 400:
            page_bootBox.alert(
                errorBundle.title,
                errorBundle.content.format(ajaxContext.responseJSON.errMsg));
            break;
        case 409:
            page_bootBox.alert(
                errorBundle.title,
                ajaxContext.responseJSON.errMsg,
                function (result) {
                    window.location.href = setAjaxUrl("Autenticacion/Login");
                });
            break;
        case 403:
        case 500:
            page_bootBox.alert(errorBundle.title,
                errorBundle.content);
            break;
    }
}

//Bootbox confirm: Make an bootbox call with default buttons
var page_bootBox = {
    confirm: function (title, message, callBack, callBackNo) {
        bootbox.confirm({
            title: title,
            message: message,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> ' + buttons.cancel
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> ' + buttons.ok
                }
            },
            callback: function (result) {
                if (result) {
                    if (callBack) {
                        callBack();
                    }                    
                } else {
                    if (callBackNo) {
                        callBackNo();
                    }                    
                }
            }
        });
    },
    alert: function (title, message, callBack) {
        var alertSettings = {
            message: message,
            buttons: {
                ok: {
                    label: '<i class="fa fa-check"></i> ' + buttons.ok
                }
            },
            title: title
        };
        if (callBack) {
            alertSettings.callback = callBack;
        }
        bootbox.alert(alertSettings);
    }
};

//Usage: Set as event in control
function FullNumber(evento) {
    //Data
    var decimalPlaces = $(evento.currentTarget).data('puntos-decimales');
    var maximoValor = $(evento.currentTarget).data('maximo-valor');
    var esDecimal = decimalPlaces !== undefined && decimalPlaces !== null;
    var tieneMaximo = maximoValor !== undefined && maximoValor !== null;
    //Constantes
    var excepciones = esDecimal ? [46] : [];
    var exceptionPass = true;
    var maxValuePass = true;
    var maxDecimalPass = true;
    //Validar direccionales
    if (evento.keyCode != null) {
        var directionals = [38, 40, 37, 39];
        if (jQuery.inArray(evento.keyCode, directionals) != -1) {
            return true;
        }
    }
    //Empezar Validaciones
    var charCode = (evento.which) ? evento.which : evento.keyCode;
    //Excepciones
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        if (jQuery.inArray(charCode, excepciones) == -1) {
            exceptionPass = false;
        }
    }
    if (!exceptionPass) return false;
    //Validacion decimales
    if (esDecimal) {
        var startPos = evento.currentTarget.selectionStart;
        var currentValue = evento.currentTarget.value;
        var currentSelectionInvalidPass = window.getSelection().toString() != currentValue;
        if ((currentValue.length <= 0 && charCode == 46)
            || (currentValue.indexOf(".") != -1 && charCode == 46)
            || (currentValue.indexOf(".") != -1 && currentValue.split(".")[1].length >= decimalPlaces
                && startPos > currentValue.indexOf(".") && currentSelectionInvalidPass)
            || (startPos == 0 && charCode == 46)) {
            maxDecimalPass = false;
        }
    }
    if (!maxDecimalPass) return false;
    //Validacion Maximo
    var validarMaximo = function (control, codigoAscii) {
        var startPaste = evento.currentTarget.selectionStart;
        var leftTake = control.value.substr(0, startPaste);
        var rightTake = control.value.substr(startPaste, 13);
        var numero = (window.getSelection().toString() == control.value)
            ? parseFloat(String.fromCharCode(codigoAscii))
            : parseFloat(leftTake + String.fromCharCode(codigoAscii) + rightTake);
        return !(numero > maximoValor);
    };
    if (tieneMaximo) {
        maxValuePass = validarMaximo(evento.currentTarget, charCode);
        if (!maxValuePass) return false;
    }
    return true;
}

//Usage: Set a modal with a response of elimination
function MostarModalEliminar(opciones) {    
    var modalId = opciones.modalId;
    $('#' + modalId + "_plural").hide();
    $('#' + modalId + "_singular").hide();
    $('#' + modalId + "_elementos").html('');
    $('#' + modalId + "_btnAceptar").unbind("click");
    var elementos = opciones.listaElementos;
    if (elementos.length == 1) {
        $('#' + modalId + "_singular").show();
    } else {
        $('#' + modalId + "_plural").show();
    }
    var itemsUl = [];
    $.each(elementos, function (i, item) {
        itemsUl.push('<li><b>' + item + '</b></li>');
    }); 
    $('#' + modalId + "_elementos").append(itemsUl.join(''));
    $('#' + modalId).modal('show');
    $('#' + modalId + "_btnAceptar").click(function () {
        opciones.eventoAceptar();
    });
}

//Usage: Sets an UTC date to default moment
function MomentToLocaleDateTime(dateString) {
    return moment(dateString).local().format('DD/MM/YYYY HH:mm:ss');
}

//Usage: Returns totals days between 2 dates
function ObtenerDiferenciaDias(fecha1, fecha2) {
    var one_day = 1000 * 60 * 60 * 24;
    var difference_ms = fecha2 - fecha1;
    return Math.round(difference_ms / one_day); 
}

//file: Solo nombre de fichero y extension. Ejemplo: baby.jpg
function GetNameFile(file) {
    return file == null || file === undefined ? '' : file.substring(0, file.lastIndexOf('.'));
}

//file: Solo nombre de fichero y extension. Ejemplo: baby.jpg
function GetExtensionFile(file) {
    return file == null || file === undefined ? '' : file.split('.').pop();
}

//Usage: find an element by key and value
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

//Usage: Download a file using id
function DescargarArchivo(id) {
    window.location.href = setAjaxUrl("General/DescargarArchivo") + "?idArchivo=" + id;
}

function DescargarArchivoPorIdAdjunto(id) {
    window.location.href = setAjaxUrl("General/DescargarArchivoPorIdAdjunto") + "?idArchivoAdjunto=" + id;
}

function EliminarArchivo(idArchivo, success) {
    rep_ajax.post({
        url: "General/EliminarArchivo",
        data: { id: idArchivo },
        success: success
    });
}

//Usage: Ajax parametrovalor
function ListarParametroValor(id, idParametroValorPadre, success) {
    rep_ajax.get({
        url: "Parametro/ListarParametroValorPorIdParametroPadre?id=" + id + '&idParametroPadre=' + idParametroValorPadre,
        success: success
    });
}

//Usage: Ajax parametrovalor
function ObtenerParametroValor(id, success) {
    rep_ajax.get({
        url: "Parametro/ObtenerPorId?id=" + id,
        success: success
    });
}

//Usage: Send id and it will show confirm and return message
var formControl;
function MostrarConfirmacionMotivo(idControl, success) {
    var controlMotivo = $("#motivo_" + idControl);
    if (controlMotivo.length) {
        controlMotivo.val('');
    }
    if (formControl) {
        formControl.resetForm();
    }

    $("#formMotivo_" + idControl).data("validator", null);

    formControl = $("#formMotivo_" + idControl).validate(default_validate(function () {
        if (controlMotivo.length) {
            success(controlMotivo.val());
        } else {
            success();
        }
        $('#' + idControl).modal('hide');
    }));        
    $('#' + idControl).modal('show');
}


/**
 * Mostrar fecha en formato N/A cuando no existe valor
 * @param {any} fecha fecha en formato cadena
 */
function MostrarFechaNoExiste(fecha) {
    return fecha === '' || fecha === null || fecha === undefined ? 'N/A' : fecha;
}


function FP_SoloLetrasyNumerosLimitado(e) {
    var tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    var patron = /[A-Za-z0-9\s]/;  // 4
    var te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}


function FP_SoloLetrasLimitado(e) {
    var tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    var patron = /[A-Za-z\s]/;  // 4
    var te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}


function ValidarLongitudDocumentosPersona(tipoDocumento,control) {

    var valor = $(tipoDocumento).val();

    if (valor == 'TIDO0001') {
        $("#" + control).attr('maxlength', 8);
    }
    else {
        if (valor == 'TIDO0003') {
            $("#" + control).attr('maxlength', 12);
        }
        else {
            if (valor == 'TIDO0002' || valor == 'TIDO0004') {
                $("#" + control).attr('maxlength', 11);
            }
            else {
                $("#" + control).attr('maxlength', 15);
            }
        }
    }
}

function ValidarCaracteresDocumentosPersona(evento, tipoDocumento) {

    if (tipoDocumento == 'TIDO0001') {
        return FullNumber(evento);
    }
    else {
        if (tipoDocumento == 'TIDO0003') {
            return FP_SoloLetrasyNumerosLimitado(evento);
        }
        else {
            if (tipoDocumento == 'TIDO0002' || tipoDocumento == 'TIDO0004') {

                return FullNumber(evento);
            }
            else
                return true;
        }
    }
}

function ValidarPermisoFacade(permiso, success) {
    rep_ajax.get({
        url: "Perfil/ValidarPermisoFacade?permiso=" + permiso,
        success: success
    });

}