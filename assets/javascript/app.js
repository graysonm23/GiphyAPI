let giphySend = $(".giphySend");
let giphyBut = $("#giphyBut");
let giphyAPIKey = "ySYTxICsiZSopuZMPYnqDpdMy6F4CNFG";
let giphyDiplay = $("#gifs");
let giphyClear = $("#giphyClear");
let clearFav = $("#giphyClearFav");
let form = $("#form");
$(clearFav).on("click", function() {
  $(giphyBut).html("");
});
$(giphyClear).on("click", function() {
  $(giphyDiplay).html("");
});
$(form).on("submit", function() {
  $("#text").hide();
  let giphyInput = $("#giphyInput")
    .val()
    .trim();
  let giphyInputHowMany = $("#giphyInputHowMany")
    .val()
    .trim();
  event.preventDefault();
  if (isNaN(giphyInputHowMany)) {
    alert("Input a number.");
    return false;
  }
  if (giphyInput == "") {
    return false;
  }
  if (giphyInput === "") {
    alert("Add a search parameter.");
  }
  let url =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    giphyAPIKey +
    "&limit=" +
    giphyInputHowMany +
    "&q=" +
    giphyInput;
  fetch(url)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(json => {
      for (var i = 0; i < json.data.length; i++) {
        results = json.data[i];
        console.log(results);
        var giphyRating = $("<p>").text("Rating: " + results.rating);
        var giphyImage = $("<img>");
        giphyImage.attr("src", results.images.fixed_height_small_still.url);
        giphyImage.attr(
          "data-still",
          results.images.fixed_height_small_still.url
        );
        giphyImage.attr("data-animate", results.images.fixed_height_small.url);
        giphyImage.attr("data-state", "still");
        giphyImage.addClass("image");
        $(giphyDiplay).append(giphyImage);
      }
      if (giphyInput === giphyBut) {
        return false;
      } else {
        // giphyImage.append(giphyRating);
        $(giphyBut).append("<button>" + giphyInput + "</button>");
      }
    })

    .catch(err => console.log(err));
});
$(document).on("click", ".image", function() {
  var state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});
