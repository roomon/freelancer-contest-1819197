<?php

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$shouldInsert = true;
foreach ($data as $x) {
  if (empty($x)) {
    $shouldInsert = false;
    break;
  }
}
if ($shouldInsert) {
  try {
    $pdo = require_once './_.php';
    $stmt = $pdo->prepare('INSERT INTO `GlobalTest` (`ParagraphOne`, `SectionOne`, `ParagraphTwo`, `SectionTwo`, `ParagraphThree`, `SectionThree`) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute($data);
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Inserted!']);
  } catch (Exception $e) {
    file_put_contents('debug.log', $e->getMessage());
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Server Error!']);
  }
} else {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(['message' => 'Not Inserted!']);
};
