import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Card } from '../models/card';
import { Task } from '../models/task';
import { CoogieService } from '../services/coogie.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  cards = [];
  colorLinks;
  selectedColor = 'black';
  navCard;
  constructor(private cookieService:CoogieService) { }

  ngOnInit(): void {
    // this.cards = [];
    try{
      this.cards = this.cookieService.getCookie();
      if(this.cards.length==0){
        this.cards = [{
          title: "Default",
          tasks: [
          ],
          xy:null,
          color:'black'
        }]
      }
      window.onload = (event) => {
        this.repositionCards();
        this.getColorLinks();
        this.updateColorOnDom();
        this.colorUpdateTimer();
      };
    }catch{
      console.log("Cookie error: Initializing empty cards...");
      this.cards = [{
        title: "Default",
        tasks: [
        ],
        xy:null,
        color:'black'
      }];
    }
    
  }


  //tasks =======================================
  addTask(cardIndex){
    //id for the input value is " 'input'+card[i] "
    let target = "input"+cardIndex; 
    //make new task object
      //value grabbing requires casting
    let newTask:Task = {
      description: (<HTMLInputElement>document.getElementById(target)).value,
      notes: "",
      label: "",
      tag: "",
      priority: 0,
      created: '',
      completed: ''
    }
    //assign it a created date
    newTask.created = this.dateGetter();
    //add task to the card's list of tasks
    this.cards[cardIndex].tasks.push(newTask);
    //clear the html input form
    (<HTMLInputElement>document.getElementById(target)).value = '';
    //finally save the data
    this.saveData();
  }
  completeTask(taskIndex, cardIndex){
    if(this.cards[cardIndex].tasks[taskIndex].completed != ''){
      this.cards[cardIndex].tasks[taskIndex].completed = '';
    } else {
      this.cards[cardIndex].tasks[taskIndex].completed = this.dateGetter();
    }
    this.saveData();
  }

  //cards =========================================
  addCard(){
    //make new card object with data
    let newCard:Card = {
      title: (<HTMLInputElement>document.getElementById("newCardInput")).value,
      tasks: [],
      xy:null,
      color: this.selectedColor
    }
    //make sure it has a title
    if((newCard.title==='') || (newCard.title==null)){
      return;
    }
    //add to array
    this.cards.push(newCard);
    //clean the input form
    (<HTMLInputElement>document.getElementById("newCardInput")).value = "";
    console.log(JSON.stringify(this.cards));
    this.saveData();
    //update the card's color on dom
    this.updateColorOnDom();
    
  }
  deleteCard(cardIndex){
    let target = document.getElementById("col"+cardIndex);
    target.remove();
    target.innerHTML = '';
    delete this.cards[cardIndex];
    this.cards = this.arrayCleaner(this.cards);
    console.log(JSON.stringify(this.cards));
    //TODO: add deleted tasks to historical task array
    this.saveData();
  }

  //card positioning: ==============================================

    //cards' absolute position begin in their default location, stacked
    //dragging them updates the transform style coordinates
    //instead of fiddling with viewport-relative/absolute/style coordinates, just save transform data
    //this works, but there's a current issue:
      //TODO: moving cards after saving>moving>resetting position is buggy
  saveCardPositions(){
    //build target array more accurately than getElementsByClass("col")
    let targets = [];
    for(let i = 0; i < this.cards.length; i++){
      targets[i] = document.getElementById("col"+i);
    }
    console.log("target length: "+targets.length);
    //then save each card's position to their respective fields
    for(let i = 0; i < targets.length; i++){
      console.log("pos: "+i+" : "+ targets[i].style.transform);
      this.cards[i].xy = targets[i].style.transform;
    }
    this.saveData();
  }
  repositionCards(){
    for(let i = 0; i < this.cards.length; i++){
      document.getElementById("col"+i).style.transform = this.cards[i].xy;
    }
  }
  //data-saving / loading =======================
  saveData(){
    this.cookieService.saveCookie(this.cards);
  }
  loadData(){
    this.cards = this.cookieService.getCookie();
    this.repositionCards();
  }

  //color picker ================================
  chooseColor(color){
    let target = document.getElementById(color);
    this.selectedColor = target.style.backgroundColor;
    //
    console.log(this.selectedColor);
    //
    this.unmarkColorLinks();
    target.innerHTML = '🗹';
    //also set nav color for some cute feedback
    this.navCard.style.backgroundColor = this.selectedColor;
  }
  getColorLinks(){
    this.colorLinks = document.getElementsByClassName("colorLinks");
    this.navCard = document.getElementById("navCard");
  }
  unmarkColorLinks(){
    for(let i = 0; i < this.colorLinks.length; i++){
      this.colorLinks[i].innerHTML = "☐";
    }
  }
  updateColorOnDom(){
    //todo: bug that won't update card color (?)
      //adding a new card just shows black, claims the element is null
        //then adding another new card, then decides to update the previous card
        //for now, we'll just have the dom update the cards on a timer 
    
    let arr = document.getElementsByClassName("taskcard") as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < arr.length; i++){
      // console.log(arr[i].className);
      arr[i].style.backgroundColor = this.cards[i].color;
    }
  }
  colorUpdateTimer(){
    setTimeout(()=>{
      // console.log('bip');
      this.updateColorOnDom();
      this.colorUpdateTimer();
    }, 5000);
  }
  //utility functions ===========================
  arrayCleaner(arr) {
    return arr.filter(function(item){
      return !!item;
    });
  }
  dateGetter(){
    let newDate = new Date();
    let month = newDate.toLocaleString('default', { month: 'short' }); //to get month name
    return newDate.getDay() + month + newDate.getFullYear(); //i like this format
  }
  test(){ //for debugging
    alert('test');
  }

}
