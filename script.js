$(document).ready(function () {

    $(".form").hide(); //displays when final option is selected
    $(".next").hide(); //displayed in the confirmation page (stage=5)
    $(".back").addClass("disabled"); //back button enabled on stage 2
    $(".back").html("<i class='fa fa-wrench fa-2x'></i>");

    //identifies the stage, 0 for the first, 3 for the last
    var stage = 0;

    //used to identify the button clicks, -1 means it has not been clicked
    var id = [-1, -1, -1, -1];

    //class names corresponding to button class on each stage
    var stages = ["primary", "secondary", "tertiary", "final"];

    //holds the class given to each button, class is name with no spaces
    var indexnospace;

    //initializes  (creates the first set of buttons)
    initialize();

    //any changes made to the ".adddetail" (input form) are displayed on the hidden form ".userinput"
    $(".adddetail")
        .keyup(function () {
            var value = $(this).val();
            $(".userinput").val(value);
        }).keyup();

    $(".adddetail")
        .keyup(function () {
            var value = $(this).val();
            $(".confirmInput").val(value);
        }).keyup();

    $(".confirmInput")
        .keyup(function () {
            var value = $(this).val();
            $(".userinput").val(value);
        }).keyup();

    $(".confirmInput")
        .keyup(function () {
            var value = $(this).val();
            $(".adddetail").val(value);
        }).keyup();


    //checks whether child exist for button that is clicked. True if yes, false otherwise
    function checkChildExist(stageName) {
        if (stageName == "primary") {
            if (issues[id[0]].detail1) {
                return true;
            }
        } else if (stageName == "secondary") {
            if (issues[id[0]].detail1[id[1]].detail2) {
                id[2] = -1;
                id[3] = -1;
                return true;
            }
        } else if (stageName == "tertiary") {
            if (issues[id[0]].detail1[id[1]].detail2[id[2]].detail3) {
                id[3] = -1;
                return true;
            }
        } else if (stageName == "final") {
            return false;
        }
        return false;
    }

    //waits for button click
    function buttonclick() {
        $(".issue").click(function () {

            //sets the button as selected (inverted colors)
            $("#" + id[stage - 1].toString()).removeClass("active");
            $("#" + this.id.toString()).addClass("active");

            //stores index for stage, 0 for primary, 3 for final stage
            var stageIndex;

            //uses button classes to determine what stage the selection is at
            if ($(this).hasClass(stages[0])) {
                id[0] = this.id;
                stageIndex = 0; //primary
            } else if ($(this).hasClass(stages[1])) {
                id[1] = this.id;
                stageIndex = 1; //secondary
            } else if ($(this).hasClass(stages[2])) {
                id[2] = this.id;
                stageIndex = 2; //tertiary
            } else if ($(this).hasClass(stages[3])) {
                id[3] = this.id;
                stageIndex = 3; //final
            }

            //fills hidden input form, for instance "."+"primary"+"input", to create appropriate class
            $("." + stages[stageIndex] + "input").val($(this).text().trim());


            if (checkChildExist(stages[stageIndex]) == true) { //if child exists, next layer is initiated

                $("." + stages[stageIndex]).addClass("pt-page-scaleDownCenter"); //create scale down animation to current buttons

                $(".adddetail").val(""); //adddetail is the class for the form input, here the input is cleared
                $(".userinput").val(""); //userinput is the hidden form, it is also cleared
                $(".confirmInput").val("");

                //delay to avoid animation interference
                setTimeout(function () {
                    $(".buttonbox").empty(); //clears button plane
                    addButtons(id, stageIndex + 1); // add next stage of buttons 
                }, 500);

                showpath(); //updates path of button selection
                $(".form").hide();
                //Displays message saying "Got it .... issue is" titleSelectIssue is the class for the text that contains this
                if (stages[stageIndex] == "primary") {
                    $(".titleSelectIssue").empty();
                    $(".titleSelectIssue").append("Got it, there is an issue with the " + issues[id[0]].name.italics() + " at your residence. What else can you tell us?")
                }

            } else {

                //if no child exist, form appears
                $(".form").fadeIn();
                showpath(); //path is updated
            }

        });
    }

    function numberOfChildren(stageName) {
        if (stageName == "secondary") {
            return issues[id[0]].detail1.length;
        } else if (stageName == "tertiary") {
            return issues[id[0]].detail1[id[1]].detail2.length;
        } else if (stageName == "final") {
            return issues[id[0]].detail1[id[1]].detail2[id[2]].detail3.length;
        }
    }

    //returns name of issue based on button clicks
    function issueName(i, stageName) {
        if (stageName == "secondary") {
            id[2] = -1;
            id[3] = -1;
            return issues[id[0]].detail1[i].name;
        } else if (stageName == "tertiary") {
            id[3] = -1;
            return issues[id[0]].detail1[id[1]].detail2[i].name;
        } else if (stageName == "final") {
            return issues[id[0]].detail1[id[1]].detail2[id[2]].detail3[i];
        }
    }

    function initialize() {
        //creates primary menu buttons
        for (i = 0; i < issues.length; i++) {
            var index = issues[i].name;
            var indexnospace = index.replace(/\s+/g, ''); //removes spaces to make class
            var primarybutton = "<button type='button' class='issue col-xs-6 col-sm-3 col-md-2 primary btn btn-default " + indexnospace + "' id='" + i.toString() + "'>" + issues[i].img + "<p class=''>" + index + "</p></button>";
            $(".buttonbox").append(primarybutton);
            $(".primary").addClass("pt-page-scaleUp");
        }
        stage = 1;

        id = [-1, -1, -1, -1]; //resets all button selections


        //displays current button click path (currently no buttons pressed)
        showpath();
        //waits for primary button click
        buttonclick();
    }

    function addButtons(id, stageIndex) {
        var stageName = stages[stageIndex];
        for (i = 0; i < numberOfChildren(stageName); i++) {
            var index = issueName(i, stageName);
            var button = "<button type='button' class='issue not-primary col-xs-5 col-sm-3 col-md-2 " + stageName + " btn btn-default' id='" + i.toString() + "'><p class='issuename'>" + index + "</p></button>";
            $(".buttonbox").append(button);
            $("." + stageName).addClass("pt-page-scaleUpDown");
        }
        $("#" + id[stageIndex].toString()).addClass("active");

        stage = stageIndex + 1; // stage index goes from 0-3 and stage goes from 1-4, so 1 is added

        if (stageName == "secondary") {
            $(".back").html("<i class='fa fa-arrow-left fa-2x'></i>")
            $(".back").addClass("pt-page-scaleUpDown");
            $(".back").removeClass("disabled");
        }

        showpath();
        buttonclick();
    }



    $(".back").click(function () {
        if (stage == 2) { //second stage going to primary

            $(".secondary").addClass("pt-page-scaleDownUp"); //displays animation

            //adds time out for removing buttons and adding stage
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                initialize();
            }, 200);

            //resets title and path values to start/blank
            $(".titleSelectIssue").text("Select an issue from the list below:");
            $(".back").html("<i class='fa fa-wrench fa-2x'></i>");
            $(".back").addClass("disabled");
            $(".paths").text("");


            //reset hidden text form
            $(".form").hide();
            $(".primaryinput").val("");
            $(".secondaryinput").val("");
            $(".adddetail").val("");
        } else if (stage == 3) { //tertiary stage, going to secondary

            $(".tertiary").addClass("pt-page-scaleDownUp"); //displays animation

            //adds time out for removing buttons and adding stage
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                addButtons(id, 1);
            }, 200);


            //reset hidden text form
            $(".form").hide();
            $(".secondaryinput").val("");
            $(".tertiaryinput").val("");
            $(".adddetail").val("");
        } else
        if (stage == 4) { //final stage going to tertiary

            $(".final").addClass("pt-page-scaleDownUp"); //displays animation

            //adds time out for removing buttons and adding stage
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                addButtons(id, 2);
            }, 200);

            //reset hidden text form
            $(".form").hide();
            $(".finalinput").val("");
            $(".tertiaryinput").val("");
        }

        showpath(); //updates path
    });


    $(".submit").click(function () {
        alert("Queue confirmation screen")
    });

    //displays slection path 
    function showpath() {

        var selections = ["", "", "", ""];
        $(".paths").html("");

        if (id[0] != -1) {
            selections[0] = issues[id[0]].name.bold();
            $(".paths").append(selections[0]);
        }

        if (id[1] != -1) {
            selections[1] = issues[id[0]].detail1[id[1]].name;
            $(".paths").append(" - " + selections[1]);
        }

        if (id[2] != -1) {
            selections[2] = issues[id[0]].detail1[id[1]].detail2[id[2]].name;
            $(".paths").append(" - " + selections[2]);
        }

        if (id[3] != -1) {
            selections[3] = issues[id[0]].detail1[id[1]].detail2[id[2]].detail3[id[3]];
            $(".paths").append(" - " + selections[3]);
        }
    }
});
