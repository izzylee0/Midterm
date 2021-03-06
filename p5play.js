var app = {

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		$("#search").click(function(){ 
			console.log("Clicked search"); 
			//clear image div in html
		$("#images").html("");
			//clear track title in html
		$("#searchResults").html("");
		$("#searchResults").resizable();
		$("images").resizable();
			//using jquery to get value of query input box
		var newSearchTerm = $("#query").val(); //new
		console.log(newSearchTerm); //had 'currentWord' before
		//Execute the API call function with the 'newSearchTerm' as the argument
		//$("#blur-button").click(function(){


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
		$("#right-arrow").click(function(){
			saveCanvas('My Album Cover','jpg');
			$("#search").trigger('click');
		});
		$("#left-arrow").click(function(){
			parent.history.back();
		});

		$(".bButton").click(function(){
			saveCanvas('My Album Cover','jpg');
		

	});
	},


	//Define a function to execute the first AJAX call
	//The argument will be the desired search term
	searchCoopHew: function(searchTerm) { 
		console.log("Executing the searchCoopHew function");
		var CoopHewURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=1d116fb113749c6ce9d8512c7fca76e1&color=";
		$.ajax({
			url: CoopHewURL + searchTerm + "&type=drawing", 
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				// this is getting triggered twice by something!
				console.log("Woohoo!");
				console.log(data);
				
				//for (var i = 0; i < data.objects.length; i++){

				//dont access properties that might not be there, only make your random numer
				//as large as your results array
				var randomImgNum = Math.floor(Math.random() * data.objects.length);
				console.log(randomImgNum);
				if (data.objects[randomImgNum]) {
					var searchResults = data.objects[randomImgNum].images[0].b.url; 
					console.log(searchResults);

					//you can call a p5 function from here!
					loadTheImage(searchResults);
					// var img = $('<img />',
					// {src: searchResults})
					// .appendTo($('#images'));
					app.searchCoopHew(data);
				}
				

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
				//$("#searchResults").append(htmlString);
				// document.getElementById("searchResults").contentEditable='true';
				// $("#searchResults").draggable();
    // 			$("#searchResults").resizable();


  			theSong = searchResults;
	
			}
		
		});

	

	
    		
		//options for user to change text in any way they would like 
		$("#fonts").change(function() {
		

    	//alert($(this).val());
   		// $('#theSong').css("font-family", $(this).val());
		});

		$("#size").change(function() {
	   	 	$('#searchResults').css("font-size", $(this).val() + "px");
		});

		$("#color").change(function() {
		$('#searchResults').css("color", $(this).val());
		});
		
		
		
		

	},
	

};

// global variable to hold onto the image
var theImage, theSong; 

var alpha =  255;



function setup() {
	console.log("Setup");
	var canvas= createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-holder');

	//Call the function to make the AJAX call
	app.initialize();
}


function draw() {
	//making canvas clear so that you don't see it before image loads
	clear();
	
	if (theImage){
		image(theImage, 0, 0);
		//filter(POSTERIZE,mouseX);
		//tint(150, mouseX, 0);

	} else {
		fill(0);
		text("Getting Data");
	}

	if(theSong) {
		fill(150, mouseY, 0);
		//textSize(52, mouseX, 0);
		text(theSong, mouseX, mouseY);
		if(!mousePressed){ 
		stop(); }

		
		
		
		//textFont

	}
}



function mousePressed (){
	 exit(); 
}





var theImage = loadImage(url);
function loadTheImage(url) {
	console.log('loadingImage');
	theImage = loadImage(url);
	//tint(255, 128);
	
}





