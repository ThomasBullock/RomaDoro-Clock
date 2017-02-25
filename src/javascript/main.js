// // (function(){

// 	console.log("App is running!");

// 	const now = new Date();

// 	// Clock constructor 
// 	function Clock(mySession, myBreak) {
// 		console.log(this);

// 		this.workTime = new Duration(mySession);
// 		this.breakTime = new Duration(myBreak);


// 	}

// 	Clock.prototype.draw = function() {
// 		console.log(this);		
// 		// render the clock to the screen
// 		// this.timer();
// 	}

// 	Clock.prototype.update = function() {

// 	}

// 	function Duration(time) {
// 		this.milliseconds = (time * 60) * 1000;
// 		this.seconds = function(){
// 			return this.milliseconds / 1000;
// 		}
// 		this.minutes = function() {
// 			return this.seconds() / 60;
// 		}		
// 	}

// 	Duration.prototype.deduct = function() {
// 		console.log(this);
// 		this.milliseconds -= 1000;
// 	}

// 	// Clock.prototype.timer = function() {
// 	// 	console.log(this);
// 	// 	setInterval(this.update, 1000)
// 	// }

// 	var myTime = new Clock(25, 5);

// 	var timey = moment.duration(25, 'minutes');
// 	console.log(timey);

// 	window.setInterval(function(){
// 		timey._milliseconds -=1000;
// 		console.log(timey.minutes());
// 		myTime.workTime.deduct()
// 		console.log(myTime.workTime.minutes());
// 		console.log(myTime.workTime.seconds())		
// 	}, 1000)

// // })();


(function(global, moment){
	
	const startBtn = document.querySelector('.start');
	const resetBtn = document.querySelector('.reset');
	const timeIncBtn = document.querySelector('.time-increment');
	const timeDecBtn = document.querySelector('.time-decrement');
	const breakIncBtn = document.querySelector('.break-decrement');
	const breakDecBtn = document.querySelector('.break-increment');			
	
	let duration = {
		work: 25,
		break: 5 
	};

	let roma = moment.duration(duration.work, 'minutes');		

	// start & stop
	function startStopTimer() {
		if(!timer.started) {
			timer.start();
		} else {
			timer.stop();
		}		
	}
	
	// reset
	function resetTimer(){
		timer.stop();	
		console.log(duration);
		roma = moment.duration(duration.work, 'minutes');
		console.log(roma._milliseconds);				
	}
	
	function timerIncrement(timerSelect) {
		duration[timerSelect] += 1;
	}

	function timerDecrement(timerSelect) {
		duration[timerSelect] += 1;
	}	
	
	
	
	// function countdown(duration) {
		
	// 	let roma = moment.duration(duration, 'minutes');
	// 	console.log(roma);

				
	// 	var timer = moment.duration(1, "seconds").timer({
	// 	  loop: true
	// 	}, function() { 
			
	// 	});
		
	// }
	
	// countdown(25);


	
	var timer = moment.duration(1, "seconds").timer({
	  loop: true, 
	  start: false
		}, function() { 
			console.log(roma.get("minutes")); 
			roma.subtract(1, 'second');
			console.log(roma._milliseconds);	
		});


	console.log(timer);	
	console.log(timer.started);
	
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
	// timeDecrement.addEventListener('click', decTimer);	
	

	
})(window, moment);

