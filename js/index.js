
$('body').on('change', '#contract', update);
$('body').on('click', '.phone, .contract, .data, .extra', update);

/*
  display kallas på när... för att...
*/
function display(price){
  console.log('price', price);
  // konvertera price till ...
  price = price.toString();
  price = price.split('')
  price = price.reverse();
  let p_100 = 0;
  if(price[2]){
    p_100 = price[2];
  }
  let p_10 = 0;
  if(price[1]){
    p_10 = price[1];
  }
  let p_1 = price[0];
  let f = 30;
  $('.n-100').animate({'margin-top': p_100 * -f});
  $('.n-10').animate({'margin-top': p_10 * -f});
  $('.n-1').animate({'margin-top': p_1 * -f});
}


function update(){
  let phone = $('.phone>input:checked').val();
  let whatPhone = $('.phone>input:checked').parent().find('h2').text();
  phone = parseInt(phone);
  phone = phone? phone : 0;

  let contract = $('#contract>option:selected').val();
  let whatContract = $('#contract>option:selected').text();
  contract = parseInt(contract);
  contract = contract? contract : 0;

  let data = $('.data>input:checked').val();
  data = parseInt(data);
  data = data? data : 0;

  let extra = 0;
  $('.extra>input:checked').each(function(){
    let x = parseInt($(this).val());
    if(x > 0){
      extra += x;
    }
  });

  let price = phone + contract + data + extra;

  // om man väljer iPhone G och 12 månader student ska man få 20% rabatt på totalsumman.
  if(whatPhone == 'iPhone G' && whatContract == '12 mån Student'){
    price = price * 0.8;
    $('#notice').children('h2').text("Du får 20% rabatt på totalsumman när du väljer iPhone G och 12 månader student!");
    $('#notice').show(500).delay(1000).hide(500);
    $('#confirm').children('h2').text("Du fick 20% rabatt på totalsumman när du valde iPhone G och 12 månader student!");
  }else{
    $('#confirm').children('h2').text("");
  }

  $('#price').val(price);
  display(price);
}


$(document).on('click', '#order>button', function(e){
  e.preventDefault();
  $('#order>input').toggle();
  $(this).toggleClass('showing-form');
});


$(document).on('submit','#order', function(e){
  e.preventDefault();
  $('#order>input').hide();
  $('#confirm').show().delay(2000).fadeOut(500);
});