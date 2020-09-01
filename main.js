var data = [];
var list = document.querySelector("tbody");
var table = document.querySelector(".list");
var select = document.querySelector(".select");
var category = ["完成率%"];
var nameList = [];
var url = "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json";

axios.get(url)
    .then(function (response) {

        data = response.data;

        getData();
    });
var process = [];


function getData() {
    data.forEach(function (item) {
        var dataItem = {
            "id": item.id,
            "name": item.name,
            "process": item.process
        }
        process.push(dataItem);

    })

}




function dataSortByID() {
    var str = "";

    process.sort(function (a, b) {
        a = parseInt(a.id);
        b = parseInt(b.id);
        return a - b;



    })
    process.forEach(function (item) {
        var listItem = "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.process + "</td></tr>";
        str += listItem
    })
    list.innerHTML = str;
    renderById(process)
}

function dataSort() {
    var str = "";

    var num = 1;
    process.sort(function (a, b) {
        a = parseFloat(a.process);
        b = parseFloat(b.process);
        return b - a;



    })
    process.forEach(function (item) {
        var listItem = "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.process + "</td></tr>";
        num++;
        str += listItem
    })
    console.log(str);
    list.innerHTML = str;
    renderById(process)
}

function updateList(e) {
    var selectName = e.target.value;
    console.log(selectName)
    if (selectName == "id") {
        table.style.opacity = 1
        nameList = [];
        category = ["完成率%"];
        dataSortByID()
    } else {
        table.style.opacity = 1
        nameList = [];
        category = ["完成率%"];
        dataSort()
    }
}


select.addEventListener('change', updateList, false);

function renderById(processData) {

    processData.forEach(function (item) {
        category.push(parseInt(item.process));
        nameList.push(item.name)
    })
    console.log(nameList, category)
    var chart = c3.generate({
        bindto: "#chart",
        data: {
            columns: [
                category
            ],
            type: 'bar',
            colors: {
                '完成率%': function (d) {
                    return '#' + (0xff0000 + (d.value - 25) * 256 * 3).toString(16);
                }
            }
        },
        axis: {   //客製化X軸 Y軸內容

            rotated: true,  //反轉XY軸           
            x: {
                show: true,               // 顯示 X 軸
                type: "category",         // X 軸資料類型
                categories: nameList,     // X 軸需顯示的資料
                tick: {
                    multiline: false      // 顯示換行設定
                }
            },
            y: {
                label: {
                    text: "完成率"
                }
            }
        },
        size: {
            height: category.length * 30,

        },
    });
}
