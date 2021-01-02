function login() {
    inputname = $('#username').val();
    console.log(inputname)
    inputpassword =$('#password').val();
    var flag = 0;
    var data = JSON.parse(localStorage.getItem('Users'))
    $(data).each(function(i,value){
        name = data[i][1].Username
        console.log(name)
            pass = data[i][2].Password;

            if (inputname == name & inputpassword == pass ){
                //The user has successfully authenticated. We need to store this information
                //for the next page.
                sessionStorage.setItem("AuthenticationState", "Authenticated");
                flag++;
                //This authentication key will expire in 1 hour.
                // sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));
                
                //Push the user over to the next page.
                window.open('index.html','_self');
            }
            })      
    
            if(flag == 0){
        alert("Wrong Password or Username!");
            }
}
 Date.now.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
 }