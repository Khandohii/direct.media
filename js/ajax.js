$( document ).ready(function() {
    $('body').on('submit', '#ajax_form', function(e) {
        e.preventDefault()

        let fieldName = $(this).find('input[name="name"]').val()
        let fieldEmail = $(this).find('input[name="email"]').val()
        let fieldTelegram = $(this).find('input[name="telegram"]').val()
        let fieldMessage = $(this).find('textarea[name="message"]').val()

        if (fieldName.length < 3) {
            console.log('name error')
            $('.ajax_submit').find('.error_text').text('*Please fill in all fields')
        } else if (!validateEmail(fieldEmail)) {
            console.log('email error')
            $('.ajax_submit').find('.error_text').text('*Please fill in all fields')
        } else if (fieldTelegram.length < 3) {
            console.log('telegram error')
            $('.ajax_submit').find('.error_text').text('*Please fill in all fields')
        } else if (fieldMessage.length < 21) {
            console.log('message error')
            $('.ajax_submit').find('.error_text').text('*Please fill in all fields')
        } else {
            $('.ajax_submit').find('.error_text').text('')

            sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
        }
    })
});

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "html", 
        data: $("#"+ajax_form).serialize(),
        success: function(response) { 
            $.fancybox.close()

            $.fancybox.open({
                src  : $('#success_modal'),
                type : 'inline',
                opts : {
                    touch : false,
                    speed : 300,
                    backFocus : false,
                    trapFocus : false,
                    autoFocus : false,
                    mobile : {
                        clickSlide: "close"
                    }
                }
            })

            console.log('Success form' + response)
    	},
    	error: function(response) { 
            console.log('Failed form' + response)
    	}
 	});
}

// Validate email
function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}