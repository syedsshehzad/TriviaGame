$(document).ready(function() {

// All the questions and corresponding answer choices are stored in matrix.
// Each of the rows below are sub-arrays identified by "i" which corresponds to the question number.
// Each element in each sub-array is identified by "j", so "j" points to the column number below.
// The last element in each row identifies the correct answer.
	var matrix = [
		["Who was the commander-in-chief of the continental army?", "Patrick Henry", "George Washington", "John Jay", 2],
		["What college did Thomas Jefferson attend?", "Harvard College", "University of Virginia", "College of William & Mary", 3],
		["What was the very first declaration that established a national government?", "Articles of Confederation", "Constitution", "Declaration of Independence", 1],
		["Who is known as the Father of the Constitution?", "Patrick Henry", "James Madison", "Thomas Paine", 2],
		["How many countries have used the U.S. Constitution as a model for their own?", "12", "over 100", "45", 2],
		["How many children did George Washington have?", "0", "2", "6", 1],
		["Which of the founding fathers DID NOT write the Federalist Papers?", "James Madison", "Thomas Jefferson", "Alexander Hamilton", 2],
		["What political party did Alexander Hamilton establish?", "Federalist", "Democratic-Republican", "Whig", 1],
		["What year did the Constitution go into effect?", "1783", "1789", "1776", 2],
		["What treaty signed in 1783 recognized the U.S. independence?", "Ghent", "Versailles", "Paris", 3]
	];

	var time = 15;
	var timer;
	var ans;
	var correct;
	var i = 0;

	// The function "next" moves to the next question.
	// It perfoms 3 different tasks:
	// (1) populating the questions and choices,
	// (2) creating radio buttons and click function,
	// (3) resetting the timer.
	// Choice 2 will look like this in the end: <p id="2"><input type="radio" name="choice" value="choice 2">choice 2</p>
	function next() {
		if (i < matrix.length) {
			$('#question').empty();
			$('form').empty();
			$('#photo').empty();
			$('#question').append(matrix[i][0]);

			for (var j = 1; j < 4; j++) {
				$('form').append("<p id=" + j + "><input></p>");
				$('#' + j + ' input').attr('type', "radio");
				$('#' + j + ' input').attr('name', "choice");
				$('#' + j + ' input').attr('value', matrix[i][j]);
				$('#' + j).append(matrix[i][j]);
			}

			// The correct answer is logged.
			correct = matrix[i][matrix[i][4]];
			ans = null;

			$('input').click(function() {
				ans = this.value;
				clearInterval(timer);
				time = 8;
				result();
			});

			i++;
			console.log(i)
			timer = setInterval(countdownEnd, 1000);

		} else {

			$('#question').html("All done, here's how you did!");
			$('form').html("Correct answers: " + corrects + "<br>Incorrect answers: " + incorrects + "<br>Unanswered: " + unanswereds);
			$('#reset').css("display", "inherit");
			$('body').css("background-image", "url(assets/images/bg.jpg)");
			$('#photo').empty();
		}
	}


	var incorrects = 0;
	var corrects = 0;
	var unanswereds = 0;

	function result() {
		if (ans == correct) {
			$('#question').html("You are correct!");
			corrects++;
		} else if (ans == null) {
			$('#question').html("Out of time.");
			unanswereds++;
		} else {
			$('#question').html("You are incorrect.");
			incorrects++;
		}

		$('form').html("The answer is " + correct + ". Get ready for the next question.");
		$('#photo').html("<img src=assets/images/" + i + ".jpg>");
		timer = setInterval(countdownStart, 1000);
	}


	$('#reset').css("display", "none");
	$('body').css("background-image", "url(assets/images/bg.jpg)");


	// The buttons disappear when you click on start and background changes.
	$('#start').click(function() {
		next();
		$('#start').css("display", "none");
		$('body').css("background-image", "url(assets/images/vintage-concrete.png");
	});


	// What happens when you press the reset button.
	$('#reset').click(function() {
		time = 15;
		i = 0;
		incorrects = 0;
		corrects = 0;
		unanswereds = 0;
		$('#reset').css("display", "none");
		next();
	});

	// Countdown to the end of question.
	function countdownEnd() {
		time--;
		$('#time').html(time);
		if (time <= 0) {	
			clearInterval(timer);
			time = 8;
			result();
		}
	}

	// Countdown to the start of the next question.
	function countdownStart() {
		time--;
		$('#time').html(time);
		if (time <= 0) {
			clearInterval(timer);
			time = 15;
			next();
		}
	}
});