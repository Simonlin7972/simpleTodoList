
//上傳作業到github請老師改
// Today is XX date
// Edit function
// EN/TW switcher
//test


// 綁定 DOM
var textInput = document.querySelector('.textInput');
var btnAdd = document.querySelector('.btnAddItem');
var todoList = document.querySelector('.todoListBox');
var btnDelete = document.querySelector('.btnDelete');

//剩下 # 待辦事項
var remain = document.querySelector('.dividerBox__remain');

//tooltip
var tooltip = document.querySelector('.tooltip');
var btnClose = document.querySelector('.ic-close');


// 把目前的 data 轉回陣列存回 localStorage 
var data = JSON.parse(localStorage.getItem('listData')) || [];


// 一開始先檢查 localstorage 裡面是否有data, 有的話就隱藏插圖，然後執行 update List
if (data == '') {
    document.querySelector('.emptyImg').style.display = "block";
} else {
    document.querySelector('.emptyImg').style.display = "none";
    updateList(data);
}



//監聽事件
btnAdd.addEventListener('click', addData, false);
textInput.addEventListener('keydown', enterData, false);
todoList.addEventListener('click', deleteData, true);

btnClose.addEventListener('click', closeTooltip, false);


//關掉tooltip 
function closeTooltip() {
    tooltip.style.opacity = "0";
}

//按鍵盤enter新增項目
function enterData(e) {
    var keyEnter = e.keyCode;
    // 如果按enter的話執行 addData funciton
    if (keyEnter == 13) {
        addData();
    }
}

//取input的值，新增資料到 data，執行更新頁面功能
function addData() {
    var value = textInput.value;
    //如果input裡面有東西才會送出資料，沒有資料按送出的話顯示 tooltip
    if (value != []) {
        data.push(value);
        updateList(data);
        localStorage.setItem('listData', JSON.stringify(data));
        tooltip.style.opacity = "0";
    } else {
        tooltip.style.opacity = "1";
        tooltip.style.top = "-20px";
    }
    //如果list裡面有data 就拿掉預設插圖
    if (data != '') {
        document.querySelector('.emptyImg').style.display = "none";
    }
}

function updateList(items) {
    var todoCombine = '';
    var dataTotal = items.length;
    for (i = 0; i < dataTotal; i++) {
        var todoItemContent = data[i];
        //在 li 和 a 都各加上了 data-index=* 確保不管點擊 trash icon 或是外匡都能正確得到 index的 值
        var todoItem = '<li class="todoListBox__item" data-index=' + i + '><p class="todoListBox__item__text">' + todoItemContent + '</p><a href="#" class="todoListBox__item__btnDelete" data-index=' + i + '><img class="ic-Trash" src="https://i.imgur.com/UivbKYM.png" alt="trash"><a/></li>'
        todoCombine += todoItem;
    }
    todoList.innerHTML = todoCombine;

    //剩下任務等於 目前 data 總數量
    var remainTaskNum = dataTotal;
    var remainTaskContent = '還有 <b class="remain-task">' + remainTaskNum + '</b> 個待辦項目';
    //把最後數字印在 remain 這個變數上
    remain.innerHTML = remainTaskContent;

    // 更新UI後清空 input內容
    textInput.value = [];
}

function deleteData(e) {
    e.preventDefault();
    var clickDom = e.target.nodeName;
    var num = e.target.parentNode.dataset.index;
    console.log(num);
    switch (clickDom) {
        case 'A':
            data.splice(num, 1);
            break;
        case 'IMG':
            data.splice(num, 1);
            break;
    };
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);

    //如果list裡面沒有data 就顯示預設插圖
    if (data == '') {
        document.querySelector('.emptyImg').style.display = "block";
    }
}


// var todoList = document.querySelector('.todoListBox');
// var todoListItem = '<li class="todoListBox__item"><p class="todoListBox__item__text"> Whatever</p><a href="" class="todoListBox__item__btnDelete"><img class="ic-Trash" src="https://i.imgur.com/UivbKYM.png" alt="trash"><a/></li>'

// todoList.innerHTML = todoListItem + todoListItem;



// var todoList = document.querySelector('.todoListBox');

// var house = [
//     {
//         owner: 'simon',
//         room: [3, 2]
//     },
//     {
//         owner: 'chloe',
//         room: [4, 2]
//     }
// ]

// var houseTotal = house.length;
// for (var i = 0; i < houseTotal; i++) {
//     //新增元素
//     var todoListContent = document.createElement('p');
//     //在元素上加內容
//     todoListContent.textContent = house[i].owner;
//     //把新增後的元素放在指定元素中
//     todoList.appendChild(todoListContent);

// }



// var houseTotal = house.length;

// // 因為innerHTML會將塞入前的內容清空，所以我們要將迴圈取出後的字串加起來
// var strConbine = '';

// for (var i = 0; i < houseTotal; i++) {
//     var todoListContent = '<p>第' + (i + 1) + '號房子的主人是' + house[i].owner + '，他的房子有' + house[i].room[0] + '間廁所 </p>'
//     strConbine += todoListContent;
//     // console.log(strConbine);
//     todoList.innerHTML = strConbine;


// }


// // getDom element 
// var inputText = document.querySelector('.textInput');
// var btnAdd = document.querySelector('.btnAddItem');
// var todoList = document.querySelector('.todoListBox');

// var data = [];

// btnAdd.addEventListener('click', updateList);


// function updateList(e) {
//     var txt = inputText.value;
//     var todoTxt = '';
//     todoTxt += '<p class="todoListBox__item__text">' + txt + '</p>';
//     inputText.value = [];
//     todoList.innerHTML = todoTxt;
// }



// var createLi = document.createElement('li');
// createLi.setAttribute('class', 'todoListBox__item');

// var element = document.querySelector('.todoListBox');
// element.appendChild(createLi);


// //新增todo title
// var createP = document.createElement('p');
// createP.setAttribute('class', 'todoListBox__item__text');
// createP.textContent = txt;

// for(var i=0; i< todoTotal; i++){

// }

// var todoTitle = document.querySelector('.todoListBox__item');
// todoTitle.appendChild(createP);





// };