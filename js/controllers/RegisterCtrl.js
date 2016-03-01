app.controller('registroctrl', ["$scope", "storagefact", "datashare", "$log", "$window", "$routeParams", function (scope, fact, dataserv, log, win, params) {

    scope.idTarea = params.idTarea == undefined ? undefined : isNaN(params.idTarea) ? undefined : parseInt(params.idTarea);
    
    //Variables para la hora
    scope.hstep = 1;
    scope.mstep = 5;
    
    //Variables para la fecha    
    scope.today = function () {

        scope.fecha = new Date();

    };

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

    scope.ismeridian = true;
    scope.toggleMode = function () {
        scope.ismeridian = !scope.ismeridian;
    };

    if (scope.idTarea === undefined) {
        scope.titulo = 'Crear tarea';
        scope.tarea = '';
        scope.comentarios = '';
        
        //Variables para la fecha
        scope.today();
        
        //Variables para la hora
        scope.hora = new Date();
    }
    else {
        scope.titulo = 'Editar tarea';
        scope.fecha = {};

        try {
            if (fact.verificarBd()) {
                var arrTareasGuardadas = [];
                arrTareasGuardadas = JSON.parse(localStorage.getItem('BD'));

                var tareaById = _.where(arrTareasGuardadas, { id: scope.idTarea });

                if (tareaById.length > 0) {
                    scope.tarea = tareaById[0].tarea;
                    scope.comentarios = tareaById[0].comentarios;
                    scope.fecha = new Date(tareaById[0].fecha);
                    scope.hora = new Date(tareaById[0].hora);
                }
                else {
                    alertas("Oops...", "La tarea que intenta editar no existe", "error");
                }
            }
            else {
                alertas("Oops...", "La base de datos no existe", "error");
            }
        }
        catch (exc) {
            alertas("Oops...", "Ha ocurrido un error", "error");
        }
    }


    scope.guardarTarea = function () {

        if (fact.verificarBd()) {
            var arrTareasGuardadas = [];
            arrTareasGuardadas = JSON.parse(localStorage.getItem('BD'));

            if (scope.idTarea != undefined) {
                var match = _.find(arrTareasGuardadas, function (item) {
                    return item.id == scope.idTarea;
                });

                if (match) {
                    match.comentarios = scope.comentarios;
                    match.tarea = scope.tarea;
                    match.fecha = scope.fecha;
                    match.hora = scope.hora;
                    match.estado = match.estado;

                    fact.crearBd(JSON.stringify(arrTareasGuardadas));
                    // dataserv.arr = arrTareasGuardadas;
                    alertaGuardar();
                }
                else {
                    alertas("Oops...", "Ha ocurrido un error", "error");
                }
            }
            else {
                var idMax = _.max(arrTareasGuardadas, function (item) {
                    return item.id;
                });

                var nuevoId = idMax.id + 1;

                try {
                    var fechaActual = new Date();
                    var objTarea = { id: nuevoId, tarea: scope.tarea, fecha: scope.fecha, hora: scope.hora, comentarios: scope.comentarios, fechaCreacion: fechaActual, estado: 'pendiente' };
                    arrTareasGuardadas.push(objTarea);
                    fact.crearBd(JSON.stringify(arrTareasGuardadas));

                    alertaGuardar();
                }
                catch (exc) {
                    alertas("Oops...", "Ha ocurrido un error", "error");
                }
            }
        }
        else {
            try {
                var arrTareas = [];
                var fechaActual = new Date();
                var objTarea = { id: 1, tarea: scope.tarea, fecha: scope.fecha, hora: scope.hora, comentarios: scope.comentarios, fechaCreacion: fechaActual, estado: 'pendiente' };
                arrTareas.push(objTarea);
                fact.crearBd(JSON.stringify(arrTareas));

                alertaGuardar();
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

    function alertaGuardar() {
        swal({
            title: "Hecho!",
            text: "Tarea guardada correctamente",
            type: "success",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            allowEscapeKey: false
        },
            function () {
                setTimeout(function () {
                    win.location.href = "#/";
                    swal.close();
                }, 1000);
            });
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
    }
}]);