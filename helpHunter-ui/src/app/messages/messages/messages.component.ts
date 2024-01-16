import { Component, OnDestroy, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { FiltersComponent } from '../../home/filters/filters.component';
import { Filters } from '../../home/filters/filters.model';
import { FILTERS_NAME_MAPPING } from '../../home/filters/filters-mapping.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServicePricingComponent } from '../service-pricing/service-pricing.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DeviceSizeService } from '../../services/deviceSize/device-size.service';

export interface ServiceChat {
    chatId: number;
    serviceName: string;
    fullName: string;
    avatar: number;
    status: 'new' | 'started' | 'finished' | 'accepted';
    messages: (Message | PricingMessage)[];
    description: string;
    title: string;
    startDate: string;
    endDate: string;
}

export interface Message {
    message: string;
    type: 'my' | 'other';
    timestamp: number;
}

export interface PricingMessage {
    type: 'pricing';
    startDate: string;
    description: string;
    estimatedExecutionTime: string;
    price: number;
}

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
    serviceChats: ServiceChat[] = [
        {
            chatId: 1,
            serviceName: 'Malowanie ścian',
            avatar: 1,
            status: 'new',
            fullName: 'Janusz Kowal',
            messages: [
                {
                    message: 'Cześć, czy jesteś w stanie pomalować mieszkanie?',
                    type: 'my',
                    timestamp: 1622560500000,
                },
                {
                    message: 'Tak, oczywiście. Kiedy?',
                    type: 'other',
                    timestamp: 1622560600000,
                },
                {
                    message: 'Najlepiej w sobotę.',
                    type: 'my',
                    timestamp: 1622560700000,
                },
                {
                    message: 'Ok, to ustalimy szczegóły.',
                    type: 'other',
                    timestamp: 1622560800000,
                },

                {
                    type: 'pricing',
                    startDate: '2021-06-01',
                    description: 'Możemy zaczynać.',
                    estimatedExecutionTime: '2 dni',
                    price: 200,
                },
                {
                    message: 'Nie no, tyle to nie.',
                    type: 'my',
                    timestamp: 1622560800000,
                },
                {
                    message: 'Za pół ceny nie zrobię.',
                    type: 'other',
                    timestamp: 1622560800000,
                },
                {
                    message: 'To sam sobie pomaluję.',
                    type: 'my',
                    timestamp: 1622560800000,
                },
            ],
            description: 'Potrzebuję pomalować mieszkanie 2-pokojowe. Wymagana jest znajomość technik malarskich.',
            title: 'Malowanie mieszkania',
            startDate: '2021-06-01',
            endDate: '2021-06-02',
        },
    ];

    destroy = new Subject<boolean>();

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private deviceSizeService: DeviceSizeService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
            this.selectedChatId = params['id'];
            if (this.selectedChatId) {
                this.selectedChat = this.serviceChats.find(chat => chat.chatId.toString() === this.selectedChatId);
            }
        });

        this.deviceSizeService
            .getIsMediumScreen()
            .pipe(takeUntil(this.destroy))
            .subscribe(isSmallScreen => {
                this.isSmallScreen = isSmallScreen;
            });
    }

    selectedChatId: string | undefined = undefined;
    selectedChat: ServiceChat | undefined = undefined;
    isSmallScreen: boolean = false;

    isSelected(chat: ServiceChat): boolean {
        return isEqual(chat, this.selectedChat);
    }

    openPricing() {
        const dialogRef = this.dialog.open(ServicePricingComponent, { width: '460px' });
    }

    onChatSelected(chat: ServiceChat) {
        this.router.navigate(['/chat', chat.chatId]);
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }
}
