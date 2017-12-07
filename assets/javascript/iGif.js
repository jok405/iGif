


var danceMoves = ['breaking', 'crip-walking', 'locking', 'popping', 'electric boogaloo', 'floating', 'turfing', 'robot', 'liquids', 'jerkin', 'harlem shake', 'krumping', 'naenae', 'wobble', 'dougie', 'cat daddy', 'stanky legg', 'soulja boy', 'walk it out'];


//functions
$(document).ready(function() {

//dance buttons
	renderButtons();
	//calling ajax function to show dance giphy on button
	$(document).on('click', '.dance_button', showDanceGif);
	//hiding images
	$(document).on('click', '.gif_container', showGifHideImage);

	function renderButtons(){

		$('#dance_buttons').empty();

		for (var i = 0; i < dances.lenth; i++){

			var danceButton = $('<button>')
			danceButton.addClass('dance_button'); //added a class
			danceButton.attr('data-name', dances[i]); //added a data-attribute
			danceButton.text('dances[i]'); //provides initial button text
			$('#dance_buttons').append(danceButton); //added the button to the HTML
		}
	}
