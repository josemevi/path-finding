angular.module('PathFinding', [])
  .controller('PathFindingController', function($scope, $http) {

    $scope.user = {
        id: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        rPassword: ''
    }

    $scope.check = {
       a : false,
       b: false,
       c: false,
       d: false,
       e: false
    }

    $scope.formFlags = {
        uCreated: true,
        rSubmit: true,
    }

    $scope.peopleStops = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: []
    }

    $scope.route = [];
    $scope.optimalRoute = [];
    $scope.desireStops = [];
    $scope.distanceTravel = 0;
    $scope.distanceStops = [];

    //template functions related
    //////////////////////////////////////////////////////////////////////////////7
    var current_fs = null;
    var next_fs = null;

    $scope.goNext = function (elementId) {
        current_fs = $(elementId).parent();
        next_fs = $(elementId).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                
                current_fs.css({
                'display': 'none',
                'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            },
            duration: 600
        });
    }

    $(document).ready(function(){
    
        $(".next").click(function (){
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                
                current_fs.css({
                'display': 'none',
                'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            },
        duration: 600
    });
        });

        $(".next1").click(function (){
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                
                current_fs.css({
                'display': 'none',
                'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            },
        duration: 600
    });
        });

        $(".next2").click(function (){
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                
                current_fs.css({
                'display': 'none',
                'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            },
        duration: 600
    });
        });
        
        $(".previous").click(function(){
        
            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();
            
            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            
            //show the previous fieldset
            previous_fs.show();
            
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now) {
                // for making fielset appear animation
                    opacity = 1 - now;
                    
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({'opacity': opacity});
                },
                duration: 600
            });
        });
        
        $('.radio-group .radio').click(function(){
            $(this).parent().find('.radio').removeClass('selected');
            $(this).addClass('selected');
        });
        
        $(".submit").click(function(){
        return false;
        })
        
    });

    $scope.checked = function (letter){
        //Multi stops eheck
        $scope.route = [];
        if(!$scope.check[letter]){
            $scope.check.a = false;
            $scope.check.b = false;
            $scope.check.c = false;
            $scope.check.d = false;
            $scope.check.e = false;
            $scope.check[letter] = true;
            $scope.route.push(letter.toUpperCase());
        }else {
            $scope.check[letter] = false;
            $scope.route.splice($scope.route.indexOf(letter.toUpperCase(),1));
        }
        
        
            
    
        // $scope.route = [];
        // switch (letter) {
        //     case 'a':
        //         $scope.check.a = true;
        //         $scope.route.push(letter.toUpperCase());
        //         break; 
        // }
        // if(letter == 'a'){
            
        // }
        console.log($scope.route);
    }

    $scope.restart = function () {
        location.reload();
    }
    //////////////////////////////////////////////////////////////////////////////7
    //////////////////////////////////////////////////////////////////////////////7

    //EP implementation
    $scope.addUser = function () {
        let data = {
            method : 'POST',
            url : 'http://localhost:3000/pathFinding/addUser',
            data: {
                'name': $scope.user.name,
                'lastname': $scope.user.lastname,
                'email' : $scope.user.email,
                'password': $scope.user.password
            }
        }
        if($scope.user.password && $scope.user.rPassword && $scope.user.name
            && $scope.user.lastname && $scope.user.email){
            if ($scope.user.password == $scope.user.rPassword){
                $http(data).then(function successCallback(response) {                    
                    if(response.data.status == 201){                
                        console.log("user created", response.data.user)
                        $scope.user.id = response.data.user.user_id;
                        alert(response.data.msg);
                        $scope.formFlags.uCreated = false;
                        $(".next1").click($scope.goNext(".next1"));                       
                    }else {
                        $scope.formFlags.uCreated = true;
                        console.log("Error", response.data.msg);
                        alert(response.data.msg);                        
                    }                    
                }, function errorCallback(response) {
                    $scope.formFlags.uCreated = true;
                    console.log(response);         
                });
            }else {
                alert("Password doesn't math");
            }
        }else {
            alert("Empty Fields");
        }      
    }

    $scope.submitRoute = function () {
        let data = {
            method : 'POST',
            url : 'http://localhost:3000/pathFinding/addRoute',
            data: {
                'user_id': $scope.user.id,
                'route': $scope.route
            }
        }
        if($scope.user.id){
            $http(data).then(function successCallback(response) {
                console.log(response);
                if(response.data.status == 201){                
                    console.log("route created", response.data.route)
                    alert(response.data.msg);
                    $scope.formFlags.rSubmit = false;
                    $(".next2").click($scope.goNext(".next2"));                        
                }else {
                    $scope.formFlags.rSubmit = true;
                    console.log("Error", response.data.msg);
                    alert(response.data.msg);                        
                }                    
            }, function errorCallback(response) {
                $scope.formFlags.rSubmit = true;
                console.log(response);         
            });
            
        }else {
            console.log("no user id provided");
        }   
    }

    $scope.generateRoute = function () {
        let data = {
            method : 'GET',
            url : 'http://localhost:3000/pathFinding/getOptimalRoute',         
        }
        $http(data).then(function successCallback(response) { 
            console.log(response);           
            $scope.optimalRoute = response.data.optimalPath.stopsMade;                
            $scope.distanceTravel = response.data.optimalPath.totalDistanceTraveled;
            $scope.distanceStops = response.data.optimalPath.distanceTraveled;
            $scope.desireStops = response.data.optimalPath.routeOrder;
        }, function errorCallback(response) {
            console.log(response);         
        });                   
    }

    $scope.getRoutes = function () {
        let data = {
            method : 'GET',
            url : 'http://localhost:3000/pathFinding/getRoutes',         
        }
        $http(data).then(function successCallback(response) { 
            console.log(response);                       
            for(let i = 0; i < response.data.routes.length; i++){
                for(let k = 0; k < response.data.routes[i].route.length; k++){                    
                    if('A' == response.data.routes[i].route[k]){
                        $scope.peopleStops.A.push(response.data.routes[i].name +' '+ response.data.routes[i].lastname);
                    }else 
                    if('B' == response.data.routes[i].route[k]){
                        $scope.peopleStops.B.push(response.data.routes[i].name +' '+ response.data.routes[i].lastname);
                    }else
                    if('C' == response.data.routes[i].route[k]){
                        $scope.peopleStops.C.push(response.data.routes[i].name +' '+ response.data.routes[i].lastname);
                    }else
                    if('D' == response.data.routes[i].route[k]){
                        $scope.peopleStops.D.push(response.data.routes[i].name +' '+ response.data.routes[i].lastname);
                    }else
                    if('E' == response.data.routes[i].route[k]){
                        $scope.peopleStops.E.push(response.data.routes[i].name +' '+ response.data.routes[i].lastname);
                    }
                }
            }
        }, function errorCallback(response) {
            console.log(response);         
        });           
    }

    $scope.clearData = function () {
        let data = {
            method : 'DELETE',
            url : 'http://localhost:3000/pathFinding/clearData',
        
        }
        $http(data).then(function successCallback(response) {
            console.log(response);
            alert(response.data.msg);
            $scope.restart();                                                      
        }, function errorCallback(response) {
            console.log(response);         
        });                  
    }

});