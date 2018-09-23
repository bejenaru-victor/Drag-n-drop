<?php

require_once(rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/wp-load.php');
$uid = get_current_user_id();

if (!empty($_FILES['files2']) && $uid && isset($_GET['token'])) {
    $userpower = get_user_meta($uid, 'wp_user_level');
    $token = $_GET['token'];
    $userpower = $userpower[0];
    echo $token;
    $files = $_FILES['files2'];
    $uploaded = array();
    $failed = array();

    $allowed = array('jpg', 'jpeg', 'png');
    mkdir('uploads/'.$token.'/form2');
    foreach ($files['name'] as $position => $file_name)
    {
      $file_tmp = $files['tmp_name'][$position];
      $file_size = $files['size'][$position];
      $file_error = $files['error'][$position];

      $file_ext = explode('.',$file_name);
      $tmp;
      foreach ($file_ext as $last)
      {
        $tmp = $last;
      }
      $file_ext = $tmp;

      if (in_array($file_ext, $allowed))
      {
        if($file_error === 0)
        {
          if($file_size <= 2097152)
          {
            $file_name_new = uniqid('', true).'.'.$file_ext;
            $file_destination = 'uploads/'.$token.'/form2/'.$file_name_new;

            if(move_uploaded_file($file_tmp, $file_destination))
            {
              $uploaded[$position] = $file_destination;
            }
            else
              $failed[$position] = "[{$file_name}] failed to upload";
          }
          else
            $failed[$position] = "[$file_name] is too large.";
        }
        else
          $failed[$position] = "[$file_name] errored with code";
      }
      else
        $failed[$position] = "[{$file_name}] file extension '{$file_ext}' is not allowed";
    }

    if (!empty($uploaded))
    {
      //print_r($uploaded);
      //echo "<br>";
    }
    if(!empty($failed))
    {
      //print_r($failed);
      //echo "<br>";
    }
  }
  else
  {
    echo "isEmpty<br>";
  }
?>