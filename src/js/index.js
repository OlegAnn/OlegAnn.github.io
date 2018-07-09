// global area
window.mainApp = {
    patternFrontValid: false,
    lastNumbers: true,
    togglePattern: false,
    counter: 1,
    numberInput: document.querySelector('.number_card input')
}

class SubmitClick {
    constructor(selector) {
        this.selector = selector;
    }
    init() {
        let element = document.querySelector(this.selector);
        element.addEventListener('click', function() {
            // if any front input valid, turn the card on backside
            if(mainApp.patternFrontValid) {
                document.querySelector('.front').classList.toggle("front_click");
                document.querySelector('.back').classList.toggle("back_click");
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
}
let submit = new SubmitClick('.submit');
submit.init();

class Validation {
    constructor(selector){
        this.selector = selector;
    }
    init() {
        let elems = this.selector.myinput;
        elems[0].addEventListener('input', checkCardCode, false);
        elems[1].addEventListener('input', checkThru, false);
        elems[2].addEventListener('input', checkCh, false);
        elems[3].addEventListener('input', checkCb, false);
        // check for 16 digits, and add spaces between 4 digits
        function checkCardCode() {
            let cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
            cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join('  ') : '';
            // assign a formatted value
            this.value = cardCode;
        }
        // check for 4 digits and add '/' after two digits
        function checkThru() {
            let cardCode = this.value.replace(/[^\d]/g, '').substring(0,4);
            cardCode = cardCode != '' ? cardCode.match(/.{1,2}/g).join('/') : '';
            // toggle fa-caret-right icon after pressing in input
            document.querySelector('.fa-caret-right').classList.toggle('action');
            // checking the first character for the validation of the month
            if(cardCode.charAt(0) > 1) {
                cardCode = cardCode.substring(0,0);
            }
            // check that you do not enter a number greater than 12
            if(cardCode[0] == 1 && cardCode.charAt(1) > 2) {
                cardCode = cardCode.replace(cardCode.charAt(1), ' ');
            }
            // check to not enter the number 00 on the first two numbers
            if(cardCode[0] + cardCode[1] == '00') {
                cardCode = cardCode.replace(cardCode, '');
            }
            // check to not enter the number 00 on the last two numbers
            if(cardCode[3] + cardCode[4] == '00') {
                cardCode = cardCode.substring(0,4);
            }
            // assign a formatted value
            this.value = cardCode;
        }
        // check for 13 letter
        function checkCh() {
            let cardCode = this.value.replace(/[\d]/g, '').substring(0,13);
            // assign a formatted value
            this.value = cardCode;
        }
        // check for 3 digits
        function checkCb() {
            let cardCode = this.value.replace(/[^\d]/g, '').substring(0,3);
            // assign a formatted value
            this.value = cardCode;
        }

    }
}
// add name form for arguments
let validation = new Validation(myform);
validation.init();

class CheckNumberCard {
    constructor(selector) {
        this.selector = selector;
    }
    init() {
        if(mainApp.numberInput.value.substring(0,1)/1 == 4) {
            document.querySelector('.visa').classList.add('visa_open');
        } else {
            document.querySelector('.visa').classList.remove('visa_open');
        }
        if(mainApp.numberInput.value.substring(0,1)/1 == 5) {
            document.querySelector('.master_card').classList.add('master_open');
        } else {
            document.querySelector('.master_card').classList.remove('master_open');
        }
        if (!$('.front_input:invalid').length) {
            document.querySelector('.submit').classList.add('opacity');
            mainApp.lastNumbers = document.querySelector('.number_card input').value.substring(18,22);
            if(mainApp.togglePattern) {
                mainApp.patternFrontValid = true;
            }

            console.log( mainApp.patternFrontValid, 'valid');
            console.log( mainApp.lastNumbers, 'lastnumber');
            document.querySelector('.last_number').textContent = mainApp.lastNumbers;
            document.querySelector('.red').classList.remove('ered');
            document.querySelector('.yellow').classList.remove('eyellow');
        } else {
            $('.submit').removeClass('opacity');
            console.log( mainApp.patternFrontValid, 'novalud');
            mainApp.patternFrontValid = false;
        }
        if (!$('.number_card:invalid').length) {
            let val = mainApp.numberInput.value;
            $('.alert_num_card').text(val);
            window.nubmer = [
                {value: val.substring(0,1) / 1},
                {value: val.substring(1,2) / 1},
                {value: val.substring(2,3) / 1},
                {value: val.substring(3,4) / 1},
                {value: val.substring(6,7) / 1},
                {value: val.substring(7,8) / 1},
                {value: val.substring(8,9) / 1},
                {value: val.substring(9,10) / 1},
                {value: val.substring(12,13) / 1},
                {value: val.substring(13,14) / 1},
                {value: val.substring(14,15) / 1},
                {value: val.substring(15,16) / 1},
                {value: val.substring(18,19) / 1},
                {value: val.substring(19,20) / 1},
                {value: val.substring(20,21) / 1},
                {value: val.substring(21,22) / 1}
            ];

            let sumEven =  window.nubmer.reduce(function (sum,current,index) {
                return (index%2>0) ? sum + current.value : sum;
            }, 0);
            let m = function () {
                let multiplyOdd = window.nubmer.filter(function (item, i, arr) {
                    if (i%2==0) {
                        return item
                    }
                });
                window.a = [];
                let mu = multiplyOdd.forEach(function (item,i) {
                    let n = item.value * 2;
                    if (n>9){
                        n = n + ''

                        // test for 10
                        if (n.substring(1,2) == 0){
                            n = n.substring(0,1) / 1;
                        } else {
                            n = (n.substring(0,1)/1) + (n.substring(1,2)/1)
                        }
                        // example conversion 14 to 5 (1 + 4)
                        // let ones = n.substring(0,1) / 1;
                        // let twos = n.substring(1,2) / 1;
                        // n = ones + twos;
                    }
                    window.a.push(n)
                })
                let b = window.a.reduce(function (sum,current,index) {
                    return sum + current;
                }, 0)
                return b;
            }

            if((sumEven + m())%10==0){
                mainApp.togglePattern = true;
            } else {
                document.querySelector('.modal_window').classList.add('show_modal');
                mainApp.togglePattern = true;
                mainApp.numberInput.value = '5164  3513  4432  2225';
                console.log(val , 'number');
            }

            console.log(sumEven)
            console.log(m())
            console.log(val);
        }
    }
}

let checkNumberCard = new CheckNumberCard();
$('.front_input').on('keyup', function() {
    checkNumberCard.init();
})

$('.back_input').on('keyup', function() {
    if (!$('.back_input:invalid').length) {
        $('.submit').val('READY TO BUY');
       // mainApp.patternBackValid = true;
    } else {
 			$('.submit').val('TOUCH TO FRONT');
    }
});

$('.chips_svg').on('click', function () {
    $(this).children(':first').toggleClass('front_svg_active');
    $(this).children(':last').toggleClass('back_svg_active');
});

$('.alert_button').on('click', function () {
    $('.modal_window').removeClass('show_modal');
})
