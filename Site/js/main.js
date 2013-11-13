var flashReady = function () {
	// body...

	console.log('hello');
	played();
	$('.camera').click(function(){
		var cameras = flash.getCameras();
		for(var i=0; cameras.length >i; i++){
			$('.camera').append('<option>'+cameras[i]+'</option>')
		}
		$(this).unbind();
	})
	$('.microphone').click(function(){
		var microphone = flash.getMicrophones();
		for(var i=0; microphone.length >i; i++){
			$('.microphone').append('<option>'+microphone[i]+'</option>')
		}
		$(this).unbind();
	})
	function played(){
		$('.play').click(function(){
			$(this).unbind();
			flash.connect('rtmp://localhost/SMSServer');
			$(this).remove();
			$('.volume').after('<div class="pause"></div>');
			paused();
		});
	}
	function paused(){
		$('.pause').click(function(){
			// $(this).unbind();
			flash.playPause();
			// $(this).remove();
			// $('.volume').after('<div class="play"></div>');
			// played();
		});
	}

	var record=true;
	$('.record').click(function(e){
		console.log('blah');
		if(record){
			playRec="rec";
			flash.connect('rtmp://localhost/SMSServer');
			record=false;
		}else{
			flash.stopRecording();
			record=true;
			playRec='';
		}
	})
}

var playRec = '';

var connected = function(success,error){

	console.log('success:',success);
		console.log('error:',error);

	if(success){
		if(playRec==="rec"){
			flash.startRecording('test',0,0);
		}else{
		flash.startPlaying('hobbit_vp6.flv');
		};
		
	};
		
}

