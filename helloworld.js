d3.json("classData.json").then(function(data){
  drawFinalGrade(data)
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
  // var color=d3.scaleOrdinal
  //             .domain([0,22])
  //             .range("#217D6F")
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
                       .attr("fill",function(d,i){return color(i);})
                       .attr("x",function(d,i){return xScale(i);})
                       .attr("y",function(d,i){return yScale(d);})
                       .attr("width",width/finalArray.length)
                       .attr("height",function(d){return height-yScale(d);})
                       .on("mouseover", function(d,i) {
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
                        .on("mouseout", function() {d3.select("#finaltooltip").classed("hidden", true);});
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
                        .on("click",function(d,i){
                          updateSingle(data[i])
                        })
  var yAxis=d3.axisLeft(yScale)
  svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left-5)+","+(margins.top-1)+")")
  var drawSingle=function(data)
  {
    var svg=d3.select("body").append("svg")
              .attr("id","graphsingle")
              .attr("width",screen.width)
              .attr("height",screen.height)
  }
  drawSingle(data)
}
var drawSingle2=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var svg=d3.select("body").append("svg")
            .attr("id","individual")
            .attr("width",screen.width)
            .attr("height",screen.height)
}
var updateSingle=function(data)
{
  var screen={width:800,height:400}
  var margins = {top: 20, right: 40, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var individual=d3.select("#individual")
}
