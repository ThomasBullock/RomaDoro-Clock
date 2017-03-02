
(function(global){

	let timerHasStarted = false;

	let roma, siesta;
	
	const startBtn = document.querySelector('.start');
	const resetBtn = document.querySelector('.reset');
	const timeIncBtn = document.querySelector('.time-increment');
	const timeDecBtn = document.querySelector('.time-decrement');
	const breakIncBtn = document.querySelector('.break-increment');
	const breakDecBtn = document.querySelector('.break-decrement');	

	const alarm = document.querySelector('audio[src="audio/Annoying_Alarm.wav"]');
					
	console.log(moment);
	
	let duration = {
		work: moment.duration(25, 'minutes'),
		break: moment.duration(5, 'minutes') 
	};
	
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
		roma = moment.duration(duration.work, 'minutes');
		view.updateCountdown(duration.work)				
	}
	
	function timerMax() {
		if (duration.work._data.minutes + duration.break._data.minutes === 60) {
			return true;
		} else {
			return false;	
		} 
	}
	
	function timerIncrement(timerSelect) {
		if(timerMax()) {
			return
		} else {
			duration[timerSelect]._data.minutes += 1 || (timerMax());
			(timerSelect === 'work') ? view.updateTime(duration[timerSelect]) : view.updateBreak(duration[timerSelect]);
			if (!timerHasStarted) {
				view.updateCountdown(duration.work);			
			}
		}
	}

	function timerDecrement(timerSelect) {
		if(duration[timerSelect]._data.minutes < 2) { 
			return
		} else {
			duration[timerSelect]._data.minutes -= 1;
			(timerSelect === 'work') ? view.updateTime(duration[timerSelect]) : view.updateBreak(duration[timerSelect]);
			if (!timerHasStarted) {
				view.updateCountdown(duration.work);			
			}				
		}
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
				if(roma._milliseconds === 60000) {
					view.toggleAnimation();
				} 
				if(roma._milliseconds === 0) {
					alarm.play();
					view.toggleAnimation();
					console.log('workTimer finished!!')
					workTimer.clearTimer();
					breakTimer.start();
				} else {
					roma.subtract(1, 'second');
					view.updateCountdown(roma);						
				}
			});

		var breakTimer = moment.duration(1, "seconds").timer({
		  loop: true, 
		  start: false
			}, function() {
				if(siesta._milliseconds === 60000) {
					view.toggleAnimation();				
				} 
				if(siesta._milliseconds === 0) {
					alarm.play();
					view.toggleAnimation();					
					timerHasStarted = false;
					breakTimer.clearTimer();																	
				} else {				
					siesta.subtract(1, 'second');
					view.updateCountdown(siesta);
				}
			});		
	
	// Button Handlers
	
	startBtn.addEventListener('click', startStopTimer);
	
	resetBtn.addEventListener('click', resetTimer);

	timeIncBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerIncrement(timerSelect);
	});
	timeDecBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerDecrement(timerSelect);
	});
	breakIncBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerIncrement(timerSelect);
	});
	breakDecBtn.addEventListener('click', function(e){	
		var timerSelect = this.dataset.target; // this avoids issues with target/bubbling due to nested <i>
		timerDecrement(timerSelect);
	});
	
	var view = (function viewModule(work, recess) {

		const countdown = document.querySelector('.countdown');
		const countdownPad = document.querySelector('.countdown-flex span:first-child');	
		const timeDisplay = document.querySelector('.time');	
		const breakDisplay = document.querySelector('.break');	
		
		function padDigit(num) {
			if (num < 10) {
				return "0" + num; 
			} else {
				return num;
			}
		} 			
	
		function toggleAnimation(target){
			countdown.classList.toggle('flicker');
			countdown.classList.toggle('flash');			
		}
	
		function countdownFunc(timeObject) {
			timeObject = timeObject || work;
			var timeStr = padDigit(timeObject.get("minutes")) + ":" + padDigit(timeObject.get("seconds"));
			countdown.textContent =  timeStr;			
		}

		function timeFunc(timeObject) {
			var timeStr = padDigit(work.get("minutes")) + ":" + padDigit(work.get("seconds"));
			timeDisplay.textContent =  timeStr;	
		}
		
		function recessFunc(timeObject) {
			var timeStr = padDigit(recess.get("minutes")) + ":" + padDigit(recess.get("seconds"));
			breakDisplay.textContent =  timeStr;	
		}
		
		return 	{
			toggleAnimation: toggleAnimation,
			updateCountdown: countdownFunc,
			updateTime: timeFunc,
			updateBreak: recessFunc
		}		
	
		
	})(duration.work, duration.break);
	
	view.updateCountdown();
	view.updateTime();	
	view.updateBreak();					
	

	
})(window);

