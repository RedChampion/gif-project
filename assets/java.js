var gifs = ["Jack Sparrow", "Adam Sandler", "Harry Potter"];

function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=cWU8wqpkHwuAJRb1nTnWJD65Ds3u4fSW&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $(`<img data-state="still" class="gif">`);
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gif-view").prepend(gifDiv);
          }
        }
      });

  };
  function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {

      var a = $("<button>");

      a.addClass("gif-btn");

      a.attr("data-name", gifs[i]);

      a.text(gifs[i]);

      $("#buttons-view").append(a);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    gifs.push(gif);

    renderButtons();
  });

  $(document).on("click", ".gif-btn", displayGifInfo);

  renderButtons();