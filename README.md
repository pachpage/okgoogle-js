# okgoogle-js

### Usage
Include `<script src="okgoogle.js" type="text/javascript"></script>` in the `<head>` of your HTML page.
```javascript
var okgoogle = new OKGoogle([phrase]); //Creates new OK Google object
  /*
    The phrase is an array of phrases that can trigger the callback
    The default phrase to listen to is "OK Google"
    When listening for the phrase, the recognition is case-insensitive
  */
okgoogle.setCallback(function(event){ //Sets callback for when the user says, "OK Google"
    console.log(event.transcript); //What the user said after "OK Google"
    event.contains(string); //Returns boolean representing whether the string inputted is in the transcript
});
okgoogle.start(); //Starts recognition
okgoogle.stop(); //Stops recognition
```
### Example
```javascript
var recipe = ["1. Add flour","2. Mix thoroughly","3. Bake for 30 minutes"];
var currentStepNumber = 0;
var okgoogle = new OKGoogle(["OK Cookbook","okay cookbook","OK cook book", "okay cook book"]);
okgoogle.setCallback(function(event){
    if (event.contains("next step")){
        currentStepNumber++;
        alert(recipe[currentStepNumber]);
    } else if (event.contains("previous step")){
        currentStepNumber -= 1;
        alert(recipe[currentStepNumber]);
    }
});
okgoogle.start();
alert(recipe[currentStepNumber]);
```
[View demo](https://rawgit.com/pachpage/okgoogle-js/master/demo/demo.html)
