<?php
	$text = $_POST['textArea'];
	$subject = $_POST['subject'];
	$email = $_POST['email'];
	$name = $_POST['name'];
	
	mail("jfazekas@emich.edu", $subject, $text . "\nFrom: " . $name .
		" at ".$email);
?>

<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="stylesheet.css">
    <title>Joseph Fazekas</title>
</head>
<body>
    <div>
        <h1>Contact the Webmaster</h1>
		<p class="smallBlock"> 
		Email: <a href="mailto:jfazekas@emich.edu">
		jfazekas@emich.edu</a><br><br>
		Or come harass me in Pray-Harrold on Mondays and 
		Wednesdays.</p>
		<h2> Alternative Contact Form </h2>
		<form class="smallBlock" method="POST" action="contact.php">
			<p>
			Subject:<br><input name="subject" type="text" /></br>
			Enter your comment:<br>
			<textarea name="textArea" rows="5" cols="40" value="Type your comments here."></textarea></br>
			Your Email:<br><input name="email" type="text" /></br>
			Your Name:<br><input name="name" type="text" /></br></p>
			<input type="submit" name="submit" value="Submit">
		</form>
		<br>
		</div>
</body>
</html>
