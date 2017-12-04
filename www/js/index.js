var notification_count=0;

$(document).on('pageinit', function() {

	$('#messageButton').on('click', function() {
		createMessage();
	});

	$('#dialogButton').on('click', function() {
		createDialog();
	});


	$('#notificationButton').on('click', function() {
		createNotification();
	});


});



function createMessage(){
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: 'An example message.', duration: 3000});
}


function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example

	navigator.notification.confirm(
    	'How long have you been working without a break?',  // message
        dialogDismissed,         // callback
        'Work hours!',            // title
        ['More than 3 hours', 'Less than 3 hours']                  // buttons
    );

}



function dialogDismissed(buttonIndex) {

	if(buttonIndex==1) {
		new Toast({
			content: "You should take a break and have something to eat!",
			duration: 3000
		});
		scheduleNotification(
			"Are you back from your break?",
			"You have been on a break for 30 seconds now you should be back at work!!",
			30000
		)
	}	else if(buttonIndex==2) {
		new Toast({
			content: 'You need to work for longer before taking a break!',
			duration: 3000
		});
		scheduleNotification(
			"Is it time for a break?",
			"You told me you had been working for less than 3 hours! Has it passed that time?",
			30000
		)
	}
}


function scheduleNotification(notificationTitle, notificationMessage, waitTime) {
	var currentTime = new Date().getTime();
	var notificationTime = new Date(currentTime + waitTime);

	cordova.plugins.notification.local.schedule({
		id: 1,
		title: notificationTitle,
		message: notificationMessage,
		date: notificationTime
	})
}


function createNotification() {

	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + 1000); //delayed time  - add 1 second

    //
    //setup notification
    //

    cordova.plugins.notification.local.schedule({
    	id: 		1,
        title: 		"Hey you",
        message: 	"This is an example notification",
        date: 		notificationTime,
        badge: 		notification_count++
   	});

}
