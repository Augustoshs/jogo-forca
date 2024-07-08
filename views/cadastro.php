<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Palavras</title>
    <link rel="stylesheet" href="../css/cadastro.css">
</head>
<body>
    <div class="container">
        <h1>Cadastro de Palavras</h1>
        <form action="../models/data.php?action=cadastrar" method="POST">
            <input type="text" placeholder="Palavra" name="word" required>
            <button type="submit">Salvar</button>
        </form>
    </div>
</body>
</html>
