//To make everything work in order
$.ajaxSetup({
    async: false
});

//Getting user coordinates from API
$(function() {
    var newLoc;
    $.getJSON('http://ipinfo.io', function(data) {
        newLoc = data.city + ',' + data.country;
    });

    function getAPI() {
        $('iframe').attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDIKkDXu2lV3SWItU8NU037b8Ac0lC3Y6k&q=' + newLoc + '&zoom=12');
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?APPID=a1ae655aab2184aa0f4577b8fd5a29b2&units=metric&q=' + newLoc, function(data) {
            weatherObj = data;
        });
    }
    //Getting responsive background
    function getBG() {
        $.getJSON('https://raw.githubusercontent.com/OLucky/weather.page/master/json/bgCLRs.json', function(data) {
            var bgCLRs = data;
            $('body').css('background-color', bgCLRs[weatherObj.weather[0].main].color1);
            $('body').css('background', '-webkit-linear-gradient(to top, ' + bgCLRs[weatherObj.weather[0].main].color1 + ',' + bgCLRs[weatherObj.weather[0].main].color2 + ')');
            $('body').css('background', 'linear-gradient(to top, ' + bgCLRs[weatherObj.weather[0].main].color1 + ',' + bgCLRs[weatherObj.weather[0].main].color2 + ')');
        });
    }

    //Filling the table
    var tempC;
    var tempF;
    var isC = 0;

    function pasteData() {
        tempC = Math.floor(weatherObj.main.temp) + "C&deg";
        tempF = Math.floor((Math.floor(weatherObj.main.temp)) * (9 / 5) + 32) + "F&deg";
        $('#temp').html(tempC);
        $('#location').html('<b>The Weather in ' + weatherObj.name + ', ' + weatherObj.sys.country + '</b>');
        $('#descr').html(weatherObj.weather[0].main);
        $('#det').html(weatherObj.weather[0].description);
        var iconURL = 'http://openweathermap.org/img/w/' + weatherObj.weather[0].icon + '.png';
        $('#icon').attr('src', iconURL);
    }

    //Setting proper time display
    function setTime() {
        var dt = new Date();
        var monthName = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        //Proper today's number display

        var dayNumber = dt.getDate();
        if (dayNumber >= 11 && dayNumber <= 13)
            dayNumber = dayNumber + "th";
        else {
            var dayNumArr = dayNumber.toString().split('');
            switch (parseInt(dayNumArr[dayNumArr.length - 1])) {
                case 1:
                    dayNumber = dayNumber + "st";
                    break;
                case 2:
                    dayNumber = dayNumber + "nd";
                    break;
                case 3:
                    dayNumber = dayNumber + "rd";
                    break;
                default:
                    dayNumber = dayNumber + "th";
                    break;
            }
        }

        //Adding the leading zero to minutes if necessary
        var minutes = dt.getMinutes();
        if (minutes < 10)
            minutes = '0' + minutes;
        //Displaying time
        var time = '<b>The ' + dayNumber + " of " + monthName[dt.getMonth()] + ', ' + dt.getHours() + ":" + minutes + '</b>';
        $('#time').html(time);
    }

    //Calling main functions
    getAPI();
    pasteData();
    getBG();
    setTime();

    //Changing metric for temperature
    $('#temp').on('click', function() {
        switch (isC) {
            case 0:
                $('#temp').html(tempF);
                isC = 1;
                break;
            case 1:
                $('#temp').html(tempC);
                isC = 0;
                break;
        }
    });

    //Working with user request
    $('#submit').on('click', function sendData() {
        if ($('#city').val() === '' || $('#country').val() === '') {
            alert('Fill out all the fields please.');
            return;
        }
        newLoc = $('#city').val() + ',' + $('#country').val();
        getAPI();
        pasteData();
        console.log(weatherObj);
        getBG();
        setTime();
    });
});
