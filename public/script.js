var STORAGE_ID = 'weather-chat';
var saveToLocalStorage = function() {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
};
var getFromLocalStorage = function() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};
var cart = [];

var fetch = function() {
    var $city = $('#city-search').val();
    var $comment = $('#comment-id').val();
    var toggle = false
    $.ajax({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $city + '&appid=d703871f861842b79c60988ccf3b17ec',
        success: function(data) {
            addCity(data);
            renderData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus)
        }
    })
}

$('#weather_form').submit(function(event) {
    event.preventDefault();
    fetch();
})

var renderData = function() {
    $('.results').empty();

    // Update cart from local storage
    var source = $('#store-template').html()
    var template = Handlebars.compile(source)

    for (i = 0; i < cart.length; i++) {
        var HTML = template(cart[i]);
        $('.results').append(HTML);
    }
    bindForms();
}

var addCity = function(data) {
    console.log(data)

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function newZero() {
        var d = new Date();
        var x = document.getElementById("demo");
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        var s = addZero(d.getSeconds());
        var datetime = "at " + h + ":" +
            m + " on " +
            d.getDate() + "/" +
            (d.getMonth() + 1) + "/" +
            d.getFullYear()

        var kelvin = data.main.temp;
        var celsius = kelvin - 273.15;
        var fahrenheit = kelvin * 1.8 - 459.67

        var post = {
            city: data.name,
            celsius: celsius.toFixed(),
            fahrenheit: fahrenheit.toFixed(),
            time: datetime,
            comments: []
        }
        cart.push(post);
        saveToLocalStorage();
    }
    newZero();
}

cart = getFromLocalStorage();
renderData();

function bindForms() {
    $('.comment_form').off();
    $('.comment_form').on('submit', function(e) {
        e.preventDefault();
        var commentText = $(this).children('.comment-input').val();
        var postIndex = $(this).closest('.div').index();
        addComment(postIndex, commentText);
        return false;
    });
}



function addComment(postIndex, commentText) {
    if (commentText != "") {
        var newComment = { text: commentText };
        // pushing the comment into the correct posts array
        cart[postIndex].comments.push(newComment);
        saveToLocalStorage();
        renderData();
    }
};


var showPost = function(hideDivs) {
    // if (!toggle) {
    //     hideDivs.hide()
    //     toggle = !toggle
    // } else if (toggle) {
    //     hideDivs.show()
    //     toggle = !toggle
    // }
}