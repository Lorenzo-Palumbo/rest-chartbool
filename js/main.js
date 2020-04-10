$(document).ready(function(){

    stampaGrafici();
    $('.invio').click(function(){
        var nomeSelezionato = $('#salesman').val();
        var valoreInserito = parseInt($('.valore').val());
        var dataDaModificare = $('#data').val();
        var data = moment(dataDaModificare, 'YYYY-MM-DD').format('DD/MM/YYYY');
        post(nomeSelezionato, valoreInserito, data);
        stampaGrafici();
    });



    function costruttoreDatiMensili(data){
        var oggettoIntermedio = {};

        for (var i = 0; i < data.length; i++) {
            var oggettoSingolo = data[i];
            var dataVendita = oggettoSingolo.date;
            var meseVendita = moment(dataVendita, 'DD/MM/YYYY').format('MMMM');
            // console.log(meseVendita);
            if (oggettoIntermedio[meseVendita] === undefined) {
                oggettoIntermedio[meseVendita] = 0
            }
            oggettoIntermedio[meseVendita] += parseInt(oggettoSingolo.amount);
        };

        var mesi = [];
        var totaleVendita = [];

        for (var key in oggettoIntermedio) {
            mesi.push(key);
            totaleVendita.push(oggettoIntermedio[key]);
        }
        return{
            mesi: mesi,
            vendite: totaleVendita
        };
    };

    function graficoLine(mesi, totaleVendita){

        var ctx = $('#myLineChart');
        var chart = new Chart(ctx, {

            type: 'line',

            data: {
                labels: mesi,
                datasets: [{
                    label: 'Vendite totali anno 2017',
                    backgroundColor: 'rgba(255, 99, 132, 0.58)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: totaleVendita
                }]
            },
        });
    };

    function costruttoreDatiVenditori(data){
        var venditeVenditori ={};
        for (var i = 0; i < data.length; i++) {
            var oggettoSingolo = data[i];
            var venditore = oggettoSingolo.salesman;
            if (venditeVenditori[venditore] === undefined) {
                venditeVenditori[venditore] = 0;
            }
            venditeVenditori[venditore] += parseInt(oggettoSingolo.amount);
        }
        var arrayVenditori = [];
        var arrayTotVenditore = [];
        for (var key in venditeVenditori) {
            arrayVenditori.push(key);
            arrayTotVenditore.push(venditeVenditori[key]);
        }
        return{
            venditori: arrayVenditori,
            vendite: arrayTotVenditore
        }
    };

    function graficoDoughnut(venditori, totVenditore){
        var ctx = $('#myDoughnutChart');
        var chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: totVenditore,
                    backgroundColor: ['#ed5555', '#6ca36c', '#6565b8', '#ae5e5e']
                }],

                labels: venditori
            }
        });
    };

    function stampaGrafici(){
        $.ajax({
            url: "http://157.230.17.132:4025/sales",
            method: "GET",
            success: function (data){
                var datiMensili = costruttoreDatiMensili(data);
                graficoLine(datiMensili.mesi, datiMensili.vendite);
                var datiVenditori = costruttoreDatiVenditori(data);
                graficoDoughnut(datiVenditori.venditori, datiVenditori.vendite);
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
                graficoLine();
            },
            error: function(){
                alert('errore');
            }
        });
    };

    // $.ajax({
    //     url: 'http://157.230.17.132:4025/sales/60',
    //     method: 'DELETE',
    //     success: function(data){
    //        stampaGrafici();
    //     },
    //     error: function(){
    //         alert('errore');
    //     }
    // });


});
