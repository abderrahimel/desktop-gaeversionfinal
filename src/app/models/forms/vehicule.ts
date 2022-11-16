export class Vehicule {
    matricule:string;
    marque:string;
    date_visite:Date;
    type:string;
    modele:Date;
    date_vidange:Date;
    vignette:string;
    carte_grise:string;
    assurance:string;
    visite:string;
    constructor(){
        this.matricule= ''; 
        this.marque= '';
        this.date_visite= new Date();
        this.type= '';
        this.modele = new Date();
        this.date_vidange = new Date();
        this.vignette= '';
        this.carte_grise= '';
        this.assurance= '';
        this.visite= '';
    }
}
