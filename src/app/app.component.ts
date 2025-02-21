import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
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
import { Position } from './models/position';
import { PlastronDimensions } from './models/plastron-dimensions';
import { Matiere } from './models/matiere';
import { Bouton } from './models/bouton';
import { FixationsDimensions } from './models/fixations-dimensions';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject, filter, lastValueFrom, takeUntil } from 'rxjs';
import { QuestionHintsService } from './services/question-hints.service';
import { environment } from 'src/environments/environment';

@Component({
  imports: [
    AvatarModule,
    AvatarGroupModule,
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
    } as Entete,
    plastron: {
      dimensions: {} as PlastronDimensions,
      matiere: {} as Matiere,
    } as Plastron,
    fixations: {
      dimensions: {} as FixationsDimensions,
      positions: { position: [] as Position[] },
    } as Fixations,
    afficheur: {
      position: {} as Position,
    } as Afficheur,
    plaque_signaletique: {
      position: {} as Position,
    } as PlaqueSignaletique,
    haut_parleur: {
      position: {} as Position,
    } as HautParleur,
    phonie: {
      position: {} as Position,
    } as Phonie,
    eclairage_secouru: {
      position: {} as Position,
    } as EclairageSecouru,
    logo_plastron: {
      position: {} as Position,
    } as LogoPlastron,
    aeration: {
      position: {} as Position,
    } as Aeration,
    goujon_masse: {
      position: {} as Position,
    } as GoujonMasse,
    gravure: {
      position: {} as Position,
    } as Gravure,
    boutons: { button: [] as Bouton[] },
  } as Commande;

  debug = false;
  private mode: 'light' | 'dark' = 'light';

  /*
    MSAL
  */
  loginDisplay = false;
  shortName = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private questionHintsService: QuestionHintsService
  ) {
    this.debug = environment.debug;
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.authService.instance.enableAccountStorageEvents();

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
        this.shortName = this.getShortName(this.authService.instance.getActiveAccount()?.name);
      });
  }

  getShortName(name: string | undefined) {
    if (name)
      return name.split(" ").map((n)=>n[0]).join("").toUpperCase();
    else
      return '';
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
