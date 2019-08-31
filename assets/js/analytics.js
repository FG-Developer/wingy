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

    var gradientFill = visitorsChartItem.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, "#a62ad7");
    gradientFill.addColorStop(1, "#4183f1");

    var gradientFill2 = visitorsChartItem.createLinearGradient(500, 0, 100, 0);
    gradientFill2.addColorStop(0, 'rgba(248, 87, 166, .7)');
    gradientFill2.addColorStop(1, 'rgba(255, 88, 88, .7)');

    var visitorsChart = new Chart(visitorsChartItem, {
        type: 'line',
        data: {
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
            datasets: [{
                backgroundColor: gradientFill2,
                data: randomScalingFactor(17),
                fill: true,
                borderWidth: 0
            }, {
                backgroundColor: gradientFill,
                data: randomScalingFactor(17),
                fill: true,
                borderWidth: 0
            }]
        },
        options: {
            tooltips: {
                enabled: false,

                custom: function(tooltipModel) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<div></div>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);

                        var innerHTML = '';
                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            var span = '<span style="' + style + '">' + body + '</span>';
                            innerHtml = span;
                        });

                        var tableRoot = tooltipEl.querySelector('div');
                        tableRoot.innerHTML = innerHtml;
                    }

                    // `this` will be the overall tooltip
                    var position = this._chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.fontFamily = 'yummosemibold';
                    tooltipEl.style.fontSize = '1em';
                    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
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