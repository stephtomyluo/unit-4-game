$(document).ready(function () {

var tanjiro;
var nezuko;
var inosuke;
var zenitsu;
var giyu;
var muzan;

var slayerSelection = [];
var slayer = null;
var opponents = [];
var opponent = null;

function startGame() {

	alert('Choose your warrior!')

	tanjiro = {
		id: 0,
		name: "Tanjiro Kamado",
		health: 225,
		incrAttack: 10,
		attack: 8,
		counterAttack: 20,
		img:"./assets/images/tanjiroKamado.jpg"
	},

	nezuko = {
		id: 1,
		name: "Nezuko Kamado",
		health: 250,
		incrAttack: 7,
		attack: 17,
		counterAttack: 25,
		img:"./assets/images/nezukoKamado.jpg"
	},

	inosuke = {
		id: 2,
		name: "Inosuke Hashibira",
		health: 210,
		incrAttack: 13,
		attack: 8,
		counterAttack: 15,
		img:"./assets/images/inosukeHashibira.jpg"
	},

	zenitsu = {
		id: 3,
		name: "Zenitsu Agatsuma",
		health: 195,
		incrAttack: 10,
		attack: 10,
		counterAttack: 25,
		img:"./assets/images/zenitsuAgatsuma.jpg"

	},
	
	giyu = {
		id: 4,
		name: "Giyu Tomioka",
		health: 230,
		incrAttack: 16,
		attack: 10,
		counterAttack: 25,
		img:"./assets/images/giyuTomioka.jpg"
	},

	muzan = {
		id: 5,
		name: "Muzan Kibutsuji",
		health: 215,
		incrAttack: 20,
		attack: 5,
		counterAttack: 15,
		img:"./assets/images/muzanKibutsuji.jpg"
	}
        
// Resetting
	slayer = null;
	opponents = [];
	opponent = null;
	slayerSelection = [tanjiro, nezuko, inosuke, zenitsu, giyu, muzan];

// Empties divs 
	$("#slayer").empty();
	$("#opponentArea").empty();
	$("#opponent").empty();
	$("#status").empty();

$.each(slayerSelection, function(index, slayer) {
// New div displaying slayers at start of game
	var newSlayerDiv = $("<div>").addClass("slayer card-group").attr("id",slayer.id);

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
			if(slayer.id != slayId) {
				opponents.push(slayer);
				$("#"+slayer.id).removeClass("slayer card").addClass("opponent card col-12").appendTo("#opponentArea");
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
	if(opponent != null) {
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
		status = "You have defeated " + opponent.name + ", is that all you've got? Take on another challenger!";

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
			status = "Do you intend to fight yourself?";
		}

			$("#status").html(status);
		}
	})

$("#restart").on("click", function() {
	startGame();
	})
		
});