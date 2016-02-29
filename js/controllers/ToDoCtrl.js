app.controller('todoctrl', ['$scope', 'datashare', 'storagefact', '$log', function (scope, dataserv, fact, log) {

    scope.onDragComplete = function (data, evt) {
        // log.debug("drag success, data:", data);
        log.debug(evt);
    }
    scope.onDropComplete = function (data, evt) {
        // var objRecibido = fact.getItemById(data.id);
        // 
        // objRecibido.estado
        log.debug(evt);
    }

    scope.datos = fact.getArr();
}]);