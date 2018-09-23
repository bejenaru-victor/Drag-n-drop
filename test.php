<?php

    require_once 'dompdf/autoload.inc.php';
    // reference the Dompdf namespace
    use Dompdf\Dompdf;
    
    echo "test";
    $tosend = '';
    for ($i = 0; $i <= 40; $i++)
    {
        $tosend .= "<h2>Hello world</h2>";
    }
    // instantiate and use the dompdf class
    $dompdf = new Dompdf();
    $dompdf->loadHtml($tosend);
    
    // (Optional) Setup the paper size and orientation
    $dompdf->setPaper('A4', 'landscape');
    
    // Render the HTML as PDF
    $dompdf->render();
    
    // Output the generated PDF to Browser
    //$dompdf->stream();
    $output = $dompdf->output();
    file_put_contents('randrand.pdf', $output);