<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

include_once '../../atfd.config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = $input ? $input : null;
    if ($data) {
        $stmt = $pdo->prepare("INSERT INTO rvp (post, IP) VALUES (:data, :IP)");
        $stmt->execute(['data' => $data, 'IP' => $_SERVER['REMOTE_ADDR']]);
        header('HTTP/1.1 200 OK');
        echo json_encode(['success' => true]);
        ob_end_clean();
        header('Content-Length: ' . strlen(json_encode(['success' => true])));
        header('Connection: Close');
        flush();

        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }

        // Send email notification
        $to = 'info@allthingsfiredoors.com';
        $subject = 'New Contact Form Submission';
        $message = "A new form has been submitted:\n\n" . json_encode(json_decode($data, true), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $headers = "From: noreply@allthingsfiredoors.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        mail($to, $subject, $message, $headers);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
