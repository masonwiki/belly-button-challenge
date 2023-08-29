const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(data => {
    const menu = d3.select("#selDataset");
    const id = data.names;

    id.forEach(name => {
        menu.append("option").text(name).property("value", name);
    });
});


function bar(sample) {
    d3.json(url).then((data) => {
        const selection = data.samples.find((subject) => subject.id == sample);
        const x = selection.sample_values.slice(0, 10).reverse();
        const y = selection.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        
        const bar = {
            x: x,
            y: y,
            text: selection.otu_labels,
            type: "bar",
            orientation: "h",
        };
        
        Plotly.newPlot("bar", [bar]);
    });
}


function subjectInfo(sample) {
    d3.json(url).then(data => {
        const meta = data.metadata;
        const array = meta.filter((subject) => subject.id == sample);
        const result = array[0];
        const d3_sel = d3.select("#sample-metadata")
        d3_sel.html("");

        Object.entries(result).forEach(([key, value]) => {
            d3_sel.append("h5").text(`${key}: ${value}`);
        });
    });
};


function bubble(sample) {
    d3.json(url).then((data) => {
        const selection = data.samples.find((subject) => subject.id == sample);

        const bubblechart = {
            x: selection.otu_ids,
            y: selection.sample_values,
            text: selection.otu_labels,
            mode: "markers",
            marker: {
                color: selection.otu_ids,
                size: selection.sample_values
            }
        };

        
        Plotly.newPlot("bubble", [bubblechart]);
    });
}

function optionChanged(num){
bar(num);
subjectInfo(num);
bubble(num);
};

function init() {
    d3.json(url).then(data => {
        const start = data.names[0];
        bar(start);
        subjectInfo(start);
        bubble(start);
    });
}

init();