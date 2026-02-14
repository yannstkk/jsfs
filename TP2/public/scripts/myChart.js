var donnees = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var labels  = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

var canvas  = document.getElementById('myChart');
var context = canvas.getContext('2d');

var myChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Nombres aleatoires',
            data: donnees,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    }
});

var socket = io();

socket.on('ping', function() {
    console.log('ping recu');
    socket.emit('pong', { name: 'Utilisateur' });
});

socket.on('nouveau', function(nombre) {
    console.log('Nouveau nombre recu : ' + nombre);

    myChart.data.datasets[0].data.unshift(nombre);
    myChart.data.datasets[0].data.pop();

    var dernierLabel  = myChart.data.labels[myChart.data.labels.length - 1];
    var prochainLabel = (parseInt(dernierLabel) % 10) + 1;
    myChart.data.labels.unshift(String(prochainLabel));
    myChart.data.labels.pop();

    myChart.update();
});
