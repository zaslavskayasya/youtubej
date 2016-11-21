/** глобальные  переменные  */
var videos=[]; /* создали пустой массив, который наполним данными */
var viewVideo=[];

console.log(viewVideo);

/** */
var favorites_localStorage = JSON.parse(localStorage.getItem('favorites'));
console.log(favorites_localStorage);

var favorites;
if (favorites_localStorage) {
    favorites = favorites_localStorage;
    renderVideos(favorites, 'favorits');
} else {
    favorites = [];
}

/**  получаем данные из api ютуба  */
$.when(YouTube.getLastVideos()).then(function (result) { /* получаем данные из api */

    videos = result.items; /* перезаписали массив videos и заполнили массив полученными данными*/
    /*console.log(videos);*/ /**/
        renderVideos(videos);
    /** запуск функуии по клику на определённую кнопку .watch */
        $('#last').on('click', '.watch' , function () {  /*по клику на родителя (#last) запуск функции .watch - делает выборку элемента с этим классом*/
        $('#watchVideo').modal('show'); /*показываем модальное окно*/
        var index = $(this).parent().data('index'); /*в переменную индекс записали = у родителя нажатой кнопки дата атрибут индекс */
        var video = videos[index]; /*вынули из массива видео с опред индексом*/
        var id = video.id; /* и у этого полученного видео получаем id */
        console.log(id)
         /*во фрейме вставляем этот Id как окончание ссылки, чтрбы выводить видео*/
        var iframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ id +'" frameborder="0" allowfullscreen></iframe>'
        $('.modal-body').html(iframe);
            /** выведение заголовков и даты*/
                var title = video.snippet.title ;
                var author = video.snippet.channelTitle ;
                var date = video.snippet.publishedAt;
                    $('.modal-title').html(title);
                    $('.author').html(author);
                    $('.date').html(date);
                        /*console.log(iframe);*/

        /** функция для добычи информации об id video о просмотрах*/
        $.when(YouTube2.getVideoInfo(id)).then(function (resultate) {
            viewVideo = resultate.items;

            console.log(viewVideo + '  stat test');
            var viewVideoCount = "Промотров: " + viewVideo[0].statistics.viewCount;
            $('.viw').html(viewVideoCount);
        });


    })

    /** Дл избранного */
    $('#favorits').on('click', '.watch' , function () {  /*по клику на родителя кнопок запуск функции*/
        $('#watchVideo').modal('show'); /*показываем модальное*/
        var index = $(this).parent().data('index'); /*получили от родителя значение индекс */
        var video = favorites[index]; /*вынули из массива видео с опред индексом*/
        var id = video.id;
        var iframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ id +'" frameborder="0" allowfullscreen></iframe>'
        $('.modal-body').html(iframe);

        $('.modal-title').html(title);
        console.log(iframe)
    })

    $('#last').on('click', '.addFavorites' , function () {
        console.log($(this));
        var index = $(this).parent().data('index');
        var video = videos[index];
        favorites.push(video);
        renderVideos (favorites , 'favorits');
        console.log(favorites);
        var favorites_string = JSON.stringify(favorites);
        console.log(favorites_string);
        localStorage.setItem('favorites' , favorites_string);
    })
});


renderVideos (videos , 'last');

/** Функция для того, чтобы перенести видео в DOM*/
function renderVideos (videos , id) {
    $('#'+ id +' .row').html(''); /* */
    videos.forEach(function (data, index) { /*data - это данные, которые мы передадим*/
      /*  console.log(data);*/
        var a = data.snippet.publishedAt;
        var video =   /*переменная с куском верстки, который надо вставить*/
                '<div class="col-sm-6 col-md-4">' +
                    '<div class="thumbnail">' +
                    '<img src=" ' + data.snippet.thumbnails.high.url + '" alt="">' +
                         '<div class="caption">' +
                         '<h6>'+ data.snippet.channelTitle+'</h6>'+
                         '<h6>'+ data.snippet.publishedAt+'</h6>'+

                                /* '<h6>'+ a.format("MMMM Do YYYY, h:mm:ss a") +'</h6>'+*/
                                /* '<h6>'+  moment().format("MMMM Do YYYY, h:mm:ss a"); + '</h6> '+ */

                            '<h3>' + data.snippet.title + '</h3>' +
                            '<p>' + data.snippet.description.slice(0,100) + '</p>' +
                            '<p data-index='+ index +'>' +
                            '<button href="#" class="btn btn-primary watch" role="button">Watch</button>' +
                             '<button href="#" class="btn btn-default addFavorites" role="button">Add to favorites</button>' +
                            '</p>' +
                         '</div>' +
                    '</div>' +
                '</div>';
        $('#last .row').append(video); /*указан фрагмент #last .row, append - куда вставлять код и что вставить (Переменную с куском верстки)*/
        $('#'+ id +' .row').append(video);
    })
}

