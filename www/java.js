$.ajax({
    url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40",
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(result) {
        console.log(result);
        handler(result);
    },
    error: function() {
        alert('Failed!');
    }
});

function handler(result) {
    var x =
        [{"text": 'Go to Page 1', "url": 'page1.html'},
            {"text": 'Go to Page 2', "url": 'page2.html'}];
    for(var i=0; i< x.length; i++) {
        $("#thing").append("<li><a href='" + x[i].url + "'>" + x[i].text + "</a></li>")
    }
    $( "#thing" ).listview( "refresh" );
}
