import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { ChannelHeaderComponent } from '../channel-header/channel-header.component';

import { SigmfFileSinkComponent } from './sigmf-file-sink.component';

describe('SigmfFileSinkComponent', () => {
  let component: SigmfFileSinkComponent;
  let fixture: ComponentFixture<SigmfFileSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SigmfFileSinkComponent,
        ChannelHeaderComponent
      ],
      imports: [
        RouterModule,
        FormsModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatProgressBarModule,
        HttpClientTestingModule,
        CommonComponentsModule,
        ColorPickerModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: { snapshot: {parent: {params: {dix: 0, cix: 0}}}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigmfFileSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});