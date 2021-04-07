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

//Load in json data using ajax call
var rnaData = (function () {
    var json = [];
    $.ajax({
        'async': false,
        'global': false,
        'url': "RNAdata3D.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//Load in json data using ajax call
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


// var gDataGet = (function () {
//   return $.ajax({
//     'type': 'GET',
//     'url': "data3D.json",
//     'dataType': "json"
//   });
// });
// var gData;

// var neighbors;

// gDataGet().done(function(r) {
//   gData = r; //data loads properly
//   console.log(gData);

// var neighbors = gData.links.reduce((accum, link) => {

// 	if (!accum.includes(link.source))
// 		accum.push({
// 			node: link.source,
// 			neighbors: [link.target]
// 		});
// 	else accum.find(entry => {
//     entry.node === link.source}).neighbors.push(link.target);
     
// 	return accum;

// },[])

//   callback(neighbors);
// });

// function callback(neighbors){ gData.links.forEach(link => {
//       gData.neighbors = neighbors;
//       const a = gData.nodes[link.source];
//       const b = gData.nodes[link.target];
//       !a.neighbors && (a.neighbors = []);
//       !b.neighbors && (b.neighbors = []);
//       a.neighbors.push(b);
//       b.neighbors.push(a);
//       !a.links && (a.links = []);
//       !b.links && (b.links = []);
//       a.links.push(link);
//       b.links.push(link);
// });
// }

// neighbors = gData.links.reduce((accum, link) => {

// 	if (!accum.includes(link.source))
// 		accum.push({
// 			node: link.source,
// 			neighbors: [link.target]
// 		});
// 	else accum.find(entry => {
// 		entry.node === link.source}).neighbors.push(link.target);
// 	return accum;

// }, []);


const Graph = ForceGraph3D()
    (document.getElementById("3d-graph"))
      Graph
        // .jsonUrl(gData)
        .graphData(gData) //works
        .nodeLabel(node => `${node.id} - Value 1: ${node.value1}, Value 2: ${node.value2}`)
        .linkLabel(link => `EdgeBetweenness: ${link.EdgeBetweenness}, Interaction: ${link.interaction}`)
        //.warmupTicks(30)
        // .cooldownTicks(100)
        // .cooldownTime(1000)
        .width(1155)
        .nodeRelSize(6)
        .linkWidth(3.5)
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        
        

        // //highlight node and links on hover
        // .nodeColor(node => highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : 'rgba(0,255,255,0.6)')
        // .linkWidth(link => highlightLinks.has(link) ? 4 : 1)
        // .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
        // .linkDirectionalParticleWidth(4)


        // .onNodeHover(node => {
        //   // no state change
        //   if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

        //   highlightNodes.clear();
        //   highlightLinks.clear();
        //   if (node) {
        //     highlightNodes.add(node);
        //     node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
        //     node.links.forEach(link => highlightLinks.add(link)); //Cannot read property 'forEach' of undefined
        //   }

        //   hoverNode = node || null;

        //   updateHighlight();
        // })
        // .onLinkHover(link => {
        //   highlightNodes.clear();
        //   highlightLinks.clear();

        //   if (link) {
        //     highlightLinks.add(link);
        //     highlightNodes.add(link.source);
        //     highlightNodes.add(link.target);
        //   }

        //   updateHighlight();
        // });


        .onNodeClick(node => { //zooms in on clicked node
          // Aim at node from outside it
          const distance = 150;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

          Graph.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
        });
    
        //space out the network 
        Graph.d3Force('charge').strength(-25);

// // trigger update of highlighted objects in scene
// function updateHighlight() {
//   Graph
//     .nodeColor(Graph.nodeColor())
//     .linkWidth(Graph.linkWidth())
//     .linkDirectionalParticles(Graph.linkDirectionalParticles());
// }


//Call the unfiltered graph
function genomeNetwork() {
  Graph.graphData(gData);
  Graph.linkVisibility(true);
  Graph.cooldownTicks(100);
  Graph.cooldownTime(1000);
  Graph.linkWidth(3.5);
  Grapg.d3Force('charge').strength(-50);
  Graph.onEngineStop(() => Graph.zoomToFit(600));
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
function rnaNetwork() {
  Graph.graphData(rnaData);
  Graph.nodeLabel(node => `${node.id} - Group: ${node.group}`);
  Graph.linkLabel(link => ``);
  Graph.d3Force('charge').strength(-1000);
  Graph.linkOpacity(.3)
  Graph.linkWidth(.6);
  Graph.nodeOpacity(.75);
  // Graph.onEngineStop(() => Graph.zoomToFit(600));
}

function groupRFilter() {
Graph.graphData(rnaData);
      let { nodes, links } = Graph.graphData();
      nodes = nodes.filter(n => n.group == 0  ); //filters nodes by the group of 0
      links = links.filter(l => l.source.group == 0  && l.target.group == 0); //filters links by the group of 0 from the nodes
      Graph.graphData({ nodes, links });
    }