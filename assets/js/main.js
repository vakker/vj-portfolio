/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {


	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints({
		wide: ['961px', '1880px'],
		normal: ['961px', '1620px'],
		narrow: ['961px', '1320px'],
		narrower: ['737px', '960px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav_a = $nav.find('a');

	$nav_a
		.addClass('scrolly')
		.on('click', function(e) {

			var $this = $(this);

			// External link? Bail.
			if ($this.attr('href').charAt(0) != '#')
				return;

			// Prevent default.
			e.preventDefault();

			// Deactivate all links.
			$nav_a.removeClass('active');

			// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
			$this
				.addClass('active')
				.addClass('active-locked');

		})
		.each(function() {

			var $this = $(this),
				id = $this.attr('href'),
				$section = $(id);

			// No section for this link? Bail.
			if ($section.length < 1)
				return;

			// Scrollex.
			$section.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
					$section.addClass('inactive');

				},
				enter: function() {

					// Activate section.
					$section.removeClass('inactive');

					// No locked links? Deactivate all links and activate this section's one.
					if ($nav_a.filter('.active-locked').length == 0) {

						$nav_a.removeClass('active');
						$this.addClass('active');

					}

					// Otherwise, if this section's link is the one that's locked, unlock it.
					else if ($this.hasClass('active-locked'))
						$this.removeClass('active-locked');

				}
			});

		});

	// Scrolly.
	$('.scrolly').scrolly();

	// Header (narrower + mobile).

	// Toggle.
	$(
		'<div id="headerToggle">' +
		'<a href="#header" class="toggle"></a>' +
		'</div>'
	)
		.appendTo($body);

	// Header.
	$('#header')
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'header-visible'
		});


	$.getJSON('assets/js/data.json', function(data) {
		var projects = data.projects;
		projects.sort(function(a, b) {
			var keyA = new Date(a.year),
				keyB = new Date(b.year);
			if (keyA < keyB) return 1;
			if (keyA > keyB) return -1;
			return 0;
		});

		$.each(projects, function(i, f) {
			var tblRow = '<article class="item grid-item col-4 col-12-mobile">'
			$.each(f.imgs, function(i, img) {
				tblRow += '<img class="image fit" src=' + '"' + img + '"' + 'alt="">';
			});
			tblRow += '<header>' +
				'<h3>' + f.title + '</h3>' +
				'<p>' + f.desc + '</p>' +
				'</header>' +
				'</article>';

			$(tblRow).appendTo("#projects-div");
		});

		var $grid = $('.grid').imagesLoaded(function() {
			$grid.masonry({
				itemSelector: '.grid-item'
			});
		});

		var academic = data.academic;
		academic.sort(function(a, b) {
			var keyA = new Date(a.year),
				keyB = new Date(b.year);
			if (keyA < keyB) return 1;
			if (keyA > keyB) return -1;
			return 0;
		});

		$.each(academic, function(i, f) {
			var tblRow = '<tr>' + '<td>' + f.year + '</td>' +
				'<td>' +
				f.title + ', ' +
				f.authors + ', ' +
				f.venue + '</td>' + '</tr>';

			$(tblRow).appendTo("#academic-div table");
		});
	});

})(jQuery);
