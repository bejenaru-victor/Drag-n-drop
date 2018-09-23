function removeItem3(x)
{
	$("#upl-3-"+x).css('display','none');
	forbidden3.push(x);
	updateCount3();
}

function updateCount3()
{
	f3--;
	$('#3rdReq').html(f3+"/2 videoclipuri");
    if (f3 >= 2)
    	$('#3rdReq').css('color', 'green');
    changeButton();
}

function approved_extension3(ext)
{
	var approved = Array("mp4","mkv","avi","gif","flv");
	console.log(approved);
	for (var i = 0; i < approved.length; i++)
	{
		if (ext === approved[i])
		{
			console.log(ext, approved[i]);
			return true;
		}
	}
	return false;
}

function ft_exist3(val, tmp, k)
{
	console.log("Get's there");
	var exist = 0;
	var vname = val.name;
	var vsize = val.size;
	jQuery.each(droppedFiles3, function(i, item)
	{
		if (!isForb3(i))
		{
			var n = item.name;
			var s = item.size;
			console.log(vname+" - "+n);
			console.log(vsize+" - "+s);
			if (vsize == s && vname === n)
				exist = 1;
		}
	});
	for (var i = 0; i < k; i++)
	{
		var n = tmp[i].name;
		var s = tmp[i].size;
		console.log(vname+" - "+n);
		console.log(vsize+" - "+s);
		if (vsize == s && vname === n)
			exist = 1;
	}
	return exist;
}

var isAdvancedUpload = function() {
var div = document.createElement('div');
	return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();
if (isAdvancedUpload) {
	$form.find('.box').addClass('has-advanced-upload');
	//Show files
	var $input    = $form.find('.box__file3'),
    $label    = $form.find('label'),
    showFiles3 = function(files) {
    	f3 = files.length-forbidden3.length;
    	$('#3rdReq').html(f3+"/2 videoclipuri");
    	if (f3 >= 2)
    		$('#3rdReq').css('color', 'green');
    	changeButton();
    };
	// / Show files
		$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	});
	$form.find('#form3').on('dragover dragenter', function() {
		$form.find('#form3').addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
	  $form.find('#form3').removeClass('is-dragover');
	});
	$form.find('#form3').on('drop', function(e) {
		//droppedFiles1 = e.originalEvent.dataTransfer.files; // the files that were dropped
		var tmp = e.originalEvent.dataTransfer.files;
		var badFiles = '\n';
		var isBad = 0;
		var badSize = '\n';
	  	var isBadSize = 0;
	  	var badDuplicate = '\n';
	  	var isBadDuplicate = 0;
		jQuery.each(tmp, function(i, val)
		{
			var explode = val.name.split(".");
			var ext = explode[explode.length-1];
			console.log(ext);
			if (approved_extension3(ext) && val.size <= 3145728 && !ft_exist3(val, tmp, i))
				$('#3rd').append("<div id='upl-3-"+(i+t3)+"'><p>"+val.name+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem3("+(i+t3)+")'>Remove item</div></div>");
			else
			{
				forbidden3.push(i+t3);
				if(!approved_extension3(ext))
				{
					isBad = 1;
					badFiles =badFiles+tmp[i].name+'\n';
				}
				else if (val.size > 3145728)
				{
					isBadSize = 1;
					badSize = badSize + tmp[i].name+'\n';
				}
				else
				{
					isBadDuplicate = 1;
					badDuplicate = badDuplicate + tmp[i].name+'\n';
				}
			}
		});
		if (isBad == 1)
		    alert("Ati incercat sa introduceti tipuri de fisiere necompatibile la campul ales. Urmatoarele fisiere nu au fost adaugate: "+badFiles);
		if (isBadSize == 1)
		    alert("Ati incercat sa introduceti fisiere de marime mai mare decat limita de 3mb. Urmatoarele fisiere nu au fost adaugate: "+badSize);
		if (isBadDuplicate == 1)
		    alert("Ati incercat sa introduceti aceleasi fisiere de mai multe ori. Urmatoarele fisiere nu au fost adaugate: "+badDuplicate);
		console.log(tmp);
		var tmp2 = droppedFiles3;
		droppedFiles3 = $.merge($.merge([],tmp2), tmp);
		t3 = droppedFiles3.length;
		console.log(droppedFiles3);
		showFiles3(droppedFiles3);
	});
	$("#file3").on('change', function(e) {
	  //showFiles3(e.target.files);
	  var tmp = e.target.files;
	  var badFiles = '\n';
		var isBad = 0;
		var badSize = '\n';
	  	var isBadSize = 0;
	  	var badDuplicate = '\n';
	  	var isBadDuplicate = 0;
		jQuery.each(tmp, function(i, val)
		{
			var explode = val.name.split(".");
			var ext = explode[explode.length-1];
			console.log(ext);
			if (approved_extension3(ext) && val.size <= 3145728 && !ft_exist3(val, tmp, i))
				$('#3rd').append("<div id='upl-3-"+(i+t3)+"'><p>"+val.name+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem3("+(i+t3)+")'>Remove item</div></div>");
			else
			{
				forbidden3.push(i+t3);
				if(!approved_extension3(ext))
				{
					isBad = 1;
					badFiles =badFiles+tmp[i].name+'\n';
				}
				else if (val.size > 3145728)
				{
					isBadSize = 1;
					badSize = badSize + tmp[i].name+'\n';
				}
				else
				{
					isBadDuplicate = 1;
					badDuplicate = badDuplicate + tmp[i].name+'\n';
				}
			}
		});
		if (isBad == 1)
		    alert("Ati incercat sa introduceti tipuri de fisiere necompatibile la campul ales. Urmatoarele fisiere nu au fost adaugate: "+badFiles);
		if (isBadSize == 1)
		    alert("Ati incercat sa introduceti fisiere de marime mai mare decat limita de 3mb. Urmatoarele fisiere nu au fost adaugate: "+badSize);
		if (isBadDuplicate == 1)
		    alert("Ati incercat sa introduceti aceleasi fisiere de mai multe ori. Urmatoarele fisiere nu au fost adaugate: "+badDuplicate);
		console.log(tmp);
		var tmp2 = droppedFiles3;
		droppedFiles3 = $.merge($.merge([],tmp2), tmp);
		t3 = droppedFiles3.length;
		console.log(droppedFiles3);
		showFiles3(droppedFiles3);
	});
}