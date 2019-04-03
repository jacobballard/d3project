var data = d3.json('classData.json').then(function(d){

  initialize(d,0);
  var  = dataset.map(function(k){

             return d.quizes[day].grade;});

});




var classWidth = screen.width * 2 / 3;
var classHeight = screen.height;

var class = d3.select('body').select("allStudent").select("svg").attr('width',svgwidth).attr('height',svgheight);
var margins =
{
  top:20,
  bottom:50,
  left:50,
  right:50
}

var width = svgwidth -margins.left - margins.right;
var height = svgheight -margins.top - margins.bottom;


var drawClass = function(data, screen){
  var graphWidth = screen.width / 3
  var graphHeight = screen.height / 2

  console.log('script running')
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


  var plotLand = d3.select(".allStudent").append("g")
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


drawClass(data, screen)
