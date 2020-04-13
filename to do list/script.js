// Storage functions
function getElementsFromStorage() {
    const list = localStorage.getItem('todo-list');

    if(list) {
        return JSON.parse(list);
    }

    return [];
}

function addElementToStorage(text) {
    // Get list from local storage
    let list = getElementsFromStorage();
    list.push(text);
    localStorage.setItem('todo-list', JSON.stringify(list));
}

/********************************************************/

// Create a new list item when clicking on the "Add" button
function addElementFromInput() {
    // Get input text from user
    const input = $("#myInput").val();
    if (input === '') {
        alert("You must write something!");
        return;
    }

    // Add element to the list with user input text
    let text = '<span class="element">' + input + '</span>';
    let close = '<span class="close">\u00D7</span>';
    $("#myUL").append('<li>' + text + close + '</li>');

    addElementToStorage(input);
}

function toggleChecked() {
    $(this).toggleClass('checked')
}

function deleteElement() {
    $(this).parent().remove();

    let list = [];

    $("#myUL li").each( function () {
        const text = $(this).find(".element").text();
        list.push(text);
    });

    localStorage.removeItem('todo-list');
    localStorage.setItem('todo-list', JSON.stringify(list));
}

$(document).ready(function () {// Create a "close" button and append it to each list item
    /**
     * If you try to do something with the elements that are dynamically added to DOM using the jQuery click() method it will not work,
     * because it bind the click event only to the elements that exist at the time of binding. To bind the click event to all existing
     * and future elements, use the jQuery on() method
     */
    $(document).on("click", ".addBtn" , addElementFromInput);
    $(document).on("click", ".element" , toggleChecked);
    $(document).on("click", ".close" , deleteElement);

    getElementsFromStorage().forEach(text => {
        $("#myUL").append('<li><span class="element">' + text + '</span><span class="close">\u00D7</span></li>');
    });
});