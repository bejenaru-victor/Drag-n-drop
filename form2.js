function removeItem2(x)
{
	$("#upl-2-"+x).css('display','none');
	$("#img-2-"+x).css('display','none');
	forbidden2.push(x);
	updateCount2();
}

function updateCount2()
{
	f2--;
	$('#secondReq').html(f2+"/15 imagini");
    if (f2 >= 15)
    	$('#secondReq').css('color', 'green');
    changeButton();
}

function approved_extension2(ext)
{
	var approved = Array("jpg","jpeg","png");
	for (var i = 0; i < approved.length; i++)
	{
		if (ext === approved[i])
		{
			return true;
		}
	}
	return false;
}

function ft_exist2(val, tmp, k)
{
	console.log("Get's there");
	var exist = 0;
	var vname = val.name;
	var vsize = val.size;
	jQuery.each(droppedFiles2, function(i, item)
	{
		if (!isForb2(i))
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
	var $input    = $form.find('.box__file2'),
    $label    = $form.find('label'),
    showFiles2 = function(files) {
    	f2 = files.length-forbidden2.length;
    	$('#secondReq').html(f2+"/15 imagini");
    	if (f2 >= 15)
    		$('#secondReq').css('color', 'green');
    	changeButton();
    };
	// / Show files
		$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	});
	$form.find('#form2').on('dragover dragenter', function() {
		$form.find('#form2').addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
	  $form.find('#form2').removeClass('is-dragover');
	});
	$form.find('#form2').on('drop', function(e) {
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
			if (approved_extension1(ext) && val.size <= 3145728 && !ft_exist2(val, tmp, i))
			{
				var uu = URL.createObjectURL(val);
				$('#2nd').append("<img id='img-2-"+(i+t2)+"' src='"+uu+"' style='max-width: 50px; max-height: 50px;margin-top:20px'/><div id='upl-2-"+(i+t2)+"'><p>"+val.name
					+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem2("+(i+t2)+")'>Remove item</div></div>");
			}
			else
			{
				forbidden2.push(i+t2);
				if(!approved_extension2(ext))
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
		var tmp2 = droppedFiles2;
		droppedFiles2 = $.merge($.merge([],tmp2), tmp);
		t2 = droppedFiles2.length;
		console.log(droppedFiles2);
		showFiles2(droppedFiles2);
	});
	$('#file2').on('change', function(e) {
	  //showFiles2(e.target.files);
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
			if (approved_extension1(ext) && val.size <= 3145728 && !ft_exist2(val, tmp, i))
			{
				var uu = URL.createObjectURL(val);
				$('#2nd').append("<img id='img-2-"+(i+t2)+"' src='"+uu+"' style='max-width: 50px; max-height: 50px;margin-top:20px'/><div id='upl-2-"+(i+t2)+"'><p>"+val.name
					+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem2("+(i+t2)+")'>Remove item</div></div>");
			}
			else
			{
				forbidden2.push(i+t2);
				if(!approved_extension2(ext))
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
		var tmp2 = droppedFiles2;
		droppedFiles2 = $.merge($.merge([],tmp2), tmp);
		t2 = droppedFiles2.length;
		console.log(droppedFiles2);
		showFiles2(droppedFiles2);
	});
}