<?php

// Realiza a solicitação HTTP para o endpoint
$response = file_get_contents('http://192.168.0.252:8800/');
$data = json_decode($response, true);

// Obtém a variável "image" do JSON retornado
$imageData = $data[0]['image']['data'];

// Converter o array de bytes em uma string
$byteString = implode("", array_map("chr", $imageData));

// Converte os dados em uma string base64
$imageBase64 = $byteString;

?>

<!DOCTYPE html>
<html>
<head>
    <title>Exemplo de exibição de imagem com PHP</title>
</head>
<body>

    <?php if (!empty($imageData)): ?>
        <img src="data:image/jpeg;base64, <?php echo $imageBase64; ?>" alt="Imagem">
    <?php else: ?>
        <p>Não foi possível obter a imagem do JSON.</p>
    <?php endif; ?>
</body>
</html>
