import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Component, Inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { PlastronEditorComponent } from './components/plastron-editor/plastron-editor.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Commande } from './models/commande';
import { Fixations } from './models/fixation';
import { Entete } from './models/entete';
import { Plastron } from './models/plastron';
import { Afficheur } from './models/afficheur';
import { PlaqueSignaletique } from './models/plaque-signaletique';
import { HautParleur } from './models/haut-parleur';
import { Phonie } from './models/phonie';
import { EclairageSecouru } from './models/eclairage-secouru';
import { LogoPlastron } from './models/logo-plastron';
import { Aeration } from './models/aeration';
import { GoujonMasse } from './models/goujon-masse';
import { Gravure } from './models/gravure';
import { Boutons } from './models/boutons';
import { Position } from './models/position';
import { PlastronDimensions } from './models/plastron-dimensions';
import { Matiere } from './models/matiere';
import { FixationsDimensions } from './models/fixations-dimensions';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, lastValueFrom, takeUntil } from 'rxjs';
import { QuestionHintsService } from './services/question-hints.service';

@Component({
  imports: [
    ButtonModule,
    CardModule,
    IconFieldModule,
    IftaLabelModule,
    InputIconModule,
    InputNumberModule,
    PlastronEditorComponent,
    RouterModule,
    ToastModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'myangularapp';

  commande = {
    entete: {
      id: '',
      production: '',
      reference: '',
      path: '',
      version: ''
    } as Entete,
    plastron: {
      type: '',
      description: '',
      dimensions: {} as PlastronDimensions,
      matiere: {} as Matiere
    } as Plastron,
    fixations: {
      type: '',
      description: '',
      dimensions: {} as FixationsDimensions,
      positions: [] as Position[]
    } as Fixations,
    afficheur: {
      position: {} as Position
    } as Afficheur,
    plaque_signaletique: {
      position: {} as Position
    } as PlaqueSignaletique,
    haut_parleur: {
      position: {} as Position
    } as HautParleur,
    phonie: {
      position: {} as Position
    } as Phonie,
    eclairage_secouru: {
      position: {} as Position
    } as EclairageSecouru,
    logo_plastron: {
      position: {} as Position
    } as LogoPlastron,
    aeration: {
      position: {} as Position
    } as Aeration,
    goujon_masse: {
      position: {} as Position
    } as GoujonMasse,
    gravure: {
      position: {} as Position
    } as Gravure,
    boutons: {
      positions: [] as Position[]
    } as Boutons
  } as Commande;

  private mode: 'light' | 'dark' = 'light';

  /*
    MSAL
  */
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private questionHintsService: QuestionHintsService
  ){

  }

  async testApi() {
    const res = await lastValueFrom(this.questionHintsService.getByQuestionId('entete.reference'));
    console.log(res);
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  toggleDarkMode() {
    const html = document.querySelector('html');
    const mode = html?.style.getPropertyValue('color-scheme');
    this.mode = mode === 'light' ? 'dark' : 'light';
    document
      .querySelector('html')
      ?.style.setProperty('color-scheme', this.mode);
  }
}
