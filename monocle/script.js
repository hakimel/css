window.onload = function() {

	var wrapper = document.querySelector( '.page-wrapper' );

	var originalList = document.querySelector( '.list-wrapper' );
	var originalListItems = originalList.innerHTML;
	originalList.parentNode.removeChild( originalList );

	// Top list
	var listA = document.createElement( 'ul' );
	listA.className = 'list-wrapper list-a';
	listA.innerHTML = originalListItems;
	wrapper.appendChild( listA );

	// Monocle list
	var listB = document.createElement( 'ul' );
	listB.className = 'list-wrapper list-b';
	listB.innerHTML = originalListItems;
	wrapper.appendChild( listB );

	// Bottom list
	var listC = document.createElement( 'ul' );
	listC.className = 'list-wrapper list-c';
	listC.innerHTML = originalListItems;
	wrapper.appendChild( listC );

	var listAInner = listA.querySelector( '.list' ),
		listCInner = listC.querySelector( '.list' ),
		listBInner = listB.querySelector( '.list' );

	var scroller,
		scrollPosition = 0;

	var rowHeight = listA.querySelector( 'li' ).offsetHeight;

	var listAHeight = 0,
		listBHeight = rowHeight * 2,
		listCHeight = 0;

	var listAScrollheight = listAInner.scrollHeight,
		listBScrollheight = listBInner.scrollHeight;

	function init() {

		window.addEventListener( 'resize', layout );

		scroller = new IScroll( document.body, {
			mouseWheel: true,
			scrollbars: true,
			probeType: 3
		} );

		scroller.on( 'scroll', onScrollUpdate );

		layout();

	}

	function layout() {

		var height = window.innerHeight;

		listAHeight = ( height - listBHeight ) / 2;
		listAHeight = Math.floor( listAHeight / rowHeight ) * rowHeight;

		listCHeight = height - ( listAHeight + listBHeight );

		listA.style.height = listAHeight + 'px';
		listB.style.height = listBHeight + 'px';
		listB.style.top = listAHeight + 'px';
		listC.style.height = listCHeight + 'px';

		sync();

	}

	function sync() {

		listAInner.style.top = ( listAHeight + ( -scrollPosition * ( listAScrollheight ) ) ) + 'px';
		listBInner.style.top = ( -scrollPosition * ( listBScrollheight - listBHeight ) ) + 'px';
		listCInner.style.top = ( -scrollPosition * listAScrollheight ) + 'px';

	}

	function onScrollUpdate( event ) {

		scrollPosition = scroller.y / scroller.maxScrollY;
		scrollPosition = Math.max( 0, Math.min( 1, scrollPosition ) );

		sync();

	}

	init();

};