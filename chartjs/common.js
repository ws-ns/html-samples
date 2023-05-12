const ctx = document.getElementById('my-chart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
        datasets: [
            {
                label: 'before',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
            {
                label: 'after',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
