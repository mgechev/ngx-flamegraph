import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  width = window.innerWidth - 100;
  data = [
    {
      label: 'Root',
      value: 10,
      children: [
        {
          label: 'Top level',
          value: 10,
          children: []
        },
        {
          label: 'Top level',
          value: 10,
          children: [
            {
              label: 'Child 1',
              value: 5,
              children: [
                {
                  label: 'Child 1 1',
                  value: 5,
                  children: []
                },
                {
                  label: 'Child 1 2',
                  value: 3,
                  children: []
                }
              ]
            },
            {
              label: 'Child 2',
              value: 15,
              children: [{
                label: 'Child 2',
                value: 15,
                children: [{
                  label: 'Child 2',
                  value: 15,
                  children: []
                },{
                  label: 'Child 2',
                  value: 15,
                  children: [{
                    label: 'Child 2',
                    value: 15,
                    children: [{
                      label: 'Child 2',
                      value: 15,
                      children: [{
                        label: 'Child 2',
                        value: 15,
                        children: []
                      }]
                    }]
                  }]
                }]
              },
                {
                  label: 'Child 2',
                  value: 15,
                  children: []
                }]
            }
          ],
        },
        {
          label: 'Top sibling',
          value: 5,
          children: [
            {
              label: 'Child 2',
              value: 15,
              children: [
                {
                  label: 'Child 3',
                  value: 15,
                  children: []
                },
                {
                  label: 'Child 4',
                  value: 10,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  ngOnInit() {
    window.onresize = () => {
      this.width = window.innerWidth - 20;
    };
  }
}
