//Final Fantasy 7
$(document).ready(function() {
  // Character object & stats

  var characters = {
    "Cloud Strife": {
      name: "Cloud Strife",
      healthPoints: 130,
      attackPower: 8,
      counterAttackPower: 15,
      imageUrl: "./assets/images/0.png.png"
    },
    "Barret Wallace": {
      name: "Barret Wallace",
      healthPoints: 150,
      attackPower: 6,
      counterAttackPower: 13,
      imageUrl: "./assets/images/1.png.png"
    },
    "Tifa Lockhart": {
      name: "Tifa Lockhart",
      healthPoints: 100,
      attackPower: 5,
      counterAttackPower: 10,
      imageUrl: "./assets/images/2.png"
    },
    Sephiroth: {
      name: "Sephiroth",
      healthPoints: 180,
      attackPower: 7,
      counterAttackPower: 25,
      imageUrl: "./assets/images/4.png.png"
    }
  };

  //will be populated once char as been chosen
  var currentChar;
  //populated with chars that didnt get selected
  var fighters = [];
  //populated once enemy is chosen
  var currentEnemy;

  var turnCounter = 1;
  var killCount = 0;
  //  this function will show the characters
  var showOne = function(characters, showArea, charStatus, attack) {
    var charDiv = $(
      "<div class='character' data-name = '" + characters.name + "'>"
    );
    var charName = $("<div class='character-name'>").text(characters.name);
    var charImage = $("<img alt='image' class='character-image'>").attr(
      "src",
      characters.imageUrl
    );
    var charHp = $("<div class= 'character-health'>").text(
      characters.healthPoints
    );
    if(attack){
      
      charDiv
      .append(charName)
      .append(charImage)
      .append(charHp);
    $(showArea).html(charDiv);
    }
    else  {
      console.log("not working");
      charDiv
      .append(charName)
      .append(charImage)
      .append(charHp);
    $(showArea).append(charDiv);
    }
    //if the character is an enemy or a defender
    if (charStatus === "enemy") {
      $(charDiv).addClass("enemy");
    } else if (charStatus === "defender") {
      //populate current enemy
      currentEnemy = characters;
      $(charDiv).addClass("target-enemy");
    }
  };
  var newFunction = function(characters, showArea, charStatus){
    var charDiv = $(
      "<div class='character' data-name = '" + characters.name + "'>"
    );
    var charName = $("<div class='character-name'>").text(characters.name);
    var charImage = $("<img alt='image' class='character-image'>").attr(
      "src",
      characters.imageUrl
    );
    var charHp = $("<div class= 'character-health'>").text(
      characters.healthPoints
    );
    charDiv
      .append(charName)
      .append(charImage)
      .append(charHp);
      $(showArea).html(charDiv);
  }

  //function to show game messages.
  var renderMessage = function(message) {
    //builds the message and appends it to the page
    var gameMessage = $("#game-message");
    var newMessage = $("<div>").text(message);
    gameMessage.append(newMessage);

    //if we get this specific message clear the message again
    if (message === "clearMessage") {
      gameMessage.text("");
    }
  };

  //this function will render the characters to the screen
  var showChar = function(charObj, showArea, attack) {
    //character section is where your chars begin
    //if true shows all characters in the starting area
    if (showArea === "#character-section") {
      $(showArea).empty();
      if(attack){
        showOne(charObj[key], showArea,"", true);
      } else{
      //loop through chars and call the showOne function
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          showOne(charObj[key], showArea, "");
        }
      }
    }
  }
    //selected-character is where our selected character will appear
    //and if its true it will show the selected players char here
    if (showArea === "#selected-char") {
      $(showArea).empty();
      showOne(charObj, showArea, " ",true);
      console.log("not working");
    }

    if (showArea === "#chosen-enemy") {
      for (var i = 0; i < charObj.length; i++) {
        showOne(charObj[i], showArea, "enemy");
      }
    }
      $(document).on("click", ".enemy", function() {
        var name = $(this).attr("data-name");

        if ($("#defender").children().length === 0) {
          showChar(name, "#defender", " ");
          $(this).hide();
          renderMessage("clearMessage");
        }
      });
    
    //
    //
    if (showArea === "#defender") {
      $(showArea).empty();
      for (var i = 0; i < fighters.length; i++) {
        if (fighters[i].name === charObj) {
          showOne(fighters[i], showArea, "defender");
        }
      }
    }

    // render the enemy again when attacked
    if (showArea === "playerDamage") {
     // $("#defender").empty();
      showOne(charObj, "defender", "", true);
    }

    if (showArea === "enemyDamage") {
     // $("currentChar").empty();
      showOne(charObj, "#selected-char", "", true);
    }

    if (showArea === "enemyDefeated") {
     // $("#defender").empty();
      var gameStateMessage =   "You have defeated " + charObj.name + ", you can choose to fight another enemy.";
      renderMessage(gameStateMessage);
    }
    
  };

  var restartGame = function(inputEndGame) {
    var restart = $("<button>Restart</button>").click(function() {
      location.reload();
    });

    var gameState = $("div").text(inputEndGame);

    $("body").html(gameState);
    $("body").append(restart);
  };

  showChar(characters, "#character-section");

  $(document).on("click", ".character", function() {
    var name = $(this).attr("data-name");

    showChar(characters, "#character-section");
    //if player has not been chosen
    if (!currentChar) {
      // populate currentChar with the selected character
      currentChar = characters[name];

      for (var key in characters) {
        if (key !== name) {
          fighters.push(characters[key]);
        }
      }

      //hide  character select div
      $("#character-section").hide();

      


      newFunction(currentChar, "#selected-char", "", true);
      showChar(fighters, "#chosen-enemy", "" , true);
    }
  });
  $("#attack-button").on("click", function() {
    
    
    if ($("#defender").children().length !== 0) {

      
      var attackMessage = "You attacked " +  currentEnemy.name + " for " + currentChar.attackPower * turnCounter + " damage.";
      var counterAttackMessage = currentEnemy.name + " attacked you for " + currentEnemy.counterAttackPower +  " damage.";
      //renderMessage("clearMessage");

      // reduce defenders health by attack value
      currentEnemy.healthPoints -= currentChar.attackPower * turnCounter;
      

      // check if enemy has health left
      console.log(currentEnemy.healthPoints);
      if (currentEnemy.healthPoints > 0) {
        showChar(currentEnemy, "enemyDamage", true);

        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        currentChar.healthPoints -= currentEnemy.counterAttackPower;

        showChar(currentChar, "enemyDamage");
      }else {
        showChar(currentEnemy, "enemyDefeated");
        
        killCount++;
        if (killCount >= 3) {
          renderMessage("clearMessage");
          restartGame("you Win!");
        }
      }
      if (currentChar.healthPoints <= 0) {
        renderMessage("clearMessage");
        restartGame("You have been defeated");
        $("attack-button").unbind("click");
      } 
    }

    turnCounter++;
  });
});
