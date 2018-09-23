function removeItem1(x)
{
	$("#upl-1-"+x).css('display','none');
	$("#img-1-"+x).css('display','none');
	forbidden1.push(x);
	updateCount1()
}

function updateCount1()
{
	f1--;
	$('#firstReq').html(f1+"/10 imagini");
    if (f1 >= 10)
    	$('#firstReq').css('color', 'green');
    changeButton();
}

function approved_extension1(ext)
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

function ft_exist1(val, tmp, k)
{
	console.log("Get's there");
	var exist = 0;
	var vname = val.name;
	var vsize = val.size;
	jQuery.each(droppedFiles1, function(i, item)
	{
		if (!isForb1(i))
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
	var $input    = $form.find('.box__file1'),
    $label    = $form.find('label'),
    showFiles1 = function(files) {
    	f1 = files.length-forbidden1.length;
    	$('#firstReq').html(f1+"/10 imagini");
    	if (f1 >= 10)
    		$('#firstReq').css('color', 'green');
    	changeButton();
    };
	// / Show files
		$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	});
	$form.find('#form1').on('dragover dragenter', function() {
		$form.find('#form1').addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
	  $form.find('#form1').removeClass('is-dragover');
	});
	$form.find('#form1').on('drop', function(e) {
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
			if (approved_extension1(ext) && val.size <= 3145728 && !ft_exist1(val, tmp, i))
			{
				var uu = URL.createObjectURL(val);
				$('#1st').append("<img id='img-1-"+(i+t1)+"' src='"+uu+"' style='max-width: 50px; max-height: 50px;margin-top:20px'/><div id='upl-1-"+(i+t1)+"'><p>"+val.name
					+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem1("+(i+t1)+")'>Remove item</div></div>");
			}
			else
			{
				forbidden1.push(i+t1);
				if(!approved_extension1(ext))
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
		var tmp2 = droppedFiles1;
		droppedFiles1 = $.merge($.merge([],tmp2), tmp);
		t1 = droppedFiles1.length;
		showFiles1( droppedFiles1 );
	});
	$('#file1').on('change', function(e) {
	  //showFiles1(e.target.files);
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
			if (approved_extension1(ext) && val.size <= 3145728 && !ft_exist1(val, tmp, i))
			{
				var uu = URL.createObjectURL(val);
				$('#1st').append("<img id='img-1-"+(i+t1)+"' src='"+uu+"' style='max-width: 50px; max-height: 50px;margin-top:20px'/><div id='upl-1-"+(i+t1)+"'><p>"+val.name
					+"</p><div class='btn btn-danger' style='margin-bottom: 30px' onClick='removeItem1("+(i+t1)+")'>Remove item</div></div>");
			}
			else
			{
				forbidden1.push(i+t1);
				if(!approved_extension1(ext))
				{
					isBad = 1;
					badFiles =badFiles+tmp[i].name+'\n';
				}
				else  if (val.size > 3145728)
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
		var tmp2 = droppedFiles1;
		droppedFiles1 = $.merge($.merge([],tmp2), tmp);
		t1 = droppedFiles1.length;
		showFiles1( droppedFiles1 );
		//console.log(droppedFiles1);
	});
}