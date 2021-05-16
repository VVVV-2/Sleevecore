
function Customizer() {


let color = ["black", "green", "khaki", "atoll", "red", "yellow", "orange", "fuchsia"]; //Arrays keeping the names of colors and prints.
let print = ["paper", "rock", "scissors"];

let orderIncrementor = 1;   //Value of the current order being created.
let colorSelector = 0;  //Selectors for viewing prints and colors from the values of respective array.
let printSelector = 0;
let sizeSelector = document.getElementById("sizeSelector"); //Elements for displaying images and messages.
let genderSelector = document.getElementById("genderSelector");
let shirtDisplay = document.getElementById("shirtDisplay");
let printDisplay = document.getElementById("printDisplay");
let messageArea =  document.getElementById("messageArea");
let cLeft = document.getElementById("cLeftBtn");    //Buttons carrying images as icons.
let pLeft = document.getElementById("pLeftBtn");
let cRight = document.getElementById("cRightBtn");
let pRight = document.getElementById("pRightBtn");

cLeft.src = `img/${ genderSelector.value }_${ color[7]  }.png`; //Setting correct images as icons, preceding and following the current value of selector.
pLeft.src = `img/${ print[2]  }.png`;
cRight.src = `img/${ genderSelector.value }_${ color[1]  }.png`;
pRight.src = `img/${ print[1]  }.png`;


function initializeCustomizer(){    //Loading and changing images of print, shirt and title attributes, also used when genderSelector changes.

    shirtDisplay.src = `img/${ genderSelector.value }_${ color[colorSelector] }.png`;
    printDisplay.src = `img/${ print[printSelector] }.png`;
    shirtDisplay.title = `${ color[colorSelector] }`;

    
    cLeft.title = `${ color[colorSelector - 1] }`;
    cRight.title = `${ color[0] }`
    cLeft.title = `${ color[7] }`;
    cRight.title = `${ color[colorSelector + 1] }`
    colorLeft.title = `${ color[7] }`;
    colorRight.title = `${ color[colorSelector + 1] }`
    colorLeft.title = `${ color[colorSelector - 1] }`;
    colorRight.title = `${  color[0] }`
    cRight.title = `${  color[colorSelector + 1] }`
    printDisplay.title = `${ print[printSelector] }`;
    pLeft.title = `${ print[printSelector - 1]  }`;
    pRight.title = `${ print[0]  }`;
    pLeft.title = `${ print[2]  }`;
    pRight.title = `${ print[printSelector + 1]  }`;
            
            

}

function initializeOrderIncrementor(){  //Getting number of next order from shoppingcart.php.

    $.get('shoppingcart.php/', { "nextOrderNumber" : null, }).done(function(data){orderIncrementor = Number(data); console.log(orderIncrementor)})

}


function addToCart( o = orderIncrementor, c = color[colorSelector], p = print[printSelector], s = sizeSelector.value, g = genderSelector.value ){   //Send order to shoppingcart.php.
      
    let cartItem = {"color": c, "print": p, "size": s, "gender": g};    //Declare object from selector specifications.
    let paramName = `orderItem${o}`;    //Name of order to be sent.

    $.post('shoppingcart.php/', { [paramName] : cartItem }, function(){ //Send item
        $("#addToCart").prop('disabled', true)})    //Disable button.
        .then($.get('shoppingcart.php/', { "nextOrderNumber" : null, }, function(data){ //Request next order number.
            orderIncrementor = Number(data);    //Update orderIncrementor with recieved value.
            $("#addToCart").prop('disabled', false)}))  //Enable button.
        .fail(function(){   //If failed, alert message.
            alert("Connection error, please try again!");});

}


function colorLeft() {  //colorLeft and colorRight are two mirrored functions for electing shirt color.
  
    if(colorSelector == 0) {    //Jump to last value if sub-zero and adjust selector icons accordingly.
        
        colorSelector = 7;
        cLeft.src = `img/${ genderSelector.value }_${ color[colorSelector - 1]  }.png`;
        cRight.src = `img/${ genderSelector.value }_${ color[0]  }.png`;
        shirtDisplay.src = `img/${ genderSelector.value }_${ color[colorSelector] }.png`;
        shirtDisplay.title = `${ color[colorSelector] }`;
        cLeft.title = `${ color[colorSelector - 1] }`;
        cRight.title = `${ color[0] }`

    } else {

        colorSelector -= 1;
        shirtDisplay.src = `img/${ genderSelector.value }_${ color[colorSelector] }.png`;
        shirtDisplay.title = `${ color[colorSelector] }`;

        if(colorSelector == 0){
            cLeft.src = `img/${ genderSelector.value }_${ color[7]  }.png`;
            cRight.src = `img/${ genderSelector.value }_${ color[colorSelector + 1]  }.png`;
            cLeft.title = `${ color[7] }`;
            cRight.title = `${ color[colorSelector + 1] }`
        }else{
            cLeft.src = `img/${ genderSelector.value }_${ color[colorSelector - 1]  }.png`;
            cRight.src = `img/${ genderSelector.value }_${ color[colorSelector + 1]  }.png`;
            cLeft.title = `${ color[colorSelector - 1] }`;
            cRight.title = `${ color[colorSelector + 1] }`
        }
        
    } 
}
function colorRight() {

    if(colorSelector == 7 ) {
        colorSelector = 0;
        cLeft.src = `img/${ genderSelector.value }_${ color[7]  }.png`;
        cRight.src = `img/${ genderSelector.value }_${ color[colorSelector + 1]  }.png`;
        shirtDisplay.src = `img/${ genderSelector.value }_${ color[colorSelector] }.png`;
        shirtDisplay.title = `${ color[colorSelector] }`;
        colorLeft.title = `${ color[7] }`;
        colorRight.title = `${ color[colorSelector + 1] }`
        
    } else {
        colorSelector += 1;
        shirtDisplay.src = `img/${ genderSelector.value }_${ color[colorSelector] }.png`;
        shirtDisplay.title = `${ color[colorSelector] }`;

        if(colorSelector == 7){
            cLeft.src = `img/${ genderSelector.value }_${ color[colorSelector - 1]  }.png`;
            cRight.src = `img/${ genderSelector.value }_${ color[0]  }.png`;
            colorLeft.title = `${ color[colorSelector - 1] }`;
            colorRight.title = `${  color[0] }`
        }else{
            cLeft.src = `img/${ genderSelector.value }_${ color[colorSelector - 1]  }.png`;
            cRight.src = `img/${ genderSelector.value }_${ color[colorSelector + 1]  }.png`;
            cLeft.title = `${ color[colorSelector - 1] }`;
            cRight.title = `${  color[colorSelector + 1] }`
        }
    }  
}


function printLeft() {  //Selecting print. Same principle as the two functions above.

    if(printSelector == 0) {
        printSelector = 2;
        printDisplay.src = `img/${ print[printSelector] }.png`;
        printDisplay.title = `${ print[printSelector] }`;
        pLeft.src = `img/${ print[printSelector - 1]  }.png`;
        pRight.src = `img/${ print[0]  }.png`;
        pLeft.title = `${ print[printSelector - 1]  }`;
        pRight.title = `${ print[0]  }`;
    } else {
        printSelector -= 1;
        printDisplay.src = `img/${ print[printSelector] }.png`;
        printDisplay.title = `${ print[printSelector] }`;

        if(printSelector == 0){
            pLeft.src = `img/${ print[2]  }.png`;
            pRight.src = `img/${ print[printSelector + 1]  }.png`;
            pLeft.title = `${ print[2]  }`;
            pRight.title = `${ print[printSelector + 1]  }`;
        }else{
            pLeft.src = `img/${ print[printSelector - 1]  }.png`;
            pRight.src = `img/${ print[printSelector + 1]  }.png`;
            pLeft.title = `${ print[printSelector - 1]  }`;
            pRight.title = `${ print[printSelector + 1]  }`;
        }
    }
        
}
function printRight() {
    if(printSelector == 2) {
        printSelector = 0;
        printDisplay.src = `img/${ print[printSelector] }.png`;
        printDisplay.title = `${ print[printSelector] }`;
        pLeft.src = `img/${ print[2]  }.png`;
        pRight.src = `img/${ print[printSelector + 1]  }.png`;
        pLeft.title = `${ print[2]  }`;
        pRight.title = `${ print[printSelector + 1]  }`;
    } else {
        printSelector += 1;
        printDisplay.src = `img/${ print[printSelector] }.png`;
        printDisplay.title = `${ print[printSelector] }`;

        if(printSelector == 2){
            pLeft.src = `img/${ print[printSelector - 1]  }.png`;
            pRight.src = `img/${ print[0]  }.png`;
            pLeft.title = `${ print[printSelector - 1]  }`;
            pRight.title = `${ print[0]  }`;
        }else{
            pLeft.src = `img/${ print[printSelector - 1]  }.png`;
            pRight.src = `img/${ print[printSelector + 1]  }.png`;
            pLeft.title = `${ print[printSelector - 1]  }`;
            pRight.title = `${ print[printSelector + 1]  }`;
        }
       
    }
}


function message(text) {    //Display text message.
    messageArea.innerText = text;
}


initializeOrderIncrementor()
initializeCustomizer()


return {addToCart : addToCart,  //Customizer returns its inner functions. 
        initializeCustomizer : initializeCustomizer,
        colorLeft : colorLeft,
        colorRight : colorRight,
        printLeft : printLeft,
        printRight : printRight,
        message: message};
}


