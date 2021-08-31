<?php
header('Content-Type: application/json; charset=utf-8');
header('HTTP/1.1 200');
echo json_encode(['status' => 200, 'result' => true], false);
die();