var forbidden1 = Array();
var forbidden2 = Array();
var forbidden3 = Array();
var forbidden4 = Array();

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

var upl = 0;
function addUploadBar()
{
    upl = upl + 20;
    $("#loadUpB").css('width', upl + '%');
}

function changeBar()
{
	var i1,i2,i3,i4,i5;
	i1 = f1;
	i2 = f2;
	i3 = f3;
	i4 = f4;
	i5 = f5;
	if (i1 >= 10)
		i1 = 10; 
	if (i2 >= 15)
		i2 = 15;
	if (i3 >= 2)
		i3 = 2;
	if (i4 >= 3)
		i4 = 3;
	var y1 = (i1 * 20) / 10;
	var y2 = (i2 * 20) / 15;
	var y3 = (i3 * 20) / 2;
	var y4 = (i4 * 20) / 3;
	var y5 = (i5 * 20) / 38;
	var tot = (y1 + y2 + y3 + y4 + y5);
	tot = round(tot, 1)
	$("#loadB").css('width',tot + '%');
	if (tot > 0)
		$("#loadNr").html(tot + '%');
	else
		$("#loadNr").html('');

	var pad = (96.5 * tot) / 100;
	$('#loadNr').css('padding-left',pad+'%');
}

function changeButton()
{
    var check = $('#checkTrigger').is(':checked');
	if (f1 >= 10 && f2 >= 15 && f3 >= 2 && f4 >= 3 && f5 >= 38 && nameSet && check)
	{
		$("#primButton").removeClass('btn-default');
		$("#primButton").addClass('btn-success');
	}
	else
	{
		$("#primButton").removeClass('btn-success');
		$("#primButton").addClass('btn-default');
	}
	changeBar();
}

function isForb4(x)
{
	for (var i = 0; i < forbidden4.length; i++)
	{
		if(forbidden4[i] == x)
			return 1;
	}
	return 0;
}

function isForb3(x)
{
	for (var i = 0; i < forbidden3.length; i++)
	{
		if(forbidden3[i] == x)
			return 1;
	}
	return 0;
}

function isForb2(x)
{
	for (var i = 0; i < forbidden2.length; i++)
	{
		if(forbidden2[i] == x)
			return 1;
	}
	return 0;
}

function isForb1(x)
{
	for (var i = 0; i < forbidden1.length; i++)
	{
		if(forbidden1[i] == x)
			return 1;
	}
	return 0;
}

var time = 6;
function redirectWaring()
{
	window.setInterval(function(){
		time--;
		if (time === 0)
		{
			window.location.replace ('progress.php');
		}
		else if (time > 0)
		{
			$('#waitingText').text('You will be redirected to the pending page in '+time+' seconds');
		}
	}, 1000);
}

function req5()
{
	var ajaxData = new FormData();
	for (var i = 1; i <= 38; i++)
	{
	    $in = $('#question'+i);
	    ajaxData.append( $in.attr('name'), $in.val());
	    //console.log($in.val());
	}
	$.ajax({
	    url: "upload5.php?token="+service,
	    type: "POST",
	    data: ajaxData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    complete: function(data) {
	    },
	    success: function(data) {
	      //$('#enters').html(data);
	      //req4();
	      //location.reload();
	      addUploadBar();
	      redirectWaring();
	    },
	    error: function() {
	      // Log the error, show an alert, whatever works for you
	      //success = false;
	    }
	});
}

function req4()
{
	var ajaxData = new FormData();
	if (droppedFiles4) 
	{
		console.log(forbidden4);
	    $.each( droppedFiles4, function(i, file) {
	    	if (!isForb4(i))
	    	{
	    		ajaxData.append( $('#file4').attr('name'), file );
	    	}
	    	else
	    	{
	    		console.log(i,file);
	    	}
	    });
	}
	$.ajax({
	    url: "upload4.php?token="+service,
	    type: "POST",
	    data: ajaxData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    complete: function(data) {
	      $form.removeClass('is-uploading');
	    },
	    success: function(data) {
	      //$('#enters').html(data);
	      addUploadBar();
	      req5();
	      //location.reload();
	    },
	    error: function() {
	      // Log the error, show an alert, whatever works for you
	      //success = false;
	    }
	});
}

function req3()
{
	var ajaxData = new FormData();
	if (droppedFiles3) 
	{
		console.log(forbidden3);
	    $.each( droppedFiles3, function(i, file) {
	    	if (!isForb3(i))
	    	{
	    		ajaxData.append( $('#file3').attr('name'), file );
	    	}
	    	else
	    	{
	    		console.log(i,file);
	    	}
	    });
	}
	$.ajax({
	    url: "upload3.php?token="+service,
	    type: "POST",
	    data: ajaxData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    complete: function(data) {
	      $form.removeClass('is-uploading');
	    },
	    success: function(data) {
	      //$('#enters').html(data);
	      req4();
	      addUploadBar();
	    },
	    error: function() {
	      // Log the error, show an alert, whatever works for you
	      //success = false;
	    }
	});
}


function req2()
{
	var ajaxData = new FormData();
	if (droppedFiles2) 
	{
		console.log(forbidden2);
	    $.each( droppedFiles2, function(i, file) {
	    	if (!isForb2(i))
	    	{
	    		ajaxData.append( $('#file2').attr('name'), file );
	    	}
	    	else
	    	{
	    		console.log(i,file);
	    	}
	    });
	}
	$.ajax({
	    url: "upload2.php?token="+service,
	    type: "POST",
	    data: ajaxData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    complete: function(data) {
	      $form.removeClass('is-uploading');
	    },
	    success: function(data) {
	      //$('#enters').html(data);
	      req3();
	      addUploadBar();
	    },
	    error: function() {
	      // Log the error, show an alert, whatever works for you
	      //success = false;
	    }
	});
}

function req1()
{
	var ajaxData = new FormData();
	var nameTrigger = $('#nameTrigger').val();
	if (droppedFiles1) 
	{
		console.log(droppedFiles1);
	    $.each( droppedFiles1, function(i, file) {
	    	if (!isForb1(i))
	    	{
	    		ajaxData.append( $('#file1').attr('name'), file );
	    		console.log(file);
	    	}
	    	else
	    	{
	    		console.log(i,file);
	    	}
	    });
	}
	$.ajax({
	    url: "upload1.php?token="+service+"&nameUsr="+nameTrigger,
	    type: "POST",
	    data: ajaxData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    complete: function(data) {
	      $form.removeClass('is-uploading');
	    },
	    success: function(data) {
	      //$('#enters').html(data);
	      //console.log(droppedFiles1,droppedFiles2,droppedFiles3,droppedFiles4);
	      addUploadBar();
	      req2();
	    },
	    error: function() {
	      // Log the error, show an alert, whatever works for you
	      //success = false;
	    }
	});
}