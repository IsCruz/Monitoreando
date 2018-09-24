// para el movimiento de bebé
// si el número es  0 o 180 enviar una alarma.


$(document).ready(function(){
	getGrafica();
	//getRandomInt()
	init();
	getCircleColor(5);
  showDemoGraph();

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

 
$('#btnDone').click(function(){
    var nombre = $('#leadName').text();

    var realnombre = $('#LEAD').val();
    realnombre = nombre;
    console.log(realnombre);
   
  var data = {
    'name' : realnombre
  }
  $.post(
                    'sendMail.php',
                    data,
                    function(data){
                        console.log("Exito Total ");
                    }
        );
});


});


function showDemoGraph(){
  var canvas = document.getElementById('myChart');
  var canvas2 = document.getElementById('myChart2');
  var allgrados = new Array;
  var allfechas = new Array;
      $.ajax({
    url: 'getMovimientos.php',
    success: function(response){
    resultado = $.parseJSON(response);
//console.log(resultado);
    $.each(resultado, function(key,value){
      var string = value['grados'];
      var dates = value['fecha']
        allgrados.push(string);
        allfechas.push(dates);
        });
     // console.log("Estas son las fechas: " + allgrados);
    }});

var data = {
    labels: allfechas,//["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00"],
    datasets: [
        {
            label: "Baby Movement",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: allgrados,//[90, 90, 120, 120, 0, 0, 70],
        }
    ]
};

var option = {
  showLines: true
};
var myLineChart = Chart.Line(canvas,{
  data:data,
  options:option
});

Chart.Line(canvas2,{
  data:data,
  options:option
});
}


function init(){
	setInterval('getRandomInt()',2000);

  //CUNA DEL BEBÉ
	setInterval('getMovimiento()',6000);
  //modem de la sala
  setInterval('getTempSala()',3000);
  setInterval('getAnalitics()',3000);

}
 
function getAnalitics(){
  $.ajax({
    url: '0a45.php',
    success: function(response){
      resultado = $.parseJSON(response);
      $.each(resultado,function(key,value){
        var dat = value['COUNT(grados)'];
        $('#1a').html(dat);
        
      });
    }
  });
  $.ajax({
    url: '45a90.php',
    success: function(response){
      resultado = $.parseJSON(response);
      $.each(resultado,function(key,value){
        var dat = value['COUNT(grados)'];
        $('#2a').html(dat);
        
      });
    }
  });
    $.ajax({
    url: '90a135.php',
    success: function(response){
      resultado = $.parseJSON(response);
      $.each(resultado,function(key,value){
        var dat = value['COUNT(grados)'];
        $('#3a').html(dat);
        
      });
    }
  });
      $.ajax({
    url: '135a180.php',
    success: function(response){
      resultado = $.parseJSON(response);
      $.each(resultado,function(key,value){
        var dat = value['COUNT(grados)'];
        $('#4a').html(dat);
        
      });
    }
  });
}


function getRandomInt() {

	var cuna1 = Math.floor(Math.random() * (180 - 0 + 1)) + 0;
	
// pulse red light
// green light

	$('#1move').html(cuna1);
	$('#2move').html(cuna1+20);
	$('#3move').html(cuna1+15);
	$('#4move').html(cuna1+25);

	$('#6move').html(cuna1+10);
	getCircleColor(1);
	getCircleColor(2);
	getCircleColor(3);
	getCircleColor(4);

	getCircleColor(6);
}

function getCircleColor(value){
	if ($('#'+value+'move').text() < 10 ||  $('#'+value+'move').text() > 170){
		$('#'+value+'move').removeClass('green light');
    var beb = $('.bebname'+value).text();
    var $toastContent = $('<span>'+beb+' necesita ayuda</span>');
    Materialize.toast($toastContent, 2000);
	
    return $('#'+value+'move').addClass('pulse red light');
	}
	else{
		$('#'+value+'move').removeClass('pulse red light');
    return $('#'+value+'move').addClass('green light'); 
	}
}

function getMovimiento()
{			//getCircleColor(5);
	  $.ajax({
    url: 'getMovimiento.php',
    success: function(response){
		resultado = $.parseJSON(response);
console.log(resultado);
		$.each(resultado, function(key,value){
			var	string = value['grados'];
			
				$('#5move').html(string);
				getCircleColor(5);
		});
		
	  }});
}




function getTempSala(){
  $.ajax({
    url: 'getSalas.php',
    success: function(response){
      resultado = $.parseJSON(response);
      $.each(resultado,function(key,value){
        var tem = value['tempe'];
        var hum = value['humedad'];
        var co2 = value['CO2'];
        $('#temp').html(tem + ' C');
        $('hum').html(hum + ' %');
        $('cc02').html(co2 + ' ppm');
        
      });
    }
  });
}


function getGrafica()
{
  $.ajax({
    url: 'getSalas.php',
    success: function(response){
         //console.log(response[0].Status);
       var resultados= $.parseJSON(response);
      // console.log(resultados);
         var label = [];
        var donne = [];
        var hum = [];
        var co2 = [];

        for(var i = 0; i<resultados.length; i++){
          label.push(resultados[i].fecha);
          donne.push(resultados[i].tempe);
          hum.push(resultados[i].humedad);
          co2.push(resultados[i].CO2);


        }
        // this is chart.js
        var ctx = $('#datachart');
        var graph = new Chart(ctx,{
            type: 'bar',
            label: 'test',
            data:{
              labels:label,
              datasets:[{
                label: "Temperatura",
                backgroundColor: 'rgba(0,0,255,.6)',
                data: donne
              },
             /* {
                label: "Humedad",
                backgroundColor: 'rgba(0,255,0,.6)',
                data: hum
              },*/
              {
                label: "CO2",
                backgroundColor: 'rgba(255,0,0,.6)',
                data: co2
              }
            ] 
            },
            options:{
              scales:{
                yAxes:[{
                  ticks:{
                    beginAtZero: true
                  }
                }]
              }
            }
        })

    },
    error: function(){

    }
  });
}