$(function() {

    initAreaChart('visitors');
    initAreaChart('foreigner');
    initAreaChart('more_than_one');
    initAreaChart('sign_up');
    initAreaChart('peak_zone');
    initAreaChart('peak_ap');
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

var initAreaChart = function(id) {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 999],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ]);

        var options = {
            //legend: 'none', disable data map
            title: 'Company Performance',
            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            isStacked: true
        };

        var chart = new google.visualization.AreaChart(document.getElementById(id));
        chart.draw(data, options);
    }
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
                borderWidth: 0,
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
            }
        },
    });
}