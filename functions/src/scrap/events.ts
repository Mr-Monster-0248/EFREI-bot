import axios from "axios";

export interface EventCard {
	title: string,
	date: string,
	beginTime: string,
	endTime: string
}

export async function getEvent(type: string = "") {
	return new Promise<EventCard[]>(async (resolve, reject) => {
		let url: string;
		switch (type) {
			case 'JPO': 
				url = "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Portes%20ouvertes&sort=ASC&limit=3";
				break;
			case 'Prepa bac':
				url = "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Préparation%20Bac&sort=ASC&limit=3";
				break;
			case 'Projette toi':
				url = "https://www.myefrei.fr/api/public/wp/queries/events?eventType=Journ%C3%A9e%20d%C3%A9couverte%20Projette-toi%20@%20Efrei%20Paris&sort=ASC&limit=3";
				break;
			default:
				url = "https://www.myefrei.fr/api/public/wp/queries/events?sort=ASC&limit=3";
				break;
		}

		try {
			let response = await axios.get(url);

			let repTab: EventCard[] = [];
			response.data.rows.forEach((elem: any, i: number) => {
				repTab[i] = elem.cardInfo;
				repTab[i].title = elem.eventName;
				repTab[i].date = elem.eventbeginDate;
				repTab[i].beginTime = elem.eventBeginTime;
				repTab[i].endTime = elem.eventEndTime;
			});

			resolve(repTab);
		} catch (error) {
			reject(error);
		}
	});
}