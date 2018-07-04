import { NgModule } from '@angular/core';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { TruncatedTextComponent } from './truncated-text/truncated-text';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const components = [
  TruncatedTextComponent
];

@NgModule({
  declarations: [components],
  imports: [TruncateModule,BrowserAnimationsModule],
  exports: [components]
})
export class ComponentsModule {}
