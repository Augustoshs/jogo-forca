<?php
require_once __DIR__ . '/../db/Database.php';

class Word {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function addWord($word) {
        $stmt = $this->db->getPDO()->prepare("INSERT INTO words (word) VALUES (:word)");
        $stmt->bindParam(':word', $word);
        return $stmt->execute();
    }

    public function getRandomWord() {
        $stmt = $this->db->getPDO()->query("SELECT * FROM words ORDER BY RANDOM() LIMIT 1");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
