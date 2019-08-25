$(function() {

    initLineChart('visitors');
    initLineChart('foreigner');
    initLineChart('more_than_one');
    initLineChart('sign_up');
    initLineChart('peak_zone');
    initLineChart('peak_ap');
    initDonutChart('gender');
    initDonutChart('generation');

    $('.tabs li').on('click', function() {
        var currentItem = $(this).parent('.tabs').children('li.active');
        var tabContents = $(this).parent('.tabs').parent().children('.tab-contents');
        var clickedIndex = $(this).index();

        if (clickedIndex != $(currentItem).index()) {
            $(currentItem).removeClass('active');
            $(this).addClass('active');
            $(tabContents).children('.tab-content.active').removeClass('active');
            $(tabContents).children('.tab-content:eq(' + clickedIndex + ')').addClass('active');
        }
    });
});

var randomScalingFactor = function(count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(Math.ceil(Math.random() * 200.0));
    }
    return arr;
};

var initLineChart = function(id) {
    var visitorsChartItem = document.getElementById(id).getContext('2d');
    var visitorsChart = new Chart(visitorsChartItem, {
        type: 'line',
        data: {
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
            datasets: [{
                backgroundColor: '#d752b2',
                data: randomScalingFactor(17),
                fill: 'start'

            }, {
                backgroundColor: '#6b5ee7',
                data: randomScalingFactor(17),
                fill: 'start'
            }, {
                backgroundColor: '#fb89b4',
                data: randomScalingFactor(17),
                fill: 'start'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 0,
                }
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });
}

var initDonutChart = function(id) {
    var randColors = ['#97BFF4', '#8BE2CE', '#FF7FB0', '#FFE57F'];
    var borderColors = ['#307FE9', '#17C69D', '#FF0061', '#FFCC00'];
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Match', 'Partial Match', 'No Prefs', 'No Match'],
            datasets: [{
                data: randomScalingFactor(4),
                backgroundColor: randColors,
                borderColor: borderColors,
                borderWidth: 2,
                borderAlign: 'inner'
            }],
        },
        options: {
            legend: {
                display: true,
                position: 'top',
                padding: 0,
                labels: {
                    fontColor: '#172B4D',
                    boxWidth: 15
                }
            },
            layout: {
                padding: {
                    left: 25,
                    right: 25,
                    top: 10,
                    bottom: 25
                }
            }
        },
    });
}