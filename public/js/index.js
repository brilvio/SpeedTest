$(document).ready(function () {
	var socket = io();
	var array = new Array();

	var download = new JustGage({
		id: "download",
		value: 0,
		min: 0,
		max: 100,
		title: "Download",
		label: "Mb/s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});


	var mediaDownload = new JustGage({
		id: "mediaDownload",
		value: 0,
		min: 0,
		max: 100,
		title: "Media Download",
		label: "Mb/s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});


	var upload = new JustGage({
		id: "upload",
		value: 0,
		min: 0,
		max: 100,
		title: "Upload",
		label: "Mb/s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});

	var mediaUpload = new JustGage({
		id: "mediaUpload",
		value: 0,
		min: 0,
		max: 100,
		title: "Media Upload",
		label: "Mb/s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});

	var ping = new JustGage({
		id: "ping",
		value: 0,
		min: 0,
		max: 100,
		title: "Ping",
		label: "s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});

	var mediaPing = new JustGage({
		id: "mediaPing",
		value: 0,
		min: 0,
		max: 100,
		title: "Media Ping",
		label: "s",
		donut: true,
		gaugeWidthScale: 0.6,
		counter: true
	});

	$("#btnTeste").click(function () {
		socket.emit('teste');
		setInterval(function () {
			socket.emit('teste');
		}, 1000 * 60 * 10);

	});
	

var table = $('#table').DataTable({				
			    columns: [
                  { title: "Download" },
            { title: "Upload" },
            { title: "Ping" },
			{ title: "Data"}
            
        ]});

  function getDate() {
	  var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
	 return day + '/' + monthIndex + '/' + year + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }


	function calculaMedia(arr) {
		var down = 0;
		var up = 0;
		var pi = 0;
		for (var index = 0; index < arr.length; index++) {
			var element = arr[index];
			down += element.download;
			up += element.upload;
			pi += element.ping;
		};
		mediaDownload.refresh(down / arr.length);
		mediaUpload.refresh(up / arr.length);
		mediaPing.refresh(pi / arr.length);
	};

	socket.on('teste', function (dados) {
		if (dados.download) {
			download.refresh(dados.download);
			//$("#download").text('Download: ' + dados.download + ' Mb/s');
		}
		if (dados.upload) {
			upload.refresh(dados.upload);
		}
		if (dados.ping) {
			ping.refresh(dados.ping);
			array.push(dados);			
			calculaMedia(array);
			//console.log(array2);
			table.row.add([				
				dados.download,
				dados.upload, 
				dados.ping,
				getDate()
			]).draw( false );
			//console.log(JSON.stringify(array));
		}
	});
});