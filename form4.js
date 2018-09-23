function removeItem4(x)
{
	$("#upl-4-"+x).css('display','none');
	forbidden4.push(x);
	updateCount4();
}

function updateCount4()
{
	f4--;
	$('#4thReq').html(f4+"/3 documente");
    if (f4 >= 2)
    	$('#4thReq').css('color', 'green');
    changeButton();
}

function approved_extension4(ext)
{
	var approved = Array("doc","docx","txt","pdf","jpg","jpeg","png");
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

function ft_exist4(val, tmp, k)
{
	console.log("Get's there");
	var exist = 0;
	var vname = val.name;
	var vsize = val.size;
	jQuery.each(droppedFiles4, function(i, item)
	{
		if (!isForb4(i))
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
	var $input    = $form.find('.box__file4'),
    $label    = $form.find('label'),
    showFiles4 = function(files) {
    	f4 = files.length-forbidden4.length;
    	$('#4thReq').html(f4+"/3 documente");
    	if (f4 >= 3)
    		$('#4thReq').css('color', 'green');
    	changeButton();
    };
	// / Show files
		$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	});
	$form.find('#form4').on('dragover dragenter', function() {
		$form.find('#form4').addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
	  $form.find('#form4').removeClass('is-dragover');
	});
	$form.find('#form4').on('drop', function(e) {
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
			if (approved_extension4(ext) && val.size <= 3145728 && !ft_exist4(val, tmp, i))
				$('#4th').append("<div id='upl-4-"+(i+t4)+"'><p>"+val.name+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem4("+(i+t4)+")'>Remove item</div></div>");
			else
			{
				forbidden4.push(i+t4);
				if(!approved_extension4(ext))
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
		var tmp2 = droppedFiles4;
		droppedFiles4 = $.merge($.merge([],tmp2), tmp);
		t4 = droppedFiles4.length;
		console.log(droppedFiles4);
		showFiles4(droppedFiles4);
	});
	$('#file4').on('change', function(e) {
	  //showFiles4(e.target.files);
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
			if (approved_extension4(ext) && val.size <= 3145728 && !ft_exist4(val, tmp, i))
				$('#4th').append("<div id='upl-4-"+(i+t4)+"'><p>"+val.name+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem4("+(i+t4)+")'>Remove item</div></div>");
			else
			{
				forbidden4.push(i+t4);
				if(!approved_extension4(ext))
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
		var tmp2 = droppedFiles4;
		droppedFiles4 = $.merge($.merge([],tmp2), tmp);
		t4 = droppedFiles4.length;
		console.log(droppedFiles4);
		showFiles4(droppedFiles4);
	});
}