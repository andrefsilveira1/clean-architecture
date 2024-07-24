import Entity from "../@shared/entity/entity.abstract";
import NotificationError from "../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "./address";

export default class Customer extends Entity{
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _reward: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id,
        this._name = name,
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }


    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: Address) {
        this._address = address;
    }

    get reward(): number {
        return this._reward
    }

    get active(): boolean {
        return this._active;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this.address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
          throw new Error("Address is required");
        }
        this._active = true;
      }

    deactivate() {
        this._active = false
    }

    addReward(points: number) {
        this._reward += points;
    }
}