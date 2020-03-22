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
      name: "Tifa Lockhart ",
      healthPoints: 100,
      attackPower: 5,
      counterAttackPower: 10,
      imageUrl: "./assets/images/2.png"
    },
    "Sephiroth":{
      name: "Sephiroth ",
      healthPoints: 180,
      attackPower: 7,
      counterAttackPower: 25,
      imageUrl: "./assets/images/4.png.png"
    }  
  };
  console.log(characters);
  //  this function will show the characters
  var showOne = function(characters, showArea) {
      var charDiv = $("<div class='character' data-name = '" + characters.name + "'>");
      var charName = $("<div class='character-name'>").text(characters.name);
      var charImage = $("<img alt='image' class='character-image'>").attr("src", characters.imageUrl);
      var charHp = $("<div class= 'character-health'>").text(characters.healthPoints);
      charDiv.append(charName).append(charImage).append(charHp);
      $(showArea).append(charDiv);
  }

  var showChar = function(charObj, showArea) {
      if (showArea === "#character-section") {
         $(showArea).empty();
         for (var key in charObj) {
              if (charObj.hasOwnProperty(key)) {
                showOne(charObj[key], showArea);
             }
         }
      }
  }
    showChar(characters, "#character-section");
    
});
 














