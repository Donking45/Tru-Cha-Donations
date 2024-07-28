import {
    SmartContract,
    assert,
    method,
    prop,
    ByteString,
    Sha256,
    sha256,
} from 'scrypt-ts';

export class Donation extends SmartContract {
    @prop()
    charity: ByteString; // The charity's identifier
    @prop()
    donor: ByteString;   // The donor's identifier
    @prop()
    amount: bigint;      // The donation amount
    @prop()
    expenditureHash: Sha256; // Hash of the expenditure proof

    constructor(charity: ByteString, donor: ByteString, amount: bigint, expenditureHash: Sha256) {
        super(...arguments);
        this.charity = charity;
        this.donor = donor;
        this.amount = amount;
        this.expenditureHash = expenditureHash;
    }

    @method()
    public unlock(donor: ByteString, message: ByteString) {
        // Verify that the donor is correct and the hash of the expenditure proof matches
        assert(this.donor == donor, 'incorrect donor');
        assert(sha256(message) == this.expenditureHash, 'incorrect expenditure proof hash');
    }
}
