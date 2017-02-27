


(function(global, moment){

	let timerHasStarted = false;

	let roma, siesta;
	
	const startBtn = document.querySelector('.start');
	const resetBtn = document.querySelector('.reset');
	const timeIncBtn = document.querySelector('.time-increment');
	const timeDecBtn = document.querySelector('.time-decrement');
	const breakIncBtn = document.querySelector('.break-increment');
	const breakDecBtn = document.querySelector('.break-decrement');	
					
	console.log(this);
	
	let duration = {
		work: moment.duration(15, 'minutes'),
		break: moment.duration(5, 'minutes') 
	};

	// initialize view
	// viewUpdate(countdown, duration.work)
	// viewUpdate(timeDisplay, duration.work)
	// viewUpdate(breakDisplay, duration.break)

	

	// start & stop
	function startStopTimer() {
		if(!timerHasStarted) {
			initTimer();
		} else {
			if(!workTimer.started) {
				workTimer.start();
			} else {
				workTimer.stop();
			}				
		}	
	
	}
	
	// reset
	function resetTimer(){
		workTimer.stop();
		timerHasStarted = false;	
		console.log(duration);
		roma = moment.duration(duration.work, 'minutes');
		// console.log(roma._milliseconds);
		console.log(typeof duration.work);
		view.updateCountdown(duration.work)				
	}
	
	function timerIncrement(timerSelect) {

		// duration[timerSelect] += 1;
		duration[timerSelect]._data.minutes += 1;
		// console.log(duration.work)
		(timerSelect === 'work') ? viewUpdate(timeDisplay, duration[timerSelect]) : viewUpdate(breakDisplay, duration[timerSelect]);
		
	}

	function timerDecrement(timerSelect) {
		duration[timerSelect]._data.minutes -= 1;
		(timerSelect === 'work') ? view.updateTime(duration[timerSelect]) : view.updateBreak(duration[timerSelect]);	
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
					// console.log(roma._milliseconds);
					view.updateCountdown(roma);						
				}

			});

		var breakTimer = moment.duration(1, "seconds").timer({
		  loop: true, 
		  start: false
			}, function() { 
				// console.log(siesta.get("minutes")); 
				siesta.subtract(1, 'second');
				// console.log(siesta._milliseconds);	
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
	
	
	console.log(roma);
	var view = (function viewModule(work, recess) {

		const countdown = document.querySelector('.countdown');
		const countdownPad = document.querySelector('.countdown-flex span:first-child');	
		const timeDisplay = document.querySelector('.time');	
		const breakDisplay = document.querySelector('.break');	
		

		function padSeconds(num) {
			console.log(num)
			if (num < 10) {
				return "0" + num; 
			} else {
				return num;
			}
		} 			
	
		function countdownFunc(timeObject) {
			timeObject = timeObject || work;
			console.log(roma);
			var timeStr = timeObject.get("minutes") + ":" + padSeconds(timeObject.get("seconds"));
			countdown.textContent =  timeStr;			
		}

		function timeFunc(timeObject) {
			var timeStr = work.get("minutes") + ":" + padSeconds(work.get("seconds"));
			timeDisplay.textContent =  timeStr;	
		}
		
		function recessFunc(timeObject) {
			var timeStr = recess.get("minutes") + ":" + padSeconds(recess.get("seconds"));
			breakDisplay.textContent =  timeStr;	
		}
		
		return 	{
			updateCountdown: countdownFunc,
			updateTime: timeFunc,
			updateBreak: recessFunc
		}		
	
		
	})(duration.work, duration.break);
	
	view.updateCountdown();
	view.updateTime();	
	view.updateBreak();					
	
	 

	// function viewUpdate(elem, timeObject) {
		
	// 	console.dir(elem)
	// 	function padMinutes(on, target) {
	// 		(on) ? countdownPad.classList.add(".padOn") : countdownPad.classList.remove(".padOn");
	// 		(on) ? countdownPad.textContent = "0" : countdownPad.textContent = "";	
	// 	}
		
	// 	var target = elem.classList[0] + "Pad";
	// 	console.log(target);
	// 	timeObject.get("minutes") < 10 ? padMinutes(true, target) : padMinutes(false, target);
				
	// 	function padSeconds(num) {
	// 		console.log(num)
	// 		if (num < 10) {
	// 			return "0" + num; 
	// 		} else {
	// 			return num;
	// 		}
	// 	} 
	// 	// var seconds = timeObject.get("seconds") || 0;
	// 	// console.log(timeObject);
	// 	var timeStr = timeObject.get("minutes") + ":" + padSeconds(timeObject.get("seconds"));
	// 	// console.log(timeStr);
	// 	elem.textContent =  timeStr;
	// }

	
})(window, moment);

