var flashReady = function () {
	flash.connect('rtmp://localhost/SMSServer');
}

var videoDuration;// body...
	var totalDruation;

	console.log('hello');

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

	var playing = true;

$('.play').click(function(){
	// $(this).unbind();
	// $(this).remove();
	// $('.volume').after('<div class="pause"></div>');
	// paused();
	if(!playing){
		flash.playPause();
		$('.play').css('background-image','url("http://localhost:8888/Site/image/pauseBtn.png")');
		console.log('playing')
		playing= true;
	}else{
		flash.playPause();
		$('.play').css('background-image', 'url("http://localhost:8888/Site/image/playBtn.png")');
		playing = false;
	}
});

	// function played(){
		

	// }
	// function paused(){
	// 	$('.pause').click(function(){
	// 		// $(this).unbind();
	// 		flash.playPause();
	// 		// $(this).remove();
	// 		// $('.volume').after('<div class="play"></div>');
	// 		// played();
	// 	});
	// }

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
	});

	var getDuration = function(time){
		videoDuration = time;
		var videoDurationMin = Math.floor(time/60);
		var videoDurationSec = Math.floor(time%60);
		$('.duration p').text(totalDuration = videoDurationMin + ":" + videoDurationSec);
		console.log('getDuration');
	}

	var seekTime = function(time){
		var currentMin = Math.floor(time/60);
		var currentSec = Math.floor(time%60);

		if(currentSec<10){
			$('.duration p').text(currentMin+ ':0' +currentSec + '/' + totalDuration);
		}else{
			$('.duration p').text(currentMin + ':' + currentSec + '/' + totalDuration);
		}
	}

	$('.timelineSeekbar').on('click',function(e){
		var left = e.pageX-$(this).offset().left;
		var perc = left/$('.timelineSeekbar').width();
		var time = perc*videoDuration;
		$('.timelineSeekbar img').css('margin-left', left+'px')

		flash.setTime(time);
		e.preventDefault();
		console.log(perc);
		return false;

	})

	$('.volSlider').on('click',function(e){
		var left = e.pageX-$(this).offset().left;
		var perc = left/$('.volSlider img').width();
		$('.volSlider img').css('margin-left', left+'px')

		flash.setVolume(perc);
		e.preventDefault();
		console.log(perc);
		return false;

	})

	var playRec = '';
	// var myDataRef = new Firebase('https://qccqxxmm8og.firebaseio-demo.com/');
	// $('#messageInput').keypress(function (e) {
	//         if (e.keyCode == 13) {
	//           var name = $('#nameInput').val();
	//           var text = $('#messageInput').val();
	//           myDataRef.push('User ' + name + ' says ' + text);
	//           $('#messageInput').val('');
	//         }
	//       });
	// 	myDataRef.on('child_added', function(snapshot) {
	//   //We'll fill this in later.
	// 	});
	// 	myDataRef.on('child_added', function(snapshot) {
	//         var message = snapshot.val();
	// displayChatMessage(message.name, message.text);
	//       });
	//       function displayChatMessage(name, text) {
	//         $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
	//         $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
	//       };

	var connected = function(success,error){

		console.log('success:',success);
			console.log('error:',error);

		if(success){
			if(playRec==="rec"){
				flash.startRecording('test',0,0);
			}else{
			flash.startPlaying('hobbit_vp6.flv');
			flash.playPause();
			};
			
		};	
			
	}

