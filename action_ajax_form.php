<?php

$group = '';
$name = '';
$email ='';
$telegram = '';
$message = '';

if (isset($_POST["name"])) {

	$group = $_POST['group'];
	$name = $_POST['name'];
	$telegram = $_POST['telegram'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$group = trim(urldecode(htmlspecialchars($group)));
	$name = trim(urldecode(htmlspecialchars($name)));
	$telegram = trim(urldecode(htmlspecialchars($telegram)));
	$email = trim(urldecode(htmlspecialchars($email)));
	$message = trim(urldecode(htmlspecialchars($message)));


	$adminEmail = 'example@example.com';
	$message = "Name: {$name}. Telegram: {$telegram}. Email: {$email}. "
		. "Message: '{$message}'";
	$subject = "Theme - {$group}";

	mail($adminEmail, $subject, $message);
}

?>