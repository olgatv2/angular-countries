import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'search-box.component.html'
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(    //primero hace este filtro
        debounceTime(500)  //que espera estos milisegundos para luego hacer lo del subscribe
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
  }

  //cuando el componente se "destruye" (cambio de ruta o ngIf)
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  emitValue(value: string): void {
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }
}