import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnteteComponent } from '../entete/entete.component';
import { FixationsComponent } from '../fixations/fixations.component';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { toXML } from 'to-xml';
import { Commande } from 'src/app/models/commande';
import { GenericItemComponent } from '../generic-item/generic-item.component';
import { PlastronComponent } from '../plastron/plastron.component';
import { BoutonsComponent } from '../boutons/boutons.component';
import { GravureComponent } from '../gravure/gravure.component';

@Component({
  selector: 'app-plastron-editor',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    EnteteComponent,
    FixationsComponent,
    GenericItemComponent,
    FormsModule,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    GravureComponent,
    BoutonsComponent,
    PlastronComponent,
    ToastModule,
    TooltipModule,
    EnteteComponent,
  ],
  templateUrl: './plastron-editor.component.html',
  styleUrl: './plastron-editor.component.scss',
})
export class PlastronEditorComponent {
  commande: Commande = {} as Commande;
  @Input() set value(value: Commande) {
    this.commande = value;
  }
  get value() {
    return this.commande;
  }

  @Output() valueChange = new EventEmitter<Commande>();

  xmlString!: string;

  constructor(
    private clipboard: Clipboard,
    private messageService: MessageService
  ) {}

  handleChange() {
    this.valueChange.emit(this.commande);
    this.xmlString = this.prettifyXml(toXML({ commande: this.commande }));
  }

  handleCopyToClipboard() {
    this.clipboard.copy(this.xmlString);
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Le xml a bien été copié dans le presse-papier',
    });
  }

  prettifyXml(sourceXml: string) {
    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString(
      [
        // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
      ].join('\n'),
      'application/xml'
    );

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);
    return resultXml;
  }
}
