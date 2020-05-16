import * as functions from "firebase-functions";
import { getMajeures, MajorCard } from "./scrap/majeures";
import { getEvent, EventCard } from "./scrap/events";
import { parseDate } from "./utils";

// Google Assistant dependancies
import {
  dialogflow,
  SimpleResponse,
  BrowseCarousel,
  BrowseCarouselItem,
  Image,
  Table,
  Button,
} from "actions-on-google";

const app = dialogflow({ debug: true });

/**
 * Function that capture the intent 'Majeures'
 * Respond with a BrowseCarousel
 * Allowing user to browse to the selected majeure page
 */
app.intent("Majeures", async (conv) => {
  const data: MajorCard[] = await getMajeures();
  console.log(data);
  conv.ask(
    new SimpleResponse({
      text: "L'EFREI Paris compte 12 majeures",
      speech: "L'éfrai Paris compte 12 majeures",
    }),
  );
  conv.ask("Voici la liste des majeurs que compte l'EFREI Paris :");
  conv.ask(
    new BrowseCarousel({
      items: data.map((el): any => {
        return new BrowseCarouselItem({
          title: el.title,
          url: el.link,
          description: el.descript,
          image: new Image({
            url: el.img,
            alt: "background image not important",
          }),
        });
      }),
    }),
  );
});

/**
 * Function that capture the intent 'JPO'
 * Respond with a List of all the event found on the efrei website
 */
app.intent("JPO", async (conv) => {
  const data: EventCard[] = await getEvent("JPO");
  console.log(data);

  conv.ask(
    new SimpleResponse({
      text: "Voici ce que j'ai trouvé sur le site de l'EFREI",
      speech: "Voici ce que j'ai trouvé sur le site de l'éfrai",
    }),
  );

  conv.ask(
    new Table({
      title: "Liste des prochaines JPO",
      columns: [
        {
          header: "Type",
          align: "LEADING",
        },
        {
          header: "Date",
          align: "CENTER",
        },
        {
          header: "Heure",
          align: "LEADING",
        },
      ],
      rows: data.map((el): any => {
        return {
          cells: [el.title, parseDate(el.date), el.beginTime],
          dividerAfter: true,
        };
      }),
      buttons: new Button({
        title: "En savoir plus",
        url: "https://www.efrei.fr/nous-rencontrer/portes-ouvertes/",
      }),
    }),
  );
});

app.intent("Evenements", async (conv) => {
  const data: EventCard[] = await getEvent();
  console.log(data);

  conv.ask(
    new SimpleResponse({
      text: "Voici ce que j'ai trouvé sur le site de l'EFREI",
      speech: "Voici ce que j'ai trouvé sur le site de l'éfrai",
    }),
  );

  conv.ask(
    new Table({
      title: "Liste des prochains évènements",
      columns: [
        {
          header: "Type",
          align: "LEADING",
        },
        {
          header: "Date",
          align: "CENTER",
        },
        {
          header: "Heure",
          align: "LEADING",
        },
      ],
      rows: data.map((el): any => {
        return {
          cells: [el.title, parseDate(el.date), el.beginTime],
          dividerAfter: true,
        };
      }),
      buttons: new Button({
        title: "En savoir plus",
        url: "https://www.efrei.fr/nous-rencontrer/portes-ouvertes/",
      }),
    }),
  );
});

export const fulfillment = functions.https.onRequest(app);
