
(function(global){

	var time;
	
	const startBtn = document.querySelector('.start');
	const resetBtn = document.querySelector('.reset');
	const timeIncBtn = document.querySelector('.time-increment');
	const timeDecBtn = document.querySelector('.time-decrement');
	const recessIncBtn = document.querySelector('.recess-increment');
	const recessDecBtn = document.querySelector('.recess-decrement');	

	const alarm = document.querySelector('audio[src="audio/Annoying_Alarm.wav"]');
						
	let romaDoro = {
		working: true,
		work: moment.duration(25, 'minutes'),
		recess: moment.duration(5, 'minutes'),
	};
			
	// start & stop
	function startPauseTimer() {
		if(!countdownTimer.started && !countdownTimer.isStopped()) {
			initTimer(romaDoro.work);
			countdownTimer.start();
		} else {
			
			if(countdownTimer.stopped) {
				countdownTimer.start();
			} else {
				countdownTimer.stop();
			}				
		}		
	}
	
	// reset
	function resetTimer(){	
		countdownTimer.stop();
		countdownTimer.started = false;
		countdownTimer.stopped = false;		
		alarm.pause();
		alarm.currentTime = 0;
		view.updateCountdown()				
	}
		
	function timerIncrement(timerSelect) {
		if(timerMax()) {
			return
		} else {
			romaDoro[timerSelect]._data.minutes += 1 || (timerMax());
			(timerSelect === 'work') ? view.updateTime(romaDoro[timerSelect]) : view.updateRecess(romaDoro[timerSelect]);
			if (!countdownTimer.started) {
				view.updateCountdown(romaDoro.work);			
			}
		}
	}

	function timerDecrement(timerSelect) {
		if(romaDoro[timerSelect]._data.minutes < 2) { 
			return
		} else {
			romaDoro[timerSelect]._data.minutes -= 1;
			(timerSelect === 'work') ? view.updateTime(romaDoro[timerSelect]) : view.updateRecess(romaDoro[timerSelect]);
			if (!countdownTimer.started) {
				view.updateCountdown(romaDoro.work);			
			}				
		}
	}	

	// prevent combined work and recess times exceeding 60 minutes
	function timerMax() {
		if (romaDoro.work._data.minutes + romaDoro.recess._data.minutes === 60) {
			return true;
		} else {
			return false;	
		} 
	}
	
	function timerUpdate() {			
			if(time._milliseconds === 60000) {  // last minute of countodwn display starts to flash
				view.toggleAnimation();
			} 
			if(time._milliseconds === 0) {
				alarm.play();
				view.toggleAnimation();
				console.log( (romaDoro.working) ? "work" : "recess" + " time finished!!")
				countdownTimer.stop();
				if (romaDoro.working) {
					romaDoro.working = !romaDoro.working;
					initTimer(romaDoro.recess)  // send recess duration to initTimer
					countdownTimer.start();
				} else {
					romaDoro.working = !romaDoro.working;
					countdownTimer.started = false;
					countdownTimer.stopped = false;	
				}
			} else {
				time.subtract(1, 'second');
				view.updateCountdown(time);						
			}		
	}
	
	function initTimer(whichCountdown) {  // create a new duration based on what duration has been sent to initTimer 
		time = moment.duration(whichCountdown._data.minutes, 'minutes');
	}
		
	var countdownTimer = moment.duration(1, "seconds").timer({
	  loop: true, 
	  start: false,
	  timer: "work"
		}, timerUpdate );


	
	// Button Handlers
	
	startBtn.addEventListener('click', startPauseTimer);
	
	resetBtn.addEventListener('click', resetTimer);

	timeIncBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerIncrement(timerSelect);
	});
	timeDecBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerDecrement(timerSelect);
	});
	recessIncBtn.addEventListener('click', function(e){
		var timerSelect = this.dataset.target;
		timerIncrement(timerSelect);
	});
	recessDecBtn.addEventListener('click', function(e){	
		var timerSelect = this.dataset.target; // this avoids issues with target/bubbling due to nested <i>
		timerDecrement(timerSelect);
	});
	
	/// View Module
	
	var view = (function viewModule(work, recess) {

		const countdown = document.querySelector('.countdown');
		const countdownPad = document.querySelector('.countdown-flex span:first-child');	
		const timeDisplay = document.querySelector('.time');	
		const recessDisplay = document.querySelector('.recess');	
		
		function padDigit(num) {
			return (num < 10) ? "0" + num : num; 
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
			recessDisplay.textContent =  timeStr;	
		}
		
		return 	{
			toggleAnimation: toggleAnimation,
			updateCountdown: countdownFunc,
			updateTime: timeFunc,
			updateRecess: recessFunc
		}		
	
		
	})(romaDoro.work, romaDoro.recess);
	
	// initialize the display
	
	view.updateCountdown();
	view.updateTime();	
	view.updateRecess();						
	
})(window);

