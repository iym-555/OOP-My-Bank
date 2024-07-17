import inquirer from "inquirer";

interface BankAccount{
    accountNumber : number;
    balance : number;
withdraw(amount: number): void
deposit(amount: number): void
checkBalance(): void
}

class BankAccount implements BankAccount{
    accountNumber : number;
    balance : number;

    constructor( accountNumber : number,balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    //DEBIT MONEY
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} , successful!! Remaining balance: $${this.balance}`);
        }else{
            console.log("Insufficient balance!!!");
        }
    }

    //CREDIT MONEY
    deposit(amount: number): void {
        if(amount >  100){
            amount -= 1 //$1 fee charged if more than $100 is deposited
        }this.balance += amount ;
        console.log(`Deposit of $${amount} , successful!!!! Remaining balance: $${this.balance}`)
        
    }
       //CHECK BALANCE
       checkBalance() : void {
        console.log(`Current balance: $${this.balance}`);
    }
}

//creating customers class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account: BankAccount

    constructor( firstName : string,lastName : string,gender : string,age : number,  mobileNumber : number, account: BankAccount){
        this.firstName = firstName
        this.lastName =lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account 
    }
}
//CREATE BANK ACCOUNT
const accounts : BankAccount[] = [
    new BankAccount(1999 , 500),
    new BankAccount(2002 , 5000),
    new BankAccount(2001 , 2000)
]

// CREATE CUSTOMERS
const customers: Customer[] = [
    new Customer ("Hamza" , "Hussain" , "Male" , 25 , 3245624509 , accounts[0]),
    new Customer ("Ishwa" , "Younus" , "Female" , 22 , 5532109876 , accounts[1]),
    new Customer ("Syed" , "Umer Ali" , "Male" , 23 , 8732405916 , accounts[2])
]

//FUNCTION TO INTERACT WITH BANK ACCOUNT
 async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name : "accountNumber",
            type : "number",
            message : "Enter your account number : "
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`\n\tWELCOME, ${customer.firstName} ${customer.lastName}\t\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices : ["Deposit" , "Withdraw" , "Check Balance" , "Exit"]
                }
            ]);

            switch (ans.select){
case "Deposit" :
const depositAmount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: "Enter the amount to deposit: "
})
customer.account.deposit(depositAmount.amount)
break;
case "Withdraw" :
const withdrawAmount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: "Enter the amount to withdraw: "
})
customer.account.withdraw(withdrawAmount.amount)
break;
customer?.account.deposit(withdrawAmount.amount)
break;
case "Check Balance":
    customer.account.checkBalance();
    break;
    case "Exit":
        console.log("EXITING BANK PROGRAM.......");
        console.log("\n Thank you for using our bank services. Have a good day!");
        return;
        
        

            }
            
        }else{
            console.log("Ivalid account number. Please try again !!!!");
            
        }
    } while(true)
}
service()