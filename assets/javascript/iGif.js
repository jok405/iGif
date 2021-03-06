/*



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



*/



// Initial array of danceMoves
var danceMoves = ['breaking', 'crip-walking', 'locking', 'popping', 'electric boogaloo', 'floating', 'turfing', 'robot', 'liquids', 'jerkin', 'harlem shake', 'krumping', 'naenae', 'wobble', 'dougie', 'cat daddy', 'stanky legg', 'soulja boy', 'walk it out'];


// -------------------------- Functions  --------------------------
$( document ).ready(function(){

	// Append Intial animal buttons
	renderButtons();

	// Call AJAX function to display animal Giphy on selected animal button
	$(document).on('click', '.dance_button', showDanceGif);


	$(document).on('click', '.gif_container', showGifHideImage);

	// ===================================================================

	// Append Animal Buttons to DOM
	function renderButtons(){ 

		// Deletes any previous button to prevent duplicates
		$('#dance_buttons').empty();

		// Loops through the array of danceMoves
		for (var i = 0; i < danceMoves.length; i++){

			// Then dynamicaly generate a button for each animal in the array 
		    var danceButton = $('<button>') 
		    danceButton.addClass('dance_button'); // Added a class 
		    danceButton.attr('data-name', danceMoves[i]); // Added a data-attribute
		    danceButton.text(danceMoves[i]); // Provided the initial button text
		    $('#dance_buttons').append(danceButton); // Added the button to the HTML
		}
	}

	// ===================================================================

	// Add new danceMoves from the user input
	$('#add_dance').on('click', function(){

		// Grab the input from the textbox
		var newDance = $('#dance_input').val().trim().toLowerCase();


		// Validate user input
		var isUnique = true;
		for(var i = 0; i < danceMoves.length; i++){
			if(danceMoves[i] == newDance){
				isUnique = false;
			}
		}


		// Append new button if the input is unique
		if(newDance == ""){
			alert("Sorry. No empty buttons are allowed!")
		}
		else if(isUnique){

			// Add the new animal to the original list
			danceMoves.push(newDance);
		
			
			// Add new buttons to the DOM
			renderButtons();

		}
		else{
			alert("You already have a " + newDance + " button!")
		}


		// Remove the default features of the Submit Button
		return false;
	})


	// ===================================================================

	// Collect Animal gif from GIPHY and display it to the DOM when the animal button is clicked
	function showDanceGif(){

		// Deletes old gifs
		$('#dance_images').empty();

		// Collect animal name data attribute from the button, replacing any spaces
		var dance = $(this).attr('data-name').replace(/ /g, '+');

		// Create the API URL
		var publicKey = "dc6zaTOxFJmzC"; // Public API Key
		var limit = "10"; // Limit API to 10 gifs
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dance + "&limit=" + limit + "&api_key=" + publicKey;
		//console.log(queryURL);

		
		// Creates AJAX call for the specific animal button being clicked
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){

			// Loop through the JSON output to collect each Animal Object
			for(var i = 0; i < response.data.length; i++){

				// Collect the animal gif URLs
				var currentStillURL = response.data[i].images.fixed_height_still.url; // still image 
				var currentMovingURL = response.data[i].images.fixed_height.url; // moving image

				// Collect the animal gif Ratings
				var currentRating = response.data[i].rating;

					// Correct for empty rating
					if(currentRating == ""){
						currentRating = "none";
					}


				// Create a Div to house Gif and Rating
				var currentGifDiv = $('<div>');
				currentGifDiv.addClass('gif_container'); // Added a class
				currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
				
				// Append Rating to current gif
				var currentGifRating = $('<h1>');
				currentGifRating.text("Rating: " + currentRating);
				currentGifDiv.append(currentGifRating);

				// Append Still Image
				var currentGifImage = $('<img>');
				currentGifImage.addClass('still_gif'); // Added a class for still gif
				currentGifImage.attr("src", currentStillURL);
				currentGifDiv.append(currentGifImage);

				// Append Moving Gif Image
				var currentGif = $('<img>')
				currentGif.addClass('moving_gif'); // Added a class for animated gif
				currentGif.attr("src", currentMovingURL);
				currentGif.hide(); // Hide the moving gif
				currentGifDiv.append(currentGif);

				// Append current Div to the DOM
			    $('#dance_images').append(currentGifDiv);

			}

		});	
	}

	// ===================================================================
	
	// Display the Moving gif and Hide the still Image (and vice versa)
	function showGifHideImage(){

		// Determine in the gif was already clicked
		var clickTest = $(this).attr('data-name');
		
		// Gif is not clicked yet - Hide the still image & display the moving image
		if(clickTest == "unclicked"){

			var gifChildren = $(this).children();

			// Hide the Still Image
			$(gifChildren[1]).hide();

			// Display the Moving Image
			$(gifChildren[2]).show();

			// Change Data Name to clicked
			$(this).attr('data-name', "clicked");

		}
		// Gif was already clicked - Hide the moving image & show the still image
		else{

			var gifChildren = $(this).children();

			// Hide the Moving Image
			$(gifChildren[2]).hide();

			// Display the Still Image
			$(gifChildren[1]).show();


			// Change Data Name to unclicked
			$(this).attr('data-name', "unclicked");

		}
	
	}

	// ===================================================================

});





