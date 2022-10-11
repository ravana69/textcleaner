'use strict';
var en = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours 	ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];

function selectLanguage(input) {
    window.language = window[input];
}
function getLanguage(input) {
    return window[input];
}

function countParagraphs(text) {
    var amount = 0;
    if (text == "") {
        amount = 0;
    } else if (text.substring(text.length - 1, text.length) == "\n") {
        amount = text.replace(/\n+|\n+$|(\n)+/g, "#").split("#").length - 1;
    } else {
        amount = text.replace(/\n+|\n+$|(\n)+/g, "#").split("#").length;
    }
    if (amount > 1) {
        return amount;
    } else {
        return amount;
    }
}
function countSentences(text) {
    var amount = 0;
    if (text == "") {
        amount = 0;
    } else if ((text.substring(text.length - 1, text.length) == "?") || (text.substring(text.length - 1, text.length) == "!") || (text.substring(text.length - 1, text.length) == ".")) {
        amount = text.replace(/(\.|!|\?)+|(\.|!|\?)+$|(\.|!|\?)+/g, "#").split("#").length - 1;
    } else {
        amount = text.replace(/(\.|!|\?)+|(\.|!|\?)+$|(\.|!|\?)+/g, "#").split("#").length;
    }
    if (amount > 1) {
        return amount;
    } else {
        return amount;
    }
}
function countWords(text) {
    if (text.length == 0) {
        return 0;
    }
    return text.trim().replace(/\s+/gi, ' ').split(' ').length;
}
function countCharactersWSpace(text) {
    if (text.replace("\n").length == 0) {
        return text.replace(/\n/g, "").length;
    } else {
        return text.replace(/\n/g, "").length;
    }
}
function countCharacters(text) {
    if (text.split(" ").length - 1 <= 1) {
        return text.split(" ").length - 1;
    } else {
        return text.split(" ").length - 1;
    }
}
function inp() {
    var t = $('#input');
    localStorage.text = t.val();

    $('#chart-count').text(countCharactersWSpace(t.val()));
    $('#chart-words').text(countWords(t.val()));
    $('#chart-sentences').text(countSentences(t.val()));
    $('#chart-paragraphs').text(countParagraphs(t.val()));
    $('#chart-whitespace').text(countCharacters(t.val()));

    var output = "",
        finalOutput = [],
        textSplit = t.val()
            .replace(/\n/g, " ")
            .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
            .split(" ");

    for (var i = 0; i < textSplit.length; i++) {
        if (textSplit[i] == "") {
            textSplit.splice(i, 1);
            i--;
            continue;
        }
        if (language.indexOf(textSplit[i].toLowerCase()) == -1) {
            if (finalOutput[textSplit[i].toLowerCase()] != undefined) {
                finalOutput[textSplit[i].toLowerCase()]++;
            } else {
                finalOutput[textSplit[i].toLowerCase()] = 1;
            }
            if (isNaN(finalOutput[textSplit[i].toLowerCase()])) {
                finalOutput[textSplit[i].toLowerCase()] = 1;
            }
        }
    }

    var start = "";
    var end = "",
        sorted = [];
    for (var a in finalOutput)
        sorted.push([a, finalOutput[a]])
    sorted.sort(function(a, b) {
        return a[1] - b[1]
    });
    sorted.reverse();
    for (i = 0; i < sorted.length; i++) {
        start = '';
        end = '';
        if ((i % 4) == 0) {
            if (i != 0) {
                start += "</div>";
            }
        }
        output += start + "<li><div>" + (sorted[i][0]) + "</div><span>" + sorted[i][1] + "</span><i>" + ((sorted[i][1] / textSplit.length) * 100).toFixed(2) + "%</i></li>";
    }

    $('#output').html(output);
}
function throttle() {
    clearTimeout(window.timer);
    window.timer = window.setTimeout(function() {
        inp();
    }, 300);
}
function setSelectionRange(node, selectionStart, selectionEnd) {
    if (node.setSelectionRange) {
        node.focus();
        node.setSelectionRange(selectionStart, selectionEnd);
    } else if (node.createTextRange) {
        var range = node.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0,
             j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s','g'), function(txt) {
            return txt.toLowerCase();
        });
    uppers = ['Id', 'Tv'];
    for (i = 0,
             j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b','g'), uppers[i].toUpperCase());
    return str;
};
String.prototype.toSentenceCase = function() {
    var str;
    var rg = /(^\w{1}|(\.|\?|!)\s+\w{1})/gi;
    str = this.toLowerCase().replace(rg, function(toReplace) {
        return toReplace.toUpperCase();
    });
    return str;
};

