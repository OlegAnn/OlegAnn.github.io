'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// global area
window.mainApp = {
    patternFrontValid: false,
    lastNumbers: true,
    togglePattern: false,
    counter: 1,
    numberInput: document.querySelector('.number_card input')
};

var CheckNumberCard = function () {
    function CheckNumberCard(selector) {
        _classCallCheck(this, CheckNumberCard);

        this.selector = selector;
    }

    _createClass(CheckNumberCard, [{
        key: 'checkPaymentSystem',
        value: function checkPaymentSystem() {
            // if first value == 4, add logo visa
            if (mainApp.numberInput.value.substring(0, 1) / 1 == 4) {
                document.querySelector('.visa').classList.add('visa_open');
            } else {
                document.querySelector('.visa').classList.remove('visa_open');
            }
            // if first value == 5, add logo mastercard
            if (mainApp.numberInput.value.substring(0, 1) / 1 == 5) {
                document.querySelector('.master_card').classList.add('master_open');
            } else {
                document.querySelector('.master_card').classList.remove('master_open');
            }
        }
    }, {
        key: 'checkFrontInputValid',
        value: function checkFrontInputValid() {
            // if all front input valid, then you can turn the card back side
            if (!$('.front_input:invalid').length) {
                document.querySelector('.submit').classList.add('opacity');
                // dynamic last 4 number number card
                mainApp.lastNumbers = document.querySelector('.number_card input').value.substring(18, 22);
                // if number card valid, then give the key for turn the card back side
                if (mainApp.togglePattern) {
                    mainApp.patternFrontValid = true;
                }
                // assign last 4 number for back_card element
                document.querySelector('.last_number').textContent = mainApp.lastNumbers;
            } else {
                // if one front input invalid, then you can't turn the card back side
                $('.submit').removeClass('opacity');
                mainApp.patternFrontValid = false;
            }
        }
    }, {
        key: 'checkNumberCardValid',
        value: function checkNumberCardValid() {
            // calculation for the validity of the card according to the formula:
            // sum even numbers (let sumEven) + doubled odd numbers(let doubledOddNumbers)
            // if, after doubling, a two-digit number is obtained,
            // then it is considered as the sum of the digits (ie 14 is considered as 1 + 4)
            // if the result is divisible by 10 without residue, then the card number is correct
            if (!$('.number_card:invalid').length) {
                // assignment number_card value
                var val = mainApp.numberInput.value;
                $('.alert_num_card').text(val);
                // array of card numbers
                window.nubmer = [{ value: val.substring(0, 1) / 1 }, { value: val.substring(1, 2) / 1 }, { value: val.substring(2, 3) / 1 }, { value: val.substring(3, 4) / 1 }, { value: val.substring(6, 7) / 1 }, { value: val.substring(7, 8) / 1 }, { value: val.substring(8, 9) / 1 }, { value: val.substring(9, 10) / 1 }, { value: val.substring(12, 13) / 1 }, { value: val.substring(13, 14) / 1 }, { value: val.substring(14, 15) / 1 }, { value: val.substring(15, 16) / 1 }, { value: val.substring(18, 19) / 1 }, { value: val.substring(19, 20) / 1 }, { value: val.substring(20, 21) / 1 }, { value: val.substring(21, 22) / 1 }];
                // sum even numbers
                var sumEven = window.nubmer.reduce(function (sum, current, index) {
                    return index % 2 > 0 ? sum + current.value : sum;
                }, 0);
                var sumDoubledOddNumbers = function sumDoubledOddNumbers() {
                    // create new array of oddNumber
                    var multiplyOdd = window.nubmer.filter(function (item, i, arr) {
                        if (i % 2 == 0) {
                            return item;
                        }
                    });
                    // array of multiplied numbers
                    window.doubledOddNumbers = [];
                    multiplyOdd.forEach(function (item, i) {
                        var n = item.value * 2;
                        if (n > 9) {
                            n = n + '';
                            // test for 10 (1 + 0 = 1)
                            if (n.substring(1, 2) == 0) {
                                n = n.substring(0, 1) / 1;
                            } else {
                                // example conversion 14 to 5 (1 + 4)
                                n = n.substring(0, 1) / 1 + n.substring(1, 2) / 1;
                            }
                        }
                        // pushed in array of multiplied odd numbers
                        window.doubledOddNumbers.push(n);
                    });
                    var sumNumbers = window.doubledOddNumbers.reduce(function (sum, current, index) {
                        return sum + current;
                    }, 0);
                    //return sumDoubledOddNumbers
                    return sumNumbers;
                };
                // if the sum odd numbers and even, is divisible by 10 without residue,
                // then the card number is correct
                if ((sumEven + sumDoubledOddNumbers()) % 10 == 0) {
                    mainApp.togglePattern = true;
                } else {
                    document.querySelector('.modal_window').classList.add('show_modal');
                    mainApp.togglePattern = true;
                    mainApp.numberInput.value = '5164  3513  4432  2225';
                }
            };
        }
    }]);

    return CheckNumberCard;
}();

