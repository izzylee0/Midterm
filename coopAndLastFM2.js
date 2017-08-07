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
			//using jquery to get value of query input box
			var newSearchTerm = $("#query").val(); //new
			console.log(newSearchTerm); //had 'currentWord' before
		//Execute the API call function with the 'newSearchTerm' as the argument
		app.searchCoopHew(newSearchTerm); 
		app.searchlastFM(newSearchTerm);
		var x = 0;

function setup() {
  background(100);  
}

function draw() {
  ellipse(x, height/2, 20, 20);
  x = x + 1;
}


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
				console.log("Woohoo!");
				console.log(data);
				//for (var i = 0; i < data.objects.length; i++){
					var randomImgNum = Math.floor(Math.random() * 100);
					console.log(randomImgNum);
					var searchResults = data.objects[randomImgNum].images[0].b.url; 
					console.log(searchResults);

					//var textsearchResults;
					//function preload() {
					//	textsearchResults = loadJSON(searchResults);
					//}
					//function setup() {
  //noLoop();
//}




			



				//	var loadedImages;
				//	function preload() {
				//	loadedImages = loadImage("searchResults");
				//	}
				//	function setup() {
				//	image(loadedImages, 0,0);
				//	}

			
				// Load the image	
					//var loadedImages;
					//function setup() {
					//createCanvas(720, 400);
					//loadedImages = loadImage(searchResults);
					//}
					//function draw () {
					//image(loadedImages, 0, 0);
					//}


	//var img = $('<img />',
	//{src: searchResults})
	//.appendTo($('#images'));
	//app.searchCoopHew(data);

					
  //	var img;  // Declare variable 'img'.

//function setup() {
 // createCanvas(720, 400);
  //img = loadImage("searchResults");  // Load the image
//}function draw() {
  // Displays the image at its actual size at point (0,0)
  //image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
 // image(img, 0, height/2, img.width/2, img.height/2);
//}




					
				

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
				document.getElementById("searchResults").contentEditable='true';
				$("#searchResults").draggable();
    			$( "#searchResults").resizable();
  			
	
			}
		
		});


			
    		
		//options for user to change text in any way they would like 
		$("#fonts").change(function() {
    	//alert($(this).val());
   		 $('#searchResults').css("font-family", $(this).val());
		});

		$("#size").change(function() {
   	 $('#searchResults').css("font-size", $(this).val() + "px");
		});

		$("#color").change(function() {
		$('#searchResults').css("color", $(this).val());
		});
		$(window.load(function(){
			$("#searchResults").resizable();
		}));
		

	},
	

		};