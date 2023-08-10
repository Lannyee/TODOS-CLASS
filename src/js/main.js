class Item {
    constructor(itemData) {
        this.itemData = itemData;
    }

    finishItem() {
        this.itemData.status = 'finish';
    }

    unfinishedItem() {
        this.itemData.status = 'unfinished';
    }
}

class List {
    constructor(listData) {
        this.listData = [];
        for (let item of listData) {
            this.listData.push(new Item(item));
        }
    }

    addItem(data) {
        this.listData.unshift(new Item(data));
    }

    finishItem(index) {
        this.listData[index].finishItem();
    }

    finishAllItem() {
        for (let index in this.listData) {
            this.finishItem(index);
        }
    }

    unfinishedItem(index) {
        this.listData[index].unfinishedItem();
    }

    unfinishedAllItem() {
        for (let index in this.listData) {
            this.unfinishedItem(index);
        }
    }

    deleteItem(index) {
        this.listData.splice(index, 1);
    }

    deleteAllItem() {
        this.listData.splice(0, this.listData.length);
    }
}

class UI {
    constructor() {
        this.list = new List([...data]);
        this.nodes = {
            inputNode: document.querySelector('#form input'),
            addNode: document.querySelector('#form button'),
            listNode: document.querySelector('#list'),
            footerNode: document.querySelector('#footer'),
            finishNode: document.querySelector('#footer .finish'),
            countNode: document.querySelector('#footer .count'),
            deleteNode: document.querySelector('#footer .delete')
        }

        this.renderList();
        this.renderFooter();
    }

    renderList() {
        let { listNode } = this.nodes;
        let listData = this.list.listData;
        if (listData.length > 0) {
            listNode.classList.remove('disabled');
            let listNodeHtml = '';
            let index = 0;
            for (let item of listData) {
                let { content, status } = item.itemData;
                listNodeHtml += this.addItemNode(content, status, index);
                index++;
            }
            listNode.innerHTML = listNodeHtml;
        } else {
            listNode.innerHTML = '';
            listNode.classList.add('disabled');
        }
    }

    renderFooter() {
        let { footerNode, finishNode, countNode } = this.nodes;
        let listData = this.list.listData;
        if (listData.length > 0) {
            footerNode.classList.remove('disabled');
            let finishText = '全部完成';
            let finish = listData.every(function(item) {
                let { status } = item.itemData;
                return status == 'finish';
            })
            if (finish) {
                finishText = '全部取消';
                finishNode.classList.remove('finish');
                finishNode.classList.add('unfinished');
            } else {
                finishNode.classList.add('finish');
                finishNode.classList.remove('unfinished');
            }
            finishNode.innerText = finishText;

            let count = '0/0';
            let finishCount = 0;
            let finishTotal = listData.length;
            listData.forEach(function(item) {
                let { status } = item.itemData;
                if (status == 'finish') {
                    finishCount++;
                }
            })
            count = finishCount + '/' + finishTotal;
            countNode.innerText = count;
        } else {
            footerNode.classList.add('disabled');
        }
    }

    addItemNode(content, status = 'unfinished', index = 0) {
        return `
            <li class="item ${status == 'finish' ? 'active' : ''}">
                <span class="status">${status == 'finish' ? '已完成' : '未完成'}</span>
                <span class="content">${content}</span>
                <button class="${status == 'finish' ? 'unfinished' : 'finish'}" data-index="${index}">${status == 'finish' ? '取消' : '完成'}</button>
                <button class="delete" data-index="${index}">删除</button>
            </li>
        `
    }

    addItem() {
        let value = this.nodes.inputNode.value;
        if (value) {
            let itemData = {
                id: getRandomID(),
                status: 'unfinished',
                content: this.nodes.inputNode.value,
                lastFinishTime: ''
            }
            this.list.addItem(itemData);
            this.updateUI();
            this.nodes.inputNode.value = '';
        }
    }

    finishItem(index) {
        this.list.finishItem(index);
        this.updateUI();
    }

    finishAllItem() {
        this.list.finishAllItem();
        this.updateUI();
    }

    unfinishedItem(index) {
        this.list.unfinishedItem(index);
        this.updateUI();
    }

    unfinishedAllItem() {
        this.list.unfinishedAllItem();
        this.updateUI();
    }

    deleteItem(index) {
        this.list.deleteItem(index);
        this.updateUI();
    }

    deleteAllItem() {
        this.list.deleteAllItem();
        this.updateUI();
    }

    updateList() {
        this.renderList();
    }

    updateFooter() {
        this.renderFooter();
    }

    updateUI() {
        this.updateList();
        this.updateFooter();
    }
}



let ui = new UI();
let { addNode, listNode, finishNode, deleteNode } = ui.nodes;

addNode.addEventListener('click', function () {
    ui.addItem();
})

listNode.addEventListener('click', function (e) {
    let className = e.target.className;
    let index = e.target.getAttribute('data-index');
    if (className == 'finish') {
        ui.finishItem(index);
    } else if (className == 'unfinished') {
        ui.unfinishedItem(index);
    } else if (className == 'delete') {
        ui.deleteItem(index);
    } else {
        return false;
    }
})

finishNode.addEventListener('click', function (e) {
    let className = e.target.className;
    if (className == 'finish') {
        ui.finishAllItem();
    } else if (className == 'unfinished') {
        ui.unfinishedAllItem();
    }
})

deleteNode.addEventListener('click', function () {
    ui.deleteAllItem();
})