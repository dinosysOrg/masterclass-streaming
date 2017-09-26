$(document).ready(function() {
  let bar = $('#bar');
  $('#uploadForm').submit(function() {
    $('#status').empty().text('File is uploading...');
    $(this).ajaxSubmit({
      headers: {
        'email': 'nhatndm1193@gmail.com',
        'apikey': $('#apikey').val(),
      },
      error: function(xhr) {
        console.log(xhr);
      },
      uploadProgress: function(event, position, total, percentComplete) {
        let percentVal = percentComplete + '%';
        bar.width(percentVal);
      },
      success: function(response) {
        $('#status').empty().text(response);
      },
    });
    return false;
  });
});
