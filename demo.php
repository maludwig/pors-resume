<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Mike Pors</title>
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script type="text/javascript">
		$.fn.ids = function () {
			var selected = this;
			return selected.each(function () {
				var one_element = this;
				alert($(one_element).attr("id"));
			});
		};
		$.fn.drawLine = function () {
			var selected = this;
			return selected.each(function () {
				var canvas = this;
				var $canvas = $(this);
				var ctx = canvas.getContext('2d');
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(0, 100);
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(15, 50, 10, 0, 2 * Math.PI);
				ctx.fill();
			});
		};
		$(function () {
			//$(".renter").ids().css("border", "1px solid red");
			$("canvas").drawLine();
		});
	</script>
</head>

<body>
	<button id="mitch" class="renter">Mitch</button>
	<button id="alex" class="renter">Alex</button>
	<button id="rob" class="renter">Rob</button>
	<canvas id="first" width="100" height="100" style="border:1px solid #000000;"></canvas>
	<canvas id="second" width="100" height="100" style="border:1px solid #000000;"></canvas>
</body>

</html>