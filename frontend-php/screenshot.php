<html>
<body>
	<form action="#">
		<textarea type="text" name="u" rows="3" cols="80"><?=@htmlspecialchars($_REQUEST['u']);?></textarea>
		<br/>
		<button onclick="return go();">Get screenshot</button>
	</form>
	<div></div>
	<img src="" onerror="document.querySelector('div').innerHTML='failed.'"/>
	<script>
	var q=document.querySelector;
	var o=document.querySelector('textarea');
	function go() {
		var v=o.value; 
		o=document.querySelector('div');o.innerHTML='loading '+v;
		o=document.querySelector('img');o.src='/serve_pic.php?u='+encodeURIComponent(v);
		return false;
	}
	o.onchange=go;
	
	<? if(!empty($_REQUEST['u'])) echo 'go();' ?>

	</script>
