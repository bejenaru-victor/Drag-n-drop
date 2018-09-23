<?php
use Dompdf\Dompdf;

require_once 'dompdf/autoload.inc.php';
require_once(rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/wp-load.php');

$id = get_current_user_id();

if(isset($_GET['token']) && $id > 0)
{
    $data = get_userdata($id);
    $email = $data->user_email;
    $token = $_GET['token'];
    $isall = 1;
    $data='';
    //isworking
    for ($i = 1; $i <=38; $i++)
    {
        if (isset($_POST["question$i"]))
        {
            $q = $_POST["question$i"];
            $data .= $q."<br>";
            //echo "$q<br>";
        }
        else
            $isall = 0;
    }
    
    // instantiate and use the dompdf class
    $dompdf = new Dompdf();
    $dompdf->loadHtml($data);
    
    // (Optional) Setup the paper size and orientation
    $dompdf->setPaper('A4', 'landscape');
    
    // Render the HTML as PDF
    $dompdf->render();
    $output = $dompdf->output();
    file_put_contents("uploads/".$token.'/'.$email.'_'.$token.'.pdf', $output);
    
    $rootPath = realpath("uploads/$token");

    // Initialize archive object
    $zip = new ZipArchive();
    $zip->open("uploads/".$token.'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($rootPath),RecursiveIteratorIterator::LEAVES_ONLY);
    foreach ($files as $name => $file)
    {
        // Skip directories (they would be added automatically)
        if (!$file->isDir())
        {
            // Get real and relative path for current file
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);
    
            // Add current file to archive
            $zip->addFile($filePath, $relativePath);
        }
    }
    // Zip archive will be created only after closing object
    $zip->close();
    $dir = 'uploads/'.$token;
    $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
    $files = new RecursiveIteratorIterator($it,RecursiveIteratorIterator::CHILD_FIRST);
    foreach($files as $file) {
        if ($file->isDir()){
            rmdir($file->getRealPath());
        } else {
            unlink($file->getRealPath());
        }
    }
    rmdir($dir);
}