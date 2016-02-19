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
			$(window).resize(function () {
				$(".skill p").center();
			});
		});
		$(window).load(function () {
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

			<div class="col-md-4">
				<a href="mailto:mike.pors@gmail.com"><span class="glyphicon glyphicon-envelope"></span> mike.pors@gmail.com</a>
			</div>
			<div class="col-md-4">
				<a href="tel:403-477-9974"><span class="glyphicon glyphicon-phone"></span> 403-477-9974</a>
			</div>
			<div class="col-md-4">
				<a href="files/MikePorsResume.pdf"><span class="glyphicon glyphicon-download"></span> PDF</a>
			</div>

		</div>
	</header>
	<div class="container">
		<div class="col-lg-6 col-sm-12" id="bio">
			<h3>Summary</h3>
			<p>Entry level java developer with one year of IT experience and a deep understanding of development best practices. A proven leader, excelling in time management and interpersonal relations, has demonstrated the ability to excel in both individual tasks as well as group projects.
			</p>
			<p>An individual with an affinity for self-directed study, excelling in fast-paced work environments. Flexible and analytical with a keen eye for details; skilled at synthesizing and editing information to achieve overall objectives.
			</p>
		</div>

		<?php include("fragments/certs.php"); ?>
			<?php include("fragments/rings.php"); ?>


				<div class="col-lg-6 col-sm-12">
					<h3>History</h3>
					<ul>
						<li>
							<p>Andoid App Development <span class="red">2015-2016</span>
								<br /> <span class="small">Department of Psychology - Foothills Medical Centre</span></p>
						</li>
						<li>
							<p>Graduate Student Researcher <span class="red">2012-2015</span>
								<br /> <span class="small">Department of Math and Stats - University of Calgary</span></p>
						</li>
						<li>
							<p>Teaching Assistant <span class="red">2011-2014</span>
								<br /> <span class="small">Department of Math and Stats - University of Calgary</span></p>
						</li>
						<li>
							<p>Undergraduate Research Assistant <span class="red">2012</span>
								<br /> <span class="small">Department of Math and Stats - University of Calgary</span></p>
						</li>
						<li>
							<p>Undergraduate Research Assistant <span class="red">2011</span>
								<br /> <span class="small">Department of Philosophy - University of Calgary</span></p>
						</li>
					</ul>
				</div>

				<div class="col-lg-6 col-sm-12">
					<h3>Awards</h3>
					<ul>
						<li>
							<p>Eric Milner Prize <span class="red">2012-2013</span>
								<br /> <span class="small">Award recognizing "not only expertise in mathematics, but also a capacity to share that expertise with others".</span></p>
						</li>
						<li>
							<p>3MT Competition (3rd Place) <span class="red">2014</span>
								<br /> <span class="small">Awarded to the graduate student who can present the best thesis topic in three minutes or less to a lay audience.</span></p>
						</li>
						<li>
							<p>NSERC CGS-M <span class="red">2013-2014</span>
								<br /> <span class="small">Competitive federal award granted to a Canadian master's student who is studying the natural sciences or engineering.</span></p>
						</li>
						<li>
							<p>Queen Elizabeth II Graduate Scholarship <span class="red">2012-2014</span>
								<br /> <span class="small">Prestegious provincial award for academic excellence at the masters or doctoral levels of study.</span></p>
						</li>
						<li>
							<p>Graduate Teaching Excellence Award <span class="red">2012</span>
								<br /> <span class="small">Award based on student feedback at the end of each semester.</span></p>
						</li>
					</ul>
				</div>
	</div>
	<footer class="footer">
		<div class="container">
			<p class="small col-xs-4"><a href="mailto:mike.pors@gmail.com">mike.pors@gmail.com</a></p>
			<p class="small col-xs-4 text-center">&copy; 2016 Mike Pors, StunningWeb</p>
			<div class="col-xs-4 text-right">
				<a href="https://github.com/MikePors" target="_blank"><img class="foot_img img-responsive" src="img/gitHub.png"></a>
				<a href="https://www.linkedin.com/in/michaelpors" target="_blank"><img class="foot_img img-responsive" src="img/linkedIn.png"></a>
				<a href="https://www.codeeval.com/profile/Mike.Pors/" target="_blank"><img class="foot_img img-responsive" id="code_eval" src="img/codeEval.png" </a>

			</div>

		</div>
	</footer>

</body>

</html>