(function ($) {
    selectLanguage($('html').attr('lang'));

    $('.cop').on('click', 'a', function(e){
        e.preventDefault();

        var id = $(this).attr('href').replace('#', '');
        var top = $('#'+id).offset().top;

        $('html, body').animate({'scrollTop': top - 20}, 300);
    });

    $(document).on('input', '#input', throttle);
    $(document).on('focusout', '#input', inp);

    $('.scrollable').scrollbar();

    $('.cha .cont .left menu > li.clear').click(function(){
        $('#input').val('').trigger('input');
    });

    if (localStorage.autosave == 'true') {
        $('#b_autosave').addClass('active');
        $('#input').val(localStorage.text).trigger('input');
    }

    // autosave
    $(document).on('click', '#b_autosave', function(){
        if ($(this).hasClass('active')) {
            localStorage.autosave = false;
            $(this).removeClass('active');
        } else {
            localStorage.autosave = true;
            localStorage.text = $('#input').val();
            $(this).addClass('active');
        }
    });
    $(document)
        .on('click', '.cha .cont .left menu li.size li', function(){
            $('#input').css('font-size', $(this).css('font-size'));
        })
        .on('click', '.cha .cont .left menu li.font li', function(){
            $('#input').css('font-family', $(this).css('font-family'));
        })
        .on('click', '.cha .cont .left menu li.undo', function(){
            document.execCommand("undo", false, null);
        })
        .on('click', '.cha .cont .left menu li.redo', function(){
            document.execCommand("redo", false, null);
        })
        .on('click', '.cha .cont .left menu li.case li', function(event){
            var letter_case = $(this).attr('class');
            var text = '';
            var selection = '';
            var input = $('#input');
            event.preventDefault();

            if (input.selection() != '') {
                var start = input.prop("selectionStart");
                var end = input.prop("selectionEnd");
                input.focus();

                if ('WebkitAppearance'in document.documentElement.style) {
                    switch (letter_case) {
                        case 'uc':
                            selection = input.selection().toUpperCase();
                            break;
                        case 'lc':
                            selection = input.selection().toLowerCase();
                            break;
                        case 'tc':
                            selection = input.selection().toTitleCase();
                            break;
                        case 'sc':
                            selection = input.selection().toSentenceCase();
                            break;
                    }
                    document.execCommand("insertHTML", false, selection);
                    setSelectionRange(input[0], start, end);
                } else {
                    switch (letter_case) {
                        case 'uc':
                            input.selection('replace', {
                                text: input.selection().toUpperCase()
                            });
                            break;
                        case 'lc':
                            input.selection('replace', {
                                text: input.selection().toLowerCase()
                            });
                            break;
                        case 'tc':
                            input.selection('replace', {
                                text: input.selection().toTitleCase()
                            });
                            break;
                        case 'sc':
                            input.selection('replace', {
                                text: input.selection().toSentenceCase()
                            });
                            break;
                    }
                }
            } else {
                input.focus();
                switch (letter_case) {
                    case 'uc':
                        text = input.val().toUpperCase();
                        break;
                    case 'lc':
                        text = input.val().toLowerCase();
                        break;
                    case 'tc':
                        text = input.val().toTitleCase();
                        break;
                    case 'sc':
                        text = input.val().toSentenceCase();
                        break;
                }
                if ('WebkitAppearance'in document.documentElement.style) {
                    document.execCommand('selectAll', false, null);
                    document.execCommand("insertHTML", false, text);
                } else {
                    input.val(text);
                }
            }
            inp();
        });

    $(document)
        .on('click', 'header .open', function () {
            $('header .right').addClass('show');
        })
        .on('click', 'header .right .head .close', function () {
            $('header .right').removeClass('show');
        });
})(jQuery);