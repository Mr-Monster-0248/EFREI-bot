import * as functions from 'firebase-functions';
import { getMajeures, MajorCard } from './scrap/majeures';
import { getEvent, EventCard } from './scrap/events';

// Google Assistant dependancies
import { dialogflow, SimpleResponse, BrowseCarousel, BrowseCarouselItem, Image } from 'actions-on-google';

const app = dialogflow({ debug: true });

// Capture an intent
app.intent('Majeures', async (conv) => {
	const data: MajorCard[] = await getMajeures();
	console.log(data);
	conv.ask(new SimpleResponse({
		text: "L'EFREI compte 12 majeures",
		speech: "L'EFREI compte 12 majeures"
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

app.intent('JPO', async (conv) => {
	const data: EventCard[] = await getEvent('JPO');
	console.log(data);

	conv.ask("Voici une liste:");
});

export const fulfillment = functions.https.onRequest(app);