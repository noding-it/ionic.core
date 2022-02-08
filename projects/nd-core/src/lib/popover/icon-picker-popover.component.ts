import {Component, Input, OnInit} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {PopoverService} from '../services/popover.service';

@Component({
    selector: 'up-icon-picker-popover',
    template: `
        <ion-card>
            <ion-row>
                <ion-col size="2" *ngFor="let icon of arrayIcon">
                        <ion-icon [name]="icon" style="color: {{this.iconColor}}"
                                  (click)="popover.dismiss({icon: icon})">
                        </ion-icon>
                </ion-col>
            </ion-row>
        </ion-card>
    `,
    styles: [],
})

export class IconPickerPopoverComponent implements OnInit {
    constructor(
        public popover: PopoverService,
    ) {
    }

    @Input() iconColor = '#048E8A';
    public arrayIcon = [
    'document', 'folder', 'airplane', 'alarm', 'analytics', 'basket', 'brush', 'barbell',
    'chatbubbles', 'cog', 'desktop', 'earth', 'cloudy', 'fast-food', 'git-network', 'flask', 'musical-notes',
    'print'] as string[];

    ngOnInit() {

    }
}
