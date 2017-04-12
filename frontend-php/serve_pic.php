<?
	$folder='/tmp/screenshotq/';
	$newq=$folder.'new/';
	$outq=$folder.'out/';

	if(!empty($_REQUEST['u'])) {
		$u=$_REQUEST['u']; $uu=urlencode($u);
		$start=microtime(true);
		$f=fopen($newq.$uu,'w');
		fclose($f);
		$ss=$outq.$uu.".png";
		header('X-Test-File: '.$ss);
		for($i=0;$i<1000 * 1000;$i++) {
			clearstatcache();
			$fs = @filesize($ss);
			if ($fs && file_exists($ss)) {
				usleep(500);
				$end=microtime(true);
				header('X-Leech-Time: '.($end-$start));
				header('Content-type: image/png');
				header('Content-length: '.$fs);
				$data = file_get_contents($ss);
				echo $data;
				//header('X-Accel-Redirect: '.$ss);
				exit;
			}
			usleep(100);
		}
		header('X-failed: true');
		echo 'failed';
	}
	
