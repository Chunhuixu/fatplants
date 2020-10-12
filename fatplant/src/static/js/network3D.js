    const N = 30;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };


const Graph = ForceGraph3D()
 (document.getElementById('3d-graph'))
	.graphData(gData)
	// .jsonURl('data3D.json')
	.nodeLabel('id')
	.nodeAutoColorBy('group');