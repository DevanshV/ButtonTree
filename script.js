$(document).ready(function () {

    $(".form").hide();
    // $(".back").css("opacity", "0");
    $(".back").addClass("disabled");
    $(".back").html("<i class='fa fa-wrench fa-2x'></i>")

    //identifies the stage, 0 for the first, 3 for the last
    var stage = 0;


    //used to identify the button clicks, -1 means it has not been clicked
    var primaryid = -1;
    var secondaryid = -1;
    var tertiaryid = -1;
    var finalid = -1;

    var issuetext;

    //holds the class given to each button, class is name with no spaces
    var indexnospace;

    //initializes  (creates the first set of buttons)
    initialize();

    function initialize() {
        //creates primary menu buttons
        for (i = 0; i < issues.length; i++) {
            var index = issues[i].name;
            var indexnospace = index.replace(/\s+/g, ''); //removes spaces to make class
            var primarybutton = "<button type='button' class='col-md-2 col-sm-3 col-xs-5 primary btn btn-default " + indexnospace + "' id='" + i.toString() + "'>" + issues[i].img + "<p class='name'>" + index + "</p></button>";
            $(".buttonbox").append(primarybutton);
            $(".primary").addClass("pt-page-scaleUp");
        }
        stage = 1;

        //resets any button presses
        primaryid = -1;
        secondaryid = -1;
        tertiaryid = -1;
        finalid = -1;

        //displays current button click path (currently no buttons pressed)
        showpath();

        //waits for primary button click
        primaryclick();
    }

    function primaryclick() {
        $(".primary").click(function () {
            $(".form").hide();
            primaryid = this.id;



            $(".primaryinput").val($(this).text().trim());


            //creates secondary menu buttons
            if (issues[primaryid].detail1) {

                $(".primary").addClass("pt-page-scaleDownCenter");

                setTimeout(function () {
                    $(".buttonbox").empty();
                    addSecondaryButtons(primaryid);
                }, 500);

                showpath();
                $(".pickissue").empty();
                $(".pickissue").append("Got it, there is an issue with the " + issues[primaryid].name.italics() + " at your residence. What else can you tell us?")

            } else {

                $(".form").fadeIn();
                showpath();

            }

        });
    }

    function secondaryclick() {
        $(".secondary").click(function () {
            $(".form").hide();
            secondaryid = this.id;

            $(".secondaryinput").val($(this).text());

            //creates third stage buttons
            if (issues[primaryid].detail1[secondaryid].detail2) {

                $(".secondary").addClass("pt-page-scaleDownCenter");

                setTimeout(function () {
                    $(".buttonbox").empty();
                    addTertiaryButtons(primaryid, secondaryid);
                }, 500);
                showpath();


            } else {
                $(".form").fadeIn();
                showpath();

            }
        });
    }

    function Tertiaryclick() {
        $(".tertiary").click(function () {
            $(".form").hide();
            tertiaryid = this.id;

            $(".tertiaryinput").val($(this).text());


            //creates fourth/final stage buttons
            if (issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3) {

                $(".tertiary").addClass("pt-page-scaleDownCenter");

                setTimeout(function () {

                    $(".buttonbox").empty();
                    addfinalbuttons(primaryid, secondaryid, tertiaryid);

                }, 700);
                showpath();

            } else {
                $(".form").fadeIn();
                showpath();

            }
        });
        showpath();

    }

    function finalclick() {
        $(".final").click(function () {

            $(".finalinput").val($(this).text());

            finalid = this.id;
            $(".form").fadeIn();
            showpath();
        });

    }

    $(".adddetail")
        .keyup(function () {
            var value = $(this).val();
            $(".userinput").val(value);
        })
        .keyup();

    function addSecondaryButtons(primaryid) {
        for (j = 0; j < issues[primaryid].detail1.length; j++) {
            var index = issues[primaryid].detail1[j].name;
            var indexnospace = index.replace(/\s+/g, '');
            var secondarybutton = "<button type='button' class='col-md-2 col-sm-3 col-xs-5 secondary pt-page-scaleUpDown btn btn-default " + indexnospace + "' id='" + j.toString() + "'><p class='text'>" + index + "</p></button>";
            $(".buttonbox").append(secondarybutton);
            stage = 2;
        }

        //ensures ids are correct
        secondaryid = -1;
        tertiaryid = -1;
        finalid = -1;
        showpath();
        //display back button
        $(".back").html("<i class='fa fa-arrow-up fa-2x'></i>")
        $(".back").addClass("pt-page-scaleUpDown");
        $(".back").removeClass("disabled");

        //waits for secondary button click to show input
        secondaryclick();
    }

    function addTertiaryButtons(primaryid, secondaryid) {
        for (k = 0; k < issues[primaryid].detail1[secondaryid].detail2.length; k++) {
            var index = issues[primaryid].detail1[secondaryid].detail2[k].name;
            var indexnospace = index.replace(/\s+/g, '');
            var tertiarybutton = "<button type='button' class='col-md-2 col-sm-3 col-xs-5 tertiary pt-page-scaleUpDown btn btn-default " + indexnospace + "' id='" + k.toString() + "'><p class='text'>" + index + "</p></button>";
            $(".buttonbox").append(tertiarybutton);
            stage = 3;
        }

        //ensures ids are correct
        tertiaryid = -1;
        finalid = -1;
        showpath();

        //waits for tertiary button click to show input
        Tertiaryclick();
    }

    function addfinalbuttons(primaryid, secondaryid, tertiaryid) {
        for (m = 0; m < issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3.length; m++) {
            var index = issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3[m];
            var indexnospace = index.replace(/\s+/g, '');
            var finalbutton = "<button type='button' class='col-md-2 col-sm-3 col-xs-5 final pt-page-scaleUpDown btn btn-default " + indexnospace + "' id='" + m.toString() + "'><p class='text'>" + index + "</p></button>";
            $(".buttonbox").append(finalbutton);
            stage = 4;
        }
        //ensures ids are correct
        finalid = -1;
        showpath();
        //waits for final button click to show input
        finalclick();
    }

    $(".back").click(function () {
        if (stage == 2) {
            $(".secondary").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                initialize();
            }, 200);

            $(".pickissue").text("Select an issue from the list below:");
            $(".back").html("<i class='fa fa-wrench fa-2x'></i>");
            $(".back").addClass("disabled");

            $(".path").text("");

            $(".primaryinput").val("");
            $(".secondaryinput").val("");


        } else if (stage == 3) {
            $(".tertiary").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                addSecondaryButtons(primaryid);
            }, 200);

            $(".secondaryinput").val("");


        } else
        if (stage == 4) {
            $(".final").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $(".buttonbox").empty();
            }, 200);
            setTimeout(function () {
                addTertiaryButtons(primaryid, secondaryid);
            }, 200);


        }
        $(".tertiaryinput").val("");
        $(".finalinput").val("");
        $(".adddetail").val("");
        $(".userinput").val("");
        $(".form").hide();
        showpath();
    });

    $(".submit").click(function () {
        ///
    });

    function showpath() {

        var one = "";
        var two = "";
        var three = "";
        var four = "";

        if (primaryid != -1) {
            one = issues[primaryid].name;

        }
        if (secondaryid != -1)
            two = issues[primaryid].detail1[secondaryid].name;

        if (tertiaryid != -1)
            three = " + " + issues[primaryid].detail1[secondaryid].detail2[tertiaryid].name;

        if (finalid != -1)
            four = " + " + issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3[finalid];

        $(".path").text("");
        $(".path").append(two + three + four);

    }
});
