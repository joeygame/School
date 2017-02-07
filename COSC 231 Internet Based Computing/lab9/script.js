//call this function with the cookie's name as a parameter to get an alert of it's value and the number of cookies stores overall
function test(name){
	alert("The cookie \"" + name + "\" has the value of " + "\"" + getData(name) + "\"" +
	"and the the page has a total of " + length() + " cookies."	);
}

function setData(name, value, numDays){
	if(numDays == "")//if its blank default the days to 0
		days = 0;
	else 
		days = numDays;
	
	//generate a date value that is a specified number of days after the current date
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
	
	//write the cookie
	document.cookie = name + "=" + value + ";" +
		"expires=" + date;
}

//this function will print out the data value of cookie "cookieName"
function getData(cookieName){
	//this name var is the string that comes before the cookie's value
    var name = cookieName + "=";
	//this returns an array where each element is a cookie
    var cookieArray = document.cookie.split(';');
    for(var i = 0; i <cookieArray.length; i++) {
        var cookieSelected = cookieArray[i];
        while (cookieSelected.charAt(0)==' ') {
            cookieSelected = cookieSelected.substring(1);
        }
        if (cookieSelected.indexOf(name) == 0) {
            return cookieSelected.substring(name.length,cookieSelected.length);//return the value after "cookiename="
        }
    }
    return "no data found";
}

//this function returns the number of cookies on the page
function length(){
	return (document.cookie.split(';').length-1);
}