jQuery('.Slider_Item').each(function(index,element){
  jQuery('#pagination').append('<div class="Pagination_Item" to-slide="'+index+'"></div>');
});

var slider_row   = jQuery('.Slider_Row'),
    next_button  = jQuery('#next_button'),
    prev_button  = jQuery('#prev_button'),
    slider_items = jQuery('.Slider_Item'),
    pagination_items = jQuery('.Pagination_Item');

slider_row.css('width',jQuery('.Slider_Item:first').outerWidth() * slider_items.length);
pagination_items.eq(0).addClass('active');

var cooldown = false;

next_button.on('click',function(){
  if(!cooldown){
    cooldown = true;
    var current_translate = slider_row.css('-webkit-transform').split(/[()]/)[1],
    position_x        = Number(current_translate.split(',')[4]),
    new_position      = position_x - 920 <= (slider_items.length) * -920 ? 0 : position_x - 920;

    slider_row.css('transform','translateX('+new_position+'px)');
    pagination_items.removeClass('active');
    pagination_items.eq(new_position / -920).addClass('active');
    setTimeout(function(){
      cooldown = false;
    },500)
  }
});

prev_button.on('click',function(){
  if(!cooldown){
    cooldown = true;
    var current_translate = slider_row.css('-webkit-transform').split(/[()]/)[1],
        position_x        = Number(current_translate.split(',')[4]),
        new_position      = position_x + 920 > 0 ? (slider_items.length - 1) * -920 : position_x + 920;

    slider_row.css('transform','translateX('+new_position+'px)');
    pagination_items.removeClass('active');
    pagination_items.eq(new_position / -920).addClass('active');
    setTimeout(function(){
      cooldown = false;
    },500);
  }
});

pagination_items.on('click',function(){
  var new_position = Number(jQuery(this).attr('to-slide')) * -920;
  slider_row.css('transform','translateX('+new_position+'px)');
  pagination_items.removeClass('active');
  pagination_items.eq(new_position / -920).addClass('active');
});
