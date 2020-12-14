$('.loginForm').submit((event) => {
    event.preventDefault();

    let username = $('#inputEmail').val();
    let password = $('#inputPassword').val();

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/loginElectron?email='+username+'&password='+password,
        success: function(data){
            if(data !== "0"){
                localStorage.setItem("User", data);
                window.location = "../home/home.html";
            }else{
                console.log("Raté !");
            }
        }
    })
})

