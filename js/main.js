$(document).ready(function(){

    get();
    $('.invio').click(function(){
        var nomeSelezionato = $('#salesman').val();
        var valoreInserito = parseInt($('.valore').val());
        var dataDaModificare = $('#data').val();
        var data = moment(dataDaModificare).locale('it').format('DD/MM/YYYY');
        post(nomeSelezionato, valoreInserito, data);
        get();
    });

    function get(){
        $.ajax({
            url: "http://157.230.17.132:4025/sales",
            method: "GET",
            success: function (data){
                // console.log(data);
                var oggettoIntermedio = {};

                for (var i = 0; i < data.length; i++) {
                    var oggettoSingolo = data[i];
                    var dataVendita = oggettoSingolo.date;
                    var dataVendita = moment(oggettoSingolo.date, 'DD/MM/YYYY');
                    var meseVendita = dataVendita.locale('it').format('MMMM');
                    // console.log(meseVendita);
                    if (oggettoIntermedio[meseVendita] === undefined) {
                        oggettoIntermedio[meseVendita] = 0
                    }
                    oggettoIntermedio[meseVendita] += oggettoSingolo.amount;
                };

                var mesi = [];
                var totaleVendita = [];

                for (var key in oggettoIntermedio) {
                    mesi.push(key);
                    totaleVendita.push(oggettoIntermedio[key]);
                }

                    var ctx = $('#myChart');
                    var chart = new Chart(ctx, {

                        type: 'line',

                        data: {
                            labels: mesi,
                            datasets: [{
                                label: 'Vendite totali anno 2017',
                                // backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                data: totaleVendita
                            }]
                        },
                    });
            },
            error: function(){
                alert('errore');
            }
        });
    };

    function post(nomeSelezionato, valoreInserito, data){
        $.ajax({
            url: 'http://157.230.17.132:4025/sales',
            method: 'POST',
            data: {
                salesman: nomeSelezionato,
                amount: valoreInserito,
                date: data
            },
            success: function(data){
                console.log(data);
            },
            error: function(){
                alert('errore');
            }
        });
    };
});