;

var checkNumberCard = new CheckNumberCard();
$('.front_input').on('keyup', function () {
    checkNumberCard.checkPaymentSystem();
    checkNumberCard.checkFrontInputValid();
    checkNumberCard.checkNumberCardValid();
});

var SubmitClick = function () {
    function SubmitClick(selector) {
        _classCallCheck(this, SubmitClick);

        this.selector = selector;
    }

    _createClass(SubmitClick, [{
        key: 'init',
        value: function init() {
            var element = document.querySelector(this.selector);
            element.addEventListener('click', function () {
                // if any front input valid, turn the card on backside
                if (mainApp.patternFrontValid) {
                    document.querySelector('.front').classList.toggle("front_click");
                    document.querySelector('.back').classList.toggle("back_click");
                    // init svg animaton
                    $('#credit_svg').lazylinepainter('paint');
                    document.querySelector('#credit_svg').classList.toggle('active');
                    // toggle back/front val from submit
                    mainApp.counter++;
                    // odd value means back-side, even front-side
                    if (mainApp.counter % 2 == 0) {
                        this.value = 'TOUCH TO FRONT';
                    } else {
                        this.value = 'TOUCH TO BACK';
                    }
                }
            });
        }
    }]);

    return SubmitClick;
}();

var submit = new SubmitClick('.submit');
submit.init();

var Validation = function () {
    function Validation(selector) {
        _classCallCheck(this, Validation);

        this.selector = selector;
    }

    _createClass(Validation, [{
        key: 'init',
        value: function init() {
            var elems = this.selector.myinput;
            elems[0].addEventListener('input', checkCardCode, false);
            elems[1].addEventListener('input', checkThru, false);
            elems[2].addEventListener('input', checkCh, false);
            elems[3].addEventListener('input', checkCb, false);
            // check for 16 digits, and add spaces between 4 digits
            function checkCardCode() {
                var cardCode = this.value.replace(/[^\d]/g, '').substring(0, 16);
                cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join('  ') : '';
                // assign a formatted value
                this.value = cardCode;
                // input prompt
                if (cardCode.length > 0) {
                    this.parentElement.classList.add('help_card_code');
                    if (this.checkValidity()) {
                        this.parentElement.classList.remove('help_card_code');
                    }
                } else {
                    this.parentElement.classList.remove('help_card_code');
                }
            }
            // check for 4 digits and add '/' after two digits
            function checkThru() {
                var cardCode = this.value.replace(/[^\d]/g, '').substring(0, 4);
                cardCode = cardCode != '' ? cardCode.match(/.{1,2}/g).join('/') : '';
                // toggle fa-caret-right icon after pressing in input
                document.querySelector('.fa-caret-right').classList.toggle('action');
                // checking the first character for the validation of the month
                if (cardCode.charAt(0) > 1) {
                    cardCode = cardCode.substring(0, 0);
                }
                // check that you do not enter a number greater than 12
                if (cardCode[0] == 1 && cardCode.charAt(1) > 2) {
                    cardCode = cardCode.replace(cardCode.charAt(1), ' ');
                }
                // check to not enter the number 00 on the first two numbers
                if (cardCode[0] + cardCode[1] == '00') {
                    cardCode = cardCode.replace(cardCode, '');
                }
                // check to not enter the number 00 on the last two numbers
                if (cardCode[3] + cardCode[4] == '00') {
                    cardCode = cardCode.substring(0, 4);
                }
                // assign a formatted value
                this.value = cardCode;
                // input prompt
                if (cardCode.length > 0) {
                    this.parentElement.classList.add('help_thru');
                    if (this.checkValidity()) {
                        this.parentElement.classList.remove('help_thru');
                    }
                } else {
                    this.parentElement.classList.remove('help_thru');
                }
            }
            // check for 13 letter
            function checkCh() {
                var cardCode = this.value.replace(/[\d]/g, '').substring(0, 13);
                // assign a formatted value
                this.value = cardCode;
                // input prompt
                if (cardCode.length > 0) {
                    this.parentElement.classList.add('help_holder');
                    if (this.checkValidity()) {
                        this.parentElement.classList.remove('help_holder');
                    }
                } else {
                    this.parentElement.classList.remove('help_holder');
                }
            }
            // check for 3 digits
            function checkCb() {
                var cardCode = this.value.replace(/[^\d]/g, '').substring(0, 3);
                // assign a formatted value
                this.value = cardCode;
            }
        }
    }]);

    return Validation;
}();
// add name form for arguments


