
// Get ELements
const expense = document.querySelector(".expense");
const open = document.querySelector(".open");
const link = document.getElementsByClassName(".link");
const dateToday = document.querySelector(".dateToday");




/* MODAL FUNCTION START */ 
const modal = document.getElementById("myModal");
const modalText = document.querySelector(".modal-Text");
let newSideBar = document.querySelector(".sideNav");
// closes the modal
var span = document.getElementsByClassName("close")[0];
 
// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* MODAL FUNCTION END */ 






// ON CLICK FUNCTIONS TO START APP RUNNING
function openNav() {
  document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

// expense.addEventListener('click', (e) => {
//   const sign = document.querySelector(".fa-angle-down");
//   sign.classList.toggle("open");
// });


// this shd display today's date fix that later
// dateToday.addEventListener('click', () => {
//   let welcome = document.querySelector(".welcome");
//   let main = document.querySelector(".main");
//   welcome.style.display= "none";
//   main.style.display= "block";
// });


// for(let i=0; i < link.length; i++){
//   link[i].addEventListener("click", () => {
//     document.getElementById("sideNav").style.width = "0";
//   });
// }

function reCreate(){
  const myTimeout = setTimeout(() => {
    let login = new Menu().createAccount()
    login
  }, 1200);
}

function reSign(){
  const myTimeout = setTimeout(() => {
    let login = new Menu().logIn()
    login
  }, 1000);
}


// functnio to check if user input is valid beofre creating account
function validateForm(event) {
  event.preventDefault();
  let answer = false;
  let formMsg = '';
  let type =[];

  let password = document.getElementById("password").value;
  let passwordConfirm = document.getElementById("password-confirm").value;
  let debit = document.getElementById("Debit").checked;
  let credit = document.getElementById("Credit").checked;
  let userName = document.getElementById("name").value;
  
  if(userName.length < 1 || userName == " " || userName == "  " || userName == "   " || userName == "    "){
    formMsg = "Usename cannot be empty space";
    answer = false;
    // i can creare a function restart for the setTimeout func
    reCreate();
  } else if (password !== passwordConfirm){
    formMsg = "Passwords does not match!";
    answer = false;
    reCreate();
  }  else if (debit == false && credit == false){
    formMsg = "Select at least one Account Type";
    answer = false;
    reCreate();
  } else{
    if(debit == true){type.push(document.getElementById("Debit").value)}
    if(credit){type.push(document.getElementById("Credit").value)}
    // answer = true;
    
    // All info validated so create new account
    let getUsers = JSON.parse(sessionStorage.getItem("createdUserAccount"));
    let newUser = new Account(userName, password, type);
    
    if(newUser instanceof Account){
      //   // check if there are accounts exisitng
      try {
        if(getUsers.length > 0){
          let Existed = false;
        for(user of getUsers){
          if(newUser.username === user.username){
            Existed = true;
          } else{
            continue;
          }
        }
        if(Existed === false){
          getUsers.push(newUser);
          sessionStorage.setItem("createdUserAccount",JSON.stringify(getUsers));
          formMsg = "Account Created Successfully!" + type;
          reSign();
          setTimeout(() => {
            closeModal();
          }, 950);
          }else{
            formMsg = "Error: An Account with the same username exists!";
            openModal()
            reCreate();
          }
      }
    } catch (error) {
      createdUserAccount.push(newUser);
      sessionStorage.setItem("createdUserAccount",JSON.stringify(createdUserAccount));
      formMsg = "Account Created Successfully!" + type;
    }

    } else {
      throw new Error(`You can only add instance of account. Argument is not an account type: ${newUser}`);
    }
  }
  modalText.textContent = formMsg;
  openModal();
}

// function to validate if account exist
function validateSignIn(event){
  event.preventDefault(); 
  let password = document.getElementById("password").value;
  let userName = document.getElementById("name").value;
  let getUsers = JSON.parse(sessionStorage.getItem("createdUserAccount"));

  try {
    if(getUsers.length > 0){
      let passwordCorrect = false;
      let usernameCorrect = false;
      for(user of getUsers){
        if(userName === user.username){
          usernameCorrect = true;
          if(password === user.password){
            passwordCorrect = true;
            } else{passwordCorrect === false}
        } else{
          continue;
        }
        }
        
      if(usernameCorrect === true && passwordCorrect === true){
        modalText.textContent ="Log In Successful";
        openModal();
        // try to push the current account into the menu.accounts array
        menu.accounts.push(user);
        setTimeout(() => {menu.displayDashboard(); }, 700);
      } else if(usernameCorrect === true && passwordCorrect === false){
        modalText.textContent = "Incorrect Password";
        openModal();
        reSign();
      } else {
        modalText.textContent = "Account does not Exist! Create new account!";
        openModal(); 
        reSign(); 
      }
    }
  } catch (error) {
    modalText.textContent = "Please Create New Account!";
    openModal();
    reSign();
  }
}




class Account {
  constructor(username, password, type=[]) {
    this.username = username;
    this.password = password;
    this.type = type;
  }
}


class Menu {
  constructor() {
    this.accounts = [];
    this.selection = null;
  }

  start(){
    let hideTab = document.getElementById("signout");
    hideTab.style.display="none"; 

    this.removeMainSideBar();
    this.createID();
    this.createMainSideBar();

  // fa.addEventListener('click', (e) => {
  //   let main = document.querySelector(".main");
  //   main.style.display= "none";
  // });

  // expense.addEventListener('click', (e) => {
  //   const sign = document.querySelector(".fa-angle-down");
  //   sign.classList.toggle("open");
  // });


 
  // const newParent = document.querySelector(".sideNav");
  // let newChildren = newParent.children;



  // for(let i=0; i < newChildren.length; i++){
    // let child = newChildren[i];
    // newChildren[i].setAttribute("id",i);
    // this.changeSideBar("main");
    // newChildren[i].addEventListener("click", (e) => {
    //   // alert(e.target.innerHTML);
    //   // alert(e.target.getAttribute("id"));
    //   let updated = e.target.getAttribute("id");
    //   // selectedID (updated);
    //   //  this.selection = e.target.getAttribute("id");



    //   switch(updated) {
    //     case "1":
    //       closeNav();
    //       let headerTitle = document.querySelector("#header-title");
    //       // fix the home option
    //       if(headerTitle.textContent == "Welcome"){
    //       } else{
    //         this.exit();
    //       }
    //       break;
    //     case "2":
    //       closeNav();
    //       this.createAccount();
    //       break;
    //     case "3":
    //       closeNav();
    //       this.logIn();
    //       break;
    //     case "4":
    //       closeNav();
    //       break;
    //     default:
    //       closeNav();
    //       this.selection = 0;
    //   }
    
    // });
  // }

}


  // case 1 - exit
  exit(){
    let welcome = document.querySelector(".welcome");
    let headerTitle = document.querySelector("#header-title");
    let main = document.querySelector(".main");
    welcome.style.display= "block";
    main.style.display= "none";
   
    headerTitle.textContent = "Welcome";
    welcome.innerHTML = `
    <div class="welcome-info">
        <h2 id="welcome-title">PAUL's BANKING SYSTEM</h2>
        <p class="welcome-info-text"> Thank you for your business! </p>
        
    </div>
    `;
    // wait 2500 milliseconds the start application
    const myTimeout = setTimeout(() => {
      welcome.innerHTML = `
      <div class="welcome-info">
          <h2 id="welcome-title">PAUL's BANKING SYSTEM</h2>
          <p class="welcome-info-text"> Use the menu on the left-hand side or click the menu Icon on the top-left corner to begin </p>
          
      </div>
      `;
    }, 1500);
  }


  // case 2 - create acount
  createAccount(){
    let headerTitle = document.querySelector("#header-title");
    let welcome = document.querySelector(".welcome");
    let welcomeInfo = document.querySelector(".welcome-info");
    let welcomeTitle = document.querySelector("#welcome-title");
    let msgBox = document.querySelector(".welcome-info-text");
    let main = document.querySelector(".main");
    welcome.style.display= "block";
    main.style.display= "none";


    welcome.style.marginBlock = "1rem 0.5rem";
    welcomeInfo.style.margin = "0.5rem 1rem";
    welcomeTitle.style.display = "none";
    msgBox.style.padding = "0.25rem 0.5rem";
    headerTitle.textContent = "New Account";
    headerTitle.style.fontSize = "1.2rem";

    msgBox.innerHTML = `
    <form onsubmit="return validateForm(event)" action="#">
            <label for="name">
                <p>Username (4 letters max) </p>
                <input class="inputBox" type="text" name="username" maxlength="4" id="name" required>
            </label> <br>
           
            <label for="password">
                <p>Password (4 digit numbers): </p>
                <input class="inputBox" type="text" name="password" id="password" maxlength="4" required>
            </label><br>
        
            <label for="password-confirm">
                <p>Confirm Password: </p>
                <input class="inputBox" type="text" name="password-confirm" maxlength="4" id="password-confirm" required>
            </label> <br><br>
            
            <p>
                <span id="accountType"> Account Type </span> <br>
                <input type="checkbox" id="Debit" name="Debit" value="Debit">
                <label for="Debit"> Debit </label><br>
                <input type="checkbox" id="Credit" name="Credit" value="Credit">
                <label for="Credit"> Credit </label><br><br>
            </p>

            <input class="btn" type="submit" name="Create Account" id="createAccount" value="Create Account">
        </form>
`;
  };


  // case 3 - login
  logIn(){
    let headerTitle = document.querySelector("#header-title");
    let welcome = document.querySelector(".welcome");
    let welcomeInfo = document.querySelector(".welcome-info");
    let welcomeTitle = document.querySelector("#welcome-title");
    let msgBox = document.querySelector(".welcome-info-text");
    let main = document.querySelector(".main");
    welcome.style.display= "block";
    main.style.display= "none";

    welcome.style.marginBlock = "7rem 7rem";
    welcomeInfo.style.margin = "0.5rem 1rem";
    welcomeTitle.style.display = "none";
    msgBox.style.padding = "0.25rem 0.5rem";
    headerTitle.textContent = "Log In";
    headerTitle.style.fontSize = "1.2rem";

    msgBox.innerHTML = `
    <form onsubmit="return validateSignIn(event)" action="#">
            <label for="name">
                <p>Username (4 letters max) </p>
                <input class="inputBox" type="text" name="username" maxlength="4" id="name" required>
            </label> <br>
           
            <label for="password">
                <p>Password (4 digit numbers): </p>
                <input class="inputBox" type="text" name="password" id="password" maxlength="4" required>
            </label><br><br>
        

            <input  class="btn" type="submit" name="logIn" id="logIn" value="Log In">
        </form>
`;
  }

    /*
    - view account debit or credit or both
    - add account
    - delete account 
    - sign out
    */ 

  displayDashboard(){
    let modal = document.getElementById("myModal");
    let welcome = document.querySelector(".welcome");
    let main = document.querySelector(".main");
    let headerTitle = document.querySelector("#header-title");

    headerTitle.textContent = "My Wallets";
    welcome.style.display= "none";
    main.style.display= "block";
    modal.style.display = "none";

    // this.createID();
    // this.removeSideBar();
    // this.removeMainSideBar();
    // this.changeSideBar();

    this.changesideNav();
    // do {
    //   this.changesideNav();
    // } while (main.style.display= "block");

    // while( main.style.display= "block"){
    //   this.changesideNav();
    // }
  }



  
  addAccount(){
    if(this.accounts[0].type.length >= 2){
      modalText.textContent = "Maximum Accounts reached(2 per user)";
      openModal();
      setTimeout(() => {
        closeModal();
      },700);
    } else {
      // choose selected account type, add to useraccount and push to this.accounts
      modalText.innerHTML = `
      <p>Select an account to add: </p>
      <button class="btn" id="credit"> Credit </button>   
      <button class="btn" id="debit"> Debit </button>
      <button class="btn" id="cancel"> Cancel </button> 
      `;
      closeNav();
      openModal();
      let btn = document.getElementsByClassName("btn");
      this.addClassStatus(btn);
    }
  }
 
  deleteAccount(){
    if(this.accounts[0].type.length < 2){
      modalText.textContent = " Must have at least 1 Account";
      openModal();
      setTimeout(() => {
        closeModal();
      },700);
    } else {
      // choose selected account type, and splice from this.accounts
      modalText.innerHTML = `
      <p>Select an account to delete: </p>
      <button class="btn" id="credit"> Credit </button>   
      <button class="btn" id="debit"> Debit </button>
      <button class="btn" id="cancel"> Cancel </button> 
      `;
      closeNav();
      openModal();
      let btn = document.getElementsByClassName("btn");
      this.deleteClassStatus(btn);
    }
  }

  signOut(){
    this.exit();
  }

  createID(){
    const newParent = document.querySelector(".sideNav");
    let newChildren = newParent.children;
    for(let i=0; i < newChildren.length; i++){
      newChildren[i].setAttribute("id",i);
    }
  }

  addClassStatus(val){
    for(let i=0; i< val.length;i++){
      val[i].addEventListener("click", (event) => {
        let btnID = event.target.getAttribute("id")
        if( btnID === "debit"){
          if(this.accounts[0].type.includes("Debit")){
            // add msg
            modalText.textContent = "Cannot create 2 debit accounts";
            openModal();
            setTimeout(() => {
              closeModal();
            },700);
          } else{
            // confirm then add Debit account
            modalText.innerHTML = `
            <p>Confirm add Account: </p>
            <button class="btn" id="yes"> Yes </button>   
            <button class="btn" id="no"> No </button>`;
            openModal();
            document.getElementById("yes").addEventListener("click",()=>{
              this.accounts[0].type.push("Debit"); 
              this.updateAccounts(user.username,  this.accounts[0].type);
             
              modalText.textContent = "Account added successfully";
              setTimeout(() => {
                closeModal();
              },700); 
            });
            document.getElementById("no").addEventListener("click",()=>{
              closeModal();
            });
          }
        }
        if(btnID === "credit"){
          if(this.accounts[0].type.includes("Credit")){
            // add msg
            modalText.textContent = "Cannot create 2 credit accounts";
            openModal();
            setTimeout(() => {
              closeModal();
            },700);
          } else{
             // confirm then add Credit account
             modalText.innerHTML = `
             <p>Confirm add Account: </p>
             <button class="btn" id="yes"> Yes </button>   
             <button class="btn" id="no"> No </button>`;
             openModal();
             document.getElementById("yes").addEventListener("click",()=>{
               this.accounts[0].type.push("Credit");
               this.updateAccounts(user.username,  this.accounts[0].type);
               modalText.textContent = "Account added successfully"; 
               setTimeout(() => {
                closeModal();
              },700);
             });
             document.getElementById("no").addEventListener("click",()=>{
               closeModal();
             })
            console.log(this.accounts[0]);
          } 
        }
        if(btnID === "cancel"){
          closeModal();
        }
      });
    }
  }

  updateAccounts(providedName,updatedAccount){
    let getUsers = JSON.parse(sessionStorage.getItem("createdUserAccount"));
    for(let user of getUsers){
      if(user.username == providedName){
        user.type = updatedAccount;
      }
    }
    sessionStorage.setItem("createdUserAccount",JSON.stringify(getUsers));
  }

  deleteClassStatus(val){
    for(let i=0; i< val.length;i++){
      val[i].addEventListener("click", (event) => {
        let btnID = event.target.getAttribute("id")
        if( btnID === "debit"){
          if(this.accounts[0].type.includes("Debit")){
            // confirm then add Debit account
            modalText.innerHTML = `
            <p>Confirm delete Account: </p>
            <button class="btn" id="yes"> Yes </button>   
            <button class="btn" id="no"> No </button>`;
            openModal();
            document.getElementById("yes").addEventListener("click",()=>{
              let indexID = this.accounts[0].type.indexOf("Debit"); 
              this.accounts[0].type.splice(indexID,1);
              this.updateAccounts(user.username,  this.accounts[0].type);
              modalText.textContent = "Account deleted successfully";
              setTimeout(() => {
                closeModal();
              },900); 
            });
            document.getElementById("no").addEventListener("click",()=>{
              closeModal();
            });
          } else{
             // add msg
             modalText.textContent = "No Debit account found!";
             openModal();
             setTimeout(() => {
               closeModal();
             },900);
          }
        }
        if(btnID === "credit"){
          if(this.accounts[0].type.includes("Credit")){
            // confirm then add Debit account
            modalText.innerHTML = `
            <p>Confirm delete Account: </p>
            <button class="btn" id="yes"> Yes </button>   
            <button class="btn" id="no"> No </button>`;
            openModal();
            document.getElementById("yes").addEventListener("click",()=>{
              let indexID = this.accounts[0].type.indexOf("Credit"); 
              this.accounts[0].type.splice(indexID,1);
              this.updateAccounts(user.username,  this.accounts[0].type);
              modalText.textContent = "Account deleted successfully";
              setTimeout(() => {
                closeModal();
              },900); 
            });
            document.getElementById("no").addEventListener("click",()=>{
              closeModal();
            });
          } else{
             // add msg
             modalText.textContent = "No Credit account found!";
             openModal();
             setTimeout(() => {
               closeModal();
             },900);
          }
        }
        if(btnID === "cancel"){
          closeModal();
        }
      });
    }
  }

  changeSideBar(){
    let newSideBar = document.querySelector(".sideNav");
    let newChildren = newSideBar.children;

    for(let ele of newChildren){
      let tabID = ele.getAttribute("id");

      if(tabID == 1){
      ele.innerHTML = "View Accounts";
      ele.addEventListener("click", () =>{
        let modal = document.getElementById("myModal");
        let welcome = document.querySelector(".welcome");
        let main = document.querySelector(".main");
        let headerTitle = document.querySelector("#header-title");
    
        headerTitle.textContent = "My Wallets";
        welcome.style.display= "none";
        main.style.display= "block";
        modal.style.display = "none";
      });
      }

      if(tabID == 2){
        ele.textContent = "Add Account";
        ele.addEventListener("click", this.addAccount);
      }

      if(tabID == 3){
        ele.textContent = "Delete Account";
        ele.addEventListener("click", this.deleteAccount);
      }

      if(tabID == 4){
        ele.textContent = "Sign Out";
        ele.style.display = "block";
        ele.addEventListener("click", () =>{
          this.exit();
          this.removeMainSideBar();
          this.removeSideBar();
          this.createMainSideBar();
          closeNav();
          ele.style.display = "none";
        });
      }
    } 
  }



  createMainSideBar(){
    let newSideBar = document.querySelector(".sideNav");
    let newChildren = newSideBar.children;

    for(let ele of newChildren){
      let tabID = ele.getAttribute("id");

      if(tabID == 1){
        ele.innerHTML = " Home";
      ele.addEventListener("click", ()=>{
        closeNav();
        let headerTitle = document.querySelector("#header-title");
        // fix the home option
        if(headerTitle.textContent == "Welcome"){
        } else{
          this.exit();
        }
      });
      }

      if(tabID == 2){
        ele.textContent = "Create New Account";
        ele.addEventListener("click",  ()=>{
          closeNav();
          this.createAccount();
        });
      }

      if(tabID == 3){
        ele.textContent = "Log In Existing Account";
        ele.addEventListener("click", () =>{
          closeNav();
          this.logIn();
        });
      }

      if(tabID == 4){
        ele.textContent = "Sign Out";
        ele.style.display = "none";
        ele.addEventListener("click", () =>{
          this.exit();
        });
      }
    } 
  }





  removeMainSideBar(){
    let newSideBar = document.querySelector(".sideNav");
    let newChildren = newSideBar.children;

    for(let ele of newChildren){
      let tabID = ele.getAttribute("id");
      if(tabID == 1){
        ele.innerHTML = " Home";
      ele.removeEventListener("click", ()=>{
        closeNav();
        let headerTitle = document.querySelector("#header-title");
        // fix the home option
        if(headerTitle.textContent == "Welcome"){
        } else{
          this.exit();
        }
      });
      }

      if(tabID == 2){
        ele.textContent = "Create New Account";
        ele.removeEventListener("click",  ()=>{
          closeNav();
          this.createAccount();
        });
      }

      if(tabID == 3){
        ele.textContent = "Log In Existing Account";
        ele.removeEventListener("click", () =>{
          closeNav();
          this.logIn();
        });
      }

      if(tabID == 4){
        ele.textContent = "Sign Out";
        ele.style.display = "none";
        ele.removeEventListener("click", () =>{
          this.exit();
        });
      }
    } 
  }




  removeSideBar(){
    let newSideBar = document.querySelector(".sideNav");
    // let newChildren = newSideBar.children;
    


    newSideBar.innerHTML = `
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="#"> Home </a>
    <a href="#">Create New Account</a>
    <a href="#">Log In Existing Account</a>
    <a href="#" id="signout">Sign Out</a>
    `;

    // for(let ele of newChildren){
    //   let tabID = ele.getAttribute("id");

    //   if(tabID == 1){
    //   ele.innerHTML = "View Accounts";
    //   ele.removeEventListener("click", () =>{
    //     let modal = document.getElementById("myModal");
    //     let welcome = document.querySelector(".welcome");
    //     let main = document.querySelector(".main");
    //     let headerTitle = document.querySelector("#header-title");
    
    //     headerTitle.textContent = "My Wallets";
    //     welcome.style.display= "none";
    //     main.style.display= "block";
    //     modal.style.display = "none";
    //   });
    //   }

    //   if(tabID == 2){
    //     ele.textContent = "Add Account";
    //     ele.removeEventListener("click", this.addAccount);
    //   }

    //   if(tabID == 3){
    //     ele.textContent = "Delete Account";
    //     ele.removeEventListener("click", this.deleteAccount);
    //   }

    //   if(tabID == 4){
    //     ele.textContent = "Sign Out";
    //     ele.style.display = "block";
    //     ele.removeEventListener("click", () =>{
    //       this.exit();
    //       closeNav()
    //       this.createMainSideBar();
    //       ele.style.display = "none";
    //     });
    //   }
    // } 







  }





changesideNav(){
  let main = document.querySelector(".main");
  let newSideBar = document.querySelector(".sideNav");
  let newChildren = newSideBar.children;

  newSideBar.innerHTML = `
  <a href="javascript:void(0)" id="close" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="#" id="view"> View Accounts </a>
  <a href="#" id="add"> Add Account </a>
  <a href="#" id="delete"> Delete Account </a>
  <a href="#" id="signout">Sign Out</a>
  `;

  for(let ele of newChildren){
    let tabID = ele.getAttribute("id");

    if(tabID == "view"){
    ele.innerHTML = "View Accounts";
    ele.addEventListener("click", () =>{
      let modal = document.getElementById("myModal");
      let welcome = document.querySelector(".welcome");
      let headerTitle = document.querySelector("#header-title");
  
      headerTitle.textContent = "My Wallets";
      welcome.style.display= "none";
      main.style.display= "block";
      modal.style.display = "none";
      closeNav();
    });
    }

    if(tabID == "add"){
      ele.textContent = "Add Account";
      ele.addEventListener("click",() =>{
      this.addAccount()
      closeNav();
    });
    }

    if(tabID == "delete"){
      ele.textContent = "Delete Account";
      ele.addEventListener("click",() =>{
        this.deleteAccount();
        closeNav();
      });
    }

    if(tabID == "signout"){
      ele.textContent = "Sign Out";
      ele.style.display = "block";
      ele.addEventListener("click", () =>{
        this.exit();
        // this.removeMainSideBar();
        // this.removeSideBar();
        this.removeSideBar();
        this.createID();
        this.createMainSideBar();
        closeNav();
        main.style.display= "none";
        ele.style.display = "none";
      });
    }
  } 
 
}

}


let menu = new Menu();
menu.start();
let createdUserAccount = menu.accounts;

