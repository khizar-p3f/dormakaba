const ReactHighcharts = require('react-highcharts');


export const GraphConfig = (props) => {

    const {test}=props
    
    const confg = {
        chart: {
            type: 'bar'
        },
        title:false,
        subtitle: false,
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: test.map((rec) => {
            return {
                name: rec.name,
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }
        })
    }

    return (
        <ReactHighcharts config={confg} />
    )
}
