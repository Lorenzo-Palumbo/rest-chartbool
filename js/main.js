$(document).ready(function(){

    $.ajax({
        url: "http://157.230.17.132:4025/sales",
        method: "GET",
        success: function (data){
            // console.log(data);
            var oggettoIntermedio = {};

            for (var i = 0; i < data.length; i++) {
                var oggettoSingolo = data[i];
                var meseVendita = oggettoSingolo.date;
                // moment(meseVendita).month();
                // console.log(moment(meseVendita).month());
                console.log(meseVendita);
                if (oggettoIntermedio[meseVendita] === undefined) {
                    oggettoIntermedio[meseVendita] = 0
                }
                oggettoIntermedio[meseVendita] += oggettoSingolo.amount;
                // console.log(oggettoIntermedio);
            };
        },
        error: function(){
            alert('errore');
        }
    });



    // var ctx = $('#myChart');
    // var chart = new Chart(ctx, {
    //
    //     type: 'line',
    //
    //     data: {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [{
    //             label: 'My First dataset',
    //             // backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [0, 10, 5, 2, 20, 30, 45]
    //         }]
    //     },
    // });






});
