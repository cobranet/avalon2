/*global superagent, window */
var request = window.superagent;
var dataService = function dataService(store) {
    return function (next) {
	return function (action) {
	    /*
	      Pass all actions through by default
	    */
	    next(action);
	    console.log("call");
	    switch (action.type) {
            case 'SIGN_IN':
		/*
		  In case we receive an action to send an API request, send the appropriate request
		*/
		request.post('http://localhost:3000/logs/').send({userid:action.userid,desc: "signin"}).end(function (err, res) {
		    if (err) {
			/*
			  in case there is any error, dispatch an action containing the error
			*/
			return next({
			    type: 'SIGN_IN_DATA_ERROR',
			    err: err
			});
		    }
		    var data = JSON.parse(res.text);
		    /*
		      Once data is received, dispatch an action telling the application
		      that data was received successfully, along with the parsed data
		    */
		    next({
			type: 'SIGN_IN_DATA_RECEIVED',
			data: data
		    });
		});
		break;
		/*
		  Do nothing if the action does not interest us
		*/
            default:
		break;
	    }
	};
    };
};
