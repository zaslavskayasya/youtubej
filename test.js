
var video =[];

describe('youtube', function () {
    describe('API', function () {
        it('получение последних видео работает', function (done) {
            $.when(YouTube.getLastVideos()).then(function (result) {
                done();
            });

        });
        it('кол-во видео не равно 0', function (done) {
            $.when(YouTube.getLastVideos()).then(function (result) {
                if (result.items.length > 0) {

                    done();
                }
            });


        })
        describe('test', function () {
            it('All video with ID ! ', function (done) {
                $.when(YouTube.getLastVideos()).then(function (result) {
                    var video = result.items;
                    console.log(video);

                    for (var i; i < 50; i++) {
                        var id = video[i].id;
                        var iteration ;
                        if (id != null || id != undefined) {
                            console.log('++++');
                            iteration++;
                        } else {
                            console.log('----');
                            iteration--;
                        }
                    }
                    if (iteration != 50) {
                        done();
                    }
                });
            });
        });
        describe('test', function () {
            it('All video with ID ! ', function (done) {
                $.when(YouTube.getLastVideos()).then(function (result) {
                    var video = result.items;
                    console.log(video);
                    var iteration = 0;
                    for (var i = 0; i < video.length; i++) {
                        var id = video[i].id;

                        if (id != null || id != undefined) {
                            console.log('++++');
                            iteration++;
                        }
                    }
                    if (iteration != video.length) {
                        done();
                    }
                });
            });
        });

    });
});



