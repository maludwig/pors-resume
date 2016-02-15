/*jshint -W117 */
function Edge(pt1, pt2, cost) {
	this.node_from = pt1;
	this.node_to = pt2;
	this.cost = cost;
}
Edge.compare = function (a,b) {
	if (a.cost < b.cost) return -1;
	if (a.cost > b.cost) return 1;
	return 0;
};
Edge.sum = function (edges) {
	var sum = 0;
	for (var i in edges) {
		sum += edges[i].cost;
	}
	return sum;
};
Edge.prototype.toString = function () {
	return "E[" + this.node_from + "--" + this.cost + "->" + this.node_to + "]";
};

function Node(id) {
	this.id = id;
	this.edges_out = [];
	this.edges_in = [];
}
Node.prototype.costTo = function (pt2, cost) {
	var n = this;
	if(typeof cost === 'undefined') {
		if(typeof n.edges_out[pt2] === 'undefined') {
			return Infinity;
		} else {
			return n.edges_out[pt2];
		}
	} else {
		if(typeof n.edges_out[pt2] === 'undefined') {
			n.edges_out[pt2] = cost;
		} else {
			n.edges_out[pt2] = Math.min(cost,n.edges_out[pt2]);
		}
	}
};
Node.prototype.costFrom = function (pt2, cost) {
	var n = this;
	if(typeof cost === 'undefined') {
		if(typeof n.edges_in[pt2] === 'undefined') {
			return Infinity;
		} else {
			return n.edges_in[pt2];
		}
	} else {
		if(typeof n.edges_in[pt2] === 'undefined') {
			n.edges_in[pt2] = cost;
		} else {
			n.edges_in[pt2] = Math.min(cost,n.edges_in[pt2]);
		}
	}
};
Node.prototype.edges = function () {
	var n = this;
	var ret = [];
	n.edges_out.forEach(function(cost,pt2) {
		ret.push(new Edge(n.id,pt2,cost));
	});
	n.edges_in.forEach(function(cost,pt2) {
		ret.push(new Edge(pt2,n.id,cost));
	});
	return ret;
};
Node.prototype.toString = function () {
	var n = this;
	var edges = n.edges();
	var ret = edges.map(function(edge) {
		return edge.toString();
	});
	return "N(" + n.id + "){" + ret.join(", ") + "}";
};

function Graph(point_string) {
	var edge_strings = point_string.split(" | ");
	var edge_vals;
	var pt1;
	var pt2;
	var cost;
	this.edge_matrix = [];
	for(var i = 0; i < edge_strings.length; i++) {
		edge_vals = edge_strings[i].split(" ");
		pt1 = parseInt(edge_vals[0], 10);
		pt2 = parseInt(edge_vals[1], 10);
		cost = parseInt(edge_vals[2], 10);
		this.edge(pt1,pt2,cost);
		this.edge(pt2,pt1,cost);
	}
}

