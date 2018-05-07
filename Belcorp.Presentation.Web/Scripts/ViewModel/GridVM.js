function GridVM(searchMethod) {
    var self = this;
    self.Prop_CanSearch = ko.observable(false);
    self.Prop_DisplayPagination = ko.observable(true);
    self.Prop_Total = ko.observable();
    self.Prop_PageSize = ko.observable();
    self.Prop_PageSizeList = ko.observableArray([30, 45, 60, 75]);
    self.Prop_PageNumber = ko.observable();
    self.Prop_CurrentFilters = null;
    self.Prop_ResultList = ko.observableArray([]);
    self.Prop_Constructor;
    self.Prop_SelectedItems = ko.observableArray([]);    
    self.Comp_HasElements = ko.computed(function () {
        return self.Prop_ResultList().length > 0;
    }, self);
    self.Comp_HasSelectedElements = ko.computed(function () {
        return self.Prop_SelectedItems().length > 0;
    }, self);
    self.Comp_PageList = ko.computed(function () {
        var pageList = [];
        var totalPages = Math.ceil(self.Prop_Total() / self.Prop_PageSize());
        for (var i = 0; i < totalPages; i++) {
            pageList.push(i + 1);
        }
        return pageList;
    }, self);
    self.Comp_IsLastPage = ko.computed(function () {
        return self.Prop_PageNumber() == self.Comp_PageList()[self.Comp_PageList().length - 1];
    }, self);
    self.Comp_IsFirstPage = ko.computed(function () {
        return self.Prop_PageNumber() == 1;
    }, self);
    self.Func_GetPagination = function () {
        var pagination = {};
        pagination.NroPagina = self.Prop_PageNumber();
        pagination.TamanioPagina = parseInt(self.Prop_PageSize() || self.Prop_PageSizeList()[0]);
        return pagination;
    };
    self.Func_GoToPage = function (pageNumber, onSuccess) {
        self.Prop_CanSearch(false);
        self.Prop_PageNumber(pageNumber);
        var pagination = self.Func_GetPagination();
        if (!pagination.Pagina) pagination.NroPagina = pageNumber;
        var request = {
            Filtro: self.Prop_CurrentFilters,
            Paginacion: pagination
        };
        rep_ajax.post({
            url: searchMethod,
            data: request,
            success: function (data) {
                var currentList = data.Lista;
                if (self.Prop_Constructor) {
                    currentList = [];
                    for (var i = 0; i < data.Lista.length; i++) {
                        currentList.push(self.Prop_Constructor(data.Lista[i]));
                    }                    
                }   
                for (var j = 0; j < currentList.length; j++) {
                    currentList[j].IsSelected = ko.observable(false);
                    if (self.Prop_SelectedItems().length > 0) {
                        var shallowCopy = {};
                        $.extend(shallowCopy, currentList[j]);
                        delete shallowCopy.IsSelected;
                        var match = ko.utils.arrayFirst(self.Prop_SelectedItems(), function (item) {
                            var isIdentical = true;
                            for (prop in shallowCopy) {
                                if (typeof shallowCopy[prop] !== 'object') {
                                    if (shallowCopy[prop] != item[prop]) {
                                        isIdentical = false;
                                        break;
                                    }
                                }                                
                            }
                            return isIdentical;
                        });
                        if (match) {
                            currentList[j].IsSelected(true);
                        }
                    }
                }
                self.Prop_ResultList(currentList);
                self.Prop_Total(data.Total);
                self.Prop_CanSearch(true);
                if (onSuccess) {
                    onSuccess();
                }
            }
        });
    };


    self.Func_GoToPageGrouping = function (pageNumber, onSuccess, agrupador) {
        self.Prop_CanSearch(false);
        self.Prop_PageNumber(pageNumber);
        var pagination = self.Func_GetPagination();
        if (!pagination.Pagina) pagination.NroPagina = pageNumber;
        var request = {
            Filtro: self.Prop_CurrentFilters,
            Paginacion: pagination
        };
        rep_ajax.post({
            url: searchMethod,
            data: request,
            success: function (data) {
                var currentList = data.Lista;

                
                if (self.Prop_Constructor) {
                    currentList = [];
                    for (var i = 0; i < data.Lista.length; i++) {
                        currentList.push(self.Prop_Constructor(data.Lista[i]));
                    }
                }


                for (var j = 0; j < currentList.length; j++) {
                    currentList[j].IsSelected = ko.observable(false);
                    if (self.Prop_SelectedItems().length > 0) {
                        var shallowCopy = {};
                        $.extend(shallowCopy, currentList[j]);
                        delete shallowCopy.IsSelected;
                        var match = ko.utils.arrayFirst(self.Prop_SelectedItems(), function (item) {
                            var isIdentical = true;
                            for (prop in shallowCopy) {
                                if (typeof shallowCopy[prop] !== 'object') {
                                    if (shallowCopy[prop] != item[prop]) {
                                        isIdentical = false;
                                        break;
                                    }
                                }
                            }
                            return isIdentical;
                        });
                        if (match) {
                            currentList[j].IsSelected(true);
                        }
                    }
                }
                self.Prop_ResultList(currentList);
                self.Prop_Total(data.Total);
                self.Prop_CanSearch(true);
                if (onSuccess) {
                    onSuccess();
                }
            }
        });
    };

    self.Func_Search = function (searchParameters, onSuccess) {
        self.Func_ClearItems();
        self.Func_ClearSelection();
        self.Prop_CurrentFilters = ko.mapping.toJS(searchParameters);
        self.Func_GoToPage(1, onSuccess);
    };
    self.Func_Refresh = function (onSuccess) {
        self.Prop_SelectedItems([]);
        self.Func_GoToPage(1, onSuccess);
    };
    self.Func_RemoveItem = function (item, key) {
        var currentPage = self.Prop_PageNumber();
        self.Prop_ResultList.remove(function (x) {
            return x[key] == item[key]
        });
        var currentTotal = self.Prop_Total();
        if (currentTotal > 1) {
            self.Prop_Total(currentTotal - 1);
        }  
        if (self.Prop_ResultList().length == 0) {
            if (currentPage > 1) {
                self.Func_GoToPage(currentPage - 1);
            }
        } else {
            self.Func_GoToPage(self.Prop_PageNumber());
        }
    };
    self.Func_ReplaceItem = function (item, key) {
        var oldItem = ko.utils.arrayFirst(self.Prop_ResultList(), function (rowItem) {
            return rowItem[key] === item[key];
        });
        var oldSelectedItem = ko.utils.arrayFirst(self.Prop_SelectedItems(), function (rowItem) {
            return rowItem[key] === item[key];
        });
        item.IsSelected = ko.observable(false);
        if (self.Prop_Constructor) {
            self.Prop_ResultList.replace(oldItem, self.Prop_Constructor(item));
        } else {
            self.Prop_ResultList.replace(oldItem, item);
        }        
        self.Prop_SelectedItems.remove(oldSelectedItem);
        self.Prop_SelectedItems.notifySubscribers();
    };
    self.Func_SelectItem = function (item, key) {
        var currentItem = ko.utils.arrayFirst(self.Prop_ResultList(), function (gridItem) {
            return gridItem[key] === item[key];
        });
        currentItem.IsSelected(true);
        var shallowCopy = {};
        $.extend(shallowCopy, currentItem);
        delete shallowCopy.IsSelected;
        self.Prop_SelectedItems.push(shallowCopy)
    };
    self.Func_AddItem = function (item) {
        item.IsSelected = ko.observable(false);
        if (self.Prop_ResultList().length < self.Prop_PageSize()) {

        } else {

        }
        self.Prop_ResultList.push(item);
    };
    self.Func_ClearItems = function () {
        self.Prop_SelectedItems([]);
        self.Prop_ResultList([]);
    };
    self.Func_ClearSelection = function () {
        self.Prop_SelectedItems([]);
    };
    self.Event_PageSizeChange = function () {
        if (self.Prop_CanSearch()) {
            self.Func_GoToPage(1);
        }
    };
    self.Event_PageNumberChange = function (value) {
        if (self.Prop_CanSearch()) {
            self.Func_GoToPage(self.Prop_PageNumber());                                  
        }
    };
    self.Event_GoToFirstPage = function () {
        self.Func_GoToPage(1);
    };
    self.Event_GoToPreviousPage = function () {
        self.Func_GoToPage(self.Prop_PageNumber() - 1);
    };
    self.Event_GoToNextPage = function () {
        self.Func_GoToPage(self.Prop_PageNumber() + 1)
    };
    self.Event_GoToLastPage = function () {
        self.Func_GoToPage(self.Comp_PageList()[self.Comp_PageList().length - 1]);
    };
    self.Event_SelectItem = function (item) {
        var shallowCopy = {};
        $.extend(shallowCopy, item);
        delete shallowCopy.IsSelected;
        if (item.IsSelected()) {            
            self.Prop_SelectedItems.push(shallowCopy);
        } else {            
            self.Prop_SelectedItems.remove(function (x) {
                var isIdentical = true;
                for (prop in shallowCopy) {
                    if (typeof shallowCopy[prop] !== 'object') {
                        if (shallowCopy[prop] != x[prop]) {
                            isIdentical = false;
                            break;
                        }
                    }
                }
                return isIdentical;
            });
        }   
        if (self.Prop_SelectedItemCallBack) {
            self.Prop_SelectedItemCallBack();
        }
        return true;
    };    
    self.Event_SelectItemCallback;
}