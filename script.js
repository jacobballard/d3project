d3.json("classData.json").then(function(d){data(d)},function(err){console.log(err);});

var data = function(d){
  classGraph(d)


};




var class_svg = d3.select("#class").select("svg").attr('width',(screen.width * .66)).attr('height',(screen.height * .4));

var selectStudent_svg = d3.select("#selectStudent").select("svg").attr('width',(screen.width * .33)).attr('height',(screen.height * .4));

var viewStudentGraph_svg = d3.select("#viewStudentGraph").select("svg").attr('width',(screen.width * .35)).attr('height',(screen.height * .4));

var viewStudentInfo_svg = d3.select("#viewStudentInfo").select("svg").attr('width',(screen.width * .64)).attr('height',(screen.height * .4));

var margins =
{
  top:20,
  bottom:50,
  left:50,
  right:50
};

var classGraph = function(data){

  var xScale = d3.scaleLinear()
                 // .domain(d3.extent(data))
                 .domain([0,23])
                 .nice()
                 .range([0,screen.width * .66]);


var day = 0
class_svg.selectAll("rect")
     .data(data.map(function(d){
       return d.quizes[day].grade
     }))
     .enter()
     .append("rect")
     .attr("x", function(d, i){
       return ((screen.width * .65) / i)})
     .attr("width", ((screen.width * .65) / 23))
     .attr("height", function(d){
       return d;
     })
     .attr("fill", function(d){
       return d.color;
     })
//creates text
     class_svg.selectAll("text")
     .data(data.map(function(d){
       return d.picture
     }))
     .enter()
     .append("text")
     .attr("x", 375)
     .attr("y", function(d, i){
       return 75 + 10 * i})
     .attr("font-size", 10)
     .text(function(d) {
       return d.color;
    })
}

//var width = svgwidth -margins.left - margins.right;
//var height = svgheight -margins.top - margins.bottom;


/*var drawClass = function(data, screen){
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


drawClass(data, screen)*/
