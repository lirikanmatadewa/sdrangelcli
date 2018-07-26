import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PresetService } from '../preset/preset.service';
import { SdrangelUrlService } from '../../sdrangel-url.service';
import { PresetLoad, Presets } from '../preset/preset';

export interface PresetSelect {
  value: PresetLoad,
  viewValue: string
}

export interface PresetGroupSelect {
  disabled?: boolean,
  name: string,
  presets: PresetSelect[]
}

@Component({
  selector: 'app-load-preset-dialog',
  templateUrl: './load-preset-dialog.component.html',
  styleUrls: ['./load-preset-dialog.component.css']
})
export class LoadPresetDialogComponent implements OnInit {
  sdrangelURL : string;
  presets: Presets;
  presetGroups: PresetGroupSelect[];
  devicesetIndex: number;
  selectedPreset: PresetLoad;

  constructor(private dialogRef: MatDialogRef<LoadPresetDialogComponent>,
    private presetService: PresetService,
    private sdrangelUrlService: SdrangelUrlService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar)
  {
    this.devicesetIndex = data.devicesetIndex;
    this.fetchPresetInformation();
  }

  ngOnInit() {
    this.sdrangelUrlService.currentUrlSource.subscribe(url => {
      this.sdrangelURL = url;
    });
  }

  private fetchPresetInformation() {
    this.presetService.getInfo(this.sdrangelURL).subscribe(
      presets => {
        this.presets = presets;
        for (let presetGroup of presets.groups) {
          this.presetGroups.push({
            name: presetGroup.groupName,
            presets: []
          });
          for (let preset of presetGroup.presets) {
            this.presetGroups[this.presetGroups.length-1].presets.push({
              viewValue: preset.centerFrequency + " " + preset.type + " " + preset.name,
              value: {
                deviceSetIndex: this.devicesetIndex,
                preset: {
                  groupName: presetGroup.groupName,
                  centerFrequency: preset.centerFrequency,
                  name: preset.name,
                  type: preset.type
                }
              }
            });
            if (!this.selectedPreset) {
              this.selectedPreset = {
                deviceSetIndex: this.devicesetIndex,
                preset: {
                  groupName: presetGroup.groupName,
                  centerFrequency: preset.centerFrequency,
                  name: preset.name,
                  type: preset.type
                }
              };
            }
          }
        }
      },
      err => {
        this.snackBar.open(err.error.message, "OK", {duration: 2000});
        this.dialogRef.close();
      }
    )
  }

  close() {

  }

  load() {

  }
}
