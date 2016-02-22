app.factory('storagefact', function () {
    var factory = {};

    factory.crearBd = function (tarea) {
        localStorage.setItem('BD', tarea);
    };

    factory.verificarBd = function () {
        var bd = localStorage.getItem('BD');

        if (bd == undefined || bd == null) {
            return false;
        } else {
            return true;
        }
    };

    return factory;
});