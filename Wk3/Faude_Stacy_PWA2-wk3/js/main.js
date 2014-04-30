/*  
	Your Project Title
	Author: You
*/

(function($){


    /*
     ===============================================
     ========================= Login
     */
    $('#loginButton').click(function(){
        var user = $('#username').val();
        var password = $('#password').val();
        console.log("Is the password working");
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: password
            },
            success:function(response){
                console.log("test the username");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html')
                }
            }
        });
    });

    /*
     ===============================================
     ========================= Log Out
     */

    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });


    /*
     ===============================================
     ========================= Load Projects
    */

    var loadApp = function() {
        $('#wrapper').empty();
        $.get('app.html', function (htmlArg) {
            var lang = $(htmlArg).find('#template.project').html();
            $template('projectTemplate', lang);
            var html = $.render('', 'projectTemplate');
            $('#wrapper').append(html);


            $.ajax({
                url: 'xhr/get_projects.php',
                type: 'get',
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if(response.error){
                        console.log(response.error);

                    }else{
                        $.get('templates/app.html', function(html){
                            var h = $(html),
                                tempCode = h.find('#template_projects_1').html(),
                                markup = '';

                            $.template('projects', tempCode);

                            for(var i= 0, j=response.projects.length; i < j; i++){
                                var project = response.projects[i];
                                markup += $.render(project, 'projects');
                            }

                            /*
                             ===============================================
                             ========================= Delete
                             */

                            $('#delete').on('click',function(){
                                $.ajax({
                                    url:'xhr/delete_project.php',
                                    data: {
                                        projectID:id
                                    },
                                    type: 'POST',
                                    dataType: 'json',
                                    success: function(response){
                                        loadApp();
                                    }
                                });
                            });

                            $('projects').html(markup);
                        })
                    }
                }
            })
        })
    };



    /*
     ===============================================
     ========================= Register
     */

    $('#register').on('click', function(){
            var firstname=$('#first').val(),
                lastname=$('#last').val(),
                username=$('#userName').val(),
                email=$('#email').val(),
                password=$('#password').val();
                console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);

        $.ajax({
            url:'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname:firstname,
                lastname:lastname,
                username:username,
                email:email,
                password:password
            },

            success:function(response){
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        })
        });

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

    $("#boxbtn").click(function(){
        $("#box").animate({height:"300px"});
    });

    //Hiding Text
    $("#paragraph").click(function(){
        $("#paragraph").hide();
    });

    //Dropdown Login
    $(".topMenuAction").click( function() {
        if ($("#openCloseIdentifier").is(":hidden")) {
            $("#slider").animate({
                marginTop: "-141px"
            }, 500 );
            $("#topMenuImage").html('<img src="images/open.png"/>');
            $("#openCloseIdentifier").show();
        } else {
            $("#slider").animate({
                marginTop: "0px"
            }, 500 );
            $("#topMenuImage").html('<img src="images/close.png"/>');
            $("#openCloseIdentifier").hide();
        }
    });

    // Requried: Navigation bar drop-down
    $("nav ul li").hover(function() {
        $(this).addClass("active");
        $(this).find("ul").show().animate({opacity: 1}, 400);
    },function() {
        $(this).find("ul").hide().animate({opacity: 0}, 200);
        $(this).removeClass("active");
    });

    // Requried: Addtional styling elements
    $('nav ul li ul li:first-child').prepend('<li class="arrow"></li>');
    $('nav ul li:first-child').addClass('first');
    $('nav ul li:last-child').addClass('last');
    $('nav ul li ul').parent().append('<span class="dropdown"></span>').addClass('drop');

    //Panel code
    $(".open-panel").on('click',function(){
        $("html").toggleClass("active-panel");
        if($("html").hasClass("active-panel")){
            $("#myPanel").animate({
                left: "0"
            }, 500);
        } else {
            $("#myPanel").animate({
                left: "-220px"
            }, 500);
        }
    });



    /*
    ==================================== END EVENTS
    ===============================================
    */
		
		

	
})(jQuery); // end private scope




