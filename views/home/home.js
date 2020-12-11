const { ipcRenderer } = require('electron');

$('#serviceCode').on('click', () => {
    $('#serviceCode').html("104-941")
});

// Listen to main data movie
// ipcRenderer.on('data-main', (data) => {

// });