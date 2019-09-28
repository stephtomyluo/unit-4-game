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
			baseAttack: 3,
			attack: 9,
			counterAttack: 18,
			img:"assets/images/tanjirokamado.jpg"
		},

		nezuko = {
			id: 1,
			name: "Nezuko Kamado",
			health: 100,
			baseAttack: 5,
			attack: 10,
			counterAttack: 15,
			img:"assets/images/nezukokamado.jpg"
		},

		inosuke = {
			id: 2,
			name: "Inosuke Hashibira",
			health: 100,
			baseAttack: 6,
			attack: 12,
			counterAttack: 24,
			img:"assets/images/inosukehashibira.jpg"
		},

		zenitsu = {
			id: 3,
			name: "Zenitsu Agatsuma",
			health: 100,
			baseAttack: 2,
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
			var newSlayerDiv = $("<div>").addClass("slayer card card-success").attr("id",slayer.id);

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
						$("#"+slayer.id).removeClass("slayer card-success").addClass("opponent card-danger").appendTo("#opponentArea");
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

	

	
});