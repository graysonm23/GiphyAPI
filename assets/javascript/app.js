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
    $(modal).show();
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
        var giphyDiv = $("<div>");
        var giphyRating = $("<p>").text("Rating: " + results.rating);
        console.log(results.rating);
        var giphyImage = $("<img>");
        giphyImage.attr("src", results.images.fixed_height_small.url);
        giphyImage.attr("data-animate", results.images.fixed_height_small.url);
        giphyImage.attr(
          "data-still",
          results.images.fixed_height_small_still.url
        );
        giphyImage.attr("data-state", "animate");
        giphyImage.addClass("image");
        $(giphyDiv).attr("id", "giphyDiv");
        $(giphyDiplay).append(giphyDiv);
        $(giphyDiv).append(giphyImage);
        $(giphyDiv).append(giphyRating);
      }
      if ($(giphyBut).hasClass(giphyInput)) {
        return false;
      } else {
        $(giphyBut).append("<button>" + giphyInput + "</button>");
        $(giphyBut).addClass(giphyInput);
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
//-------------------------------------------------------MODAL-----------------------------------------------------------
// Get the modal
var modal = $("#myModal");

// Get the <span> element that closes the modal
var span = $(".close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  $(modal).css("display", "none");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    $(modal).css("display", "none");
  }
};

$(modal).hide();
