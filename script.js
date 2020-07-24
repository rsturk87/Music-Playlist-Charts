(async ( ) => {    

    //get data from json
    let myPlaylist = [];
    const getMusicList = async(location) => {
        const response = await fetch(location);
        const json = await response.json();
        return json;
    };
    myPlaylist = await getMusicList('./data/my-playlist.json');


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
    };
    var artistsChart = new Chart(ctxArtists, {
        type: 'bar',
        data: artistsData,
        options: artistsOptions,
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
    };
    var yearsChart = new Chart(ctxYears, {
        type: 'line',
        data: yearsData,
        options: yearsOptions,
    });


    //songs by bpm
    const wacked = myPlaylist.filter((songs) => {
        return songs.energy < 20;
    });
    const wackedCount = wacked.length;

    const sluggish = myPlaylist.filter((songs) => {
        return songs.energy >= 20 & songs.energy < 40;
    });
    const sluggishCount = sluggish.length;
    
    const moderate = myPlaylist.filter((songs) => {
        return songs.energy >= 40 & songs.energy < 60;
    });
    const moderateCount = moderate.length; 
    
    const energetic = myPlaylist.filter((songs) => {
        return songs.energy >= 60 & songs.energy < 80;
    });
    const energeticCount = energetic.length; 
    
    const bloodPumping = myPlaylist.filter((songs) => {
        return songs.energy >= 80;
    });
    const bloodPumpingCount = bloodPumping.length; 


    //draw energy chart
    var ctxEnergy = document.getElementById('energyChart');
    var energyData  = {
        labels: [ 'wacked', 'sluggish', 'moderate', 'energetic', 'blood-pumping'],
        datasets: [{
                label: 'songs',
                backgroundColor: 'rgba(0,134,173, 0.3)',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(56, 56, 56, 0.5)',
                data: [wackedCount, sluggishCount, moderateCount, energeticCount, bloodPumpingCount]
        }]
    };
    var energyOptions = {
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
                tension: 0.3
            }
        },
        legend: {
            display: true,
            position: 'bottom'
        },
    };
    var energyChart = new Chart(ctxEnergy, {
        type: 'line',
        data: energyData,
        options: energyOptions,
    });

    
    //selecting songs with less and more energy
    const findTheEnergy = myPlaylist.sort(function (a, b) {
        return a.energy - b.energy
    });
    
    const minEnergy = findTheEnergy[0];
    const maxEnergy = findTheEnergy[findTheEnergy.length - 1];

    const lessEnergyDiv = document.querySelector('#less-energy');
    const lessEnergySong = minEnergy.title + " by: " + minEnergy.artist;
    lessEnergyDiv.append(lessEnergySong);

    const moreEnergyDiv = document.querySelector('#more-energy');
    const moreEnergySong = maxEnergy.title + " by: " + maxEnergy.artist;
    moreEnergyDiv.append(moreEnergySong);


    //songs by valence
    const sad = myPlaylist.filter((songs) => {
        return songs.valence <= 30;
    });
    const sadCount = sad.length;

    const happy = myPlaylist.filter((songs) => {
        return songs.valence >= 70;
    });
    const happyCount = happy.length;


    //draw valence chart
    var ctxValence = document.getElementById('valenceChart');
    var valenceData  = {
        labels: [ 'happy', 'sad' ],
        datasets: [{
                label: 'songs',
                data: [happyCount, sadCount],
                backgroundColor: [
                    'rgba(151,235,219, 0.7)',
                    'rgba(0,85,130, 0.7)'
                ],
                borderColor: [
                    'rgba(151,235,219, 0.8)',
                    'rgba(0,85,130, 0.8)'
                ],
                borderWidth: 1
        }]
    };
    var valenceOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            easing: 'easeInOutQuad',
            duration: 2000
        },
        legend: {
            display: true,
            position: 'bottom'
        },
    };
    var valenceChart = new Chart(ctxValence, {
        type: 'doughnut',
        data: valenceData,
        options: valenceOptions,
    });


    //selecting songs with less and more valence
    const findTheValence = myPlaylist.sort(function (a, b) {
        return a.valence - b.valence
    });
    
    const minValence = findTheValence[0];
    const maxValence = findTheValence[findTheValence.length - 1];

    const lessValenceDiv = document.querySelector('#less-valence');
    const lessValenceSong = minValence.title + " by: " + minValence.artist;
    lessValenceDiv.append(lessValenceSong);

    const moreValenceDiv = document.querySelector('#more-valence');
    const moreValenceSong = maxValence.title + " by: " + maxValence.artist;
    moreValenceDiv.append(moreValenceSong);
    
    
})( );