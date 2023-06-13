import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  // constructor(private confirmService: ConfirmService) {}

  canDeactivate(component: MemberEditComponent): boolean {
  // canDeactivate(component: MemberEditComponent): Observable<boolean> {
    if (component.editForm?.dirty) {
      return confirm('Are you sure you want to navigate away without saving changes?');
    }
    return true;
    // if (component.editForm?.dirty) {
    //   return this.confirmService.confirm()
    // }
    // return of(true);
  }
  
}
