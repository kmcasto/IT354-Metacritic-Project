/**
 * To get a list of all the games for a particular platform, do the following:
 * 	1. Send an HTTP GET request to http://www.metacritic.com/browse/games/release-date/available/{PLATFORM_NAME}/name
 * 	2. 

var titles = [];

$( "ol.list_products" ).find("li").each(function() {
	var title = $( this ).find("a").text();
	var link = $( this ).find("a").attr("href");

	titles.append(title);
});

// titles is now an array of all games for that platform.

 */

/*
function getGames(platform) {
	var jqxhr = $.ajax({
		url: "http://www.metacritic.com/browse/games/release-date/available/ps4/name?page=1", 
		type: "GET", 
		headers: { 'Access-Control-Allow-Origin': '*', "Access-Control-Request-Method": "GET" },
		crossDomain: true, 
		dataType: "html", 
		success: function(data) {
			//var gamesList = [];
			//var gamesListElm = $( data ).find( "ol.list_products" ).find("li").each(function() {
			//	var title = $( this ).find("a").text();
			//});
		}
	});
}
*/

$( window ).load(function() {
	console.log("Startup");

	//getGames("ps4");
});

