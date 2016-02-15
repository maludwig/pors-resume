/*jshint -W117 */
/* Depends on linearalgebra-1.3, me-2.3 and graphs-1.0 */
NODE_RADIUS = 20;
RANDOM_PRIMES = [7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017, 8039, 8053, 8059, 8069, 8081, 8087, 8089, 8093, 8101, 8111, 8117, 8123, 8147, 8161, 8167, 8171, 8179, 8191, 8209, 8219, 8221, 8231, 8233, 8237, 8243, 8263, 8269, 8273, 8287, 8291, 8293, 8297, 8311, 8317, 8329, 8353, 8363, 8369, 8377, 8387, 8389, 8419, 8423, 8429, 8431, 8443, 8447, 8461, 8467, 8501, 8513, 8521, 8527, 8537, 8539, 8543, 8563, 8573, 8581, 8597, 8599, 8609, 8623, 8627, 8629, 8641, 8647, 8663, 8669, 8677, 8681, 8689, 8693, 8699, 8707, 8713, 8719, 8731, 8737, 8741, 8747, 8753, 8761, 8779, 8783, 8803, 8807, 8819, 8821, 8831, 8837, 8839, 8849, 8861, 8863, 8867, 8887, 8893, 8923, 8929, 8933, 8941, 8951, 8963, 8969, 8971, 8999, 9001, 9007, 9011, 9013, 9029, 9041, 9043, 9049, 9059, 9067, 9091, 9103, 9109, 9127, 9133, 9137, 9151, 9157, 9161, 9173, 9181, 9187, 9199, 9203, 9209, 9221, 9227, 9239, 9241, 9257, 9277, 9281, 9283, 9293, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377, 9391, 9397, 9403, 9413, 9419, 9421, 9431, 9433, 9437, 9439, 9461, 9463, 9467, 9473, 9479, 9491, 9497, 9511, 9521, 9533, 9539, 9547, 9551, 9587, 9601, 9613, 9619, 9623, 9629, 9631, 9643, 9649, 9661, 9677, 9679, 9689, 9697, 9719, 9721, 9733, 9739, 9743, 9749, 9767, 9769, 9781, 9787, 9791, 9803, 9811, 9817, 9829, 9833, 9839, 9851, 9857, 9859, 9871, 9883, 9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973, 10007];
p1 = RANDOM_PRIMES[Math.floor(Math.random()*RANDOM_PRIMES.length)];
p2 = RANDOM_PRIMES[Math.floor(Math.random()*RANDOM_PRIMES.length)];

function draw_graph(ctx, graph) {
	var nodes = graph.nodes();
	var pos;
	var callback = function (edge) {
		draw_edge(ctx,edge);
	};
	ctx.font = "16px Arial";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	nodes.forEach(function(node) {
		pos = calcPos(ctx, node.id);
		ctx.beginPath();
		ctx.arc(pos.x,pos.y,NODE_RADIUS,0,2*Math.PI);
		ctx.stroke();
		ctx.fillText(node.id,pos.x,pos.y);
		node.edges().forEach(callback);
	});
}
function draw_edge(ctx, edge) {
	n1 = edge.node_from;
	n2 = edge.node_to;
	color = new Color($.rcolor()).darken(10);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	pos1 = calcPos(ctx, n1);
	pos2 = calcPos(ctx, n2);
	angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
	xAdjust = Math.cos(angle) * NODE_RADIUS;
	yAdjust = Math.sin(angle) * NODE_RADIUS;
	ctx.beginPath();
	ctx.moveTo(pos1.x + xAdjust, pos1.y + yAdjust);
	ctx.lineTo(pos2.x - xAdjust, pos2.y - yAdjust);
	ctx.stroke();
	text_offset = new Vector(-yAdjust, xAdjust);
	mid = pos1.midpoint(pos2).add(text_offset);

	ctx.fillText(edge.cost, mid.x, mid.y);
}
function calcPos(ctx, node) {
	var w = ctx.canvas.clientWidth;
	var h = ctx.canvas.clientHeight;
	//x = (Math.cos(0.6 * node) * (w/2.2)) + (w/2);
	//y = (Math.sin(0.6 * node) * (h/2.2)) + (h/2);
	x = (Math.pow(p1, node) % (w - (4 * NODE_RADIUS))) + (2 * NODE_RADIUS);
	y = (Math.pow(p2, node) % (h - (4 * NODE_RADIUS))) + (2 * NODE_RADIUS);
	return new Point(x, y);
}
