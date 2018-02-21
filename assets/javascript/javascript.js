$(document).ready(function() {
    var fighterChosen=false;
    var enemyHealth;
    var yourFighter="";
    var yourAttack=0
    var yourUpdatedAttack;
    var yourHealth=0;
    var counterAttack;
    var enemy;
    var enemySelected=false;
    var enemiesDefeated=0;
    var counter=0;
    var yourFighterName=""
    function startGame () {
        //reset text
        $("#options-or-enemies").text("Bluths");
        $("#attack-summary").text("Ready to Attack!");
        $("#damage-summary").text(" ");
        //reset buttons
        $("#attack").show();
        $("#restart").hide();
        //reset variables
        fighterChosen=false;
        yourFighter="";
        yourFighterName=""
        yourAttack=0;
        counter=0;
        yourUpdatedAttack=0;
        yourHealth=0;
        counterAttack=0;
        enemy="";
        enemiesDefeated=0;
        enemySelected=false;
        
        //remove current enemy and current player from fighting area
        $("div").remove(".chosen-enemy");
        $("div").remove(".chosen-player");
        $("div").remove(".player")

        //put all characters back to starting positions
        $("#George Bluth Sr").show(); //needs go be id name


    }

    $(".player").on("click", function() {
        if (fighterChosen===false) {  //checks if fighter has been chosen yet
            //fighter selected
            yourFighter = $(this).attr("id");
            yourFighterName = $(this).attr("alt");
        
            //create new div
            yourFighterDiv= $("<div>");
            //add needed images, text, classes, ids to chosen player
            yourFighterDiv.html("<img src='assets/images/"+yourFighter+".jpg' alt='Lucille Bluth' width='215px' height='150px' class='img-rounded'>")
            yourFighterDiv.addClass("chosen-player");
            //show chosen fighter
            $("#fighter").append(yourFighterDiv);
            $(".chosen-player").append("<h6 class='text-center'>"+yourFighter.toLocaleUpperCase()+" </h6>");
            //remove chosen fighter from options
            $(this).hide(); 
            //change heading to read enemies
            $("#options-or-enemies").text("Remaining Enemies");
            //now fighter has been chosen
            fighterChosen=true;

            //get attack power 
            
            yourAttack = $(this).attr("attack");
            yourHealth = $(this).attr("health");
            console.log("your attack power is " +yourAttack+" your health is "+yourHealth);

            enemySelected=false;
        

        } else {      //if fighter not chosen, click selects enemy
            enemy = $(this).attr("id");
            console.log("your enemy is " + enemy);
            $("#attack-summary").text("Ready to Attack!");
            enemyDiv = $("<div>");
            enemyDiv.html("<img src='assets/images/"+enemy+".jpg' alt='Lucille Bluth' width='215px' height='150px' class='img-rounded'>")
            enemyDiv.addClass("chosen-enemy");
            $("#enemy").append(enemyDiv);
            $(".chosen-enemy").append("<h6 class='text-center'>"+enemy.toLocaleUpperCase()+" </h6>");
            $(this).hide();

            //get counter attack and health
            counterAttack= $(this).attr("counter-attack");
            enemyHealth = $(this).attr("health");
            console.log("enemy counter attack is "+counterAttack+ " and enemy health is "+enemyHealth); 

            enemySelected=true;
        }
    });

    
    $("#attack").on("click", function() {
        if(enemySelected===true) {
        //update your attack power
       counter++
       yourUpdatedAttack = parseInt(yourAttack)*counter;
       console.log("your attack will be "+yourUpdatedAttack);
       console.log("the counter is: "+counter);

       //enemys stats
       enemyHealth= enemyHealth-yourUpdatedAttack;
       $("#attack-summary").text("You attacked "+enemy+ " for "+yourUpdatedAttack+" damage and their stimmy is now $"+enemyHealth+".");

       //your stats
       yourHealth = yourHealth-counterAttack;
       $("#damage-summary").text(enemy+ " attacked back for "+counterAttack+ " damage and your stimmy is now $" +yourHealth+".");


       

       //check for defeating a single enemy
       if ( enemyHealth<=0 ) {
           console.log("you win!");
            //empty the defeated enemy from the enemy div
            $("div").remove(".chosen-enemy");
            //clear the attack and damage stats
            $("#attack-summary").text("Ready to Attack! ");
            $("#damage-summary").text(" ");

            enemiesDefeated++
            console.log(enemiesDefeated);

            enemySelected=false;
       }

       //check for defeating all enemies
       if (enemiesDefeated===3) {
           console.log("you win the whole game!");
           $("#attack-summary").text("YOU WIN!!")

           $("#restart").show();
           $("#attack").hide();
       }

       //check for losing 
       if (yourHealth<=0) {
        $("#attack-summary").text("YOU LOSE!!");
        $("#restart").show();
        $("#attack").hide();

       }

       $("#restart").on("click", function() {
        startGame();

    })

    } else {
    $("#attack-summary").text("Select an enemy before attacking")}

    })

})