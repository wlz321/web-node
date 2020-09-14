$(function() {
    var totalPage = 1 * $("body").data('total_page');
    var currentPage = 1 * $("body").data('page');
    $("#pagination").pagination({
        currentPage: currentPage,
        totalPage: totalPage,
        callback: function(current) {
            $("#current1").text(current)
        }
    });
    $("#pagination").on('click','.ui-pagination-page-item',function(ev){
        var current = $(ev.currentTarget).data('current')
        let href = window.location.href ;
        if(href.match(/page=\d+/)){
            window.location.href = href.replace(/page=\d+/,'page='+current)
        }else{
            if(href.indexOf('?') == -1){
                window.location.href = href+'?page='+current
            }else{
                window.location.href = href+'&page='+current
            }
        }
    });

});