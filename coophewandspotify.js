var app = {

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		app.getToken();
	},
	getToken: function(word) {
		var id = "b748a3fa36b846f3aeeba1d9cc083b12";
		var secret = "fffdff929ca241e59fe384041df08148";
		//this base encodes your id and secret to pass to the spotify server
		var encoded = btoa(id + ':' + secret);
		$.ajax(
		  {
		    method: "POST",
		    url: "https://accounts.spotify.com/api/token",
		    headers: {
		    	'Authorization': 'Basic ' +  encoded
		    },
		    data: {
		    	'grant_type': 'client_credentials'
		    },
		    success: function(result) {
		    	//after I get my access token, I use it to search for a spotify track
		    	app.searchTracks(result.access_token);
		    },
		  }
		);
},
	searchTracks: function(token) {
		 $.ajax({
	        url: "https://api.spotify.com/v1/tracks/7CZdd0S4WTktuiiARS8pY4",
	        dataType: "json",
	        headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
	        success: function(data) {
	            var trackName = data.name;
	            var url = data.preview_url;


	            var audioElement = document.createElement('audio');
	            audioElement.src = data.preview_url;
	            audioElement.autoplay = 'true';
	            audioElement.controls = 'true';

	            $('.title').html(trackName);
	            $('.the-track').html(audioElement);
	           
	        }},



		$("#search").click(function(){ 
			console.log("Clicked search"); 
			//clear image div in html
		$("#images").html("");
			//clear track title in html
		$("#searchResults").html("");
			//using jquery to get value of query input box
			var newSearchTerm = $("#query").val(); //new
			console.log(newSearchTerm); //had 'currentWord' before
		//Execute the API call function with the 'newSearchTerm' as the argument
		app.searchCoopHew(newSearchTerm); 
		
	}),

	 //Use jQuery to assign a callback function when enter is pressed 
		//This will ONLY work when the 'query' input box is active
		$("#query").keypress(function(e){ //new
			//console.log(e);
			//If enter key is pressed
			if (e.which == 13){
				//Use jQuery's trigger() function to execute the click event
				$("#search").trigger('click');
			}
		});
	},

	//Define a function to execute the first AJAX call
	//The argument will be the desired search term
	searchCoopHew: function(searchTerm) { 
		console.log("Executing the searchCoopHew function");
		var CoopHewURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=1d116fb113749c6ce9d8512c7fca76e1&color=";
		$.ajax({
			url: CoopHewURL + searchTerm, //had 'word' before
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				console.log("Woohoo!");
				console.log(data);
				//for (var i = 0; i < data.objects.length; i++){
					var randomImgNum = Math.floor(Math.random() * 100);
					console.log(randomImgNum);
					var searchResults = data.objects[randomImgNum].images[0].b.url; //in future iteration would like to choose a random image from set
					//used to be var searchResults = data.objects[0].images[0].b.url;
					//if(data.objects[randomImgNum].images[0].b.url === null){
					//alert ("Oops! There is no artwork associated with that particular color. Try again!");
			//} // WHY DOESN'T THIS ALERT WORK?
				
					console.log(searchResults);
					var img = $('<img />',
					{src: searchResults})
					.appendTo($('#images'));
					app.searchCoopHew(data);
				}

		
	    });

	}


};