import EventInterface from "../@shared/event.interface";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
        this.eventData.id = eventData.id;
        this.eventData.name = eventData.name;
        this.eventData.address = eventData.address;
    }
}