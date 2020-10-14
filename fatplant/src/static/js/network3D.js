const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .jsonUrl('data3D.json')
        .nodeLabel(node => `${node.id} - Value 1: ${node.value1}, Value 2: ${node.value2}`)
        .linkLabel(link => `EdgeBetweenness: ${link.EdgeBetweenness}, Interaction: ${link.interaction}`)
        .nodeAutoColorBy('group')
        // .width(1300)
        .d3Force('charge').strength(-150)
        .nodeRelSize(6)
        .nodeOpacity([.65])
        .linkWidth(3);
        


    //fitting network to size of container
    // Graph.cooldownTicks([400]);
    // Graph.onEngineStop(() => Graph.zoomToFit(400));