Graph.prototype.edge = function (pt1, pt2, cost) {
	var g = this;
	if(typeof cost === 'undefined') {
		if(typeof g.edge_matrix[pt1] === 'undefined') return Infinity;
		if(typeof g.edge_matrix[pt1][pt2] === 'undefined') return Infinity;
		return new Edge(pt1, pt2, g.edge_matrix[pt1][pt2]);
	} else {
		if(typeof g.edge_matrix[pt1] === 'undefined') {
			g.edge_matrix[pt1] = [];
		}
		if(typeof g.edge_matrix[pt1][pt2] === 'undefined') {
			g.edge_matrix[pt1][pt2] = cost;
		} else {
			g.edge_matrix[pt1][pt2] = Math.min(cost,g.edge_matrix[pt1][pt2]);
		}
	}
};
Graph.prototype.edgesFrom = function (pt) {
	var g = this;
	if(typeof g.edge_matrix[pt] === 'undefined') {
		return [];
	} else {
		var ret = [];
		$.each(g.edge_matrix[pt], function(pt2,cost) {
			ret.push(new Edge(pt1,pt2,cost));
		});
		return ret;
	}
};
Graph.prototype.edgesTo = function (pt) {
	var g = this;
	var ret = [];
	$.each(g.edge_matrix, function(pt1,pt_list) {
		if(typeof pt_list[pt] !== 'undefined') {
			ret.push(new Edge(pt1,pt,cost));
		}
	});
	return ret;
};
Graph.prototype.connected = function (pt1, pt2) {
	var g = this;
	var visited_nodes = [];
	var todo_search = [pt1];
	var curr_node;
	var curr_edges;
	while (todo_search.length > 0) {
		curr_node = todo_search.pop();
		visited_nodes[curr_node] = true;
		curr_edges = g.edgesFrom(curr_node);
		for(var i=0; i<curr_edges.length; i++) {
			edge = curr_edges[i];
			if(edge.pt2 == pt2) return true;
			if (!visited_nodes[edge.pt2]) todo_search.push(edge.pt2);
		}
	}
	return false;
};
Graph.prototype.nodes = function () {
	var g = this;
	var nodes = [];
	g.edges().forEach(function(edge) {
		if (typeof nodes[edge.node_from] === "undefined") {
			nodes[edge.node_from] = new Node(edge.node_from);
		}
		if (typeof nodes[edge.node_to] === "undefined") {
			nodes[edge.node_to] = new Node(edge.node_to);
		}
		nodes[edge.node_from].costTo(edge.node_to, edge.cost);
		nodes[edge.node_to].costFrom(edge.node_from, edge.cost);
	});
	return nodes;
};
Graph.prototype.edges = function () {
	var g = this;
	var curr_node;
	var edges = [];
	var inner_callback = function(cost, pt2) {
		edges.push(new Edge(curr_node, pt2, cost));
	};
	var callback = function(pt_list,pt1) {
		curr_node = pt1;
		pt_list.forEach(inner_callback);
	};
	g.edge_matrix.forEach(callback);
	return edges;
};
Graph.prototype.missingNodes = function () {
	var g = this;
	for(var pt1 = 1; pt1<g.edge_matrix.length; pt1++) {
		if(typeof g.edge_matrix[pt1] === 'undefined') return true;
	}
	return false;
};
Graph.prototype.minimum_spanning_tree = function () {
	var g = this;
	var edges;
	var nodes;
	var solution = [];
	var node_from, node_to;
	var tree = 1;
	var old_tree;
	edges = g.edges().sort(Edge.compare);
	nodes = g.nodes();
	for (var i = 0; i < edges.length; i++) {
		edge = edges[i];
		node_from = nodes[edge.node_from];
		node_to = nodes[edge.node_to];
		if (typeof node_from.tree === "undefined") {
			if (typeof node_to.tree === "undefined") {
				node_from.tree = tree;
				node_to.tree = tree;
				solution.push(edge);
				tree++;
			} else {
				node_from.tree = node_to.tree;
				solution.push(edge);
			}
		} else {
			if (typeof node_to.tree === "undefined") {
				node_to.tree = node_from.tree;
				solution.push(edge);
			} else {
				if (node_from.tree !== node_to.tree) {
					old_tree = node_from.tree;
					for (var x = 1; x < nodes.length; x++) {
						if (typeof nodes[x] !== "undefined") {
							if (nodes[x].tree === old_tree) {
								nodes[x].tree = node_to.tree;
							}
						}
					}
					solution.push(edge);
				}
			}
		}
	}
	//If there are nodes not in the spanning tree.
	tree = nodes[1].tree;
	for (var id in nodes) {
		if (nodes[id].tree !== tree) {
			return false;
		}
	}
	return solution;
};
Graph.prototype.toString = function () {
	var ret = [];
	var ptFrom;
	var inner_callback = function(cost, pt2) {
		ret.push(new Edge(ptFrom,pt2,cost).toString());
	};
	var primary_callback = function(pt_list, pt1) {
		ptFrom = pt1;
		pt_list.forEach(inner_callback);
	};
	g.edge_matrix.forEach(primary_callback);
	return "{ " + ret.join(", ") + " }";
};
