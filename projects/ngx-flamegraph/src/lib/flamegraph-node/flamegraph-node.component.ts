import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  NgZone,
  OnDestroy,
} from "@angular/core";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "[flamegraph-node]",
  templateUrl: "./flamegraph-node.component.html",
  styleUrls: ["./flamegraph-node.component.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlamegraphNodeComponent implements OnDestroy {
  @Input() height: number;
  @Input() navigable: boolean = false;
  @Input() color: string;

  @Output() zoom = new EventEmitter<void>();

  @Output() mouseOverZoneless = new EventEmitter();
  @Output() mouseLeaveZoneless = new EventEmitter();

  private mouseOverTeardownFn: Function;
  private mouseLeaveTeardownFn: Function;

  constructor(
    private _ngZone: NgZone,
    private _element: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.mouseOverTeardownFn = this._renderer.listen(
        this._element.nativeElement,
        "mouseover",
        (event: MouseEvent) => this.mouseOverZoneless.emit(event)
      );

      this.mouseLeaveTeardownFn = this._renderer.listen(
        this._element.nativeElement,
        "mouseleave",
        (event: MouseEvent) => this.mouseLeaveZoneless.emit(event)
      );
    });
  }

  ngOnDestroy(): void {
    this.mouseOverTeardownFn();
    this.mouseLeaveTeardownFn();
  }
}
