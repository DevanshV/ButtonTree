$(document).ready(function () {
    $(".form").hide();
    $(".back").hide();
    var stage = 0;
    var primaryid = -1;
    var secondaryid = -1;
    var tertiaryid = -1;
    var finalid = -1;
    var issuetext;
    var indexnospace;

    //initializes
    initialize();

    function initialize() {
        //creates primary menu buttons
        for (i = 0; i < issues.length; i++) {
            var index = issues[i].name;
            var indexnospace = index.replace(/\s+/g, ''); //removes spaces to make class
            var primarybutton = "<button type='button' class='primary btn btn-default " + indexnospace + "' id='" + i.toString() + "'>" + issues[i].img + "<p class='name'>" + index + "</p></button>";
            $("span").append(primarybutton);
            $(".primary").addClass("pt-page-scaleUp");
        }

        primaryid = -1;
        secondaryid = -1;
        tertiaryid = -1;
        finalid = -1;

        //waits for primary button click
        primaryclick();
    }

    function primaryclick() {
        $(".primary").click(function () {
            $(".form").hide();
            primaryid = this.id;

            //creates secondary menu buttons
            if (issues[primaryid].detail1) {

                $(".primary").addClass("pt-page-scaleDownCenter");
                setTimeout(function () {
                    $("span").empty();
                    addSecondaryButtons(primaryid);
                }, 500);


            } else {
                $(".form").fadeIn();
            }

        });
    }

    function secondaryclick() {
        $(".secondary").click(function () {
            $(".form").hide();
            secondaryid = this.id;

            //creates third stage buttons
            if (issues[primaryid].detail1[secondaryid].detail2) {
                
                $(".secondary").addClass("pt-page-scaleDownCenter");
                setTimeout(function () {
                    $("span").empty();
                    addTertiaryButtons(primaryid, secondaryid);
                }, 500);


            } else {
                $(".form").fadeIn();
            }
        });
    }

    function Tertiaryclick() {
        $(".tertiary").click(function () {
            $(".form").hide();
            tertiaryid = this.id;

            //creates fourth/final stage buttons
            if (issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3) {

                $(".tertiary").addClass("pt-page-scaleDownCenter");

                setTimeout(function () {

                    $("span").empty();
                    addfinalbuttons(primaryid, secondaryid, tertiaryid);

                }, 700);

            } else {
                $(".form").fadeIn();
            }
        });

    }

    function finalclick() {
        $(".final").click(function () {
            finalid = this.id;
            $(".form").fadeIn();
        });

    }

    function addSecondaryButtons(primaryid) {
        for (j = 0; j < issues[primaryid].detail1.length; j++) {
            var index = issues[primaryid].detail1[j].name;
            var indexnospace = index.replace(/\s+/g, '');
            var secondarybutton = "<button type='button' class='secondary pt-page-scaleUpDown btn btn-default " + indexnospace + "' id='" + j.toString() + "'>" + index + "</button>";
            $("span").append(secondarybutton);
            stage = 2;
        }

        //ensures ids are correct
        secondaryid = -1;
        tertiaryid = -1;
        finalid = -1;

        //display back button
        $(".back").show();
        $(".back").addClass("pt-page-scaleUp");

        //waits for secondary button click to show input
        secondaryclick();
    }

    function addTertiaryButtons(primaryid, secondaryid) {
        for (k = 0; k < issues[primaryid].detail1[secondaryid].detail2.length; k++) {
            var index = issues[primaryid].detail1[secondaryid].detail2[k].name;
            var indexnospace = index.replace(/\s+/g, '');
            var tertiarybutton = "<button type='button' class='tertiary pt-page-scaleUpDown btn btn-default " + indexnospace + "' id='" + k.toString() + "'>" + index + "</button>";
            $("span").append(tertiarybutton);
            stage = 3;
        }

        //ensures ids are correct
        tertiaryid = -1;
        finalid = -1;

        //waits for tertiary button click to show input
        Tertiaryclick();
    }

    function addfinalbuttons(primaryid, secondaryid, tertiaryid) {
        for (m = 0; m < issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3.length; m++) {
            var index = issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3[m];
            var indexnospace = index.replace(/\s+/g, '');
            var finalbutton = "<button type='button' class='final pt-page-scaleUp btn btn-default " + indexnospace + "' id='" + m.toString() + "'>" + index + "</button>";
            $("span").append(finalbutton);
            stage = 4;
        }
        //ensures ids are correct
        finalid = -1;

        //waits for final button click to show input
        finalclick();
    }

    $(".back").click(function () {
        if (stage == 1) {
            $(".back").hide();
        } else if (stage == 2) {
            $(".secondary").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $("span").empty();
            }, 300);
            setTimeout(function () {
                initialize();
            }, 300);

            $(".back").hide();
            $(".form").hide();
        } else if (stage == 3) {
            $(".tertiary").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $("span").empty();
            }, 300);
            setTimeout(function () {
                addSecondaryButtons(primaryid);
            }, 300);

            $(".form").hide();
        } else {
            $(".final").addClass("pt-page-scaleDownUp");
            setTimeout(function () {
                $("span").empty();
            }, 300);
            setTimeout(function () {
                addTertiaryButtons(primaryid, secondaryid);
            }, 300);

            $(".form").hide();
        }
    });

    $(".submit").click(function () {

        var one = "";
        var two = "";
        var three = "";
        var four = "";

        if (primaryid != -1)
            one = issues[primaryid].name;

        if (secondaryid != -1)
            two = " - " + issues[primaryid].detail1[secondaryid].name;

        if (tertiaryid != -1)
            three = " - " + issues[primaryid].detail1[secondaryid].detail2[tertiaryid].name;

        if (finalid != -1)
            four = " - " + issues[primaryid].detail1[secondaryid].detail2[tertiaryid].detail3[finalid];

        alert(one + two + three + four);

    });
});
