import { Injectable } from '@angular/core';
import { read } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  
  getDefaultCards(){
    return [{
        title: "Daily",
        tasks: [
          {
            description: "Walk the dog",
            notes: "bring poober scoober",
            label: "doggo",
            tag: "puppers",
            priority: 5,
            created: 'datemade',
            completed: 'datedone'
          },
          {
            description: "Run the fridge",
            notes: "it's getting away...",
            label: "appliances",
            tag: "furniture",
            priority: 5,
            created: 'datemade',
            completed: ''
          }
        ],
        xy:null,
        color:'red'
      },
      {
        title: "Friday",
        tasks: [{
          description: "Doctor's Appt",
          notes: "i didn't have a dog",
          label: "it wasn't mine",
          tag: "(whose dog was it?)",
          priority: 5,
          created: 'datemade',
          completed: ''
        }],
        xy:null,
        color:'red'
      }
    ];
  }

}
