<?php
    require_once(rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/wp-load.php');
    $id = get_current_user_id();
    global $wpdb;
    $obj = $wpdb->get_results("SELECT * FROM wp_requests WHERE uid=$id");
    if (empty($obj))
        header('Location: index.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>NVQ - Soft</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="viewport" content="width=device-width, initial-scale=0">
<link rel="stylesheet" href="//completesoft.ro/nvq/main.css">
</head>

<body>
<header>
  <h2>NVQ | Soft </h2>
</header>

<section>
  <nav>
    <ul class="menu">
      <li class="unitate-meniu"><a href="http://www.completesoft.ro/wp-login.php?action=logout&amp;redirect_to=http%3A%2F%2Fwww.completesoft.ro%2Flanguage%2Fro%2Fro%2F&amp;_wpnonce=d7dd2d7078">Log Out</a></li>
    </ul>
  </nav>
  
  <article>
    <div class="continut">
<?php
        $stage = $obj[0]->verified;
        $admin = 'Pending';
        $commissioner = 'Pending';
        if ($stage >= 1)
            $admin = 'Approved';
        if ($stage >= 2)
            $commissioner = 'Approved';
        echo "<p>All of your documents have been sent successfully to us! <img src='/wp-content/uploads/2018/08/green.png'></p>";
        echo "<p>Assessor's approvement status: ".$admin."</p>";
        if ($stage >= 1)
        	echo "<p>All of your documents have been submitted by us to get IQA approval! <img src='/wp-content/uploads/2018/08/green.png'></p>";
        echo "<p>Commissioner approvement: ".$commissioner."</p>";
?>
    </div>
  </article>
</section>

<footer>
  <p>2018 | NVQ © Soft</p>
</footer>

</body>
</html>