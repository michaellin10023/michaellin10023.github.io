/// <reference path="..\typings\index.d.ts" />

$(document).ready(function(){

    var key = 'AIzaSyBy_Kux5pPCu-eeiORFqZR1Wt4k2cdLE3c';
    var playlistId = 'PL7qzL3L9Fg2Fy21z469LwyvdKgwG0i32r';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();
    function loadVids(){
        $.getJSON(URL,options, function(data){
            console.log(data)
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

    function mainVid(id){
        $('#video').html(`<iframe width="560" height="315"
        src="https://www.youtube.com/embed/${id}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>`);
    }

    function resultsLoop(data){

        $.each(data.items, function(i,item){
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var description = item.snippet.description.substring(0,100);
            var id = item.snippet.resourceId.videoId;
            $('main').append(`
            <article class="item" data-key="${id}">
            <img src=${thumb} alt="" class="thumb">

            <div class="detail">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
            </article>`);
        });
    }

    $('main').on('click', 'article', function(){
        var id = $(this).attr('data-key');
        mainVid(id);
    })
});

