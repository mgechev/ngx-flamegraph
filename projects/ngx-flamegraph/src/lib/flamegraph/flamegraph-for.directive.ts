/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  isDevMode,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
  ElementRef,
  SkipSelf
} from '@angular/core';

/**
 * @publicApi
 */
export class NgxFlamegraphForContext<T, U extends NgIterable<T> = NgIterable<T>> {
  constructor(
    public $implicit: T,
    public ngxFlamegraphFor: U,
    public index: number,
    public count: number
  ) {}

  get first(): boolean {
    return this.index === 0;
  }

  get last(): boolean {
    return this.index === this.count - 1;
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }
}

@Directive({ selector: '[ngxFlamegraphFor][ngxFlamegraphForOf]' })
export class FlamegraphForDirective<T, U extends NgIterable<T> = NgIterable<T>>
  implements DoCheck {

  @Input()
  set ngxFlamegraphForOf(ngxFlamegraphFor: (U & NgIterable<T>) | undefined | null) {
    this._ngxFlamegraphFor = ngxFlamegraphFor;
    this._ngxFlamegraphForDirty = true;
  }

  @Input() ngxFlamegraphForHeight: number;
  @Input() ngxFlamegraphForItemHeight: number;

  @Input()
  set ngxFlamegraphTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  get ngxFlamegraphTrackBy(): TrackByFunction<T> {
    return this._trackByFn;
  }

  private _ngxFlamegraphFor: U | undefined | null = null;
  private _ngxFlamegraphForDirty = true;
  private _differ: IterableDiffer<T> | null = null;
  private _trackByFn!: TrackByFunction<T>;

  constructor(
    @SkipSelf() private _element: ElementRef<HTMLElement>,
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<NgxFlamegraphForContext<T, U>>,
    private _differs: IterableDiffers
  ) {
    console.log(this._element);
  }

  /**
   * A reference to the template that is stamped out for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   */
  @Input()
  set ngForTemplate(value: TemplateRef<NgxFlamegraphForContext<T, U>>) {
    if (value) {
      this._template = value;
    }
  }

  static ngTemplateContextGuard<T, U extends NgIterable<T>>(
    dir: FlamegraphForDirective<T, U>,
    ctx: any
  ): ctx is NgxFlamegraphForContext<T, U> {
    return true;
  }

  /**
   * Applies the changes when needed.
   */
  ngDoCheck(): void {
    if (this._ngxFlamegraphForDirty) {
      this._ngxFlamegraphForDirty = false;
      // React on ngxFlamegraphFor changes only once all inputs have been initialized
      const value = this._ngxFlamegraphFor;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this.ngxFlamegraphTrackBy);
        } catch {
          throw new Error(
            `Cannot find a differ supporting object '${value}' of type '${getTypeName(
              value
            )}'. NgFor only supports binding to Iterables such as Arrays.`
          );
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._ngxFlamegraphFor);
      if (changes) {
        this._applyChanges(changes);
      }
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const insertTuples: RecordViewTuple<T, U>[] = [];
    changes.forEachOperation(
      (
        item: IterableChangeRecord<any>,
        adjustedPreviousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (item.previousIndex == null) {
          const view = this._viewContainer.createEmbeddedView(
            this._template,
            // tslint:disable-next-line:no-non-null-assertion
            new NgxFlamegraphForContext<T, U>(null!, this._ngxFlamegraphFor!, -1, -1),
            currentIndex === null ? undefined : currentIndex
          );
          const tuple = new RecordViewTuple<T, U>(item, view);
          insertTuples.push(tuple);
        } else if (currentIndex == null) {
          this._viewContainer.remove(
            adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex
          );
        } else if (adjustedPreviousIndex !== null) {
          // tslint:disable-next-line:no-non-null-assertion
          const view = this._viewContainer.get(adjustedPreviousIndex)!;
          this._viewContainer.move(view, currentIndex);
          const tuple = new RecordViewTuple(
            item,
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            <EmbeddedViewRef<NgxFlamegraphForContext<T, U>>> view
          );
          insertTuples.push(tuple);
        }
      }
    );

    for (const tuple of insertTuples) {
      this._perViewChange(tuple.view, tuple.record);
    }

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      const viewRef = <EmbeddedViewRef<NgxFlamegraphForContext<T, U>>> (
        this._viewContainer.get(i)
      );
      viewRef.context.index = i;
      viewRef.context.count = ilen;
      // tslint:disable-next-line:no-non-null-assertion
      viewRef.context.ngxFlamegraphFor = this._ngxFlamegraphFor!;
    }

    changes.forEachIdentityChange((record: any) => {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      const viewRef = <EmbeddedViewRef<NgxFlamegraphForContext<T, U>>> (
        this._viewContainer.get(record.currentIndex)
      );
      viewRef.context.$implicit = record.item;
    });
  }

  private _perViewChange(
    view: EmbeddedViewRef<NgxFlamegraphForContext<T, U>>,
    record: IterableChangeRecord<any>
  ) {
    view.context.$implicit = record.item;
  }
}

class RecordViewTuple<T, U extends NgIterable<T>> {
  constructor(
    public record: any,
    public view: EmbeddedViewRef<NgxFlamegraphForContext<T, U>>
  ) {}
}

function getTypeName(type: any): string {
  return type.name || typeof type;
}
