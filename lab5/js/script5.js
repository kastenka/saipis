let db = openDatabase('lab5', '1.0', 'Lab5', 5 * 1024 * 1024);
let groupNumbers = new Set();
let groups = new Set();

class Group {

  constructor(faculty, numberGroup, studQuantity, email, course) {
    this.faculty = faculty;
    this.numberGroup = numberGroup;
    this.studQuantity = studQuantity;
    this.email = email;
    this.course = course;
  }

  toArray() {
    let array = [];
    for (let key in this) {
      array.push(this[key]);
    }
    return array;
  }
}

function init() {
  db.transaction(function (tx) {
    tx.executeSql("DROP TABLE IF EXISTS groups");
  });
  db.transaction(function (tx) {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS groups(faculty TEXT, numberGroup INTEGER, studQuantity INTEGER, email TEXT,course INTEGER)");
  });
}

function addNewGroup() {
  let groupNumber = document.getElementById("number").value;
  if (groupNumbers.has(groupNumber)) {
    alert("Карточка с таким номером уже внесена в базу");
    return;
  } else {
    groupNumbers.add(groupNumber);
  }
  let group = new Group(
      document.getElementById("fac").value,
      document.getElementById("number").value,
      document.getElementById("quantity").value,
      document.getElementById("email").value,
      document.getElementById("course").value
  );
  let elementById = document.getElementById("address");
  let sql;
  if (elementById != null) {
    group["address"] = elementById.value;
    sql = 'INSERT INTO groups(faculty, numberGroup, studQuantity, email,course,address) VALUES(?,?, ?, ?, ?,?)';
  } else {
    sql = 'INSERT INTO groups(faculty, numberGroup, studQuantity, email,course) VALUES(?,?, ?, ?, ?)';
  }
  groups.add(group);
  db.transaction(function (tx) {
    tx.executeSql(
        sql,
        group.toArray()
    );
  });
  setHtmlSelectGroupsNumbers();
}

function setHtmlSelectGroupsNumbers() {
  let selectDiv = document.getElementById("select");
  selectDiv.innerHTML = "";
  let select = document.createElement('select');

  groupNumbers.forEach(function (item) {
    select.appendChild(new Option(item, item));
  });
  selectDiv.appendChild(select);
}

function removeGroup() {
  let select = document.getElementById("select").children[0];
  let selectedOption = select.options[select.selectedIndex];
  let selectedText = selectedOption.text;

  db.transaction(function (tx) {
    tx.executeSql('DELETE from groups WHERE numberGroup=?',
        [selectedText]);
  });
  groupNumbers.delete(selectedText);
  setHtmlSelectGroupsNumbers();

  groupNumbers.forEach(function (item) {
    if (item.numberGroup === selectedText) {
      groupNumbers.delete(item);
    }
  });
}


function createRow(data) {
  let html;
  if (data.hasOwnProperty("address")) {
    html = '<tr><td>' + data.faculty + '</td><td>' + data.numberGroup
        + '</td><td>'
        + data.studQuantity + '</td><td>' + data.email + '</td><td>'
        + data.course
        + '</td><td>' + data.address + '</td></tr>'
  } else {
    html = '<tr><td>' + data.faculty + '</td><td>' + data.numberGroup
        + '</td><td>'
        + data.studQuantity + '</td><td>' + data.email + '</td><td>'
        + data.course
        + '</td></tr>';
  }
  $("#allData table").append(html);
}

function showData(sql) {
  if (groups.size != 0) {
    let html;
    let isAddressExist=false;
    groups.forEach(function (item) {
      if (item.hasOwnProperty("address")){
        isAddressExist=true;
      }
    });
    if (!isAddressExist) {
      html = '<table border="1"><tr><td>ФИО</td><td>Номер карточки</td><td>Номер телефона</td>'
          + '<td>Адрес пациента</td><td>Признак стационарной помощи</td></tr></table>';
    } else {
      html = '<table border="1"><tr><td>ФИО</td><td>Номер карточки</td><td>Номер телефона</td>'
          + '<td>Адрес</td><td>Признак стационарной помощи</td><td>Адрес поликлиники</td></tr></table>';
    }
    $("#allData").html(html);
    db.transaction(function (tx) {
      tx.executeSql(sql, [], function (tx, result) {
        for (let i = 0; i < result.rows.length; i++) {
          let row = result.rows.item(i);
          let group = new Group(
              row.faculty, row.numberGroup,
              row.studQuantity, row.email,
              row.course
          );
          if (row.hasOwnProperty("address")) {
            group["address"] = row.address;
          }
          createRow(
              group
          );
        }
      });
    });
  }

}

function addNewField() {
  let status = false;
  groups.forEach(function (item) {
    if (item.hasOwnProperty("address")) {
      status = true;
      return;
    }
    item["address"] = null;
  });
  if (!status) {
    let sql = `ALTER TABLE groups
      ADD COLUMN address TEXT`;
    db.transaction(function (tx) {
      tx.executeSql(sql);
    });

    let input = document.createElement('input');
    input.placeholder = "Введите адрес";
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'address');
    document.getElementById("form").appendChild(input);
  }
}

