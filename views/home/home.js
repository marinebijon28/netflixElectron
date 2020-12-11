const { ipcRenderer } = require('electron');

$('#serviceCode').on('click', () => {
    $('#serviceCode').html("104-941")
});

 ipcRenderer.on('data-main', (event, data) => {
    
    console.log(data);
 });