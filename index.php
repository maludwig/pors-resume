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
		});
	</script>
</head>

<body>

	<header class="text-center">
		<h2 id="mike" class="title">MIKE</h2>
		<hr />
		<h2 class="title">PORS</h2>

		<div id="contact">
			<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-envelope"></span><a href="mailto:mike.pors@gmail.com">e-mail</a></button>

			<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-phone"></span><a href="tel:403-477-9974">403-477-9974</a></button>

			<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-download"></span> PDF</button>
		</div>
	</header>
	<div class="container-fluid">
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
		<div class="col-lg-6 col-sm-12" id="dev">
			<div class="row">
				<h3>Development</h3>
				<div class="skill">
					<p>Java</p>
					<img src="img/cert.png">
					<canvas class="ring" data-fill="24" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Python</p>
					<canvas class="ring" data-fill="24" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>XML</p>
					<canvas class="ring" data-fill="23" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>JS</p>
					<canvas class="ring" data-fill="20" width="100" height="100"></canvas>
				</div>
			</div>
			<div class="row">
				<div class="skill">
					<p>C#</p>
					<canvas class="ring" data-fill="20" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>SQL</p>
					<canvas class="ring" data-fill="18" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>HTML</p>
					<canvas class="ring" data-fill="12" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>CSS</p>
					<canvas class="ring" data-fill="6" width="100" height="100"></canvas>
				</div>
			</div>
		</div>
		<div class="col-lg-6 col-sm-12" id="tech">
			<div class="row">
				<h3>Technologies</h3>
				<div class="skill">
					<p>Android</p>
					<canvas class="ring" data-fill="23" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>LaTeX</p>
					<canvas class="ring" data-fill="21" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Windows</p>
					<canvas class="ring" data-fill="20" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Git</p>
					<canvas class="ring" data-fill="15" width="100" height="100"></canvas>
				</div>
			</div>
			<div class="row">
				<div class="skill">
					<p>Visual
						<br /> Studio
					</p>
					<canvas class="ring" data-fill="13" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Django</p>
					<canvas class="ring" data-fill="10" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Cloud</p>
					<canvas class="ring" data-fill="7" width="100" height="100"></canvas>
				</div>
				<div class="skill">
					<p>Linux</p>
					<canvas class="ring" data-fill="6" width="100" height="100"></canvas>
				</div>
			</div>
		</div>
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