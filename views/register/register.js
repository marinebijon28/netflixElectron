$('.registerForm').submit((event) => {
    event.preventDefault();

    let allDatas = $('.registerForm').serialize();

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/registerElectron?'+allDatas,
        success: function(data){
            if(data === "1"){
                console.log("Enregistré ! " + data);
            }else{
                console.log("Et bah nan ! " + data);
            }

            console.log(JSON.stringify(data));
        }
    })
})

