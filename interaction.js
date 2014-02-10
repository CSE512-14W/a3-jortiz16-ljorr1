function getPetitionId(petition) {
    if (petition == 'Pro-P') {
        return 0;
    } else if (petition == 'Anti-P') {
        return 1;
    } else {
        return 2;
    }
}

//from http://raventools.com/blog/create-a-modal-dialog-using-css-and-javascript/
//function to handle the background box
function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

//this function is tied to the button div in the html -- keeps
//track of the year it's pointing on the timeline
function updateTimeline() {

    //restart
    if(valueSlider == yearsUNIQUE[yearsUNIQUE.length -1])
    {
      counter = 0;
    }
	
	if(counter != 0)
	{
     counter = counter + 1;
	 valueSlider = yearsUNIQUE[counter];
	}
	else
	{
	valueSlider = yearsUNIQUE[counter];
	counter = counter + 1;
	}
	  
	
   // console.log(valueSlider);
    
}


function updateTimelineBack() {

    //restart
    if(valueSlider == yearsUNIQUE[0] || valueSlider == 0)
    {
      counter = yearsUNIQUE.length-1;
      console.log(counter);
	  
    }
	else{
	counter = counter - 1;
    }
	valueSlider = yearsUNIQUE[counter];
}
var yearValues = [];
var yearsUNIQUE = [];
var deathDates = [];
var valueSlider = 0;
var counter = 0;


