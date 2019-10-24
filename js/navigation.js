
// This is preparation done on the page startup to setup the initial page start
$().ready(function(){

  hideErrorAlerts();

  $("#personalLink a").click(function(){
    showPersonalDetails(); 
    return false;
  });

  $("#carLink a").click(function(){
    showCarDetails(); 
    return false;
  });

  $("#quoteLink a").click(function(){
    showQuoteDetails(); 
    return false;
  });
});

function showCarDetails(){  

 validateshowCarDetails();
    // Hide the personal details section (dvPersonalDetails)
    // Hide the quote section (dvQuoteDetails)
    // Show the car details section (dvCarDetails)
  }

  function validateshowCarDetails(){
    var name = $('#txtName').val();
    var age = $('#txtAge').val();
    var towncity = $('#txtTownCity').val();
    var emailaddress = $('#txtEmailAddress').val();
    var yearsnoclaimsbonus = $('#txtYearsNoClaimsBonus').val();
    var genderMale = $('#genderMale').prop('checked')
    var genderFemale = $('#genderFemale').prop('checked')

    var isValid = true;

    if(name == ""){
      isValid =false;
    } 
    if(age == "" || age < 18){
      isValid =false;
    } 
    if(towncity == ""){
      isValid =false;
    } 
    if(emailaddress == ""){
      isValid =false;
    } 
    if(yearsnoclaimsbonus == ""){
      isValid =false;
    } 
    if(genderMale==false && genderFemale==false){
      isValid=false;
    }

    if (isValid == true){
     $("#dvCarDetails").show();
     $("#dvPersonalDetails").hide();
     $("#dvQuoteDetails").hide();
     setActiveNavigation('carLink');

   } else {
    $("#dvPersonalDetailsAlert").show();
  }
}


function showPersonalDetails() {
  $("#dvCarDetails").hide();
  $("#dvPersonalDetails").show();
  $("#dvQuoteDetails").hide();
  setActiveNavigation('personalLink');
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
    }

    function showQuoteDetails() {

      validateshowQuoteDetails();
    }
    function validateshowQuoteDetails(){
      var manufacturer = $('#txtManufacturer').val();
      var model = $('#txtModel').val();
      var carage = $('#txtCarAge').val();
      var enginesize = $('#txtEngineSize').val();
      var storage = $('#txtStorage').val();
      var estimatedvalue = $('#txtEstimatedValue').val();

      var isValid = true;

      if(manufacturer == ""){
        isValid =false;
      } 
      if(model == ""){
        isValid =false;
      }
      if(carage == ""){
        isValid =false;
      } 
      if(enginesize == ""){
        isValid =false;
      } 
      if(storage == ""){
        isValid =false;
      } 
      if(estimatedvalue == ""){
        isValid =false;
      }

      if (isValid==true){
        $("#dvCarDetails").hide();
        $("#dvPersonalDetails").hide();
        $("#dvQuoteDetails").show();
        setActiveNavigation('quoteLink');
      } else {
        $("#dvCarDetailsAlert").show();
      }

      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)

      getQuote();
    }

    function getQuote() {


    // Perform validation to test that all data has been entered

var genderMale = $('#genderMale').prop('checked');
    var genderFemale = $('#genderFemale').prop('checked');
    var actualGender = 'female';
    var storage = $('#txtStorage').val();
    var estimatedvalue = $('#txtEstimatedValue').val();
    var yearsnoclaimsbonus = $('#txtYearsNoClaimsBonus').val();

    if(genderMale == true){
      actualGender ='male';
    }


    var age = $('#txtAge').val();
    if (true)
    {
      // console.log('getQuote');
      var quote = calculateQuote({
        gender: actualGender,
        age: age,
        storage: storage,
        estimatedvalue: estimatedvalue,
        yearsnoclaimsbonus: yearsnoclaimsbonus
      });


      var finalQuote = quote.result;
      $("#quote").text(finalQuote);




  }
}

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }

function calculateQuote(model) {
// Setup basic values
    var basePrice = 500;

// Call each of our built functions to get the specific modifier needed to make the calculation

    var modifier = new Modifier();

    console.log('personal: ' + modifier.personal(model.age, model.gender));
    console.log('storage: ' + modifier.carStorage(model.storage));
    console.log('estimatedvalue: ' + modifier.carCost(model.estimatedvalue));

    var totalCost = basePrice * modifier.personal(model.age, model.gender) * modifier.carStorage(model.storage) * modifier.carCost(model.estimatedvalue);

    var temp = totalCost * modifier.noClaims(model.yearsnoclaimsbonus);

    totalCost = totalCost - temp;



// Return the calculated value as a JSON object
    return {result: totalCost};
}

class Modifier {
    carStorage(storage) {
      var modifier = 1;
      console.log(storage)
      if (storage == 'Public Road'){
        modifier = 1.8;
      }
      if (storage == 'DriveWay'){
        modifier = 0.9;
      }
      if (storage == 'Garage'){
        modifier = 0.9;
      }

      return modifier;


        /*  if location is 'Public Road' then return a modifier of 1.8
         *  if location is 'DriveWay' then return a modifier of 0.9
         *  if location is 'Garage' then return a modifier of 0.9
         *
         *  otherwise return 1
         */
    }
    //if(estimatedvalue == ""){
        //isValid =false;

    personal(age, gender) {
        //Set a default value for the modifier
        var modifier = 1.08;
        if (gender == 'male' && age < 21 && age  > 17){
          modifier = 1.5;
        }
        if (gender == 'male' && age  <25 && age > 21){
          modifier = 1.15;
        }
        if (gender == 'male' && age > 25){
          modifier = 1.12;
        }
        if (gender == 'female' && age < 25){
          modifier = 1.1;
        }
        if (gender == 'female' && age > 25){
          modifier = 1.08;
        }

      

        /* Applies following rules:
         *      - If male and between 17 and 21 then rate is 1.5
         *      - If male and between 21 and 25 then rate is 1.15
         *      - If male and over 25 then rate is 1.12
         *      - If female and under 25 then rate is 1.1
         *      - If female and over 25 then rate is 1.08
         */

        return modifier;
    }

    noClaims(yearsnoclaimsbonus) {
      console.log(yearsnoclaimsbonus)
      var modifier = 1;
      if (yearsnoclaimsbonus == 1){
        modifier = 0.05;
      }
      if (yearsnoclaimsbonus == 2){
        modifier = 0.10;
      }
      if (yearsnoclaimsbonus == 3){
        modifier = 0.15;
      }
      if (yearsnoclaimsbonus == 4){
        modifier = 0.20;
      }
      if (yearsnoclaimsbonus == 5){
        modifier = 0.25;
      }
      if (yearsnoclaimsbonus >5){
        modifier = 0.25;
      }
      return modifier;


      }
    
        /*
         * For every year of no claims take off 0.05 up to a maximum of 5 years
         */

    

    carCost(estimatedvalue) {
      var modifier = 1.2;
      if (estimatedvalue > 25000){
        modifier = 2;
      }
      if (estimatedvalue > 10000 && estimatedvalue < 25000){
        modifier = 1.5;
      } 

      return modifier;



        /*
         * If the car costs more that 25000 then set the modifer at 2
         * if the car costs between 10000 and 25000 then set the modifier at 1.5
         * otherwise the modifier is 1.2
         */

    }

}