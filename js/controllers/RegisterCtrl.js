app.controller('registroctrl', ["$scope", "storagefact", "$log", function (scope, fact, log) {
    scope.titulo = 'Crear tarea';

    scope.guardarTarea = function () {
        
        if (fact.verificarBd()) {
            var arrTareasGuardadas = {};
            arrTareasGuardadas = JSON.parse(localStorage.getItem('BD'));

            var idMax = _.max(arrTareasGuardadas, function (item) {
                return item.id;
            });
            log.debug(idMax.id);
        }
        else {
            var arrTareas = [];
            var objTarea = { id: 1, tarea: scope.tarea, fecha: scope.fecha, hora: scope.hora, comentarios: scope.comentarios };
            arrTareas.push(objTarea);
            fact.crearBd(JSON.stringify(arrTareas));
        }
    }

    //Variables para la fecha
    scope.today = function () {
        scope.fecha = new Date();
    };

    scope.today();

    scope.clear = function () {
        scope.fecha = null;
    };

    scope.openDate = function () {
        scope.popupDate.opened = true;
    };

    scope.setDate = function (year, month, day) {
        scope.fecha = new Date(year, month, day);
    };

    scope.popupDate = {
        opened: false
    };
    
    //Variables para la hora
    scope.hora = new Date();

    scope.hstep = 1;
    scope.mstep = 10;

    scope.ismeridian = true;
    scope.toggleMode = function () {
        scope.ismeridian = !scope.ismeridian;
    };
}]);