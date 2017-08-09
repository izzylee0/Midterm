var app = {

	//A place to set up listeners or kick off an initial function
	initialize: function() {
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
		app.searchlastFM(newSearchTerm);
	});

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
		var imgURLs = [ ]; //new
		var loadedImgs = [ ]; //new
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
					if (!data.objects[randomImgNum].images[0] || !data.objects[randomImgNum].images[0].b || !data.objects[randomImgNum].images[0].b.url) {
						return;} 
					console.log(searchResults);
					var img = $('<img />',
					{src: searchResults})
					.appendTo($('#images'));
					app.searchCoopHew(data);

		}
		});
	},
	searchlastFM: function(newSearchTerm) {
		console.log("Executing the searchlastFM function");
		var lastFMurl = "http://ws.audioscrobbler.com/2.0/?method=track.search";
		var apiKey = "&api_key=c159d029669c344a465bc813cfc9f2b8";
		var lastFMalbumURL = lastFMurl + "&track=" + newSearchTerm + apiKey + "&format=json";
		$.ajax({
			url: lastFMalbumURL,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				console.log("Woohoo!");
				console.log(data);
					//for (var i = 0; i < data.results.length; i++){
				var randomTrackNum = Math.floor(Math.random() * 30);
				//console.log(randomTrackNum);
				var searchResults = data.results.trackmatches.track[randomTrackNum].name; //in future iteration would like to choose randomly from top 50 tracks 
				console.log(searchResults);
				var htmlString = "<p class='lastFMresults'>" + searchResults + "</p>";
				$("#searchResults").append(htmlString);
				
	//}
	
			}
		
		});
	},
	

		};