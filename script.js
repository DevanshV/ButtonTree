$(document).ready(function () {
    $(".form").hide();
    $(".back").addClass("disabled");
    $(".back").html("<i class='fa fa-wrench fa-2x'></i>")

    //identifies the stage, 0 for the first, 3 for the last
    var stage = 0;

    //used to identify the button clicks, -1 means it has not been clicked
    var id = [-1, -1, -1, -1];

    //class names corresponding to button class on each stage
    var classes = ["primary", "secondary", "tertiary", "final"];

    //holds the class given to each button, class is name with no spaces
    var indexnospace;

    //initializes  (creates the first set of buttons)
    initialize();

    function checkChildExist(classname) {
        if (classname == "primary") {
            if (issues[id[0]].detail1) {
                return true;
            }
        } else if (classname == "secondary") {
            if (issues[id[0]].detail1[id[1]].detail2) {
                return true;
            }
        } else if (classname == "tertiary") {
            if (issues[id[0]].detail1[id[1]].detail2[id[2]].detail3) {
                return true;
            }
        } else if (classname == "final") {
            return false;
        }
        return false;
    }

    function buttonclick() {
        $(".issue").click(function () {
            $(".form").hide();
            var classIndex;
            if ($(this).hasClass(classes[0])) {
                id[0] = this.id;
                classIndex = 0;
            } else if ($(this).hasClass(classes[1])) {
                id[1] = this.id;
                classIndex = 1;
            } else if ($(this).hasClass(classes[2])) {
                id[2] = this.id;
                classIndex = 2;
            } else if ($(this).hasClass(classes[3])) {
                id[3] = this.id;
                classIndex = 3;
            }

            $("." + classes[classIndex] + "input").val($(this).text().trim());

            if (checkChildExist(classes[classIndex]) == true) {
                $("." + classes[classIndex]).addClass("pt-page-scaleDownCenter");

                setTimeout(function () {
                    $(".buttonbox").empty();
                    addButtons(id, classIndex + 1);
                }, 500);

                showpath();

                if (classes[classIndex] == "primary") {
                    $(".pickissue").empty();
                    $(".pickissue").append("Got it, there is an issue with the " + issues[id[0]].name.italics() + " at your residence. What else can you tell us?")
                }
            } else {
                $(".form").fadeIn();
                showpath();
            }

        });
    }

    $(".adddetail")
        .keyup(function () {
            var value = $(this).val();
            $(".userinput").val(value);
        })
        .keyup();

    function numberOfChildren(classname) {
        if (classname == "secondary") {
            return issues[id[0]].detail1.length;
        } else if (classname == "tertiary") {
            return issues[id[0]].detail1[id[1]].detail2.length;
        } else if (classname == "final") {
            return issues[id[0]].detail1[id[1]].detail2[id[2]].detail3.length;
        }
    }

    function issueName(i, classname) {
        if (classname == "secondary") {
            id[1] = -1;
            id[2] = -1;
            id[3] = -1;
            return issues[id[0]].detail1[i].name;
        } else if (classname == "tertiary") {
            id[2] = -1;
            id[3] = -1;
            return issues[id[0]].detail1[id[1]].detail2[i].name;
        } else if (classname == "final") {
            id[3] = -1;
            return issues[id[0]].detail1[id[1]].detail2[id[2]].detail3[i];
        }
    }

    function initialize() {
        //creates primary menu buttons
        for (i = 0; i < issues.length; i++) {
            var index = issues[i].name;
            var indexnospace = index.replace(/\s+/g, ''); //removes spaces to make class
            var primarybutton = "<button type='button' class='issue col-md-2 col-sm-3 col-xs-5 primary btn btn-default " + indexnospace + "' id='" + i.toString() + "'>" + issues[i].img + "<p class='name'>" + index + "</p></button>";
            $(".buttonbox").append(primarybutton);
            $(".primary").addClass("pt-page-scaleUp");
        }
        stage = 1;

        //displays current button click path (currently no buttons pressed)
        showpath();
        //waits for primary button click
        buttonclick();
    }

    function addButtons(id, classIndex) {
        var className = classes[classIndex];
        for (i = 0; i < numberOfChildren(className); i++) {
            var index = issueName(i, className);
            var button = "<button type='button' class='issue col-md-2 col-sm-3 col-xs-5 " + className + " btn btn-default' id='" + i.toString() + "'><p class='text'>" + index + "</p></button>";
            $(".buttonbox").append(button);
            $("." + className).addClass("pt-page-scaleUp");
        }

        stage = classIndex + 1;

        if (className == "secondary") {
            $(".back").html("<i class='fa fa-arrow-left fa-2x'></i>")
            $(".back").addClass("pt-page-scaleUpDown");
            $(".back").removeClass("disabled");
        }

        showpath();
        buttonclick();
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

            //resets title and path values to start/blank
            $(".pickissue").text("Select an issue from the list below:");
            $(".back").html("<i class='fa fa-wrench fa-2x'></i>");
            $(".back").addClass("disabled");
            $(".path").text("");


            //reset hidden text form
            $(".form").hide();
            $(".primaryinput").val("");
            $(".secondaryinput").val("");
            $(".adddetail").val("");
            $(".userinput").val("");
        } else if (stage == 3) {
            $(".tertiary").addClass("pt-page-scaleDownUp");


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
            $(".userinput").val("");
        } else
        if (stage == 4) {
            $(".final").addClass("pt-page-scaleDownUp");

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
            $(".adddetail").val("");
            $(".userinput").val("");
        }

        showpath();
    });

    $(".submit").click(function () {
        alert(id[0])
        alert(id[1])
        alert(id[2])
        alert(id[3])
    });

    function showpath() {

        var selections = ["", "", "", ""];

        if (id[0] != -1)
            selections[0] = issues[id[0]].name;

        if (id[1] != -1)
            selections[1] = issues[id[0]].detail1[id[1]].name;

        if (id[2] != -1)
            selections[2] = " + " + issues[id[0]].detail1[id[1]].detail2[id[2]].name;

        if (id[3] != -1)
            selections[3] = " + " + issues[id[0]].detail1[id[1]].detail2[id[2]].detail3[id[3]];

        $(".path").text("");
        $(".path").append(selections[0] + selections[1] + selections[2] + selections[3]);

    }
});
