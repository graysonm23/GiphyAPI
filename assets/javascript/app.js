let giphySend = $("#giphySend");
let giphyInput = $("#giphyInput")
  .val()
  .trim();
let giphyHeader = $("#giphyHeader h1");
let giphyAPI = "ySYTxICsiZSopuZMPYnqDpdMy6F4CNFG";

$(giphySend).on("click", function() {
  fetch(
    "http://api.giphy.com/v1/gifs/search?q=" +
      giphyInput +
      "&api_key=" +
      giphyAPI +
      "&limit=5"
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //------------------------------FETCHING THE API----------------------------------------------
        console.log(data);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
});
