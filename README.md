#Welcome to jQuery simple select
Custom select fields with jQuery

##Usage

####import
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="js/jssimple.js"></script>
<link rel="stylesheet" href="css/jssimple.css">

```

####HTML Select Simple
```html
<select name="single-s2" id="single-s2" class="jss-select" style="width:250px">
	<option value="4">been deprecated from</option>
	<option value="3" selected="selected">momentum going</option>
	....
</select>
```
####HTML Select Multiple
```html
<select name="mult0" id="mult0" multiple class="jss-select" style="width:300px">
	<option value="1">Películas</option>
	<option value="2" selected="selected">Música</option>
	....
</select>		
```

#### activate for class
```html
<script type="text/javascript">
	$(function() {
	    $(".jss-select").jssimple();
	});
</script>
```

