$('button:first-child').click(() => {
  if ($('div:nth-child(4)').attr('class') === 'classNew') {
    for (let i = 4; i <= 6; i += 1) {
      $(`div:nth-child(${i})`).removeClass();
      $(`div:nth-child(${i})`).addClass(`class${i}`);
    }
  } else {
    $('div:nth-child(4)').removeClass();
    $('div:nth-child(5)').removeClass();
    $('div:nth-child(6)').removeClass();
    $('div:nth-child(4)').addClass('classNew');
    $('div:nth-child(5)').addClass('classNew');
    $('div:nth-child(6)').addClass('classNew');
  }

});

$('button:last-child').click(() => {
    $(`div:nth-child(even) > p`).fadeToggle(1000);
    $(`div:nth-child(odd) > h1`).fadeToggle(500);
    /*
  for (let i = 1; i <= 6; i += 1) {
    if ($(`div:nth-child(${i}) p`).attr('id') % 2 === 0) {
      $(`div:nth-child(${i}) > p`).fadeToggle(500);
    } else {
      $(`div:nth-child(${i}) > h1`).fadeToggle(500);
    }
  }
  */
});