var validation = new Validation(myform);
validation.init();

// toggle val input ready to buy/touch to front
$('.back_input').on('keyup', function () {
    if (!$('.back_input:invalid').length) {
        $('.submit').val('READY TO BUY');
        // mainApp.patternBackValid = true;
    } else {
        $('.submit').val('TOUCH TO FRONT');
    }
});
// 3D rotate chip
$('.chips_svg').on('click', function () {
    $(this).children(':first').toggleClass('front_svg_active');
    $(this).children(':last').toggleClass('back_svg_active');
});
// close modal window
$('.alert_button').on('click', function () {
    $('.modal_window').removeClass('show_modal');
});

// config LazyLinePainter
var pathObj = {
    "credit_svg": {
        "strokepath": [{
            "path": "M351.5,0h-192C128.897,0,104,24.897,104,55.5v189.688c0,7.007,0.229,14.101,0.68,21.085l13.887,215.255   C119.633,498.054,133.441,511,150.001,511h210.997c16.561,0,30.368-12.946,31.435-29.472l13.887-215.254   c0.451-6.984,0.68-14.079,0.68-21.085V55.5C407,24.897,382.103,0,351.5,0z M392,245.188c0,6.686-0.218,13.455-0.648,20.119   l-13.887,215.255c-0.559,8.657-7.792,15.438-16.466,15.438H150.001c-8.674,0-15.907-6.781-16.466-15.438l-13.887-215.255   c-0.43-6.664-0.648-13.433-0.648-20.119V55.5c0-22.332,18.168-40.5,40.5-40.5h192c22.332,0,40.5,18.168,40.5,40.5V245.188z",
            "duration": 300
        }, {
            "path": "M351.5,464h-192c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h192c4.142,0,7.5-3.358,7.5-7.5S355.642,464,351.5,464z",
            "duration": 600
        }, {
            "path": "M239.5,135c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C232,131.642,235.358,135,239.5,135z",
            "duration": 300
        }, {
            "path": "M207.5,135c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C200,131.642,203.358,135,207.5,135z",
            "duration": 600
        }, {
            "path": "M271.5,135c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C264,131.642,267.358,135,271.5,135z",
            "duration": 300
        }, {
            "path": "M303.5,135c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C296,131.642,299.358,135,303.5,135z",
            "duration": 600
        }, {
            "path": "M171.5,303h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S160.748,303,171.5,303z M171.5,279h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S169.019,279,171.5,279z",
            "duration": 300
        }, {
            "path": "M243.5,303h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S232.748,303,243.5,303z M243.5,279h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S241.019,279,243.5,279z",
            "duration": 600
        }, {
            "path": "M339.5,264h-24c-10.752,0-19.5,8.748-19.5,19.5s8.748,19.5,19.5,19.5h24c10.752,0,19.5-8.748,19.5-19.5   S350.252,264,339.5,264z M339.5,288h-24c-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5h24c2.481,0,4.5,2.019,4.5,4.5   S341.981,288,339.5,288z",
            "duration": 100
        }, {
            "path": "M171.5,351h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S160.748,351,171.5,351z M171.5,327h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S169.019,327,171.5,327z",
            "duration": 600
        }, {
            "path": "M243.5,351h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S232.748,351,243.5,351z M243.5,327h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S241.019,327,243.5,327z",
            "duration": 100
        }, {
            "path": "M339.5,312h-24c-10.752,0-19.5,8.748-19.5,19.5s8.748,19.5,19.5,19.5h24c10.752,0,19.5-8.748,19.5-19.5   S350.252,312,339.5,312z M339.5,336h-24c-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5h24c2.481,0,4.5,2.019,4.5,4.5   S341.981,336,339.5,336z",
            "duration": 600
        }, {
            "path": "M171.5,399h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S160.748,399,171.5,399z M171.5,375h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S169.019,375,171.5,375z",
            "duration": 100
        }, {
            "path": "M243.5,399h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S232.748,399,243.5,399z M243.5,375h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S241.019,375,243.5,375z",
            "duration": 600
        }, {
            "path": "M339.5,360h-24c-10.752,0-19.5,8.748-19.5,19.5s8.748,19.5,19.5,19.5h24c10.752,0,19.5-8.748,19.5-19.5   S350.252,360,339.5,360z M339.5,384h-24c-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5h24c2.481,0,4.5,2.019,4.5,4.5   S341.981,384,339.5,384z",
            "duration": 100
        }, {
            "path": "M171.5,447h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S160.748,447,171.5,447z M171.5,423h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S169.019,423,171.5,423z",
            "duration": 500
        }, {
            "path": "M243.5,447h24c10.752,0,19.5-8.748,19.5-19.5s-8.748-19.5-19.5-19.5h-24c-10.752,0-19.5,8.748-19.5,19.5   S232.748,447,243.5,447z M243.5,423h24c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-24c-2.481,0-4.5-2.019-4.5-4.5   S241.019,423,243.5,423z",
            "duration": 100
        }, {
            "path": "M339.5,408h-24c-10.752,0-19.5,8.748-19.5,19.5s8.748,19.5,19.5,19.5h24c10.752,0,19.5-8.748,19.5-19.5   S350.252,408,339.5,408z M339.5,432h-24c-2.481,0-4.5-2.019-4.5-4.5s2.019-4.5,4.5-4.5h24c2.481,0,4.5,2.019,4.5,4.5   S341.981,432,339.5,432z",
            "duration": 600
        }, {
            "path": "M351.5,56h-192C146.542,56,136,66.542,136,79.5v144c0,12.958,10.542,23.5,23.5,23.5h192c12.958,0,23.5-10.542,23.5-23.5   v-144C375,66.542,364.458,56,351.5,56z M248,215v17h-41v-17H248z M263,215h41v17h-41V215z M159.5,200   c-2.997,0-5.862,0.57-8.5,1.598v-20.195c2.638,1.028,5.503,1.598,8.5,1.598h192c2.997,0,5.862-0.57,8.5-1.598v20.195   c-2.638-1.028-5.503-1.598-8.5-1.598H159.5z M151,79.5c0-4.687,3.813-8.5,8.5-8.5h192c4.687,0,8.5,3.813,8.5,8.5v80   c0,4.687-3.813,8.5-8.5,8.5h-192c-4.687,0-8.5-3.813-8.5-8.5V79.5z M151,223.5c0-4.687,3.813-8.5,8.5-8.5H192v17h-32.5   C154.813,232,151,228.187,151,223.5z M351.5,232H319v-17h32.5c4.687,0,8.5,3.813,8.5,8.5S356.187,232,351.5,232z",
            "duration": 700
        }],
        "dimensions": {
            "width": 515,
            "height": 515
        }
    }
};
$(document).ready(function () {
    $('#credit_svg').lazylinepainter({
        "svgData": pathObj,
        "strokeWidth": 1,
        "strokeColor": "#625F5B",
        'ease': 'easeInOutExpo'
    });
});