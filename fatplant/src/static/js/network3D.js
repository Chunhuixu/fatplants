//Simple dropdown

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// *****************************************
//Load in json data using ajax call
//getting warning from the console
var gData = (function () {
    var json = [];
    $.ajax({
        'async': false,
        'global': false,
        'url': "data3D.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

console.log(gData);


const Graph = ForceGraph3D()
    (document.getElementById("3d-graph"))
      Graph
        // .jsonUrl('data3D.json')
        .graphData(gData) //works
        .nodeLabel(node => `${node.id} - Value 1: ${node.value1}, Value 2: ${node.value2}`)
        .linkLabel(link => `EdgeBetweenness: ${link.EdgeBetweenness}, Interaction: ${link.interaction}`)
        .cooldownTicks(200)
        .cooldownTime(1000)
        .width(1155)
        .nodeRelSize(6)
        .linkWidth(3.5)
        .nodeLabel('id')
        .nodeAutoColorBy('group');


  Graph.d3Force('charge').strength(-25);


//Call the unfiltered graph
function genomeNetwork() {
  Graph.graphData(gData)
}

//filtering by "group" key
function group0Filter() {
Graph.graphData(gData);
      let { nodes, links } = Graph.graphData();
      nodes = nodes.filter(n => n.group == 0 ); //filters nodes by the group of 0
      links = links.filter(l => l.source.group == 0  && l.target.group == 0); //filters links by the group of 0 from the nodes
      Graph.graphData({ nodes, links })
    }

function group1Filter() {
Graph.graphData(gData);
      let { nodes, links } = Graph.graphData();
      nodes = nodes.filter(n => n.group == 1 ); //filters nodes by the group of 1
      links = links.filter(l => l.source.group == 1  && l.target.group == 1); //filters links by the group of 1 from the nodes
      Graph.graphData({ nodes, links });
    }

//load new graph.
//due to the number of elements, it lags the entire page very badly
// function rnaNetwork() {
//   Graph.jsonUrl('RNAdata3D.json')
// }


