$(document).ready(function(){
    var attributo = $('h1').data('this-data');
    $('h1').attr('data-this-data', '2018-01-01');
    var dataCorrente = moment('2018-01-01');
    insertDays(dataCorrente);
    insertHolidays(dataCorrente);
    $('button#next').click(function(){
        next(dataCorrente);
    })
    $('button#prev').click(function(){
        prev(dataCorrente);
    })
});

function insertHolidays(data){
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data:{
            year: data.year(),
            month: data.month()
        },
        success : function(risposta){
            for ( var i = 0; i < risposta.response.length; i++) {
              var listItem = $('li[date-complete-date = "'+ risposta.response[i].date + '"]');
              listItem.append('-' + risposta.response[i].name);
              listItem.addClass('holiday');
            }
        },
        error: function(){
            alert ('errore');
        }
    });
}
function insertDays(data){
    $('ul.month-list').empty();
    var month = data.format('MMMM');
    var year = data.format('YYYY');
    $('h1.month').html(month + ' ' + year);
    var daysMonth = data.daysInMonth();
    for ( var i = 1; i <= data.daysInMonth(); i++) {
        var source = $('#day-template').html();
        var template = Handlebars.compile(source);
        var context = {
            day: addZero(i),
            month: month,
            completeDate: year + '-' + data.format('MM') + '-' + addZero(i),
        };
        var html = template(context);
        $('.month-list').append(html);
    }
}

function next(data){
    if(data.month() == 11){
        alert('mese non disponibile')
    } else {
        data.add(1, 'months');
        insertDays(data);
        insertHolidays(data);
    }
}

function prev(data){
    if(data.month() == 0){
        alert('mese non disponibile')
    } else {
        data.subtract(1, 'months');
        insertDays(data);
        insertHolidays(data);
    }    
}

function addZero(n){
    if (n < 10){
        return '0' + n;
    }
    return n;
}