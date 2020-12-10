const NAVNO_URL = "https://www.nav.no";
const TJENESTER_URL = "https://tjenester.nav.no";
const VEILEDERARBEIDSSOKER_URL = "https://veiledearbeidssoker.nav.no";

export const lenker = {
  skjemaer: {
    tittel: "Skjemaer",
    url: `${NAVNO_URL}/soknader`,
  },
  dinPensjon: {
    tittel: "Din pensjon",
    url: `${TJENESTER_URL}/pselv/publisering/dinpensjon.jsf`,
  },
  veilederArbeidssoker: {
    tittel: "Veileder for arbeidssøker",
    url: `${VEILEDERARBEIDSSOKER_URL}`,
  },
  dittSykefravaer: {
    tittel: "Ditt sykefravær",
    url: `${TJENESTER_URL}/sykefravaer`,
  },
};
