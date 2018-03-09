

var topics = [
    "canada",
    "canadian",
    "toronto",
    "beaver",
    "moose",
    "calgary",
    "vancouver",
    "banff",
    "magpie",
    "justin trudeau",
    "william shatner",
    "christopher plummer",
    "wayne gretzky",
    "tim hortons",
    "hockey",
]


function displayGifs() {

    var topic = $(this).attr("data-topic");


    //AJAX call to the GIPHY API
    var apiKey = "&api_key=gYeWEAydflUdjPeGj5wfUixxUu4ftX0h&limit=10";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey;

    $.ajax({

        url: queryUrl,
        method: "GET"

    }).then(function (response) {
        console.log(response);


        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            console.log(response);

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);


            var imageStill = $("<img>");

            imageStill.attr("src", results[i].images.fixed_height_still.url);
            imageStill.attr("data-still", results[i].images.fixed_height_still.url);
            imageStill.attr("data-animate", results[i].images.fixed_height.url);
            imageStill.attr("data-state", "still");


            gifDiv.append(p);
            gifDiv.append(imageStill);


            $(".gifContainer").prepend(gifDiv);

            $("img").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    var state = $(this).attr("data-state");
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        }

        createButtons();
    });
}


function createButtons() {
    $(".buttons").empty();


    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>");

        btn.addClass("topic");

        btn.attr("data-topic", topics[i]);

        btn.text(topics[i]);

        $(".buttons").append(btn);
    }
}


// This function handles events where one button is clicked
$(".searchGifButton").on("click", function (event) {
    event.preventDefault();

    var searchTopic = $(".searchGifBar").val().trim();
    console.log(searchTopic);

    topics.push(searchTopic);
    console.log(topics);

    createButtons();
});


$(document).on("click", ".topic", displayGifs);

createButtons();
