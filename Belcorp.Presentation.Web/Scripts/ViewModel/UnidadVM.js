function UnidadVM()
{
    var self = this;
    self.Prop_FormUnidadControl = new UnidadRegistroVM();
    self.Prop_FormRequisitosUnidad = ko.observable({
        Unidad: ko.observable(''),
        ListaRequisitos: ko.observableArray([])
    });

    self.Prop_GridControl = new GridVM('Unidad/BuscarPaginado');
    self.Prop_GridControl.Prop_SelectedItemCallBack = function () {
        self.Trigger_SeleccionGrilla.notifySubscribers();

    };
    self.Prop_Listas = ko.observable({
        ListaTipoUnidad: ko.observableArray([]),
        ListaEstado: ko.observableArray([])
    });
    self.Prop_Filtros = {
        Placa: ko.observable(''),
        Marca: ko.observable(''),
        Modelo: ko.observable(''),
        NombreTipoUnidad: ko.observable('')
        
    };

    self.Trigger_SeleccionGrilla = ko.observable();

    self.Comp_PuedeEliminar = ko.computed(function () {
        self.Trigger_SeleccionGrilla();
        var hasSelection = self.Prop_GridControl.Prop_SelectedItems().length > 0;
        if (hasSelection) {
            var match = ko.utils.arrayFirst(self.Prop_GridControl.Prop_SelectedItems(), function (item) {
                return "Pendiente" != item.NombreEstado;
            });
            return match === undefined || match === null;
        } else {
            return false;
        }   
    }, self);

    self.Comp_PuedeEditar = ko.computed(function () {
        self.Trigger_SeleccionGrilla();
        return self.Prop_GridControl.Prop_SelectedItems().length == 1;
    }, self);

  

    self.Func_CargaUnidad = function (item) {
        if (item) {
            self.Prop_FormUnidadControl.Event_GuardarSuccess = function (data) {
                self.Prop_GridControl.Func_ReplaceItem(data, "Id");
                self.Prop_GridControl.Func_ClearSelection();
                self.Prop_GridControl.Func_SelectItem(data, "Id");
                $('#modalRegistroUnidad').modal('hide');
            };
            

            self.Prop_FormUnidadControl.Func_Load(item.Id);
        } else {
            self.Prop_FormUnidadControl.Event_GuardarSuccess = function (data) {
                self.Event_Clear(); 
                $('#modalRegistroUnidad').modal('hide');
            };
            self.Prop_FormUnidadControl.Func_Load();
        }
        $('#modalRegistroUnidad').modal('show');
    };


    self.Event_Load = function () {
        rep_ajax.get({
            url: "Unidad/InicializarBandeja",
            success: function (data) {
                self.Prop_Listas(ko.mapping.fromJS(data));
                self.Prop_GridControl.Func_Search(self.Prop_Filtros);
            }
        });
    };

    self.Event_Search = function() {
        self.Prop_GridControl.Func_Search(self.Prop_Filtros);
    };

    self.Event_Add = function() {
        self.Func_CargaUnidad();
    };

    self.Event_Edit = function () {
        self.Func_CargaUnidad(self.Prop_GridControl.Prop_SelectedItems()[0]);
    };

    self.Event_Delete = function () {
        var messageArray = [];
        var itemsSelected = self.Prop_GridControl.Prop_SelectedItems();
        for (var i = 0; i < itemsSelected.length; i++) {
            var element =
                itemsSelected[i].Placa + ' / ' +
                itemsSelected[i].Marca + ' / ' +
                itemsSelected[i].Modelo + ' / ' +
                itemsSelected[i].NombreTipoUnidad;
            messageArray.push(element);
        }
        MostarModalEliminar({
            modalId: 'EliminarUnidad',
            listaElementos: messageArray,
            eventoAceptar: function () {

                rep_ajax.post({
                    url: "Unidad/Eliminar",
                    data: ko.mapping.toJS(self.Prop_GridControl.Prop_SelectedItems()),
                    variableName: "list",
                    isJsonContent: true,
                    isJsonResponse: false,
                    success: function (data) {
                        self.Prop_GridControl.Func_Refresh();
                        $("#EliminarUnidad").modal('hide');
                    }
                });

            }
        });
    };

    self.Event_Clear = function () {
        self.Prop_GridControl.Func_ClearItems();
        self.Prop_GridControl.Func_ClearSelection();
        self.Prop_Filtros.Marca('');
        self.Prop_Filtros.Placa('');
        self.Prop_Filtros.Modelo('');
        self.Prop_Filtros.NombreTipoUnidad('');
        self.Event_Search();
    };

   
    self.Event_Load();
};

