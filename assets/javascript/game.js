$(document).ready(function () {

var tanjiro;
var nezuko;
var inosuke;
var zenitsu;

var slayerSelection = [];
var slayer = null;
var opponents = [];
var opponent = null;

function startGame() {
	tanjiro = {
		id: 0,
		name: "Tanjiro Kamado",
		health: 100,
		incrAttack: 3,
		attack: 9,
		counterAttack: 18,
		img:"assets/images/tanjirokamado.jpg"
	},

	nezuko = {
		id: 1,
		name: "Nezuko Kamado",
		health: 100,
		incrAttack: 5,
		attack: 10,
		counterAttack: 15,
		img:"assets/images/nezukokamado.jpg"
	},

	inosuke = {
		id: 2,
		name: "Inosuke Hashibira",
		health: 100,
		incrAttack: 6,
		attack: 12,
		counterAttack: 24,
		img:"assets/images/inosukehashibira.jpg"
	},

	zenitsu = {
		id: 3,
		name: "Zenitsu Agatsuma",
		health: 100,
		incrAttack: 2,
		attack: 8,
		counterAttack: 16,
		img:"assets/images/zenitsuagatsuma.jpg"
    }
        
// Resetting
	slayer = null;
	opponents = [];
	opponent = null;
	slayerSelection = [tanjiro, nezuko, inosuke, zenitsu];

// Empties divs 
	$("#slayer").empty();
	$("#opponentArea").empty();
	$("#opponent").empty();
	$("#status").empty();

$.each(slayerSelection, function(index, slayer) {
// New div displaying slayers at start of game
	var newSlayerDiv = $("<div>").addClass("slayer card").attr("id",slayer.id);

	$("<div>").addClass("card-heading").html(slayer.name).appendTo(newSlayerDiv);
	$("<div>").addClass("card-body").append("<img src='" + slayer.img + "'>").appendTo(newSlayerDiv);
	$("<div>").addClass("card-footer").append("<span class='hp'>" + slayer.health + "</span>").appendTo(newSlayerDiv);

	$("#slayerSelection").append(newSlayerDiv);
});

$(".slayer").on("click", function() {
// When slayer has been selected
	if(slayer === null) {
//Retrieve id of selected slayer 
		var slayId = parseInt($(this).attr("id"));
		slayer = slayerSelection[slayId];
// Loop through slayer array
		$.each(slayerSelection, function(index, slayer) {
			if(slayer.id !== slayId) {
				opponents.push(slayer);
				$("#"+slayer.id).removeClass("slayer card-success").addClass("opponent card").appendTo("#opponentArea");
			} else {
				$("#"+slayer.id).appendTo("#slayer");
			}
		});

$(".opponent").on("click", function() {
	if(opponent === null) {
		var opponentId = parseInt($(this).attr("id"));
		opponent = slayerSelection[opponentId];
		$("#"+opponentId).appendTo("#opponent");
			}
		});
	}
});

$("#restart").hide();

}

startGame();

$("#attack").on("click", function() {
// When slayer is selected, not defeated & there are still opponents left
	if(slayer != null && slayer.health > 0 && opponents.length > 0) {
// Store game status messages
	var status = "";

// When opponent has been selected, decr opponent HP by slayer attack power & update opponent HP
	if(opponent !== null) {
	opponent.health -= slayer.attack;
	status += "You hit " + opponent.name + " with " + slayer.attack + " damage.<br>";
	$("#"+opponent.id + " .hp").html(opponent.health);
console.log("Opponent: ",opponent.name,opponent.health);


// Decr slayer HP by opponent counter attack power & update slayer HP
	slayer.health -= opponent.counterAttack;
	status += opponent.name + " hit you back with " + opponent.counterAttack + " damage.<br>";
	$("#"+slayer.id + " .hp").html(slayer.health);
console.log("Slayer: ",slayer.name,slayer.health);

// Incr slayer attack power by base attack power
	slayer.attack += slayer.incrAttack;

// Loss scenario
	if(slayer.health <= 0) {
	status = "You've failed to defeat your opponent. FOR SHAME!";
	
	$("#restart").show();
		} else if(opponent.health <= 0) {	
		status = "You have defeated " + opponent.name + ", is that all you've got? Take on another challenge!";

		$("#opponent").empty();
		opponent = null;

// Remove defeated opponent from opponent array
		opponents.splice(opponents.indexOf(opponent),1);
				}

// Win scenario
		if(opponents.length === 0) {
			status = "You win!";
			$("#restart").show();
			}
		} else {
			status = "No enemy here.";
		}

			$("#status").html(status);
		}
	})

$("#restart").on("click", function() {
	startGame();
	})
		
});