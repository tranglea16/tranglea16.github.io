
function Validator(options) {

    function validate (inputElement, rule) {
        // lấy đc 1. value: inputElement.value va 2. test func: rule.test
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    // lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Xử lý nút submit -> báo lỗi nếu có
        formElement.onsubmit = function (e) {
            e.preventDefault();
            //Lặp qua từng rule và validate
            options.rules.forEach (function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);

            });
        }

        options.rules.forEach (function (rule) {

            var inputElement = formElement.querySelector(rule.selector);
            
            if (inputElement) {
                // TH blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // TH user đang nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// Rule:
// Khi có lỗi -> trả về message
// Khi ko có lỗi -> trả về undefined
Validator.isRequired = function (selector) {
    return  {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function (selector) {
    return  {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là email"

        }
    }
}

Validator.minLength = function (selector, min) {
    return  {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue) {
    return  {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : 'Giá trị nhập vào không chính xác';
        }
    }
}