d3.csv("nodes.csv", function(error1, nodes) {
    d3.csv("links.csv", function(error2, edges) {
        var timeScale = d3.time.scale().domain([new Date("1/1/1692"), new Date("12/31/1692")]).range([1, 10]);
        for (var v in edges) {
            edges[v].value2 = new Date(edges[v].value2);
            edges[v].value = new Date(edges[v].value);
            edges[v].source = parseInt(edges[v].source);
            edges[v].target = parseInt(edges[v].target);
        }
        var graph = {
            "nodes": nodes,
            "links": edges
        };
        var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: -50
        };
        var width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        var color = d3.scale.category10();

        var groups = d3.nest().key(function(d) {
            return d.family;
        }).entries(nodes);
        //console.log(groups.splice(2)); //removes the "" values
        var i;
        for (i = 0; i < groups.length; i++) {
            if (groups[i].key == "") {
                break;
            }
        }
        groups.splice(i, 1); //removes the group with ""

        //from http://bl.ocks.org/donaldh/2920551
        var groupPath = function(d) {
            var values = d.values;
            var hull;
            if (values.length == 2) {
                //console.log(values);
                hull = d3.geom.hull([
                        [values[0].x, values[0].y],
                        [values[0].x + 0.001, values[0].y + 0.001],
                        [values[1].x, values[1].y],
                        [values[1].x + 0.001, values[1].y + 0.001]
                    ]);
            } else {
                hull = d3.geom.hull(d.values.map(function(i) {
                            return [i.x, i.y];
                        }));
            }
            //console.log(hull);
            return "M" + hull.join("L") + "Z";
        };

        var groupFill = function(d, i) {
            return "grey";
        }

        var svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var force = d3.layout.force()
            .charge(-100)
            .linkDistance(function(d) {
                return ((d.type == "accusation") ? 100 : 20);
            })
            .size([width, height])
            .nodes(graph.nodes)
            .links(graph.links);


        //from http://bl.ocks.org/Caged/6476579
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<span>" + d.name + "</span>";
            });

        svg.call(tip);

        var loading = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("font-family", "verdana")
            .text("Simulating. One moment please…");

        //fills up the yearValues array with the years from the data
        var arrayCount = 0;
        var deathCounter= 0;
        for (var v in graph.links) {
            if (!isNaN(graph.links[v].value)) {
                yearValues[arrayCount] = new Date(graph.links[v].value);
                arrayCount = arrayCount + 1;
                if(!isNaN(graph.links[v].value2))
                {
                yearValues[arrayCount] = new Date(graph.links[v].value2);
                arrayCount = arrayCount + 1;
                deathDates[deathCounter] = new Date(graph.links[v].value2);
                deathCounter = deathCounter + 1;
                }
            }
            
        }
        //sorting the years in ascending order
        var sortedList = yearValues.sort(function(a, b) {
            return new Date(a.getTime()) - new Date(b.getTime());
        });
        //gets unique values of years via ordinal scale function
        //from https://github.com/mbostock/d3/pull/1138
        yearsUNIQUE = d3.scale.ordinal().domain(yearValues).domain();

        deathDates = d3.scale.ordinal().domain(deathDates).domain();

        //console.log(yearsUNIQUE);
        //from http://bl.ocks.org/mbostock/1667139
        setTimeout(function() {
            force.start();
            for (var i = 500000; i > 0; --i) force.tick();
            force.stop();

            //setting up the axis to have tick marks
            var myAxis = d3.svg.axis().ticks(12).tickFormat(d3.time.format("%m/%Y"));
            var timeDomain = d3.time.scale().domain([new Date("1/1/1692"), new Date("12/31/1692")]);
            var slider = d3.slider().axis(myAxis).scale(timeDomain);
            var sliderEvent = d3.select('#timeline1').call(slider);

            var link = svg.selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("class", function(d) {
                    return d.type;
                })
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                })
                .style("stroke-width", function(d) {
                    return 2;
                })
                .style("stroke", "white")
                .attr("opacity", "0");

            var accusations = svg.selectAll(".accusation")
                .attr("marker-end", "url(#arrowhead)");

            //from http://logogin.blogspot.com/2013/02/d3js-arrowhead-markers.html
            var marker = svg.append("defs").append("marker").data(graph.links)
                .attr("id", "arrowhead")
                .attr("refX", 9)
                .attr("refY", 2)
                .attr("markerWidth", 6)
                .attr("markerHeight", 10)
                .attr("orient", "auto")
                .style("opacity", 0.6)
                .append("path")
                .attr("d", "M 0,0 V 4 L6,2 Z")
                .style("fill", "white")
                .style("stroke-opacity", "1"); //this is actual shape for arrowhead
                
            var relative = svg.selectAll(".relative")
                .style("stroke-opacity", "0");

            var hulls = svg.selectAll(".hulls")
                .data(groups)
                .attr("d", groupPath)
                .enter().insert("path")
                .attr("class", "hulls")
                .style("fill", groupFill)
                .style("stroke", groupFill)
                .style("stroke-width", 40)
                .style("stroke-linejoin", "round")
                .style("opacity", .2)
                .attr("d", groupPath);

            var node = svg.selectAll("circle")
                .data(graph.nodes)
                .enter().append("circle")
                .attr("r", 6)
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
                .style("fill", function(d) {
                    return color(getPetitionId(d.petition));
                })
                .style("stroke-width", 2)
                .on("mouseover", function(d) {
                    tip.show(d);
                    d3.select(this).style("opacity", 0.4);
                })
                .on("mouseout", function(d) {
                    tip.hide(d);
                    d3.select(this).style("opacity", 1.0);
                })
            //from https://gist.github.com/sfrdmn/1437516
            .on("click", function(d) {
                d3.select(".infobox").style("display", "block");
                d3.select(".infobox").select("p:nth-child(1)").html("<b>" + d.name + "</b>").style("color", color(getPetitionId(d.petition)));
                d3.select(".infobox").select("p:nth-child(2)").text("Age: " + (d.age == "" ? "Unknown" : d.age));
                d3.select(".infobox").select("p:nth-child(3)").text(d.info).style("line-height", "18px");
            });


            //button press actions -- links/arrows and slider updates
            var svgButton = d3.selectAll("#option").on("click", function(x) {
                //if count restarted reset
                if(counter == 1)
                {
                    node.style("fill", function(d) {
                        return color(getPetitionId(d.petition));
                        }).style("stroke", "white").style("stroke-width",2);
                }
                        
                //using jquery to delete tag contents
                $("#textDate").empty();
                d3.select("#textDate").append("text").text("Date: " + valueSlider.toDateString());
                $("#timeline1").empty();
                //update axis with new value
                var myAxis = d3.svg.axis().ticks(12).tickFormat(d3.time.format("%m/%Y"));
                var timeDomain = d3.time.scale().domain([new Date("1/1/1692"), new Date("12/31/1692")]);
                var slider = d3.slider().axis(myAxis).scale(timeDomain);
                d3.select("#timeline1").call(slider.value(valueSlider));
                //update paths lines based on data (time)
                link.style("stroke", function(d) {
                    if (valueSlider.getTime() > d.value.getTime()) {
                        return "gray";
                    } else if (valueSlider.getTime() == d.value.getTime()) {
                        return "red";
                    } else {
                        return "white";
                    }
                });
                //update arrows based on data (time)
                marker.style("fill", function(d) {
                    console.log(d.type);
                    if (valueSlider.getTime() >= d.value.getTime()) {
                        return "black";
                    }
                });
                //update opacity

                link.style("opacity", function(d) {
                    if (valueSlider.getTime() > d.value.getTime()) {
                        var diff = Math.abs(valueSlider.getTime() - d.value.getTime());
                        var scaleDIFF = d3.scale.linear().domain([0, 17794800000]).range([0.1, 0.9]);
                        var mapper = 1 - scaleDIFF(diff);
                        return mapper;
                    } else if (valueSlider < d.value) {
                        return 0;
                    } else {
                        return 1;
                    }
                });

                marker.style("stroke-opacity", function(d) {
                    if (valueSlider.getTime() > d.value.getTime()) {
                        var diff = Math.abs(valueSlider.getTime() - d.value.getTime());
                        var scaleDIFF = d3.scale.linear().domain([0, 17794800000]).range([0.1, 0.9]);
                        var mapper = 1 - scaleDIFF(diff);
                        return mapper;
                    } else if (valueSlider < d.value) {
                        return 0;
                    } else {
                        return 1;
                    }
                });

                node.filter(
                    function(d,i) {
                    if(d.death != "")
                    {
                        if (valueSlider.getTime() >= new Date(d.death).getTime()) {
                                return this;}
                        else{
                              return null;
                            }
                    }
                    }).style("stroke", "red").style("stroke-width",3);
					
				node.filter(
                    function(d,i) {
                    if(d.death != "")
                    {
                        if (valueSlider.getTime() < new Date(d.death).getTime()) {
                                return this;}
                        else{
                              return null;
                            }
                    }
                    }).style("stroke", "white").style("stroke-width",2);

            });
            loading.remove();
        }, 15);

        //This makes a normal tool tip show up, but you have to hover over it for a couple of seconds
        /*node.append("svg:title")
        .text(function (d) {
        return d.name;
    });*/




    });
});