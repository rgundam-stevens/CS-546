let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('attempts');
let frmLabel = document.getElementById('formLabel');


function palindrome() {
  console.log('IN PALINDROME');
  let input = document.getElementById("text_input").value;
  let inputString = input.replace(/[^A-Z0-9]+/ig, "");
  inputString = inputString.toLowerCase();
  let reverseString = "";
  for (let j = inputString.length; j >= 0; j--) {
    reverseString = reverseString + inputString.charAt(j);
  }
  return inputString && inputString === reverseString;

}

$('#myForm').submit((event) => {
  event.preventDefault();
  if ($('#text_input').val().replace(/[^A-Z0-9]+/ig, "")) {
    $('#error').hide();
    $('#formLabel').removeClass('error');
    $('#text_input').removeClass('inputClass');



    $('#correct').hide();
    $('#formLabel').removeClass('correct');
    $('#text_input').removeClass('inputClass');

    $('#not-correct').hide();
    $('#formLabel').removeClass('not-correct');
    $('#text_input').removeClass('inputClass');


    if(palindrome()){
      $('#correct').show();
      $('#correct').html('The input given is a Palindrome');
      $('#formLabel').addClass('correct');
    $('#text_input').addClass('inputClass');
    $('#text_input').focus();
    $('#text_input').value = "";
    }
    else {
      $('#not-correct').show();
      $('#not-correct').html('The input given is not a Palindrome');
      $('#formLabel').addClass('not-correct');
    $('#text_input').addClass('inputClass');
    $('#text_input').focus();
    $('#text_input').value = "";
     
    }

    const li = `<li class=${palindrome() ? 'is-palindrome' : 'not-palindrome'}> ${$('#text_input').val()} </li>`;
    $('#attempts').append(li);
    $('#myForm').trigger('reset');
    $('#text_input').focus();
  } else {

    $('#correct').hide();
    $('#formLabel').removeClass('correct');
    $('#text_input').removeClass('inputClass');

    $('#not-correct').hide();
    $('#formLabel').removeClass('not-correct');
    $('#text_input').removeClass('inputClass');


    $('#error').show();
    $('#error').html('You must enter an valid input value');
    $('#formLabel').addClass('error');
    $('#text_input').addClass('inputClass');
    $('#text_input').focus();
    $('#text_input').value = "";
  }
});




