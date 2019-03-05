import { NgModule } from '@angular/core';

import { JhipsterDemoAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterDemoAppSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterDemoAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterDemoAppSharedCommonModule {}
