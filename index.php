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
	<script src="js/linearalgebra-1.5.js"></script>
	<script src="js/color.1.3.js"></script>
	<script src="js/jquery-center.1.2.js"></script>
	<script src="main.js"></script>
	<script type="text/javascript">
		$(function () {
			$(".ring").ring();
			$(".skill p").center();
			$(window).resize(function() {
				$(".skill p").center();
			});
		});
		$(window).load(function() {
			$(".skill p").center();
		});
	</script>
</head>

<body>

	<header class="text-center">
		<h2 id="mike" class="title">MIKE</h2>
		<hr />
		<h2 class="title">PORS</h2>

		<div id="contact">
			<a href="mailto:mike.pors@gmail.com"><span class="glyphicon glyphicon-envelope"></span> mike.pors@gmail.com</a>
			<a href="tel:403-477-9974"><span class="glyphicon glyphicon-phone"></span> 403-477-9974</a>
			<a href="files/MikePors.pdf"><span class="glyphicon glyphicon-download"></span> PDF</a>
		</div>
	</header>
	<div class="container">
		<div class="col-lg-6 col-sm-12" id="bio">
			<h3>Bio</h3>
		</div>

		<div class="col-lg-6 col-sm-12" id="certs">
			<h3>Degrees & Certifications</h3>
			<h4 class="white">MSc Pure Mathematics</h4>
			<p class="small">University of Calgary</p>
			<h4 class="white">BSc Pure Mathematics - Honours</h4>
			<p class="small">University of Calgary</p>
			<h4 class="white">Certified Associate Java SE 8 Programmer</h4>
			<p class="small">Oracle Corporation</p>
		</div>
		<?php include("fragments/rings.php"); ?>
		<div class="col-lg-6 col-sm-12" id="history">
			<h3>History</h3>
		</div>
		<div class="col-lg-6 col-sm-12" id="awards">
			<h3>Awards</h3>
		</div>
		<footer>
		</footer>
	</div>
</body>

</html>
