d3.json("classData.json").then(function(data){
  drawFinalGrade(data)
  drawSingle(data)
},function(err){console.log(err);})


var getFinalArray=function(d){
  var finals=[]
  d.forEach(function(d){finals.push(getFinalGrade(d))})
  return finals;}

var getFinalGrade=function(d){
  var final=d.final[0].grade
  var totalQuiz=0
  var totalHW=0
  var totalTest=0
  d.quizes.forEach(function(d){totalQuiz+=d.grade/d.max*100})
  d.homework.forEach(function(d){totalHW+=d.grade/d.max*100})
  d.test.forEach(function(d){totalTest+=d.grade/d.max*100})
  var aveQuiz=totalQuiz/d.quizes.length
  var aveHW=totalHW/d.homework.length
  var aveTest=totalTest/d.test.length
  return Math.round((.15*aveQuiz+.15*aveHW+.4*aveTest+.3*final)*100)/100}

var drawFinalGrade=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var penguinName=["Bookworm","Crafty","Cyclist","Drunken","Easter","EBook","Farmer","Gentleman","Judo","Moana","Painter","Grill","Pharaoh","Pilot","Pinga","Pixie","Sailor","Santa", "Tauch", "Tux","Valentine","Valentine Ocal","Wizard"]
  var xScale=d3.scaleLinear()
     .domain([0,22])
     .nice()
     .range([0,width])
  var yScale=d3.scaleLinear()
               .domain([0,100])
               .nice()
               .range([height,margins.top])
  var svg=d3.select("body").append("svg")
            .attr("id","graph")
            .attr("width",screen.width)
            .attr("height",screen.height)
  var plotLand =svg.append("g")
                  .classed("plot",true)
                  .attr("transform","translate("+margins.left+","+margins.top+")");
  var finalArray=getFinalArray(data)
  var penguins=plotLand.selectAll("rect")
                       .data(finalArray)
                       .enter()
                       .append("rect")
                       .attr("id","penguinbar")
                       .attr("fill",function(d,i){return color(i);})
                       .attr("x",function(d,i){return xScale(i);})
                       .attr("y",function(d,i){return yScale(d);})
                       .attr("width",width/finalArray.length)
                       .attr("height",function(d){return height-yScale(d);})
                       .on("mouseover", function(d,i) {
                         d3.select(this).attr("stroke", "black")
                         var xPosition = parseFloat(d3.select(this).attr("x"))+3.65*width/finalArray.length;
                         var yPosition = parseFloat(d3.select(this).attr("y"));
                         d3.select("#finaltooltip")
                          .style("left", xPosition + "px")
                          .style("top", yPosition + "px")
                          .select("#value")
                          .text(d);
                         d3.select("#finaltooltip").select("#name")
                          .text(function(){return penguinName[i];});
                         d3.select("#finaltooltip").classed("hidden", false);})
                        .on("mouseout", function() {
                          d3.select(this).attr("stroke", "none")
                          d3.select("#finaltooltip").classed("hidden", true);})
                        .on("click",function(d,i){
                          updateSingle(data[i])})
  var legend=svg.append("g")
                .classed("legend",true)
                .attr("transform","translate("+margins.left+","+(screen.height-margins.bottom+2)+")");
  var legendLines=legend.selectAll("image")
                        .data(data)
                        .enter()
                        .append("image")
                        .classed("legendPic",true)
                        .attr("transform",function(d,i){return "translate("+(xScale(i))+","+0+")";})
                        .attr("xlink:href", function(d){return d.picture})
                        .attr("width",30)
                        .attr("height",30)
                        .on("click",function(d,i){updateSingle(data[i])})
  var yAxis=d3.axisLeft(yScale)
  svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left-5)+","+(margins.top-1)+")")
}
var drawSingle=function(data)
{
  var screen={width:500,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var drawSingleHW=function(data)
  {
    var svg=d3.select("body").append("svg")
              .attr("id","individualHW")
              .attr("width",screen.width)
              .attr("height",screen.height)
    var xScale=d3.scaleLinear()
       .domain([0,data[0].homework.length])
       .nice()
       .range([0,width])
    var yScale=d3.scaleLinear()
                 .domain([0,50])
                 .nice()
                 .range([height,margins.top])
    var line = svg.append('g')
                  .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
                  .attr("id","HWlines")
    var dot = svg.append('g')
                 .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
                 .attr("id","HWdots")
                 //.classed("hidden",true)
    var drawLine=d3.line()
                   .x(function(d,i){return xScale(i)})
                   .y(function(d){return yScale(d.grade)})
    line.append("path")
        .attr("id","HWLine")
        .classed("hidden",false)
        .datum(data[0].homework)
        .attr("d",drawLine)
        .attr("fill","none")
        .attr("stroke", color(1))
        .attr("stroke-width", 2);
    var xAxis=d3.axisBottom(xScale)
    var yAxis=d3.axisLeft(yScale)
    svg.append("g")
       .attr("id","xAxis")
       .call(xAxis)
       .attr('transform', 'translate(' + (margins.left)+ ',' + (height+margins.top) + ')')
    svg.append("g")
       .attr("id","yAxis")
       .call(yAxis)
       .attr('transform', 'translate(' + 70 + ',' + margins.top + ')')
    dot.selectAll("circle")
       .data(data[0].homework)
       .enter()
       .append("circle")
       .attr("cx",function(d,i){return xScale(i);})
       .attr("cy",function(d){return yScale(d.grade);})
       .attr("r","4")
       .attr("fill",color(2))
       .on("mouseover", function(d,i) {
         d3.select(this).attr("r","6").attr("stroke","black")
         var xPosition = parseFloat(d3.select(this).attr("cx"))+80;
         var yPosition = parseFloat(d3.select(this).attr("cy"))+330;
         d3.select("#HWtooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .text(d.grade);
         d3.select("#HWtooltip").classed("hidden", false);
         d3.select("#HWtooltip").select("#day")
          .text(function(){return d.day;});})
        .on("mouseout", function() {
          d3.select(this).attr("stroke","none").attr("r","4")
          d3.select("#HWtooltip").classed("hidden", true);})
  }
  var drawSingleQuiz=function(data)
  {
    var svg=d3.select("body").append("svg")
              .attr("id","individualQuiz")
              .attr("width",screen.width*1.5)
              .attr("height",screen.height)
    var xScale=d3.scaleLinear()
       .domain([0,data[0].quizes.length])
       .nice()
       .range([0,width*1.5])
    var yScale=d3.scaleLinear()
                 .domain([0,10])
                 .nice()
                 .range([height,margins.top])
    var line = svg.append('g')
                  .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
                  .attr("id","Quizlines")
    var dot = svg.append('g')
                 .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
                 .attr("id","Quizdots")
                 //.classed("hidden",true)
    var drawLine=d3.line()
                   .x(function(d,i){return xScale(i)})
                   .y(function(d){return yScale(d.grade)})
    line.append("path")
        .attr("id","QuizLine")
        .classed("hidden",false)
        .datum(data[0].quizes)
        .attr("d",drawLine)
        .attr("fill","none")
        .attr("stroke", color(1))
        .attr("stroke-width", 2);
    var xAxis=d3.axisBottom(xScale)
    var yAxis=d3.axisLeft(yScale)
    svg.append("g")
       .attr("id","xAxis")
       .call(xAxis)
       .attr('transform', 'translate(' + (margins.left)+ ',' + (height+margins.top) + ')')
    svg.append("g")
       .attr("id","yAxis")
       .call(yAxis)
       .attr('transform', 'translate(' + 70 + ',' + margins.top + ')')
    dot.selectAll("circle")
       .data(data[0].quizes)
       .enter()
       .append("circle")
       .attr("cx",function(d,i){return xScale(i);})
       .attr("cy",function(d){return yScale(d.grade);})
       .attr("r","4")
       .attr("fill",color(2))
       .on("mouseover", function(d,i) {
         d3.select(this).attr("stroke","black").attr("r","6")
         var xPosition = parseFloat(d3.select(this).attr("cx"))+580;
         var yPosition = parseFloat(d3.select(this).attr("cy"))+330;
         d3.select("#Quiztooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .text(d.grade);
         d3.select("#Quiztooltip").classed("hidden", false);
         d3.select("#Quiztooltip").select("#day")
          .text(function(){return d.day;});})
        .on("mouseout", function() {
          d3.select(this).attr("stroke","none").attr("r","4")
          d3.select("#Quiztooltip").classed("hidden", true);})
  }
  drawSingleHW(data)
  drawSingleQuiz(data)
}
var updateSingle=function(data)
{
  var screen={width:500,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var updateSingleHW=function(data)
  {
    var color=d3.scaleOrdinal(d3.schemeSet2)
    var xScale=d3.scaleLinear()
       .domain([0,data.homework.length])
       .nice()
       .range([0,width])
    var yScale=d3.scaleLinear()
                 .domain([0,50])
                 .nice()
                 .range([height,margins.top])
    var line=d3.select("#HWlines")
    var dot=d3.select("#HWdots")
    var drawLine=d3.line()
                   .x(function(d,i){return xScale(i)})
                   .y(function(d){return yScale(d.grade)})
    line.select("#HWLine")
        .classed("hidden",false)
        .datum(data.homework)
        .transition()
        .duration(1000)
        .attr("d",drawLine)
        .attr("fill","none")
        .attr("stroke", color(2))
        .attr("stroke-width", 2);
    dot.selectAll("circle")
       .data(data.homework)
       .transition()
       .duration(1000)
       .attr("cx",function(d,i){return xScale(i);})
       .attr("cy",function(d){return yScale(d.grade);})
       .attr("r","4")
       .attr("fill",color(1))
  }
  var updateSingleQuiz=function(data)
  {
    var color=d3.scaleOrdinal(d3.schemeSet2)
    var xScale=d3.scaleLinear()
       .domain([0,data.quizes.length])
       .nice()
       .range([0,width*1.5])
    var yScale=d3.scaleLinear()
                 .domain([0,10])
                 .nice()
                 .range([height,margins.top])
    var line=d3.select("#Quizlines")
    var dot=d3.select("#Quizdots")
    var drawLine=d3.line()
                   .x(function(d,i){return xScale(i)})
                   .y(function(d){return yScale(d.grade)})
    line.select("#QuizLine")
        .classed("hidden",false)
        .datum(data.quizes)
        .transition()
        .duration(1000)
        .attr("d",drawLine)
        .attr("fill","none")
        .attr("stroke", color(2))
        .attr("stroke-width", 2);
    dot.selectAll("circle")
       .data(data.quizes)
       .transition()
       .duration(1000)
       .attr("cx",function(d,i){return xScale(i);})
       .attr("cy",function(d){return yScale(d.grade);})
       .attr("r","4")
       .attr("fill",color(1))
  }
  updateSingleHW(data)
  updateSingleQuiz(data)
}
