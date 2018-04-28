

var countries = ["Australia", "New Zealand", "France", "Canada"];

function renderButtons() {
    $("#travel-view").empty();
    for(var j = 0; j < countries.length; j++) {
        var countryButton = $('<button>');
        //<button type="button" class="btn btn-primary">Primary</button>

        countryButton.text(countries[j]);
        countryButton.addClass("country");
        countryButton.addClass("btn btn-lg");
        countryButton.attr("data-country",countries[j]);
        $('#travel-view').append(countryButton);
    }
    //store the countries entered in the local storage as a array
    localStorage.setItem("countries", JSON.stringify(countries));
    
} //end of function to create buttons for each country from array and user input

//Ajax call to GIPHY API

//$("button").on("click", function() {
function getCountryImg(){
    var country = $(this).attr("data-country");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      country + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;
        $("#display-gif").empty();
        for (var i = 0; i < results.length; i++) {

                var tableDiv = $("<div class='item'>");
                var p = $("<p>").text("Rating: "+ results[i].rating + "   ");
                var imgDownloadURL = $("<a download >");
                imgDownloadURL.attr("href", results[i].images.original.url+"&api_key=dc6zaTOxFJmzC");
                var imgDownloadIcon = $("<img>");
                imgDownloadIcon.attr("src", "assets/images/downloadIcon.png");
                imgDownloadIcon.addClass("downloadIcon");
                imgDownloadURL.append(imgDownloadIcon);

                p.append(imgDownloadURL);
    
                var countryImage = $("<img>");
                countryImage.attr("src", results[i].images.fixed_height_still.url);
                countryImage.attr("data-still",results[i].images.fixed_height_still.url);
                countryImage.attr("data-animate",results[i].images.fixed_height.url);
                countryImage.attr("data-state","still");
                countryImage.attr("class","gif");
                tableDiv.append(countryImage);
                tableDiv.append(p);

                $("#display-gif").append(tableDiv);
               // countryImage.attr("")
    
    //        }

        }//end of for loop
    } //end of function response
)};
//end of button click function   

$(document).on("click", ".country", getCountryImg);


$(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if(state === "still"){
    // then update the src attribute of this image to it's data-animate value,
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    // and update the data-state attribute to 'animate'.
      
    }
    else{
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// This function handles events where the add country button is clicked
    $("#add-item").on("click", function(event) {
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    countries.push($("#travel-input").val().trim());
    //Clear text
    $("#travel-input").val('');

    // The renderButtons function is called, rendering the list of country buttons
    renderButtons();
    });

$(document.body).on("click", ".downloadImage", function() {
    window.location.href = $(this).attr("image-url");
});

$(document).ready(function() {
    localStoredCountries = JSON.parse(localStorage.getItem("countries"));
    if(localStoredCountries != null){
        countries = localStoredCountries;
    }
    renderButtons();

});