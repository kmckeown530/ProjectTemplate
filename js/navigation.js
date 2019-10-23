
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

    //$("#dvCarDetails").show();

    //$("#dvPersonalDetails").hide();
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


    console.log(yearsnoclaimsbonus);

    var isValid = true;

    if(name == ""){
      isValid =false;
    } 
    if(age == "" && age<18){
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
      isValid=false
    }
    if (isValid==true){
        $("#dvCarDetails").show();
        $("#dvPersonalDetails").hide();
    } else {
      $("#dvPersonalDetailsAlert").show();
    }


  }

  function showPersonalDetails() {
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
  }

  function showQuoteDetails() {
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote() {
    

    // Perform validation to test that all data has been entered

    if (true)
    {

      // Get the values from the page elements that you need to create your JSON

      $.ajax({
          type: "GET",
          url: "http://localhost:53753/api/rating/CalculateRates",
          data: { /* create JSON here */ }
        }).done(function(msg) {
          // Put the return value into Label created on quote details
          // Hide the Car Details section
          // Display the quote details page
      });
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
