	
function init()
{
	setInterval('readData();', 1000);
	//setInterval('readActualData();',1002);
	
}
var x = new XMLHttpRequest();

function readData()
{
	console.log('reading data...');
	//xml object
	
	//prepare request
	//x.open('GET','http://localhost:8080/java/7b/data.php', 
    x.open('GET','http://localhost/torres/data.php',true);
	//send request
	x.send();
	//request status change
	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200) {
			updateChart(JSON.parse(x.responseText));
            console.log(x.responseText);
		}
	}

}
/*

function readActualData()
{
	console.log('reading data...');
	//xml object
	
	//prepare request
	x.open('GET','http://localhost/torres/actuhumidity.php',true);
	//send request
	x.send();
	
	//request status change
	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200) {
			updateCharto(JSON.parse(x.responseText));
            console.log(x.responseText);
		}
	}
}

*/

function updateChart(jsonData)
{
	//check status
	//if (jsonData.status == 0) 
	//{
		//readings
		var readings = jsonData.readings; 
		console.log(readings.length);
		//if (readings.length == 10)
		//{
			for (var i = 0; i < readings.length; i++)
			{
				var humidity = readings[i].measurement;
				var id = readings[i].id;
				//var dateTime = readings[i].date.split(' ');
				var actuhumidity = readings[0].measurement;
				var actstatus = readings[0].status;
				//var time = readings[i].id;
				//var f = new Date();
				//cad=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 

                //var time = dateTime[1];
				var height = humidity * .8;
				var y = 90 - height;
				//column
				var c = document.getElementById('column' + i);
				c.style.height = height + '%';
				c.style.y = y + '%';
				c.style.fill = '#2196F3';
				c.style.stroke = '#1976D2';
				//value
				var v = document.getElementById('value' + i);
				v.innerHTML = humidity + '%';
				v.setAttribute('y', (y-1) + '%');
				v.style.fill = '#1976D2';
				//time
				var t = document.getElementById('time' + i);
				t.innerHTML = id

				var s = document.getElementById('stac');
					s.innerHTML = actstatus;
				var f = document.getElementById('actu');
					f.innerHTML = actuhumidity + '%';
			}
		//}
	//}
}

/*

function updateCharto(jsonData)
{
	//check status
	//if (jsonData.status == 0) 
	//{
		//readings
		var readings = jsonData.readings; 
		console.log(readings.length);
		//if (readings.length == 10)
		//{
			for (var i = 0; i < readings.length; i++)
			{
				var actuhumidity = readings[i].measurement;
				
				//footer
				var f = document.getElementById('actu');
					f.innerHTML = actuhumidity;
				
			}
		//}
	//}
}

*/