
/**********************************************************************************************/
/* SELECTS */
/**********************************************************************************************/

$(document).ready(function()
{     
	//$("#cmbprueba").selectpicker();
	//$("#cmbprueba1").selectpicker();
	//$("#cmbprueba2").selectpicker();
	//$("#cmbprueba3").selectpicker();
	//$("#cmbprueba4").selectpicker();
	//$("#cmbprueba5").selectpicker();
	//$("#cmbprueba6").selectpicker();
	//$("#cmbprueba7").selectpicker();
	//$("#cmbprueba8").selectpicker();
	//$("#cmbprueba9").selectpicker();
	//$("#cmbprueba10").selectpicker();
	//$("#cmbprueba11").selectpicker();
	//$("#cmbprueba12").selectpicker();
	//$("#cmbprueba13").selectpicker();
	//$("#cmbprueba14").selectpicker();
	//$("#cmbprueba15").selectpicker();

})

/**********************************************************************************************/
/* DATETIME PICKER */
/**********************************************************************************************/


$(function () {
    $('#datetimepicker1').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker2').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker3').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker4').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker5').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker6').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker7').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker8').datetimepicker({
    format: 'DD/MM/YYYY'         
   	});
	$('#datetimepicker9').datetimepicker({
	format: 'DD/MM/YYYY'         
	});
});	


/**********************************************************************************************/
/* CAMBIA ICONOS BOTÓN BUSCAR */
/**********************************************************************************************/

$('#buscador').on('shown.bs.collapse', function () {
   $(".fa").removeClass("fa-chevron-down").addClass("fa-chevron-up");
});

$('#buscador').on('hidden.bs.collapse', function () {
   $(".fa").removeClass("fa-chevron-up").addClass("fa-chevron-down");
});

/**********************************************************************************************/
/* VALIDACIONES DE FORMULARIOS */
/**********************************************************************************************/

$(function(){
      $('.validate-form').scrupulous();
      $('.callback-form').scrupulous({
            valid: function(){
              alert('Valid Callback - Submit the Form');
              return true;
            },
            invalid: function(){
              alert('Invalid Callback -  Stop the Form');
              return false;
            }
          });

          $('#toggle-disabled').on('change',function(){
            if($(this).is(':checked')){
              $('#disabled-input').removeAttr('disabled');
            }
     else {
              $('#disabled-input').attr('disabled',true);
    }
    });

});

/**********************************************************************************************/
/* OTROS */
/**********************************************************************************************/


