<?php
class Database {
    private $pdo;

    public function __construct($dbFilePath) {
        $dsn = 'sqlite:' . $dbFilePath;
        try {
            $this->pdo = new PDO($dsn);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function getPDO() {
        return $this->pdo;
    }
}

$db = new Database(__DIR__ . '/database.db');

$query = "
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL
    )
";
$db->getPDO()->exec($query);
?>
