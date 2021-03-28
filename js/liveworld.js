/*
	Filename: treasury.js
	Author: Gage Moeller
	Topic: JavaScript
	Description: Get JSON files and build a live represention of WvW map regaring Borlis Pass

	LINE 67 TO ADD GUILD TAGS TO OBJECTIVES!!!!
*/

url = "https://api.guildwars2.com/v2/wvw/objectives";
url2 = "https://api.guildwars2.com/v2/wvw/matches?world=1002";
url3 = "https://api.guildwars2.com/v2/worlds?ids="
url4 = "https://api.guildwars2.com/v2/guild/"

var WorldObjectives = "";

//Grabs ids of all objectives and feeds it over to buildMap();
function getObjectives() {
	var str = "";

	$.when($.getJSON(url)).done(function(data1)  {
		$.each(data1, function(index, element) {
			str += element + ",";
		})

		buildMap(str);
	});
}

// Makes single JSON request to grab all id values.
function buildMap(value) {
	$.when($.getJSON(url + "?ids=" + value),).done(function(data1) {
		var ebgStr = "";

		$.each(data1, function(index, element) {
			if(element.map_type == "Center") {
				if(element.marker != undefined) {
					ebgStr += "<div class=\"objective\" id=\"" + element.id + "\"><img class=\"size\" id=\"" + element.name + "\" style=\"\" src=\"" + element.marker + "\"></img><div class=\"guild-tag\"><p id=\"guild-tag\"></p></div></div>";
				}
				else {
					if(element.type == "Mercenary") {
						ebgStr += "<div class=\"objective\" id=\"" + element.id + "\"><img class=\"size\" id=\"" + element.name + "\" style=\"\" src=\"https://wiki.guildwars2.com/images/thumb/4/40/Event_poleaxes.png/20px-Event_poleaxes.png\"></img><div class=\"guild-tag\"><p id=\"guild-tag\"></p></div></div>"
					}
					else {
						ebgStr += "<div class=\"objective\" id=\"" + element.id + "\"><img class=\"size\" id=\"" + element.name + "\" style=\"\" src=\"https://wiki.guildwars2.com/images/thumb/d/d2/Waypoint_%28map_icon%29.png/32px-Waypoint_%28map_icon%29.png\"></img><div class=\"guild-tag\"><p id=\"guild-tag\"></p></div></div>";
					}
				}
			}
		})

		$('#ebg').html(ebgStr);
		placeObj();
		liveFunction();
	})
}


// Serves to update the map ever 100000 units swapping background colors of objectives
var built = false;

function liveFunction() {
	$.when($.getJSON(url2)).done(function(data1) {

		var guildNum = 0;

		$.each(data1.maps[0].objectives, function(index, element) {
			var curr = (document.getElementById(element.id));

			if(curr != null ) {
				curr.children[0].attributes[2].value = "background-color: dark" + element.owner + "; border: 1px solid #111111"
				
				if(element.claimed_by != undefined) {
					$.getJSON(url4 + element.claimed_by, function(data){
						curr.children[1].textContent = "[" + data.tag + "]";
					})
				}
				else {
					curr.children[1].textContent = "";
				}
			}
		})
	})

	objectiveTimer();
}

function objectiveTimer(){
	var d = new Date(); // for now
	console.log(d.getHours(), d.getMinutes(), d.getSeconds());// => 51
}

// Moves objectives as need based on screen width
function placeObj() {
	worldObjectives = document.getElementsByClassName('objective');
}

window.onload=getObjectives();
setInterval(liveFunction,10000);