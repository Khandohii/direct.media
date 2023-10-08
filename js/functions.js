$(function(){
	// Browser checking
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Lazy load
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Setting the width of the standard scrollbar
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Pop-up windows
	$('.modal_link').click(function(e){
		e.preventDefault()

		let dataRadio = $(this).data('radio')
		let pathModal = $(this).data('content')

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).data('content'),
			type : 'inline',
			opts : {
				touch : false,
				speed : 300,
				backFocus : false,
				trapFocus : false,
				autoFocus : false,
				mobile : {
				    clickSlide: "close"
				},
				beforeShow : function() {
					$(pathModal).find('input[value="' + dataRadio + '"]').prop('checked', true);

					checkForm()
				},
				afterClose : function() {
					$(pathModal).find('input[name="group"]').prop('checked', false);

					checkForm()
				}
			}
		})
	})


	// Mob. menu
	$('body').on('click', '.mob_menu_link', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('header .wrap_menu').removeClass('active')
		} else {
			$(this).addClass('active')

			$('header .wrap_menu').addClass('active')
		}
    })


    // Anchor scroll
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		$('html, body').stop().animate({
		   	scrollTop: $(href).offset().top - 30
		}, 1000)


		if ( $(window).width() < 1024 ) {
			$('.mob_menu_link').removeClass('active')

			$('header .wrap_menu').removeClass('active')
		}
	})


    $('body').on('change', '.radio input[type=radio]', function(e) {
        e.preventDefault()

        checkForm()
    })
})


// Additional functions
function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}

function checkForm() {
	let checkedRadio = $('.ajax_submit').find('input[name="group"]:checked')

	if (checkedRadio.length) {
		$('.ajax_submit').find('input:disabled').prop('disabled', false);
		$('.ajax_submit').find('textarea:disabled').prop('disabled', false);
		$('.ajax_submit').find('button:disabled').prop('disabled', false);

		$('.ajax_submit').find('.error_text').text('')
	} else{
		$('.ajax_submit').find('input[name="name"]').prop('disabled', true);
		$('.ajax_submit').find('input[name="email"]').prop('disabled', true);
		$('.ajax_submit').find('input[name="telegram"]').prop('disabled', true);
		$('.ajax_submit').find('textarea[name="message"]').prop('disabled', true);
		$('.ajax_submit').find('button').prop('disabled', true);

		$('.ajax_submit').find('.error_text').text('*Choose a category')
	}
}