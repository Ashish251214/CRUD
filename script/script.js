// getting data from document
let dltRecord = document.querySelector("#dltRecord"),
addRecord = document.querySelector("#addRecord"),
searchInput = document.querySelector("#searchInput"),
firstName = document.querySelector("#firstName"),
lastName = document.querySelector("#lastName"),
superHero = document.querySelector("#superHero"),
emailInput = document.querySelector("#emailInput"),
gender = document.getElementsByName("gender"),
age = document.querySelector("#age"),
addData = document.querySelector("#addData"),
resetData = document.querySelector("#resetData"),
firstPage = document.querySelector(".firstPage"),
addRecordForm = document.querySelector(".addRecordForm"),getGender,
err = document.getElementsByClassName("err"),mainArray = [],finalArray=[];
// Add Record page
addRecord.addEventListener('click', () => {
    firstPage.style.display = "none";
    addRecordForm.style.display = "block"
});
// Add Data From Form
addData.addEventListener('click',() => {
    // getting value of gender
    gender.forEach(radio => {
        if(radio.checked){
            getGender = radio.value;
        }
    });
    if(firstName.value == "" || firstName.value == null){
        err[0].innerHTML = "Please Enter Firstname";
    }else if(lastName.value == "" || lastName.value == null){
        err[0].innerHTML = "";
        err[1].innerHTML = "Please Enter Lastname";
    }else if(superHero.value == "" || superHero.value == null){
        err[1].innerHTML = "";
        err[2].innerHTML = "Please Enter You'r Superhero";
    }else if(emailInput.value == "" || emailInput.value == null){
        err[2].innerHTML = "";
        err[3].innerHTML = "Please Enter You'r Email";
    }else if(getGender == "" || getGender == null){
        err[3].innerHTML = "";
        err[4].innerHTML = "Please Select Gender";
    }else if(age.value == "" || age.value == null){
        err[4].innerHTML = "";
        err[5].innerHTML = "Please Enter Age";
    }else if(age.value >=1 && age.value <= 100){
        err[5].innerHTML = "";
        let getObject = makeObj(firstName.value,lastName.value,superHero.value,emailInput.value,getGender,age.value);
        getLocalStorage();
        mainArray.push(getObject);
        localStorage.setItem("crud",JSON.stringify(mainArray));
        alert("Data Stored");
        mainArray.splice(0,mainArray.length);
        gender.forEach(radio => {
            radio.checked = false;
        });
        firstName.value=lastName.value=superHero.value=emailInput.value=age.value="";
        showDataFun();
        firstPage.style.display = "block";
        addRecordForm.style.display = "none"
    }else{
        err[5].innerHTML = "Please Enter in between 1 to 100";
    }
    event.preventDefault();
});
// make object
let makeObj = (firstName,lastName,superHero,email,gender,age) => {
    return {firstName,lastName,superHero,email,gender,age}
}
// getData from localstorage
let getLocalStorage = () => {
    let localStorageData = JSON.parse(localStorage.getItem('crud'));
    if(localStorageData != null){
        mainArray.splice(0,mainArray.length);
        for(let i=0;i<localStorageData.length;i++){
            mainArray.push(localStorageData[i]);
        }
    }
}
// shoe all data
let showDataFun = () => {
    getLocalStorage();
    showData.innerHTML = "";
    let tr = "";
    for(let i=0;i<mainArray.length;i++){
        tr += `
            <tr>
                <td><input type="checkbox" name="check" class="check" id="${i}"></td>
                <td>${i+1}</td>
                <td>${mainArray[i].firstName}</td>
                <td>${mainArray[i].lastName}</td>
                <td>${mainArray[i].superHero}</td>
                <td>${mainArray[i].email}</td>
                <td>${mainArray[i].gender}</td>
                <td>${mainArray[i].age}</td>
            </tr>`;
    }
    showData.innerHTML = tr;
}
showDataFun();
// search button
searchInput.addEventListener('keyup', () => {
    let tag = searchInput.value;
    let lower = tag.toLowerCase();
    let tRows = showData.getElementsByTagName("tr");
    for(let i=0;i<tRows.length;i++){
        let tData = tRows[i].getElementsByTagName("td")[2];
        if(tData){
            let tDataTxt = tData.innerText;
            if(tDataTxt.toLowerCase().indexOf(lower) >- 1){
                tRows[i].style.display = "";
            }else{
                tRows[i].style.display = "none";
            }
        }
    }
});
// Delete Button
dltRecord.addEventListener('click', () => {
    let blankArray = [],getChecked = document.getElementsByClassName("check");
    blankArray.splice(0,blankArray.length);
    for(let i=0;i<getChecked.length;i++){
        if(getChecked[i].checked){
            blankArray.push(i);
        }
    }       
    blankArray.reverse();
    for(let j=0;j<blankArray.length;j++){
        mainArray.splice(blankArray[j],1);
    }
    localStorage.setItem("crud",JSON.stringify(mainArray));
    showDataFun();
    blankArray.splice(0,blankArray.length);
});