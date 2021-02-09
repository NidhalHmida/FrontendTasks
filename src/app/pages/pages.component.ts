import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {  
  mode = new FormControl('side');
  matDrawerShow : boolean = true;
  matDrawerOpened: boolean= false
  constructor() {
    
  }


  ngOnInit(): void {
   
  }
}