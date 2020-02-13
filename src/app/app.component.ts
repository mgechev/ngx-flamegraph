import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      label: 'Top level',
      value: 10,
      children: [
        {
          label: 'Child 1',
          value: 5,
          children: [

          ]
        },
        {
          label: 'Child 2',
          value: 3,
          children: [
            {
              label: 'Child 2',
              value: 2,
              children: [

              ]
            },
            {
              label: 'Child 2',
              value: 1,
              children: [
                {
                  label: 'Child 2',
                  value: 3,
                  children: [

                  ]
                }
              ]
            }
          ]
        }
      ],
    },
    {
      label: 'Top sibling',
      value: 5,
      children: []
    }
  ];
}
