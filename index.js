var coreFrontendData, advancedFrontendData, cssData, frameworksLibrariesData, testingData, buildToolsData, dataIntegrationData, cmsData, otherData
var x, y;
var xAxis;

var header = document.querySelector("h2")

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 600)
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
    .domain(coreFrontendData.map(d => d.subtopicClean))
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
    x.domain(currData.map(function(d) { return d.subtopicClean; }))
    xAxis.call(d3.axisBottom(x)).selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "1.25em");
    
    // Update the chart with new data
    var u = svg.selectAll("rect")
    .data(currData);

    u.join("rect")
    .transition()
    .duration(1000)
    .attr("x", d => x(d.subtopicClean))
    .attr("y", d => y(d.average))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.average))
    .attr("fill", "#69b3a2");
}

// onClick functions
function showCoreFrontend() {
    header.innerText = "Core Frontend"
    update(coreFrontendData);
}
function showAdvancedFrontend() {
    header.innerText = "Advanced Frontend"
    update(advancedFrontendData);
}
function showCSS() {
    header.innerText = "CSS"
    update(cssData)
}
function showFrameworksLibraries() {
    header.innerText = "JS Frameworks and Libraries"
    update(frameworksLibrariesData)
}
function showTesting() {
    header.innerText = "Testing"
    update(testingData)
}
function showBuildTools() {
    header.innerText = "Build Tools"
    update(buildToolsData)
}
function showDataIntegration() {
    header.innerText = "Data and Integration"
    update(dataIntegrationData)
}
function showCMS() {
    header.innerText = "CMS"
    update(cmsData)
}
function showOther() {
    header.innerText = "Other"
    update(otherData)
}

