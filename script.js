(async ( ) => {

    //lib
    const replaceAll = (from, to, text) => text.split(from).join(to);
    String.prototype.replaceAll = function(from, to){ return this.split(from).join(to);};
    

    //get data from json
    let myPlaylist = [];
    const getMusicList = async(location) => {
        const response = await fetch(location);
        const json = await response.json();
        return json;
    };
    myPlaylist = await getMusicList('./data/my-playlist.json');


    //artists count
    let artistCountList = [];
    const artistCount = await myPlaylist.reduce((res, music) => {
        if(res[music.artist]) res[music.artist] += 1;
        else res[music.artist] = 1;
        return res;
    }, {});
    artistCountList = artistCount;


    //top 4 artists
    const topFourArtists = [];
    for (var artist in artistCountList) {
        topFourArtists.push([artist, artistCountList[artist]]);
    };
    
    topFourArtists.sort(function(a, b) {
        return b[1] - a[1];
    });
    const topArtist1 = topFourArtists[0];
    const topArtist2 = topFourArtists[1];
    const topArtist3 = topFourArtists[2];
    const topArtist4 = topFourArtists[3];
    const topArtist5 = topFourArtists[4];


    //draw artist chart
    var ctxArtists = document.getElementById('artistChart');
    var artistsData  = {
        labels : [topArtist1[0],topArtist2[0],topArtist3[0],topArtist4[0],topArtist5[0]],
            datasets : [
                {
                    label: '# of musics',
                    data : [topArtist1[1],topArtist2[1],topArtist3[1],topArtist4[1],topArtist5[1]],
                    backgroundColor: [
                        'rgba(0,85,130, 0.7)',
                        'rgba(0,134,173, 0.7)',
                        'rgba(0,194,199, 0.7)',
                        'rgba(151,235,219, 0.7)',
                        'rgba(218,248,227, 0.7)'
                    ],
                    borderColor: [
                        'rgba(0,85,130, 0.8)',
                        'rgba(0,134,173, 0.8)',
                        'rgba(0,194,199, 0.8)',
                        'rgba(151,235,219, 0.8)',
                        'rgba(218,248,227, 0.8)'
                    ],
                    borderWidth: 1
                }
            ]
    };
    var artistsOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            easing: 'easeInOutQuad',
            duration: 2000
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.05)',
                    lineWidth: 2
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.08)',
                    lineWidth: 2
                }
            }]
        },
        elements: {
            line: {
                tension: 0
            }
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            titleFontFamily: 'Mulish',
            backgroundColor: 'rgba(0,0,0,0.3)',
            titleFontColor: 'rgb(56, 56, 56)',
            caretSize: 5,
            cornerRadius: 2,
            xPadding: 10,
            yPadding: 10
        }
    };
    var artistsChart = new Chart(ctxArtists, {
        type: 'bar',
        data: artistsData,
        options: artistsOptions,
    });
    

    //genre count
    let genreCountList = [];
    const genreCount = await myPlaylist.reduce((res, music) => {
        if(res[music.genre]) res[music.genre] += 1;
        else res[music.genre] = 1;
        return res;
    }, {});
    genreCountList = genreCount;


    //top 5 genres
    const topFiveGenre = [];
    for (var genre in genreCountList) {
        topFiveGenre.push([genre, genreCountList[genre]]);
    };
    
    topFiveGenre.sort(function(a, b) {
        return b[1] - a[1];
    });
    const topGenre1 = topFiveGenre[0];
    const topGenre2 = topFiveGenre[1];
    const topGenre3 = topFiveGenre[2];
    const topGenre4 = topFiveGenre[3];
    const topGenre5 = topFiveGenre[4];


    //draw genre chart
    var ctx = document.getElementById('genreChart');
    var genreChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: [topGenre1[0], topGenre2[0], topGenre3[0], topGenre4[0], topGenre5[0]],
        datasets: [{
            label: '# of Musics',
            data: [topGenre1[1], topGenre2[1], topGenre3[1], topGenre4[1], topGenre5[1]],
            backgroundColor: [
                'rgba(0,85,130, 0.7)',
                'rgba(0,134,173, 0.7)',
                'rgba(0,194,199, 0.7)',
                'rgba(151,235,219, 0.7)',
                'rgba(218,248,227, 0.7)'
            ],
            borderColor: [
                'rgba(0,85,130, 0.8)',
                'rgba(0,134,173, 0.8)',
                'rgba(0,194,199, 0.8)',
                'rgba(151,235,219, 0.8)',
                'rgba(218,248,227, 0.8)'
            ],
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Top 5 Genres'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                reverse: false
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });


    //song by years
    const yearList = await myPlaylist.reduce((res, music) => {
        if(res[music.year]) res[music.year] += 1;
        else res[music.year] = 1;
        return res;
    }, {});

    const sixties = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('196') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const seventies = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('197') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const eighties = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('198') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const nineties = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('199') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const twenties = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('200') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const twentyTen = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('201') > -1) return res + yearList[key];
        else return res;
    }, 0);

    const twentyTwenty = Object.keys(yearList).reduce((res, key) => {
        if (key.indexOf('202') > -1) return res + yearList[key];
        else return res;
    }, 0);

    // let total = 0;
    // for (key in yearList) {
    //     if (key.indexOf('196') > -1) total += yearList[key];
    // }

    //transformando um objeto em array de objetos
    // const data = { 1960: 1, 1961: 3, 1962: 5, 1987: 10 };
    // const transformed = Object.keys(data).reduce((res, key) => [...res, { [key]: data[key] }], []);
    // console.log(transformed);

    //draw years chart
    var ctxYears = document.getElementById('yearChart');
    var yearsData  = {
        labels: [ '60s', '70s', '80s', '90s', '00s', '10s', '20s' ],
        datasets: [{
                label: 'songs',
                backgroundColor: 'rgba(0,194,199, 0.3)',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(56, 56, 56, 0.5)',
                data: [sixties, seventies, eighties, nineties, twenties, twentyTen, twentyTwenty]
        }]
    };
    var yearsOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            easing: 'easeInOutQuad',
            duration: 2000
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.05)',
                    lineWidth: 2
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.08)',
                    lineWidth: 2
                }
            }]
        },
        elements: {
            line: {
                tension: 0
            }
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            titleFontFamily: 'Mulish',
            backgroundColor: 'rgba(0,0,0,0.3)',
            titleFontColor: 'rgb(56, 56, 56)',
            caretSize: 5,
            cornerRadius: 2,
            xPadding: 10,
            yPadding: 10
        }
    };
    var yearsChart = new Chart(ctxYears, {
        type: 'line',
        data: yearsData,
        options: yearsOptions,
    });


})( );