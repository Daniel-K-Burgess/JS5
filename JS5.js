//class for items in the list. Only one argument.
class item {
    constructor(name) {
        this.name = name;
    }
}
//class for list. Creates an array for each list.
class list {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    //checks if item is an instance of the item class
    additem(item) {
        if (item instanceof item) {
            this.items.push(item);
            //The video shows this but I can't get this error to show
        } else {
            throw new Error(`You can only add an instance of item. Argument is not a item: ${item}`);
        }
    }
}
//Creates the main menu class. No argument. Creates an array.
class Menu {
    constructor() {
        this.lists = [];
        this.selectedlist = null; //which list is selected. None selected at first
    }
    start() { //method to begin the app. Contains methods defined below.
        let selection = this. showMainMenuOptions();
        while (selection != 0) { //while the selection is not 0. 0 will be for exit.
            switch (selection) { //switch statement executes until break
                case '1' :
                    this.createlist();
                    break;
                case '2':
                    this.viewlist();
                    break;
                case '3':
                    this.deletelist();
                    break;
                case '4':
                    this.displaylists();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); //will keep looping until selection made
        }
        alert('Goodbye!'); //when while loop is false
    }

    showMainMenuOptions() {
        //prompt to produce the text box
        //with template literal I don't have to say new line
        return prompt(`
            0) exit
            1) create new list
            2) view list
            3) delete list
            4) display all lists
        `);
    }

    showlistMenuOptions(listInfo) {
        //This prompt is the sub menu for putting items in each list
        return prompt(`
            0) back
            1) create item
            2) delete item
            ----------------------
            ${listInfo}
        `);
    }
//for display all lists, create a blank string, then a for loop to iterate through the lists array
    displaylists() {
        let listString = '';
        for (let i = 0; i < this.lists.length; i++) {
            listString += i + ') ' + this.lists[i].name + '\n';
        }
        alert(listString); //display the results
    }
//Takes one parameter which is name
    createlist() {
        let name = prompt('Enter name for new list:');
        this.lists.push(new list(name));//push adds to the list array
    }

    viewlist() {
        let index = prompt('Enter the index of the list you wish to view:');//text box
        if (index > -1 && index < this.lists.length) {//checks that the input is valid
            this.selectedlist = this.lists[index];
            let description = 'list Name: ' + this.selectedlist.name + '\n';
            for (let i = 0; i < this.selectedlist.items.length; i++) {//iterates through all items in list array
                description += i + ') ' + this.selectedlist.items[i].name + '\n';//new line
            }
            let selection = this.showlistMenuOptions(description);
            switch (selection) {// executes until break
                case '1':
                    this.createitem();
                    break;
                case '2':
                    this.deleteitem();
            }
        }
    }

    deletelist() {
        let index = prompt('Enter the index of the list you wish to delete');
        if ( index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1);//splice to remove a whole array from the array
        }
    }

    createitem() {
        let name = prompt('Enter name for new item:');
        this.selectedlist.items.push(new item(name));//push a new item to the items array
    }

    deleteitem() {
        let index = prompt('Enter the index of the item you wish to delete:');
        if (index > -1 && index < this.selectedlist.items.length) {
            this.selectedlist.items.splice(index, 1);//splice to remove an item from items array
        }
    }
}
//This is an instance of the menu class so all the code will do something
let menu = new Menu();
menu.start();