(function() {

  /**
   * Register button.
   */

  $('#submit').click(function(e) {
    var user = {};
    var tinderToken = $("input[name='tinderToken']").attr('token');
    var tinderId = $("input[name='tinderId']").val();
    if (tinderToken) user.tinderToken = tinderToken;
    if (tinderId) user.tinderId = tinderId;
    $.post('/submit', user, function(res) {
      window.location.pathname = '/report/';
    });
    $('#signup').remove();
    $('#loading').removeClass('hide');
  });

  /**
   * Enable submit button when fields are populated.
   */

  $("input[name='tinderToken']").blur(checkFields);
  $("input[name='tinderId']").blur(checkFields);

  /**
   * Check to see if fields are populated.
   */

  function checkFields() {
    if ($("input[name='tinderToken']").attr('token') && $("input[name='tinderId']").val().length > 0)
      $("#submit").removeAttr('disabled');
  }

  /**
   * Parse the URL to get token.
   */

  $("input[name='tinderToken']").keyup(function() {
    var url = $(this).val();
    console.log(url);
    $(this).attr('token', getTinderToken(url));
  });

  /**
   * Parse URL to get tinderToken.
   */

  function getTinderToken(url) {
    var idx = url.indexOf('access_token');
    return url.substr(idx + 'access_token'.length + 1).split('&')[0];
  }

})();