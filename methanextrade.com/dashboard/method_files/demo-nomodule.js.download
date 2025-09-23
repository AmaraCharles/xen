$('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count').replace(/,/g, '');

    $({
        countNum: $this.text()
    }).animate({
        countNum: countTo
    }, {
        duration: 5000,
        easing: 'linear',
        step: function() {
            $this.text(numberWithCommas(Math.floor(this.countNum)));
        },
        complete: function() {
            $this.text(numberWithCommas(this.countNum));
        }
    });
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}