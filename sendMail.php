<?php

require('SendMail/PHPMailerAutoload.php');

if(isset($_POST['LEAD'])){

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

//$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'israelcruzibarra@gmail.com';                 // SMTP username
$mail->Password = 'Colita084952';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->setFrom('notreply@monitoreando.com', 'Monitoreando Service Update');
$mail->addAddress('icruz@gmtnorthamerica.com','Lorenzo');     // Add a recipient


$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Se Te Requiere en la Sala 1!';
$mail->Body    = 'Hay Problemas en la Sala 1, Se te requiere de manera <b>Urgente</b> <br><br> Att. El Equipo de Monitoreando';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
}