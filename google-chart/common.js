
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', '月');
    data.addColumn('number', 'PV');
    data.addRows([
        ['4月',   10],
        ['5月',   10],
        ['6月',   10],
        ['7月',   10],
        ['8月',   10],
        ['9月',   10],
        ['10月',  30],
        ['11月', 100],
        ['12月', 200],
        ['1月',  280],
        ['2月',  290],
        ['3月',  300],
    ]);

    // Set chart options
    var options = {
        'title':'ブログのPV推移',
        'height': '100%',
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('my-chart-wrap'));
    chart.draw(data, options);
}
