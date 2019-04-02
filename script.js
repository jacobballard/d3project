var data = d3.json('classData.json').then(function(d){

  initialize(d,0);

})

var svgwidth = 900;
var svgheight = 600;

var svg = d3.select('svg').attr('width',svgwidth).attr('height',svgheight);
var margins =
{
  top:20,
  bottom:50,
  left:50,
  right:100
}

var width = svgwidth -margins.left - margins.right;
var height = svgheight -margins.top - margins.bottom;


var drawGraph = function(data, screen, margins){
  var graphWidth = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;

  console.log('script runnig')
  var xScale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, graphWidth]);

  var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([graphHeight, 0])

  var xAxis = d3.axisBottom()
                   .scale(xScale);

  var yAxis = d3.axisLeft()
   .scale(yScale);

  var svg = d3.select(".graph-section")
              .append("svg")
              .classed("scatter-plot", true)
              .attr("width",screen.width)
              .attr("height",screen.height);

  var plotLand = svg.append("g")
                    .classed('plot', true)
                    .attr('transform', "translate(" + margins.left + "," + margins.top +")");

  var students = plotLand.selectAll('g')
                          .data(data)
                          .enter()
                          .append('g')
                          .attr("fill", function(d, i){return colors(d.name)});

  students.selectAll('g')
      .data(function(d, i){return d.grades})
      .enter()
      .append('circle')
      .attr("cx", function(d, i){return xScale(i)})
      .attr('cy', function(d, i){return yScale(d)})
      .attr('r', radius);



}

var initialize = function(dataset,day){

  var data = dataset.map(function(d){

             return d.quizes[day].grade;
  });
