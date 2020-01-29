import * as functions from 'firebase-functions';
import { getMajeures, MajorCard } from './scrap/majeures'

// Google Assistant dependancies
import { dialogflow, SimpleResponse, BrowseCarousel, BrowseCarouselItem, Image } from 'actions-on-google';

const app = dialogflow({ debug: true });

// Capture an intent
app.intent('Majeur', async (conv) => {
    const data: MajorCard[] = await getMajeures();
    conv.ask(new SimpleResponse({
        text: "L'EFREI compte 12 majeurs",
        speech: "L'EFREI compte 12 majeurs"
    }));
    conv.ask('En voici une liste :');
    conv.ask(new BrowseCarousel({
        items: data.map((el): any => {
            return new BrowseCarouselItem({
                title: el.title,
                url: el.link,
                description: el.descript,
                image: new Image({
                    url: el.img,
                    alt: 'background image not important',
                })
            })
        })
    }))
});


export const fulfillment = functions.https.onRequest(app);