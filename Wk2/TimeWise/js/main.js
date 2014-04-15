/*  
 TimeWise
 Author: Stacy
 */

(function($){

    /*
     ===============================================
     =========================== APPLICATION GLOBALS
     */

    var win = $(window),
        body = $(document.body),
        container = $('#container'),	// the only element in index.html
        currentUser = {}
        ;


    /*
     ===============================================
     ========================= APPLICATION FUNCTIONS
     */


    var checkLoginState = function(){
        $.ajax({
            url: 'xhr/check_login.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                // if user, loadApp()
                // if error, loadLanding()
            }
        });
    };



    // 	============================================
    //	SETUP FOR INIT

    var init = function(){

        checkLoginState();
    };


    init();


    /*
     ===============================================
     ======================================== EVENTS
     */

    win.on('submit', '#user-reg-form', function(){

        return false;
    });

    /*
     ==================================== END EVENTS
     ===============================================
     */


//give this a class name
    $("button").click(function(){
        $("section h3").addClass("hilite");
    });


//Accordion
    var headings = $("h2");
    var paragraphs = $("p");
    paragraphs.not(":first").hide();

//When a header is clicked, the first thing to do is check whether
//the paragraph underneath it is visible. If it is, then you don’t
//need to do anything.

    headings.on("click", function() {
        var t = $(this);
        if(t.next().is(":visible")) {
            return;
        }
    });

//next gets the element that immediately follows the current one in the DOM
//Using the return keyword causes the function to stop execution at that point, and no further code in that function will be run.

//Hiding the visible paragraph, in this instance it’s much easier to hide them all, and then show only the one you need.

    $(function() {
        var headings = $("h2");
        var paragraphs = $("p");
        paragraphs.not(":first").hide();
        headings.on("click", function() {
            var t = $(this);
            //Made var t into another variable becaue we used it more than once.
            var tPara = t.next();
            if(tPara.is(":visible")) {
                return;
            }
            paragraphs.hide();
            t.next().show();
            //Or
            //paragraphs.slideUp("normal");
            //tPara.slideDown("normal");
        });
    });


    //Animate
    $("#boxbtn").click(function(){
        $("#box").animate({height:"300px"});
    });

    //Hiding Text
    $("#paragraph").click(function(){
        $("#paragraph").hide();
    });




})(jQuery); // end private scope




