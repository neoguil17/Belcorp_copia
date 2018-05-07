function UnidadRegistroVM() {
    var self = this;
    self.Prop_UnidadActual = ko.observable({});


    self.Prop_Listas = ko.observable({
        ListaTipoUnidad: ko.observableArray([])
    });


    self.Func_Load = function (unidadId) {
        self.Prop_Form.resetForm();
    };


    self.Event_Guardar = function () {

        page_bootBox.confirm(
            usuarioMensajes.guardarTitulo,
            usuarioMensajes.guardarMensaje,
            function () {
                rep_ajax.post({
                    url: "Unidad/Guardar",
                    data: ko.mapping.toJS(self.Prop_UnidadActual()),
                    formId: "formDatosUnidad",
                    variableName: "item",
                    isJsonResponse: false,
                    success: function (data) {
                        self.Event_GuardarSuccess(data);
                    }
                });
            });
    };

   

    self.Event_GuardarSuccess;
   
    jQuery.validator.addMethod("notregisterto", function (value, element, params) { 

        if ($('#Unidad_Placa').val() == '' && $('#Unidad_NumeroSerieChasis').val() == '') {
            return false;
        }
        else
            return true;
    });

    jQuery.validator.unobtrusive.adapters.addBool("notregisterto");

    self.Prop_Form = $("#formDatosUnidad").validate(default_validate(self.Event_Guardar));

};

