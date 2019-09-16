$(function() {

    initAreaChart('visitors');
    initDonutChart('gender');

    $('.general-graphs .tabs li').on('click', function() {
        var currentItem = $(this).parent('.tabs').children('li.active');
        var clickedIndex = $(this).index();

        if (clickedIndex != $(currentItem).index()) {
            $(currentItem).removeClass('active');
            $(this).addClass('active');
            $('.general-graphs .tab-content.active').removeClass('active');
            $('.general-graphs .tab-content:eq(' + clickedIndex + ')').addClass('active');

            var graphId = $('.general-graphs .tab-content.active .graph canvas').attr('id');
            initAreaChart(graphId);
        }
    });

    $('.right-graphs .tabs li').on('click', function() {
        var currentItem = $(this).parent('.tabs').children('li.active');
        var clickedIndex = $(this).index();

        if (clickedIndex != $(currentItem).index()) {
            $(currentItem).removeClass('active');
            $(this).addClass('active');
            $('.right-graphs .tab-content.active').removeClass('active');
            $('.right-graphs .tab-content:eq(' + clickedIndex + ')').addClass('active');

            if ($(this).data('chart') == 'gender') {
                initDonutChart('gender');
            } else if ($(this).data('chart') == 'generation') {
                initGenerationChart('generation');
            }
        }
    });
});

/**
 * 
 * This function was used to only generating dummy data for Area Charts.
 * 
 * @param {integer} count 
 */
var randomScalingFactor = function(count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(Math.ceil(Math.random() * 200.0));
    }
    return arr;
};

/** 
 * When every Generation tab clicked, this function will be run. 
 * If desired that getting new data from the server, it can be taken here.
 */
var initGenerationChart = function(id) {
    // var chart = document.getElementById(id).getContext('2d');

    // var options = {
    //     responsive: true,
    //     maintainAspectRatio: true,
    //     animation: {
    //         easing: 'easeInOutQuad',
    //         duration: 520
    //     },
    //     legend: {
    //         display: false
    //     },
    //     scales: {
    //         yAxes: [{
    //             gridLines: {
    //                 display: false
    //             },
    //             ticks: {
    //                 beginAtZero: true
    //             }
    //         }],
    //         xAxes: [{
    //             gridLines: {
    //                 display: false
    //             },
    //             barPercentage: 0.15
    //         }]
    //     },
    // };

    // var myBarChart = new Chart(chart, {
    //     type: 'bar',
    //     data: {
    //         labels: ['10-18', '18-25', '25-30', '30-35', '35-40', '40-50', '50-60', '60-70', '70-80'],
    //         datasets: [{
    //             backgroundColor: '#445568',
    //             borderWidth: 0,
    //             data: randomScalingFactor(9),
    //         }]
    //     },
    //     options: options

    // });


    $('.vertical .progress-fill span').each(function() {
        $(this).css('opacity', 0);
        var percent = $(this).html();
        var pTop = 100 - (percent.slice(0, percent.length - 1)) + "%";
        $(this).parent().css({
            'height': percent
        });
        return;
    });
}

/**
 * When the chart tabs is clicked, this function will be generate chart according to given {item}.
 * If desired that getting new data from the server, it can be taken here.
 * @param {item} id 
 */
var initAreaChart = function(id) {

    var chart = document.getElementById(id).getContext('2d'),
        gradient = chart.createLinearGradient(0, 0, 0, 450),
        gradient2 = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, 'rgba(166, 42 ,215, 0.7)');
    gradient.addColorStop(1, 'rgba(166, 42 ,215, 0.7)');

    gradient2.addColorStop(0, 'rgba(248, 87, 166, 0.7)');
    gradient2.addColorStop(1, 'rgba(248, 87, 166, 0.7)');

    var data = {
        labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
        datasets: [{
                backgroundColor: gradient,
                borderWidth: 0,
                data: randomScalingFactor(17)
            },
            {
                backgroundColor: gradient2,
                borderWidth: 0,
                data: randomScalingFactor(17)
            }
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            easing: 'easeInOutQuad',
            duration: 520
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
    };

    var chartInstance = new Chart(chart, {
        type: 'line',
        data: data,
        options: options
    });
}

/**
 * 
 * When the Gender tabs is clicked, this function will be generate Donut chart to Gender.
 * If desired that getting new data from the server, it can be taken here.
 * @param {item} id 
 */
var initDonutChart = function(id) {
    var randColors = ['#df388b', '#39a2de'];
    var borderColors = ['#df388b', '#39a2de'];
    var ctx = document.getElementById(id).getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Female', 'Male'],
            datasets: [{
                data: [70, 30],
                backgroundColor: randColors,
                borderColor: borderColors,
                borderWidth: 0,
                borderAlign: 'inner'
            }]
        },
        options: {
            rotation: -1.5 * Math.PI,
            cutoutPercentage: 90,
            tooltipTemplate: "<%= value %>",
            onAnimationComplete: function() {
                this.showTooltip(this.segments, true);
            },
            tooltipEvents: [],
            showTooltips: true,
            legend: {
                display: false
            },
        },
    });
}