class placar{
    constructor(timeCasa, timeVisitante, golsCasa, golsVisitante){
        this.timeCasa = timeCasa;
        this.timeVisitante = timeVisitante;
        this.golsCasa = 0;
        this.golsVisitante = 0;
    }
    marcarGol(time){
        if (time === this.timeCasa){
            this.golsCasa += 1;
        }
        else if (time === this.timeVisitante){
            this.golsVisitante += 1;
        }
        else{
            console.log ("Time inválido. Por favor, informe o nome do time correto.");
        }
    }
    exibirPlacar(){
        console.log (`Placar: ${this.timeCasa} ${this.golsCasa} x ${this.golsVisitante} ${this.timeVisitante}`);
    }
    resultado(){
        if (this.golsCasa > this.golsVisitante){
            console.log (`${this.timeCasa} venceu!`);
        }
        else if (this.golsVisitante > this.golsCasa){
            console.log (`${this.timeVisitante} venceu!`);
        }
        else{
            console.log ("Empate!");
        }
    }
}
const placar1 = new placar("Corinthians", "Palmeiras", 0, 0);
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Corinthians");
placar1.marcarGol("Palmeiras");
placar1.exibirPlacar();
placar1.resultado();