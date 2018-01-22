$.getJSON( api_url, function( data ) {
  $('#star_count').replaceWith(data["stargazers_count"])
});
