const { session } = require('electron')

$('.loginForm').submit((event) => {
    event.preventDefault();

    let username = $('#inputEmail').val();
    let password = $('#inputPassword').val();

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/loginElectron?email='+username+'&password='+password,
        success: function(data){
            if(data !== "0"){
                let userData = JSON.parse(data);
                console.log(userData);
                console.log("UserID = " + userData['id']);
                console.log("Pseudo = " + userData.pseudo);

                //localStorage.setItem("User", JSON.stringify(data));
                //window.location = "../home/home.html";

                /*let expiration = new Date();
                let hour = expiration.getHours();
                hour = hour + 6;
                expiration.setHours(hour);
                ses.cookies.set({
                    url: 'http://127.0.0.1:8000',
                    name: data['pseudo'],
                    value: data['id'],
                    session: true,
                    expirationDate: expiration.getTime()
                })*/
            }else{
                console.log("Identifiant ou mot de passe incorrect !");
            }
        }
    })
})

