(function() {

	var ROW_HEIGHT = 120;

	var position = 0;

	var normalListScrollheight = 0,
		magnifyListScrollheight = 0;

	var topListHeight = 0,
		bottomListHeight = 0,
		magnifyListHeight = 0;

	var wrapper = document.querySelector( '.page-wrapper' );

	var originalList = document.querySelector( '.list-wrapper' );
	var originalListItems = originalList.innerHTML;
	originalList.parentNode.removeChild( originalList );

	var topList = document.createElement( 'ul' );
	topList.className = 'list-wrapper list-top';
	topList.innerHTML = originalListItems;
	wrapper.appendChild( topList );

	var bottomList = document.createElement( 'ul' );
	bottomList.className = 'list-wrapper list-bottom';
	bottomList.innerHTML = originalListItems;
	wrapper.appendChild( bottomList );

	var magnifyList = document.createElement( 'ul' );
	magnifyList.className = 'list-wrapper list-magnify';
	magnifyList.innerHTML = originalListItems;
	wrapper.appendChild( magnifyList );

	var topListInner = topList.querySelector( '.list' );
	var bottomListInner = bottomList.querySelector( '.list' );
	var magnifyListInner = magnifyList.querySelector( '.list' );

	normalListScrollheight = topListInner.scrollHeight;
	magnifyListScrollheight = magnifyListInner.scrollHeight;

	window.addEventListener( 'resize', layout );
	window.addEventListener( 'mousewheel', onMouseWheel );

	layout();

	function layout() {

		var height = window.innerHeight;

		magnifyListHeight = ROW_HEIGHT * 2;
		topListHeight = ( height - magnifyListHeight ) / 2;

		// TODO This should be closes match based on window height
		topListHeight = ROW_HEIGHT * 3;

		bottomListHeight = height - ( topListHeight + magnifyListHeight );

		topList.style.height = topListHeight + 'px';
		bottomList.style.height = bottomListHeight + 'px';

		magnifyList.style.height = magnifyListHeight + 'px';
		magnifyList.style.top = topListHeight + 'px';

		sync();

	}

	function sync() {

		topListInner.style.paddingTop = topListHeight + 'px';
		topListInner.style.top = ( -position * ( normalListScrollheight - topListHeight ) ) + 'px';
		magnifyListInner.style.top = ( -position * magnifyListScrollheight ) + 'px';
		bottomListInner.style.top = ( -position * normalListScrollheight ) + 'px';

	}

	function onMouseWheel( event ) {

		position -= event.wheelDelta / 1000;
		position = Math.max( 0, Math.min( 1, position ) );

		sync();

	}

})()