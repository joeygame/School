//regex's that connor and i created to test the usernames and passwords
userRegex = /^([$]{1}[a-z]{4,}[a-z0-9]{1,})$/;
passRegex = /^([a-zA-Z&%$^#@=]{1}[a-zA-Z0-9&%$^#@=]{6,13}[a-zA-Z&%$^#@=]{1})/;
ddRegex = /\d\d/;
symRegex = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
capRegex = /^(.*?[A-Z]){2,}/;
lowerRegex = /^(.*?[a-z]){2,}/;
numRegex = /^(.*?[0-9]){2,}/;

//javascript object that has the data we retrieve from the JSON
var loadedData = {};

//load the json file and set loadedData equal to the corresponding javascript object
function loadInfo() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		//eval turns the string into the JS object
      loadedData = eval('(' + this.responseText + ')');
    }
  };
  xmlhttp.open("GET", "info.json", true);
  xmlhttp.send();
}

//check if the usernames and passwords exist inside the json
function login(){
  loadInfo();
  for(var i = 0; i < 4; i++) {
    if((loadedData.logins[i].username) == document.getElementById("username").value && (loadedData.logins[i].password) == document.getElementById("password").value){
      document.getElementById("loginvalid").innerHTML = "Login: Valid, The password and username exist and match";
      break;
    } else {
      document.getElementById("loginvalid").innerHTML = "Login: Invalid, no match";
    }
  }
}

//test the inout values with our series of regexes
function register(){
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

	//test username
  if(userRegex.test(username)){
      loadedData.username = username;
      document.getElementById("uservalid").innerHTML = "User: Meets username requirements";
  } else {
    document.getElementById("uservalid").innerHTML = "User: Does not meet username requirements";
  }
  //test all the password regex's against the password, they must all pass
  if(passRegex.test(password)){
    if(!ddRegex.test(password)){
      if(symRegex.test(password)){
        if(capRegex.test(password)){
          if(lowerRegex.test(password)){
            if(numRegex.test(password)){
              loadedData.password = password;
              document.getElementById("passvalid").innerHTML = "Pass: Meets  password requirements";
            }
          }
        }
      }
    }
  } else {
    document.getElementById("passvalid").innerHTML = "Pass: Does not meet password requirements";
  }
}
