<?php

$id = $_GET['id'];
try {
  $pdo = require_once './_.php';
  $stmt = $pdo->prepare('SELECT * FROM `GlobalTest` WHERE `ID` = ?');
  $stmt->execute([$id]);
  $data = $stmt->fetch(PDO::FETCH_ASSOC);
  header('Content-Type: application/json');
  echo json_encode(['message' => 'Retrieved!', 'data' => $data]);
} catch (Exception $e) {
  file_put_contents('debug.log', $e->getMessage());
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['message' => 'Server Error!']);
}
