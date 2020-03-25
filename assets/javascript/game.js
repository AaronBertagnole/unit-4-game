//Final Fantasy 7
$(document).ready(function () {

    // Character object & stats

  var characters = {
    "Cloud Strife":{
       name: "Cloud Strife",
       healthPoints: 130,
       attackPower: 8,
       counterAttackPower: 15,
       imageUrl: "./assets/images/0.png.png"
    },
    "Barret Wallace":{
      name: "Barret Wallace",
      healthPoints: 150,
      attackPower: 6,
      counterAttackPower: 13,
      imageUrl: "./assets/images/1.png.png"
    },
    "Tifa Lockhart":{
      name: "Tifa Lockhart",
      healthPoints: 100,
      attackPower: 5,
      counterAttackPower: 10,
      imageUrl: "./assets/images/2.png"
    },
    "Sephiroth":{
      name: "Sephiroth",
      healthPoints: 180,
      attackPower: 7,
      counterAttackPower: 25,
      imageUrl: "./assets/images/4.png.png"
    }
  };
  var currentChar;
  var fighters = [];
  var currentEnemy;
  var turnCounter = 1;
  var killCount = 0;
  //  this function will show the characters
  var showOne = function(characters, showArea, charStatus ) {
      var charDiv = $("<div class= 'character' data-name = '" + characters.name + "'>");
      var charName = $("<div class= 'character-name'>").text(characters.name);
      var charImage = $("<img alt='image' class='character-image'>").attr("src", characters.imageUrl);
      var charHp = $("<div class= 'character-health'>").text(characters.healthPoints);
      charDiv.append(charName).append(charImage).append(charHp);
      $(showArea).append(charDiv);

      if (charStatus === "enemy"){
        $(charDiv).addClass("enemy");
      }
      else if (charStatus === "enemy"){

        currentEnemy = characters;
        $(charDiv).addClass("target-enemy");
      }
      console.log(charDiv);
  }
      //function to show game messages.
      var renderMessage = function(message){

        //builds the message and appends it to the page
        var gameMessage = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessage.append(newMessage);

        //if we get this specific message clear the message again
        if (message === "clearMessage"){
          gameMessageSet.text("");
        }
      };


      //this function will render the characters to the screen
      var showChar = function(charObj, showArea) {

    //character section is where your chars begin
    //if true shows all characters in the starting area 
      if (showArea === "#character-section") {
         $(showArea).empty();
         //loop through chars and call the showOne function
         for (var key in charObj) {
              if (charObj.hasOwnProperty(key)) {
                showOne(charObj[key], showArea, "");

             }
         }
      }

      //selected-character is where our selected character will appear
      //and if its true it will show the selected players char here
      if (showArea === "#selected-char");
      showOne(charObj,showArea, " ");
     

   if(showArea === "#chosen-enemy"){

        for (var i = 0; i<charObj.length; i++){
        showOne(charObj[i], showArea, "enemy");
      }

      $(document).on("click", ".enemy", function(){
          var name = ($(this).attr("data-name"));
         
            if($("#enemy").children().length === 0){
              showChar(name, "#enemy");
              $(this).hide();
              renderMessage("clearMessage");
            }
      });
   }

      if(showArea === "#enemy") {
        $(showArea).empty();
          for(var i = 0; i< fighters.length; i++){
              if(fighters[i].name === charObj){
                showOne(fighters[i], showArea, "#enemy");
              }
          }
      }

      // render the enemy again when attacked
      if (showArea === "playerDamage"){
        $("#enemy").empty();
        showOne(charObj, "#enemy","enemy");
      }

      if (showArea === "enemyDamage"){
          $("currentChar").empty();
          showOne(charObj, "#selected-char", "");         
      }

      if(showArea === "enemyDefeated"){
        $("#enemy").empty();
        var gameStateMessage = ("You jave defeated " +charObj.name + ", you can choose to fight another enemy.");
        renderMessage(gameStateMessage);
      }
  };

    showChar(characters, "#character-section");
    
    $(document).on("click", ".character", function() {
      var name = $(this).attr("data-name");
    
      //if player has not been chosen
     if (!currentChar){
       // populate currentChar with the selected character
       currentChar =characters[name];

        for(var key in characters){
          if (key !== name){
            fighters.push(characters[key]);
          }
        }
        console.log(fighters);
        //hide  character select div
        $("#character-section").hide();

        showChar(currentChar, "#selected-char");
        showChar(fighters, "#chosen-enemy");
     }
    });
        $("attack-button").on("click", function(){

          if($("#enemy").children().length !== 0){
             currentEnemy.healthPoints -= (currentChar.attackPower = turnCounter);
             
              
             // check if enemy has health left
             if(currentEnemy.healthPoints>0){
               
              showChar(currentEnemy,"playerDamage");

              currentChar.healthPoints -= currentEnemy.counterAttackPower;

              showChar(currentChar, "enemyDamage");

             }
          }
          else{
            showChar(currentEnemy, "enemyDefeated");
            killCount++
              if(killCount >=3){

              }
          }

           turnCounter++; 
    });
});
 














