//Usage: string.format
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };
}

//Usage: string.padLeft
if (!String.prototype.padLeft) {
    String.prototype.padLeft = function () {
        var args = arguments;
        var totalZeros = parseInt(args[0]);
        var zeroCharacter = args[1];
        var text = this;
        var textLength = text.length;
        var parsedZeros = "";
        for (var i = 0; i < totalZeros - text.length; i++) {
            parsedZeros = parsedZeros.toString() + zeroCharacter.toString();
        }
        return parsedZeros + text;
    }
}

//Usage: string.fullCompare
if (!String.prototype.fullCompare) {
    String.prototype.fullCompare = function () {
        var args = arguments;
        var text = this;
        return text.trim().toLowerCase() == args[0].trim().toLowerCase();
    }
}

//Usage: string.getFileName
if (!String.prototype.getFileName) {
    String.prototype.getFileName = function () {
        var fullPath = this;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
    }
}

//Usage: add controller and method to loadingExceptions ("Controller/Method")
var loadingExceptions = [];
$(document)
    .ajaxSend(function (event, jqxhr, settings) {
        var mustShowLoadingElement = true;
        for (var i = 0; i < loadingExceptions.length; i++) {
            if (settings.url.indexOf(loadingExceptions[i]) !== -1) {
                mustShowLoadingElement = false;
                break;
            }
        }
        if (mustShowLoadingElement) {
            LoaderDiv_Show();
        }
    })
    .ajaxStop(function () {
        LoaderDiv_Hide();
    });

function LoaderDiv_Show() {
    $('#loadingDiv').show();
}

function LoaderDiv_Hide() {
    $('#loadingDiv').hide();
}

//Usage: allows to use multiple modals on the page with bootstrap
$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});

//Usage: Date to locale, on form init or by demand
function SetDateToLocale(value, withTime) {
    var localeDate = new Date(value);
    if (withTime) {
        return formatDateTime(localeDate);
    } else {
        return formatDate(localeDate);
    }
}

function formatDateTime(date) {
    var fullHours = date.getHours();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var mes = (parseInt(date.getMonth()) + 1);
    var strTime = fullHours + ':' + minutes;
    return (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "/" + (mes < 10 ? "0" + mes : mes) + "/" + date.getFullYear() + "  " + strTime;
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var mes = (parseInt(date.getMonth()) + 1);
    return (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "/" + (mes < 10 ? "0" + mes : mes) + "/" + date.getFullYear();
}

$(function () {
    SetDateToLocale();
});

//Usage: Bootstrap select picker
$('.selectpicker').on('hide.bs.select', function () {
    $(this).trigger("focusout");
});

//Usage: Inicializar validador jquery validate fechas
$(function () {
    $.validator.methods.date = function (value, element) {
        return this.optional(element) || moment(value, "DD/MM/YYYY", true).isValid();
    }
});

//Usage: points checkbox on cursor pointer class of tr
function EventPointerTr(control) {
    if (event.target.className !== 'cr-icon glyphicon glyphicon-ok') {
        $(control).find('.checkbox').find('input:checkbox').trigger('click');
    }    
}

//File upload control section
function EventUploadChange(control) {
    var fileName = GetNameFile(control.files[0].name) + "." + GetExtensionFile(control.files[0].name);
    var inputDestinationControl = $(control).closest('div.file-upload-tree').find('input.file-destination');
    inputDestinationControl.val(fileName).trigger('change');
}