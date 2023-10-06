const url =
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data){
    console.log(data);
});
var samples;
var meta_data;
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    metaData(demographicInfo);
    hbarChart(selectedId);
    bubbleChart(selectedId);

}

function metaData(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

function hbarChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}

function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);

    function Gauge_building(sample){
        d3.json("data/samples.json").then(function(data) {
            let mdata=data.metadata;
            let res=mdata.filter(function(sample_res){return sample_res.id==sample});
            let data_res=res[0]['wfreq'];
            console.log(data_res)
           
            let Gauge_chart = [
                {
                  type: "indicator",
                  mode: "gauge+number+delta",
                  value: data_res,
                  title: { text: "Belly Button Washing Frequency <br><i>Scrubs per Week</i>", font: { size: 20 } },
                  gauge: {
                    axis: { range: [null, 9], tickwidth: 2, tickcolor: "black" },
                    bar: { color: "#ff0000" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "black",
                    steps: [
                      { range: [0, 1], color: "#ffdccc" },
                      { range: [1, 2], color: "#ffcab3"},
                      { range: [2, 3], color: "#ffb999" },
                      { range: [3, 4], color: "#ffa780"},
                      { range: [4, 5], color: "#ff9566" },
                      { range: [5, 6], color: "#ff844d"},
                      { range: [6, 7], color: "#ff7233"},
                      { range: [7, 8], color: "#ff6119" },
                      { range: [8, 9], color: "#ff4f00"},
                    ],
                    
                  }
                }
              ];
              
              let layout = {
                
                margin: { t: 55, r: 25, l: 25, b: 25 },
            
                
              };
              let config = {responsive: true}
              Plotly.newPlot('gauge', Gauge_chart, layout ,config);
    
    
        });
    }
    
}