/**
 * Created by h205p2 on 2/28/17.
 */
function enterSub(data) {
    $('#images').html("");
    var sub = document.getElementById("SubReddit");
    var daddyLink = "https://www.reddit.com/r/" + sub.value + "/top.json?limit=30";
    $.getJSON(daddyLink, function (data) {
        var links = getLinks(data);
        for (var i = 0; i < links.length; i += 3) {
            var row = [links[i], links[i + 1], links[i + 2]];
            addRow(row);
        }
    });
}
function addRow(links) {
    var newrow = document.createElement('div');
    $(newrow).addClass('row');
    for(var i=0; i<links.length; i++) {
        var img = document.createElement('img');
        const link = links[i].link;
        const oglink = links[i].oglink;
        $(img).attr('src', link)
             .click(function () {
                 window.open(oglink);
             })
             .addClass("picture")
             /*.hover(function() {
                $(this).css({height: "33%", width: "33%", 'z-index': "999"});
             }, function() {
                $(this).css({height: "300px", width: "300px", 'z-index': "1"})
             })*/
             .appendTo($(newrow))
    }
    $(newrow).appendTo($("#images"))
}
/*function showHoverImg(x, y, link) {
    var img = document.createElement('img');
    $(img).attr('src', link)
        .css({top: y, left: x, position: 'absolute'})
       .appendTo($(document))
}*/
function getLinks(data) {
    var children = data.data.children;
    var linkData = [];
    for(var k = 0; k<children.length;k++) {
        if (children[k].data.hasOwnProperty('preview')) {
            var link;
            var resolutions = children[k].data.preview.images[0].resolutions;
            if (resolutions.length < 4) {
                var lastIndex = resolutions.length - 1;
                link = decodeRedditImg(resolutions[lastIndex].url);
            } else {
                link = decodeRedditImg(resolutions[3].url);
            }
            console.log(link);
            var oglink = children[k].data.permalink;
            //var link = children[k].data.preview.images[0].source.url;
            linkData.push({
                "link":link,
                "oglink":"https://reddit.com" + oglink
            })
        }
    }
    return linkData;
}
function decodeRedditImg(encodedUrl) {
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + encodedUrl,
        'text/html');
    return dom.body.textContent;
}