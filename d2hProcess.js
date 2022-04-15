const readline = require("readline");

const d2h = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let accountAmount = 0;

let tariffPlan = {
    "1" : "Entertainment",
    "2" : "Educational",
    "3" : "Regional",
    "4" : "Sports"
};

let tariffAmount = {
    "1" : 150,
    "2" : 120,
    "3" : 160,
    "4" : 140
}

let userTariff = [];

class d2hProcess{

    constructor(){
        this.initD2hProcess()
    }

    initD2hProcess = () => {
    this.message = `
-----------------------------------------------------
| Welcome. What would you like to do? Please choose   |
| 1 for view your balance.                            |
| 2 for add amount to your balance.                   |
| 3 for view your basic tariff package.               |
| 4 for add addon channel to your tariff package.     |
| 5 for remove the channel from your tariff plan.     |
-----------------------------------------------------
    `;
                d2h.question(this.message, (input) =>{
                switch(input){
                    case "1":
                        this.viewBalance();
                        break;
                    case "2":
                        this.addBalance();
                        break;
                    case "3":
                        this.viewTariff();
                        break;
                    case "4":
                        this.addTariff();
                        break;
                    case "5":
                        this.removeTariff();
                        break;
                    default:
                        console.log("Invalid Input, Please try again");
                        setTimeout(() => {
                            this.initD2hProcess();
                        },2000)
                        break;
                }
            });
    }

    viewBalance = () => {
        console.log(`Your account have ${accountAmount} Rs`);
    
        setTimeout(() => {
            this.initD2hProcess();
        },2000)
    }


    addBalance = () => {
        d2h.question("How much amount want to add : ", (input) =>{

            if(!isNaN(parseInt(input))){
                if(input<1){
                    console.log("Please Enter 0 Grater Then number");
                    return setTimeout(() => {
                        this.addBalance();
                    },2000)
                }else{
                    accountAmount += parseInt(input);
                    console.log(`Your account have ${accountAmount} Rs`);
                }        
            }else{
                console.log("Please Enter Valid Number");
                return setTimeout(() => {
                    this.addBalance();
                },2000)
            }

            setTimeout(() => {
                this.initD2hProcess();
            },2000)
            
        });
    }

    viewTariff = () => {

        if(userTariff.length > 0){
            let count = 1;
            console.log("You account have tariff plan.");
            for(let i=1;i<=userTariff.length;i++){
                console.log(`${i}. ${tariffPlan[i]}`);
            }
        }else{
            console.log("You haven't select any tariff.");
        }   

        setTimeout(() => {
            this.initD2hProcess();
        },2000)
    }

    addTariff = () => {
    const tariffPlansMessage = `Please choose any one tariff :
1 for Entertainment @150rs
2 for Educational @120rs
3 for Regional @160rs
4 for Sports @140rs
`
        d2h.question(tariffPlansMessage, (input) =>{
            
            const checkTariff = tariffPlan[input];

            if(checkTariff){
            
                const indexValue = userTariff.indexOf(input);

                if(indexValue === -1){
                    if(tariffAmount[input] < accountAmount){
                        accountAmount = accountAmount - parseInt(tariffAmount[input]);
                        userTariff.push(input);
                        console.log(`Your plan successfuly added and your account have ${accountAmount} Rs`);
                    }else{
                        console.log("You don't have sufficient balance to add this  channel in your tariff plan.")
                    }
                }else{
                    console.log("This plan is already added in your account");
                    return setTimeout(() => {
                        this.addTariff();
                    },2000)
                }
            
            }else{
                console.log("Please select above tariff number");
                return setTimeout(() => {
                    this.addTariff();
                },2000)
            }

            setTimeout(() => {
                this.initD2hProcess();
            },2000)
        });
    }

    removeTariff = () => {

        if(userTariff.length>0){
            console.log("Which Tariff Plan, You want to delete")
            let count = 1;
            for(let i=1;i<=userTariff.length;i++){
                console.log(`${i}. ${tariffPlan[i]}`);
            }


            d2h.question("Please type here : ", (input) =>{
                const indexValue = userTariff.indexOf(input);
                if(indexValue>-1){
                    userTariff.splice(indexValue, 1); 
                    console.log("Your plan successfully deleted");
                }else{
                    console.log("Please select above tariff plan options");
                    return setTimeout(() => {
                        this.removeTariff();
                    },2000)
                }
                setTimeout(() => {
                    this.initD2hProcess();
                },2000)
            });
        }else{
            console.log("Your account haven't any tariff plan.");
            return setTimeout(() => {
                this.initD2hProcess();
            },2000)
        }
    }
}

module.exports = d2hProcess;