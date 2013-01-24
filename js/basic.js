function post(dest1, data1, rel) {
    $.ajax({
        type: "POST",
        url: dest1,
        data: data1,
        dataType: "json",
        success: function(data, textStatus) {
            if(rel==1) { 
                window.location.reload(false);                            
            }
        }
    });                        
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

$(function() {
	
	$( "#accordion" ).accordion();
	
	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];
	$( "#autocomplete" ).autocomplete({
		source: availableTags
	});
		

		
	$( "#button" ).button();
	$( "#radioset" ).buttonset();
	

	
	//$( "#tabs" ).tabs();
	
    $("#timepicker_inline_div1").timepicker({
        constrainInput: true,
        showPeriodLabels: false
    });
    $("#timepicker_inline_div2").timepicker({
        constrainInput: true,
        showPeriodLabels: false
    });
    
    $( "#switch00" ).slickswitch();
    $( "#switch01" ).slickswitch();
    $(".switch").each(function(index) { $(this).css("margin-top", "2px"); });
            
    $( "[id^=switch-]" ).each(function(index) {
        var switchnr = parseInt($( "[id^=switch-]" ).get(index).id.replace("switch-",""));
        var postto = window.location.href.slice(window.location.href.lastIndexOf("/"));
        $(this).slickswitch({
            toggledOn: function() {            
                post(postto, { myid:switchnr, what:"1" }, 0); 
            },
            toggledOff: function() {  
                post(postto, { myid:switchnr, what:"0" }, 0); 
            }
        });
    });

    $(".switch").each(function(index) { $(this).css("margin-left", "7px"); });

	var dialognr = -1;
    
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 300,
		buttons: [
			{
				text: "Delete",
				click: function() {
                    var postto = window.location.href.slice(window.location.href.lastIndexOf("/"));
                    post(postto, { myid:dialognr, what:"-1" }, 1);
					$( this ).dialog( "close" );                        
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});

	$( "[id^=icons-]" ).click(function( event ) {
        dialognr = parseInt($(this).attr('id').replace("icons-",""));
		$( "#dialog" ).dialog( "open" );
		event.preventDefault();            
	});
	$( "[id^=icons-]" ).each(function(i) {
        $(this).height(14);
        $(this).width(14);
        $(this).css("margin-left", "7px");
    });

		
	$( "#datepicker" ).datepicker({
        constrainInput: true,
        minDate: -1,            
        dateFormat: "dd.mm.yy"
	});

	$( "#slider" ).slider({
		range: true,
		values: [ 17, 67 ]
	});
	
	$( "[id^=progressbar]" ).each(function(i) {
        $(this).progressbar({
            value: parseInt($(this).attr('id').replace("progressbar","")),
        });
        $(this).width(100);
        $(this).height(14);
        $(this).css("float", "left");
    });

	// Hover states on the static widgets
	$( "[id^=icons-]" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);

//	$(function() {
    var selcount = 0;
    $( "#selectabletitle" ).selectable({
        disabled: true,
        autoRefresh: false
    });
    $( "#selectable" ).selectable({
        autoRefresh: false,
        selected: function (event, ui) {
            //alert (ui);
        }
        start: function (event, ui) {
            alert(ui);            
        }
    });
    
    $(function() {
        $( document ).tooltip();
    });
	
	$( "[id=event]" ).each(function(i) {        
		w = $(this).attr('width')+"%";
		x = $(this).attr('x')+"%";
		y = parseInt($(this).css("height").replace("px","")) * parseInt($(this).attr('y'))+"px";
        y = "0px"
		//alert (y);
        $(this).css("margin-top", y);		
        $(this).css("margin-left", x);		
        $(this).css("width", w);		
        if (parseInt($(this).attr('y'))>=1) {
        }
	});
	
	
	
});


$(function() {

    //var allFields = $( [] ).add( "#name"  ).add( "#email" ).add( "#password" );
    //tips = $( ".validateTips" );
    /*var name = $( "#name" ),
    email = $( "#email" ),
    password = $( "#password" ),
    allFields = $( [] ).add( name ).add( email ).add( password ),*/
    //tips = $( ".validateTips" );
    var allFields =  $( [] ).add( "#recname" ).add( "#channel" ).add( "#datepicker" ).add( "#timepicker_inline_div1" ).add( "#timepicker_inline_div2" );
    function updateTips( t ) {
        $( ".validateTips" )
        .text( t )
        .addClass( "ui-state-highlight" );
        setTimeout(function() {
            $( ".validateTips" ).removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    function checkLength( o, n, min, max ) {
        x = document.getElementById(o);
        if ( x.value.length > max || x.value.length < min ) {
            $("#"+o).addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
            min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }
    function checkRegexp( o, regexp, n ) {
        x = document.getElementById(o);
        if ( !( regexp.test( x.value ) ) ) {
            $("#"+o).addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }
    $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 310,
        width: 350,
        modal: true,
        buttons: {
            "Schedule a record": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );
                bValid = bValid && checkLength( "recname", "record name", 1, 20 );
                bValid = bValid && checkRegexp( "recname", /^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\";|//]+$/, "No special chars in this field please" );
                bValid = bValid && checkLength( "channel", "channel", 1, 50 );
                bValid = bValid && checkLength( "datepicker", "date", 10, 10 );
                bValid = bValid && checkRegexp( "datepicker", /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/, "Please use DD.MM.YYYY for this field" );
                bValid = bValid && checkLength( "timepicker_inline_div1", "start time", 5, 5 );
                bValid = bValid && checkRegexp( "timepicker_inline_div1", /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/, "Please use HH:MM format for this field" );
                bValid = bValid && checkLength( "timepicker_inline_div2", "end time", 5, 5 );
                bValid = bValid && checkRegexp( "timepicker_inline_div2", /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/, "Please use HH:MM format for this field" );
                if ( bValid ) {
                    $( this ).dialog( "close" );                    
                    var akt = 0;
                    if ($("#switch00").attr("checked") == "checked") {akt = 1;}
                    //alert (document.getElementById("timepicker_inline_div1").value);
                    post("/create", { 
                        recname:document.getElementById("recname").value, 
                        Sender:document.getElementById("channel").value, 
                        von:document.getElementById("timepicker_inline_div1").value, 
                        bis:document.getElementById("timepicker_inline_div2").value, 
                        am:document.getElementById("datepicker").value, 
                        aktiv:akt 
                    }, 1); 
                    //$( "#users tbody" ).append( "<tr>" +
                    //"<td>" + document.getElementById("channel").value + "</td>" +
                    //"<td>" + $("#timepicker_inline_div1").value + "</td>" +
                    //"<td>" + password.val() + "</td>" +
                    //"<td>" + password.val() + "</td>" +
                    //"</tr>" );
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.removeClass( "ui-state-error" ); //.val( "" )
        }
    });
    
    $( "#upload-form" ).dialog({
        autoOpen: false,
        height: 190,
        width: 270,
        modal: true,
        buttons: {
            "Upload file": function() {
                $( this ).dialog( "close" );                    
                document.uploader.submit();                
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });
    
    $( "#createchannel-form" ).dialog({
        autoOpen: false,
        height: 195,
        width: 250,
        modal: true,
        buttons: {
            "Create channel": function() {
                $( this ).dialog( "close" );    
                var akt = 0;
                if ($("#switch01").attr("checked") == "checked") {akt = 1;}
                post("/create_channel", { 
                    cname:document.getElementById("cname").value, 
                    cpath:document.getElementById("cpath").value, 
                    aktiv:akt 
                }, 1);                                 
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });

    $( "#create-user" )
        .button()
        .click(function() {
            $( "#dialog-form" ).dialog( "open" );
        });
        
    $( "#create-channel" )
        .button()
        .click(function() {
            $( "#createchannel-form" ).dialog( "open" );
        });
        
    $( "#upload-user" )
        .button()
        .click(function() {
            $( "#upload-form" ).dialog( "open" );
        });
});
