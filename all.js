
//上傳作業到github請老師改
// Today is XX date
// Edit function
// EN/TW switcher
// drag and drop
// CTA is broken on iphone


// 綁定 DOM
var textInput = document.querySelector('.textInput');
var btnAdd = document.querySelector('.btnAddItem');
var todoList = document.querySelector('.todoListBox');

// ActionBtns
var btnEdit = document.querySelector('.todoListBox__item__btnEdit');
var btnDelete = document.querySelector('.todoListBox__item__btnDelete');


//剩下 # 待辦事項
var remain = document.querySelector('.dividerBox__remain');

//tooltip
var tooltip = document.querySelector('.tooltip');
var btnClose = document.querySelector('.ic-close');


// 把目前的 data 轉回陣列存回 localStorage 
var data = JSON.parse(localStorage.getItem('listData')) || [];


// 一開始先檢查 local storage 裡面是否有data, 有的話就隱藏插圖，然後執行 update List
if (data == '') {
    document.querySelector('.emptyImg').style.display = "block";
} else {
    document.querySelector('.emptyImg').style.display = "none";
    updateList(data);
}



//監聽事件
btnAdd.addEventListener('click', addData, false);
textInput.addEventListener('keydown', enterData, false);
// btnDelete.addEventListener('click', deleteData, true);
todoList.addEventListener('click', deleteData, true);
btnClose.addEventListener('click', closeTooltip, false);
btnEdit.addEventListener('click', editTodo, false);


//關掉tooltip 
function closeTooltip() {
    tooltip.style.opacity = "0";
}

//按鍵盤enter新增項目
function enterData(e) {
    var keyEnter = e.keyCode;
    // 如果按enter的話執行 addData function
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
        var todoItem = '<li class="todoListBox__item" data-index=' + i + '><p class="todoListBox__item__text">' + todoItemContent + '</p><input type="text" class="todoListBox__item__edit" value="出門買菜"><a href="" class="todoListBox__item__btnCheck"><img class="ic-check" src="./img/ic_check.png" alt="check"></a><a href="" class="todoListBox__item__btnEdit mr8"><img class="ic-edit" src="./img/ic_edit.png" alt="edit"></a><a href="#" class="todoListBox__item__btnDelete" data-index=' + i + '><img class="ic-Trash" src="https://i.imgur.com/UivbKYM.png" alt="trash"></a></li>'
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


//編輯todo
function editTodo() {
    console.log('123');
}


// 刪除todo項目
function deleteData(e) {
    e.preventDefault();
    //抓取點擊元素的 className
    var clickDom = e.target.className;
    var num = e.target.parentNode.dataset.index;
    //根據點擊元素的 className 來刪掉相應的 data index
    switch (clickDom) {
        case 'ic-Trash':
            data.splice(num, 1);
            break;
        case 'todoListBox__item__btnDelete':
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
