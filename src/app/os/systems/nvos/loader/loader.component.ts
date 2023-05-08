import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../config';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['system/' + config.id]);
    }, 5000)
  }
}
