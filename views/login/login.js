$('.loginForm').submit((event) => {
    event.preventDefault();

    let username = $('#inputEmail').val();
    let password = $('#inputPassword').val();

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/loginElectron?email='+username+'&password='+password,
        success: function(data){
            if(data === "1"){
                console.log("Connecté ! " + data);
            }else{
                console.log("Raté ! " + data);
            }
        }
    })
})

