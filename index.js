var coreFrontendData, advancedFrontendData, cssData, frameworksLibrariesData, testingData, buildToolsData, dataIntegrationData, cmsData, otherData
var x, y;
var xAxis;

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get all survey data 
d3.csv("https://raw.githubusercontent.com/sash-enka/fed-survey/main/averages.csv").then(data => {
    // split data into topics 
    coreFrontendData = data.slice(0, 5);
    advancedFrontendData = data.slice(5, 10);
    cssData = data.slice(10, 15);
    frameworksLibrariesData = data.slice(15, 20);
    testingData = data.slice(20, 24);
    buildToolsData = data.slice(24, 29);
    dataIntegrationData = data.slice(29, 33);
    cmsData = data.slice(33, 37);
    otherData = data.slice(37, 46);

    // Add x axis - 
    x = d3.scaleBand()
    .range([0, width])
    .domain(coreFrontendData.map(d => d.Option))
    .padding(0.2);
    xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x))

    // Add Y axis
    y = d3.scaleLinear()
    .domain([0, 5])
    .range([height, 0])
    svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

    // Initialize with coreFrontendData
    update(coreFrontendData);
});

function update(currData) {
    x.domain(currData.map(function(d) { return d.Option; }))
    xAxis.call(d3.axisBottom(x))
    
    // Update the chart with new data
    var u = svg.selectAll("rect")
    .data(currData);

    u.join("rect")
    .transition()
    .duration(1000)
    .attr("x", d => x(d.Option))
    .attr("y", d => y(d.Value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Value))
    .attr("fill", "#69b3a2");
}

function showCoreFrontend() {
    update(coreFrontendData);
}
function showAdvancedFrontend() {
    update(advancedFrontendData);
}
function showCSS() {
    update(cssData)
}
function showFrameworksLibraries() {
    update(frameworksLibrariesData)
}
function showTesting() {
    update(testingData)
}
function showBuildTools() {
    update(buildToolsData)
}
function showDataIntegration() {
    update(dataIntegrationData)
}
function showCMS() {
    update(cmsData)
}
function showOther() {
    update(otherData)
}

