


(function(global, moment){

	let timerHasStarted = false;

	let roma, siesta;
	
	const startBtn = document.querySelector('.start');
	const resetBtn = document.querySelector('.reset');
	const timeIncBtn = document.querySelector('.time-increment');
	const timeDecBtn = document.querySelector('.time-decrement');
	const breakIncBtn = document.querySelector('.break-decrement');
	const breakDecBtn = document.querySelector('.break-increment');			
	
	let duration = {
		work: moment.duration(3, 'minutes'),
		break: moment.duration(1, 'minutes') 
	};

	

	// start & stop
	function startStopTimer() {
		if(!timerHasStarted) {
			initTimer();
		} else {
			if(!timer.started) {
				workTimer.start();
			} else {
				workTimer.stop();
			}				
		}	
	
	}
	
	// reset
	function resetTimer(){
		timer.stop();
		timerHasStarted = false;	
		console.log(duration);
		roma = moment.duration(duration.work, 'minutes');
		console.log(roma._milliseconds);				
	}
	
	function timerIncrement(timerSelect) {
		// duration[timerSelect] += 1;
		duration[timerSelect]._data.minutes += 1;
		console.log(duration.work)
	}

	function timerDecrement(timerSelect) {
		duration[timerSelect]._data.minutes -= 1;
	}	
	

	function initTimer() {
		roma = moment.duration(duration.work._data.minutes, 'minutes');
		siesta = moment.duration(duration.break._data.minutes, 'minutes');
		timerHasStarted = true;
		workTimer.start();			
	}
		
		var workTimer = moment.duration(1, "seconds").timer({
		  loop: true, 
		  start: false
			}, function() { 
				console.log(roma.get("minutes"));
				if(roma._milliseconds === 0) {
					workTimer.clearTimer();
					console.log('workTimer finished!!')
					breakTimer.start();
				} else {
					roma.subtract(1, 'second');
					console.log(roma._milliseconds);						
				}

			});

		var breakTimer = moment.duration(1, "seconds").timer({
		  loop: true, 
		  start: false
			}, function() { 
				console.log(siesta.get("minutes")); 
				siesta.subtract(1, 'second');
				console.log(siesta._milliseconds);	
			});		


		console.log(workTimer);	
		console.log(workTimer.started);

	
	// Button Handlers
	
	startBtn.addEventListener('click', startStopTimer);
	
	resetBtn.addEventListener('click', resetTimer);

	timeIncBtn.addEventListener('click', function(e){
		var timerSelect = e.target.dataset.target;
		timerIncrement(timerSelect);
	});
	timeDecBtn.addEventListener('click', function(e){
		var timerSelect = e.target.dataset.target;
		timerDecrement(timerSelect);
	});
	breakIncBtn.addEventListener('click', function(e){
		var timerSelect = e.target.dataset.target;
		timerIncrement(timerSelect);
	});
	breakDecBtn.addEventListener('click', function(e){
		var timerSelect = e.target.dataset.target;
		timerDecrement(timerSelect);
	});
	// timeDecrement.addEventListener('click', decTimer);	
	

	
})(window, moment);

