<?php

    require_once(rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/wp-load.php');
    $id = get_current_user_id();
    if ($id != 0)
    {
        global $wpdb;
        $upload_success = null;
        $upload_error = '';
        
        if (!empty($_FILES['files'])) {
        /*
          the code for file upload;
          $upload_success – becomes "true" or "false" if upload was unsuccessful;
          $upload_error – an error message of if upload was unsuccessful;
        */
        }
        $fetchData = $wpdb->get_results('SELECT * FROM wp_requests WHERE uid='.$id);
        if (!empty($fetchData))
        {
            header("Location: progress.php");
            //echo "Should redirect because the request is pending";fds
        }
    }
    else
    {
        header("Location: //completesoft.ro/wp-admin");
    }
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">


    <title>NVQ Client Upload Page</title>
  </head>
  <body>
      <?php
      $data = get_userdata($id);
      $email = $data->user_email;
      $val = md5($email);
      ?>
      <div class='uploadTime'>
          <div class='row justify-content-center' style='width: 100%'>
            <img src="loading-page.gif" width='300px'>
          </div>
          <div class='row justify-content-center'><p id='waitingText' style='color:#fff; font-size: 1.7em'>Please be patient while the files are uploading to the server...</p></div>
      </div>

    <div class="page-title">
    	<h1 class="titlu">NVQ Client | Upload Page</h1>
    </div>	

    <div class="greetings">
    	<p class="primire">Welcome, <?php echo $data->user_login; ?>!</p>
    </div>	

    <div class="instructions">
    	<p class="instructions-title"><strong>To submit successfully your request, please follow the steps below and monitor your progress with the help of the progress bar on the bottom of the screen. </strong></p>
    	<p class="instructions-txt"><strong>1. Stept One: </strong> Mandatory Unit Questions.</br> Please click on the blue button to open the  Mandatory Unit Questions and please answer all of them as detailed as posible.</p>
    	<p class="instructions-txt"><strong>2. Step Two: </strong> Upload <strong>MINIMUM</strong> 10 photos of your working site;</br>(The accepted formats are: .jpg .jpeg .png)</p>
    	<p class="instructions-txt"><strong>3. Step Three: </strong> Upload <strong>MINIMUM</strong> 15 photos of yourself working / doing your job;</br>(The accepted formats are: .jpg .jpeg .png)</p>
    	<p class="instructions-txt"><strong>4. Step Four: </strong> Upload <strong>MINIMUM</strong> 2 videos of yourself working / doing your job;</br>(The accepted formats are: .mp4 .avi .flv .gif)</p>
    	<p class="instructions-txt"><strong>5. Step Five: </strong> Upload <strong>MINIMUM</strong> 3  scanned work-related documents.</br>(The accepted formats are: .pdf .doc .txt .jpeg .jpg .png)</p>
    	<p class="instructions-txt">While you are completing the steps above, with each action towards finalizing the steps, you will see the progress bar getting full.</p>
    	<p class="instructions-txt">When you finish all the steps, with the minimun requirement at each step, the progress bar should be at 100% and all green.</p>
    	<p class="instructions-txt">Then, you could click on the green "SUBMIT" button to send your request to us.</p>
    	<p class="instructions-txt">Please be patient after clicking the "SUBMIT" button. The upload of all files, might take a few moments.</p>
    	<p class="instructions-txt">After the upload is complete, you will get a message saying that your request has been sent successfully to us, and the you will be redirected to your client "Progress Page" where you will see all the progress your request has made.</p>
    	<p class="instructions-txt">When your request status changes, you will be notified on your email and contacted directly by our staff.</p>
    	<p class="instructions-txt">Thank you for choosing us!</p>
    	<p class="instructions-txt">Have a great day!</p>
    </div>
    
    <!-- End of Instructions ----------------------->
    
    
    <!-- Start of terms and conditions ----------------------->
    
    <?php
// define variables and set to empty values
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
  }
  
  if (empty($_POST["date"])) {
    $dateErr = "Date is required";
  } else {
    $date = test_input($_POST["date"]);
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
<div class="instructions">
<h2>PLEASE READ THE 3 STATEMENTS BELOW</h2>

<p class="instructions-title"><strong>To submit successfully your request, please follow the steps below and monitor your progress with the help of the progress bar on the bottom of the screen. </strong></p>
<p class="instructions-txt"><strong>1. Stept One: </strong> Mandatory Unit Questions.</br> Please click on the blue button to open the  Mandatory Unit Questions and please answer all of them as detailed as posible.</p>
<p class="instructions-txt"><strong>2. Step Two: </strong> Upload <strong>MINIMUM</strong> 10 photos of your working site;</br>(The accepted formats are: .jpg .jpeg .png)</p>
<p class="instructions-txt"><strong>3. Step Three: </strong> Upload <strong>MINIMUM</strong> 15 photos of yourself working / doing your job;</br>(The accepted formats are: .jpg .jpeg .png)</p>


<p><span class="error">* required field</span></p>


<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
  Name: <span class="error">* <?php echo $nameErr;?></span> <input type="text" name="name" id='nameTrigger'>
  <br><br>
  <p class="date-place">Date: <?php echo date("l, F, Y. d/m/Y"); ?></p>
  <br><br>
  <input id='checkTrigger' type="checkbox" name="vehicle1" value="Bike"> <h3><strong>I confirm I have read, understood and agreed the above 3 statements, I have been given an opportunity to ask any questions if unsure.</strong></h3><br>
</form>
</div>    
    
    <!-- End of terms and conditions ----------------------->
    
    <div class="divider">
    	<img src='/wp-content/uploads/2018/08/divider.jpg' style="height: 100px; width: 100%;">
    </div>

      <div class="service-container" data-service="<?php echo $val; ?>">
  	<H3 id='enters'></H3>
  	<form id='boxBack'  method="post" action="upload.php" enctype="multipart/form-data" class='container-fluid'>
  	    
  	    
  	    
  	    
  	    
  	    <!-- Start of questions field --------------------->
        <div class="formular">
        <div class="formular-title">
        	<p><strong>Step One: Mandatory Unit Questions</strong></p>
        </div>	
  	    <label for="question1">1.	State the organisational procedures developed to report and rectify inappropriate information and unsuitable resources and how they are implemented.</label>
        <textarea id="question1" name="question1" placeholder="Your answer is.."></textarea>

        <label for="question2">2.	Describe different types of information, their source and how they are interpreted in relation to:</br>
-	specifications;</br>
-	current legislation;</br>
-	method statements;</br>
-	risk assessments;</br>
-	manufacturers' information.</br>
		</label>
        <textarea id="question2" name="question2" placeholder="Your answer is.."></textarea>

        <label for="question3">3.	Describe their responsibilities under current legislation and official guidance whilst working:</br>
-	in the workplace;</br>
-	at height;</br>
-	in confined areas;</br>
-	with tools and equipment;</br>
-	with movement/storage of materials;</br> 
-	by manual handling.</br>
		</label>
        <textarea id="question3" name="question3" placeholder="Your answer is.."></textarea>

        <label for="question4">4.	Describe the organisational security procedures for tools, equipment and personal belongings in relation to site, workplace, company and operative.</label>
        <textarea id="question4" name="question4" placeholder="Your answer is.."></textarea>

        <label for="question5">5.	State what the accident reporting procedures are and who is responsible for making reports.</label>
        <textarea id="question5" name="question5" placeholder="Your answer is.."></textarea>

        <label for="question6">6.	Explain why, when and how personal protective equipment (PPE) should be used, relating to erecting and dismantling access/working platforms, and the types, purpose and limitations of each type.</label>
        <textarea id="question6" name="question6" placeholder="Your answer is.."></textarea>

        <label for="question7">7.	State how emergencies should be responded to in accordance with organisational authorisation and personal skills when involved with fires, spillages, injuries and other task-related hazards.</label>
		<textarea id="question7" name="question7" placeholder="Your answer is.."></textarea>        

        <label for="question8">8.	State how the resources should be used correctly, how problems associated with the resources are reported and how the organisational procedures are used</label>
        <textarea id="question8" name="question8" placeholder="Your answer is.."></textarea>

        <label for="question9">9.	Outline potential hazards associated with the resources and method of work.</label>
        <textarea id="question9" name="question9" placeholder="Your answer is.."></textarea>

        <label for="question10">10.	Describe how to protect work from damage and the purpose of protection in relation to general workplace activities, other occupations and adverse weather conditions.</label>
        <textarea id="question10" name="question10" placeholder="Your answer is.."></textarea>

        <label for="question11">11.	State why the disposal of waste should be carried out in relation to the work.</label>
        <textarea id="question11" name="question11" placeholder="Your answer is.."></textarea>

        <label for="question12">12.	State the purpose of the work programme and explain why deadlines should be kept in relation to: organisational procedures for reporting circumstances which will affect the work programme.</label>
        <textarea id="question12" name="question12" placeholder="Your answer is.."></textarea>

        <label for="question13">13.	State the needs of other occupations and how to communicate within a team when erecting and dismantling access/working platforms</label>
        <textarea id="question13" name="question13" placeholder="Your answer is.."></textarea>

        <label for="question14">14.	Describe how to maintain the tools and equipment used when erecting and dismantling access/working platforms</label>
        <textarea id="question14" name="question14" placeholder="Your answer is.."></textarea>

        <label for="question15">15.	State why and when health and safety control equipment, identified by the principles of protection, should be used relating to types, purpose and limitations of each type, the work situation, occupational use and the general work environment, in relation to:</br>
-	collective protective measures;</br>
-	personal protective equipment (PPE);</br>
-	respiratory protective equipment (RPE);</br>
-	local exhaust ventilation (LEV);</br>
		</label>
        <textarea id="question15" name="question15" placeholder="Your answer is.."></textarea>

        <label for="question16">16.	State how the health and safety control equipment relevant to the work should be used in accordance with the given instructions.</label>
        <textarea id="question16" name="question16" placeholder="Your answer is.."></textarea>

        <label for="question17">17.	State which types of health, safety and welfare legislation, notices and warning signs are relevant to the occupational area and associated equipment.</label>
        <textarea id="question17" name="question17" placeholder="Your answer is.."></textarea>

        <label for="question18">18.	State why health, safety and welfare legislation, notices and warning signs are relevant to the occupational area.</label>
        <textarea id="question18" name="question18" placeholder="Your answer is.."></textarea>

        <label for="question19">19.	State how to comply with control measures that have been identified by risk assessments and safe systems of work.</label>
        <textarea id="question19" name="question19" placeholder="Your answer is.."></textarea>

        <label for="question20">20.	List typical hazards associated with the work environment and occupational area in relation to resources, substances, asbestos, equipment, obstructions, storage, services and work activities.</label>
        <textarea id="question20" name="question20" placeholder="Your answer is.."></textarea>

        <label for="question21">21.	List the current Health and Safety Executive top ten safety risks.</label>
        <textarea id="question21" name="question21" placeholder="Your answer is.."></textarea>

        <label for="question22">22.	List the current Health and Safety Executive top five health risks:</label>
        <textarea id="question22" name="question22" placeholder="Your answer is.."></textarea>

        <label for="question23">23.	State the organisational policies and procedures for health, safety and welfare, in relation to:</br>
-	dealing with accidents and emergencies associated with the work and environment;</br>
-	methods of receiving or sourcing information;</br>
-	reporting;</br>
-	stopping work;</br>
-	evacuation;</br>
-	fire risks and safe exit procedures;</br>
-	consultation and feedback;</br>
		</label>
        <textarea id="question23" name="question23" placeholder="Your answer is.."></textarea>

        <label for="question24">24.	State the appropriate types of fire extinguishers relevant to the work:</label>
        <textarea id="question24" name="question24" placeholder="Your answer is.."></textarea>

        <label for="question25">25.	State how and when the different types of fire extinguishers are used in accordance with legislation and official guidance:</label>
        <textarea id="question25" name="question25" placeholder="Your answer is.."></textarea>

        <label for="question26">26.	State how personal behaviour demonstrates responsibility for general workplace health, safety and welfare, in relation to:</br>
-	recognising when to stop work in the face of serious and imminent danger to self and/or others;</br>
-	contributing to discussions and providing feedback;</br>
-	reporting changed circumstances and incidents in the workplace;</br>
-	complying with the environmental requirements of the workplace;</br>
		</label>
        <textarea id="question26" name="question26" placeholder="Your answer is.."></textarea>

        <label for="question27">27.	Give examples of how the behaviour and actions of individuals could affect others within the workplace:</label>
        <textarea id="question27" name="question27" placeholder="Your answer is.."></textarea>

        <label for="question28">28.	State how security arrangements are implemented in relation to the workplace, the general public, site personnel and resources:</label>
        <textarea id="question28" name="question28" placeholder="Your answer is.."></textarea>

        <label for="question29">29.	Describe the different methods of communicating with line management, colleagues, and customers:</label>
        <textarea id="question29" name="question29" placeholder="Your answer is.."></textarea>

        <label for="question30">30.	Describe how to use different methods of communication to ensure that the work carried out is productive:</label>
        <textarea id="question30" name="question30" placeholder="Your answer is.."></textarea>

        <label for="question31">31.	Describe how organisational procedures are applied to ensure work is planned and carried out productively, in relation to:</br>
-	using resources for own and other’s work requirements;</br>
-	allocating appropriate work to employees;</br>
-	organising the work sequence;</br>
-	reducing carbon emissions;</br>
		</label>
        <textarea id="question31" name="question31" placeholder="Your answer is.."></textarea>

        <label for="question32">32.	Describe how to contribute to zero/low carbon work outcomes within the built environment:</label>
        <textarea id="question32" name="question32" placeholder="Your answer is.."></textarea>

        <label for="question33">33.	Describe how to complete and maintain documentation in accordance with organisational procedures, in relation to:</br>
-	job cards;</br>
-	worksheets;</br>
-	material/resource lists;</br>
-	time sheets;</br>
		</label>
		<textarea id="question33" name="question33" placeholder="Your answer is.."></textarea>

        <label for="question34">34.	Explain the reasons for ensuring documentation is completed clearly and within given timescales:</label>
        <textarea id="question34" name="question34" placeholder="Your answer is.."></textarea>

        <label for="question35">35.	Describe how to maintain good working relationships, in relation to:</br>
-	individuals;</br>
-	customer and operative;</br>
-	operative and line management;</br>
-	own & other occupations;</br>
		</label>
		<textarea id="question35" name="question35" placeholder="Your answer is.."></textarea>

        <label for="question36">36.	Describe why it is important to work effectively with line management, colleagues, and customers:</label>
        <textarea id="question36" name="question36" placeholder="Your answer is.."></textarea>

        <label for="question37">37.	Describe how working relationships could have an effect on productive working:</label>
        <textarea id="question37" name="question37" placeholder="Your answer is.."></textarea>

        <label for="question38">38.	Describe how to apply principles of equality and diversity when communicating and working with others:</label>
        <textarea id="question38" name="question38" placeholder="Your answer is.."></textarea>
        </div>
  	    <!-- End of questions field ----------------------->
  	    
  	    
  	    
  	   <!-- End of fixed footer ----------------------->
  	   <div class="fixed-footer">
            <div class="row justify-content-center">
                <div id='primButton' class='btn btn-secondary col-md-3 box__button' onClick="subButton($form)">SUBMIT</div>
            </div>
            <div class="row">
                <div class="col-10 offset-1 loadingContainer">
                  <div class="row">
                    <div class="col-1">0%</div>
                    <div class="col-10 pro-bar">Progress Bar</div>
                    <div class="col-1" style='text-align: right'>100%</div>
                  </div>
                    <div class='emptyCont'>
                        <div id='loadB' class="loadBar">
                        <div id='loadUpB'></div>
                        </div>
                    </div><p id='loadNr' style='margin-bottom:0px'></p>
                </div>
                <div class="col-1">
                    <div id='loadingGif' style='width: 50px; height: 50px;background-size: cover;'></div>
                </div>
            </div>
        </div>
        <!-- End of fixed footer ----------------------->
        
        
	  	<div class="row justify-content-center">
	  		<div class="btn btn-info" onclick='showForm()'><p><strong>Step One: Mandatory Unit Questions</strong></p><img id='btn-arrow' src="angle-up.svg" width='50px'><p><strong id="open-questions">Click to open</strong></p></div>
	  	</div>
	  	<div class="">
	  		<p></p>
	  	</div>
	  	<div class="row justify-content-center" style='margin-bottom: 150px'>

	  		<!-- First form container ------------------------>
	  		<div class="col-md-2" id='1st'>
	  			<p class="step-title"><strong>Step Two:</strong></p>
	  			<p class="step-subtitle">Upload <strong>MINIMUM</strong> 10 photos of your working site;</br>(The accepted formats are: .jpg .jpeg .png)</p>
	  			<p id='firstReq'>0/10 Images</p>
	  			<div class='box' id='form1'>
	  				<?php if ($upload_success === null): ?>
						<div class="box__input">
							<input style='display:none' class="box__file1" type="file" name="files1[]" id="file1" data-multiple-caption="{count} files selected" multiple />
							<label for="file1" class='row justify-content-center'><p><strong>Choose a file</strong></br><span class="box__dragndrop"> or drag it here</span></p></label>
						</div>
					<?php endif; ?>
					<div class="box__uploading">Uploading&hellip;</div>
					<div class="box__success"<?php if( $upload_success === true ): ?> style="display: block;"<?php endif; ?>>Done!</div>
					<div class="box__error"<?php if( $upload_success === false ): ?> style="display: block;"<?php endif; ?>>Error! <span><?=$upload_error?></span></div>
				</div>
			</div>
			<!-- First form container ------------------------>

			<!-- Second form container ------------------------>
			<div class="col-md-2" id='2nd'>
				<p class="step-title"><strong>Step Three:</strong></p>
				<p class="step-subtitle">Upload <strong>MINIMUM</strong> 15 photos of yourself working / doing your job; (formats: .jpg .jpeg .png)</p>
	  			<p id='secondReq'>0/15 Images</p>
	  			<div class='box' id='form2'>
	  				<?php if ($upload_success === null): ?>
						<div class="box__input">
							<input style='display:none' class="box__file2" type="file" name="files2[]" id="file2" data-multiple-caption="{count} files selected" multiple />
							<label for="file2" class='row justify-content-center'><p><strong>Choose a file</strong></br><span class="box__dragndrop"> or drag it here</span></p></label>
						</div>
					<?php endif; ?>
					<div class="box__uploading">Uploading&hellip;</div>
					<div class="box__success"<?php if( $upload_success === true ): ?> style="display: block;"<?php endif; ?>>Done!</div>
					<div class="box__error"<?php if( $upload_success === false ): ?> style="display: block;"<?php endif; ?>>Error! <span><?=$upload_error?></span></div>
				</div>
			</div>
			<!-- Second form container ------------------------>

			<!-- Third form container ------------------------>
			<div class="col-md-2" id='3rd'>
				<p class="step-title"><strong>Step Four:</strong></p>
				<p class="step-subtitle">Upload <strong>MINIMUM</strong> 2 videos of yourself working / doing your job; (formats:: .mp4 .avi .flv .gif)</p>
	  			<p id='3rdReq'>0/2 Videos</p>
	  			<div class='box' id='form3'>
	  				<?php if ($upload_success === null): ?>
						<div class="box__input">
							<input style='display:none' class="box__file3" type="file" name="files3[]" id="file3" data-multiple-caption="{count} files selected" multiple />
							<label for="file3" class='row justify-content-center'><p><strong>Choose a file</strong></br><span class="box__dragndrop"> or drag it here</span></p></label>
						</div>
					<?php endif; ?>
					<div class="box__uploading">Uploading&hellip;</div>
					<div class="box__success"<?php if( $upload_success === true ): ?> style="display: block;"<?php endif; ?>>Done!</div>
					<div class="box__error"<?php if( $upload_success === false ): ?> style="display: block;"<?php endif; ?>>Error! <span><?=$upload_error?></span></div>
				</div>
			</div>
			<!-- Third form container ------------------------>

			<!-- Third form container ------------------------>
			<div class="col-md-2" id='4th'>
				<p class="step-title"><strong>Step Five:</strong></p>
				<p class="step-subtitle">Upload <strong>MINIMUM</strong> 3 scanned work-related documents. (formats: .pdf .doc .txt .jpeg .jpg .png)</p>
	  			<p id='4thReq'>0/3 Documents</p>
	  			<div class='box' id='form4'>
	  				<?php if ($upload_success === null): ?>
						<div class="box__input">
							<input style='display:none' class="box__file4" type="file" name="files4[]" id="file4" data-multiple-caption="{count} files selected" multiple />
							<label for="file4" class='row justify-content-center'><p><strong>Choose a file</strong></br><span class="box__dragndrop"> or drag it here</span></p></label>
						</div>
					<?php endif; ?>
					<div class="box__uploading">Uploading&hellip;</div>
					<div class="box__success"<?php if( $upload_success === true ): ?> style="display: block;"<?php endif; ?>>Done!</div>
					<div class="box__error"<?php if( $upload_success === false ): ?> style="display: block;"<?php endif; ?>>Error! <span><?=$upload_error?></span></div>
				</div>
			</div>
			<!-- Third form container ------------------------>
		</div>
  	</form>
    <script src='js/jquery-3.3.1.js'></script>
    <script type="text/javascript">
        var nameSet = 0;
    	var f1 = 0;
    	var t1 = 0;
    	var f2 = 0;
    	var t2 = 0;
    	var f3 = 0;
    	var t3 = 0;
    	var f4 = 0;
    	var t4 = 0;
    	var f5 = 0;
		var droppedFiles1 = false;
		var droppedFiles2 = false;
		var droppedFiles3 = false;
		var droppedFiles4 = false;
		var $form = $('#boxBack');
		var service;
		var submitted = 0;
        var shown = 0;
        $(document).ready(function() {
            //set initial state.
            $('#checkTrigger').val(this.checked);
        
            $('#checkTrigger').change(function() {
                changeButton();
            });
        });
        $('#nameTrigger').keyup(function(e)
        {
        	if ($('#nameTrigger').val())
        	{
        		if (nameSet === 0)
        		{
        			nameSet = 1;
        		}
        	}
        	else
        	{
        		if (nameSet === 1)
        		{
        			nameSet = 0;
        		}
        	}
        	changeButton();
        });
        function showForm()
        {
            $btn = $('#btn-arrow');
            $form = $('.formular');
            if (shown === 0)
            {
                shown = 1;
                $form.css('display','block');
                $btn.css('transform','rotate(0deg)');
                $('.btn-info').css('margin-top','30px');
                $('#open-questions').text('Click to close');
            }
            else
            {
                shown = 0;
                $form.css('display','none');
                $btn.css('transform','rotate(90deg)');
                $('.btn-info').css('margin-top','0px');
                $('#open-questions').text('Click to open');
            }
        }
        function subButton()
        {
            var check = $('#checkTrigger').is(':checked');
            console.log(check);
        	if (f1 >= 10 && f2 >= 15 && f3 >= 2 && f4 >= 3 && nameSet && check)
        	{
        	    if (submitted == 0)
        	    {
        	        submitted=1;
        		    $form.trigger('submit');
        		    $('#loadingGif').css('background-image','url(loading.gif)');
                    $('.uploadTime').css('display','block');
        	    }
        	}
        }
		$(document).ready(function() {
            service = $('.service-container').data('service');
        });
        </script>
    <script src='ajaxReq.js'></script>
    <script type="text/javascript">
		$form.on('submit', function(e) {
			if ($form.hasClass('is-uploading')) return false;
	 				$form.addClass('is-uploading').removeClass('is-error');
			e.preventDefault();
			req1();
		});
    </script>
	<script src='form1.js'></script>
    <script src='form2.js'></script>
    <script src='form3.js'></script>
    <script src='form4.js'></script>
    <script src='form5.js'></script>
  </body>
</html>