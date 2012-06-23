(function($, window, undefined) {
    var jsSimple = function(elem, opciones) {
        this.$elem = $(elem);

        if(this.init) {
            this.init(opciones);
        }
    }
    jsSimple.prototype = {
        defaults : {
            width : 250,
            disable: false
        },
        init : function(opciones) {
            this.config = $.extend({}, this.defaults, opciones);
            this.id = this.$elem.attr('id');
            this.type = (this.$elem.attr("multiple") == undefined) ? 'single': 'mult';
            this.width = (parseInt(this.$elem.outerWidth()) > 0) ? parseInt(this.$elem.outerWidth()): this.config.width;
            this.$elem.css('display', 'none');

            if (this.type == 'single')
                this.single();
            else
                this.multi();           
        },
        single: function(){
            jss = this;
            var $tplSingle = $('<div class="jss_wrap jss_single" id="jss_'+this.id+'" style="width: '+this.width+'px"><div class="jss_box"  style="width: '+(this.width - 2)+'px"><div class="jss_item"></div><span class="jss_arrow"></span></div><ul class="jss_options" style="width: '+(this.width - 2)+'px; display:none"></ul></div>');
            var options = this.getOptions();
            if (options.length>0) {
                for(i in options){
                    var $optionsLi = $('<li>'+options[i].text+'</li>');
                    if (i==0 || options[i].value == this.$elem.val())
                        $(".jss_item", $tplSingle).html(options[i].text);
                    if (options[i].value == this.$elem.val())
                        $optionsLi.addClass('jss_active');

                    $optionsLi.data("value",options[i].value).click(function(){
                        jss.$elem.val($(this).data('value'));
                        $(".jss_item", $tplSingle).html($(this).html());
                        $("li", $tplSingle).removeClass('jss_active');
                        $(this).addClass('jss_active');
                    }).hover(function() {
                        $(this).addClass("lss_hover");
                    },function() {
                        $(this).removeClass("lss_hover");
                    });
                    $(".jss_options", $tplSingle).append($optionsLi);
                }
            };

            $('.jss_item', $tplSingle).parent().hover(function() {
                $(this).addClass("jss_box_hover");
            },function() {
                $(this).removeClass("jss_box_hover");
            });

            $('.jss_item, .jss_arrow, li', $tplSingle).click(function(){
                if(!$('.jss_arrow', $tplSingle).hasClass('jss_arrow_hover')){
                    $('.jss_arrow', $tplSingle).addClass('jss_arrow_hover');
                    $('.jss_box', $tplSingle).addClass('jss_active');
                    $(".jss_options", $tplSingle).show();
                }else{
                    $('.jss_arrow', $tplSingle).removeClass('jss_arrow_hover');
                    $('.jss_box', $tplSingle).removeClass('jss_active');
                    $(".jss_options", $tplSingle).hide();

                }
            });
            this.$elem.after($tplSingle);
        },
        multi: function(){
            jss = this;
            var $tplMulti = $('<div class="jss_wrap jss_mult" id="jss_'+this.id+'" style="width: '+this.width+'px"><div class="jss_box"  style="width: '+(this.width - 2)+'px"><input type="text" class="jss_search"></div><ul class="jss_options" style="width: '+(this.width - 2)+'px; display:none"></ul></div>');
            var options = this.getOptions();

        },
        getOptions: function(){
            var options = [];
            $('option', this.$elem).each(function(i, item){
                var $item = $(item);

                options.push({pos: i, value: $item.val(), text: $item.text()});
            });
            return (options)
        },
        strTo: function(str){
            var e = "áéíóú";
            var r = "aeiou";
            str = str.toLowerCase();
            for (var i = 0; i < e.length; i++) {
                str = this.replace(e[i],r[i], str);
            };
            return str;
        },
        replace: function(search, replace, string){
            while (string.toString().indexOf(search) != -1)
                string = string.toString().replace(search,replace);
            return string;
        }
    }
    $.fn.jssimple = function(opciones) {

        $.each(this, function(){
            if(typeof opciones == "string") {
                metodo = opciones;
                args = Array.prototype.slice.call(arguments, 1);

                var jss_simple = $(this).data('jss_simple') ?
                    $(this).data('jss_simple') : 
                    new jsSimple(this);
                
                if(jss_simple[metodo]) {
                    jss_simple[metodo].apply(jss_simple, args);    
                }
            } else if(typeof opciones == 'object' || !opciones) {
                $(this).data('jss_simple', new jsSimple(this, opciones));
            } else {
                $.error('Error, parámetro pasado es incorrecto');
            }
            return this;
        });
    }

    window.jsSimple = jsSimple;
}) (jQuery, window);

$(function() {
    $(".jss-simple").jssimple();
});