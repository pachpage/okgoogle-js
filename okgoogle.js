OKGoogle = function(arr) {
    if (!arr) arr = ['ok google', 'okay google'];
    var callback = function() {};
    this.setCallback = function(input){
    	callback = input;
    }
    var rec = new webkitSpeechRecognition();
    if (rec) {
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = 'en';

        // Define a threshold above which we are confident(!) that the recognition results are worth looking at 
        var confidenceThreshold = 0.5;

        // Simple function that checks existence of s in str
        var userSaid = function(str, s) {
                return str.toLowerCase().indexOf(s.toLowerCase()) > -1;
            }

            // Process the results when they are returned from the recognizer
            rec.onresult = function(e) {
                // Check each result starting from the last one
                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    // If this is a final result
                    if (e.results[i].isFinal) {
                        // If the result is equal to or greater than the required threshold
                        if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
                            var str = e.results[i][0].transcript;
                            console.log('Recognized: ' + str);
                            for (var x = 0; x < arr.length; x++) {
                                if (userSaid(str, arr[x])) {
                                    var said = str.substring(str.indexOf(arr[x]) + arr[x].length);
                                    if (said.substring(0, 1) == " ") said = said.substring(1);
                                    callback({
                                        "transcript": said,
                                        "contains": function(input) {
                                            return said.indexOf(input) > -1;
                                        }
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            };

        // Start speech recognition
        this.start = function() {
            rec.start();
        };
        // Stop speech recognition
        this.stop = function() {
            rec.stop();
        };
    }
};
