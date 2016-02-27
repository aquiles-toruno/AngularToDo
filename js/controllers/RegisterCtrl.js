app.controller('registroctrl', ["$scope", "storagefact", "$log", "$window", "$routeParams", function (scope, fact, log, win, params) {
    scope.titulo = params.accion == undefined ? 'Crear tarea' : 'Editar tarea';

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
            try {
                var arrTareas = [];
                var fechaActual = new Date();
                var objTarea = { id: 1, tarea: scope.tarea, fecha: scope.fecha, hora: scope.hora, comentarios: scope.comentarios, fechaCreacion: fechaActual };
                arrTareas.push(objTarea);
                fact.crearBd(JSON.stringify(arrTareas));

                alertas("Hecho!", "Tarea guardada correctamente", "success");
            }
            catch (exc) {
                alertas("Oops...", "Ha ocurrido un error", "error");
            }
        }
    }

    //Función para mostrar alertas de sweetalert
    function alertas(titulo, mensaje, tipo) {
        swal(titulo, mensaje, tipo);
    }

    scope.cancelar = function () {

        swal({
            title: "Esta abandonando esta pagina",
            text: "¿Desea continuar?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
            function () {
                setTimeout(function () {
                    win.location.href = "#/";
                    swal.close();
                }, 1000);
            });

        // alertas("", "Has cancelado la operacion", "warning");
    }

    //Variables para la fecha    
    scope.fecha = { startDate: null, endDate: null };
    
    //Variables para la hora
    scope.hora = new Date();

    scope.hstep = 1;
    scope.mstep = 10;

    scope.ismeridian = true;
    scope.toggleMode = function () {
        scope.ismeridian = !scope.ismeridian;
    };
}]);