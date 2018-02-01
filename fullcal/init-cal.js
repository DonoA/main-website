$(document).ready(function() {

  Date.prototype.formatTime = function() {
  	var h = this.getHours();
    var m = this.getMinutes();
    var isPM = h < 12;
    
    if (h > 12)
    	h -= 12;
    if (m < 10)
    	m = '0' + m;
    
    return h + ':' + m + (isPM ? 'pm' : 'am');
  };

  var tooltip = $('<div/>').qtip({
		id: 'calendar',
		prerender: true,
		content: {
			text: ' ',
			title: {
				button: false
			}
		},
		position: {
			my: 'bottom center',
			at: 'top center',
			target: 'mouse',
			viewport: $('#calendar'),
			adjust: {
			  mouse: false,
			  scroll: false
			}
		},
		show: {
    		delay: 100
    	},
		hide: {
        	fixed: true,
        	delay: 300
    	},
		style: 'qtip-light'
	}).qtip('api');

  $('#calendar').fullCalendar({

	header: {
	  left: 'prev,next today',
	  center: 'title',
	  right: 'agendaWeek,month'
	},
	defaultView: 'month',
	minTime: '08:00:00',
	maxTime: '22:00:00',
	navLinks: true,
	eventLimit: true,
	googleCalendarApiKey: 'AIzaSyCnRyFyPuJ9WSeu602Q7CE13TsxWVNbw10',

	// Calendar
	eventSources: [
		{
			googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
			color: 'rgb(0, 135, 69)',
			borderColor: 'rgb(0, 135, 69)'
		},
		{
			googleCalendarId: 'santaclara.acm@gmail.com',
			color: 'rgb(0, 152, 233)',
			borderColor: 'rgb(0, 152, 233)'
		}
	],

	// overwrite to give a better event click function
	eventClick: function(event) {
		// opens events in a popup window
		window.open(event.url, 'gcalevent', 'width=700,height=600');
		return false;
	},

	eventMouseover: function(event, jsEvent, view) {
		var title = '<h4>'+event.title+'</h4>';

		body = '<p><b>When:</b> ';
		if (event.allDay)
		    body += 'All day';
		else
			body += event.start.formatTime()+' - '+event.end.formatTime()

		if (event.location)
			body += '<br/><p><b>Where:</b> '+event.location;
		if (event.description)
			body += '<br/><p><b>Description:</b> '+event.description;

		tooltip.set({
			'content.title': title,
			'content.text': body
		})
		.reposition(jsEvent).show(jsEvent);
	},

	dayClick: function() { tooltip.hide() },
	eventResizeStart: function() { tooltip.hide() },
	eventDragStart: function() { tooltip.hide() },
	viewDisplay: function() { tooltip.hide() },

	views: {
		agendaWeek: {
			titleFormat: 'MMMM YYYY',
			columnFormat: 'ddd D'
		}
	},

	loading: function(bool) {
		$('#loading').toggle(bool);
	}

  });

});