let customizer = Customizer();  //Functionality declared.
document.getElementById("addToCart").addEventListener("click", function(){customizer.addToCart(); customizer.message("Added to cart!")})    //Event listeners for the document.
document.getElementById("genderSelector").onchange = function(){customizer.initializeCustomizer()}
document.getElementById("colorLeft").addEventListener("click", function(){customizer.colorLeft()})
document.getElementById("colorLeft").addEventListener("mouseover", function(){customizer.message("Pick a color")})
document.getElementById("colorLeft").addEventListener("mouseout", function(){customizer.message("")})
document.getElementById("colorRight").addEventListener("click", function(){customizer.colorRight()})
document.getElementById("colorRight").addEventListener("mouseover", function(){customizer.message("Pick a color")})
document.getElementById("colorRight").addEventListener("mouseout", function(){customizer.message("")})
document.getElementById("printLeft").addEventListener("click", function(){customizer.printLeft()})
document.getElementById("printLeft").addEventListener("mouseover", function(){customizer.message("Pick a print")})
document.getElementById("printLeft").addEventListener("mouseout", function(){customizer.message("")})
document.getElementById("printRight").addEventListener("click", function(){customizer.printRight()})
document.getElementById("printRight").addEventListener("mouseover", function(){customizer.message("Pick a print")})
document.getElementById("printRight").addEventListener("mouseout", function(){customizer.message("")})


